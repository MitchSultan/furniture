"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import legacyProducts from "@/data/products.json";
import { requireStaff } from "@/lib/supabase/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "../../../utils/supabase/server.js";

const PRODUCT_STATUSES = new Set(["draft", "pending", "private", "published", "archived"]);

export async function signInAction(formData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/admin/login?error=credentials");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect("/admin/login?error=credentials");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || !profile || !["shop_manager", "admin"].includes(profile.role)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=access");
  }

  redirect("/admin/products");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function saveProductImage(supabase, productId, imageUrl, storagePath) {
  const { data: existing, error: lookupError } = await supabase
    .from("product_images")
    .select("id, url, storage_path")
    .eq("product_id", productId)
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (lookupError) return lookupError;

  if (!imageUrl) {
    if (!existing) return null;
    const { error } = await supabase.from("product_images").delete().eq("id", existing.id);
    if (!error && existing.storage_path) {
      await supabase.storage.from("product-images").remove([existing.storage_path]);
    }
    return error;
  }

  const values = { url: imageUrl };
  if (storagePath) values.storage_path = storagePath;
  else if (existing?.url !== imageUrl) values.storage_path = null;

  if (existing) {
    const { error } = await supabase.from("product_images").update(values).eq("id", existing.id);
    if (!error && existing.storage_path && existing.storage_path !== storagePath) {
      await supabase.storage.from("product-images").remove([existing.storage_path]);
    }
    return error;
  }

  const { error } = await supabase.from("product_images").insert({
    product_id: productId,
    position: 0,
    storage_path: storagePath,
    ...values,
  });
  return error;
}

async function savePrimaryCategory(supabase, productId, categoryId) {
  const { data: current, error: lookupError } = await supabase
    .from("product_categories")
    .select("category_id")
    .eq("product_id", productId)
    .eq("is_primary", true)
    .maybeSingle();

  if (lookupError) return lookupError;

  if (!categoryId) {
    if (!current) return null;
    const { error } = await supabase
      .from("product_categories")
      .delete()
      .eq("product_id", productId)
      .eq("category_id", current.category_id);
    return error;
  }

  const { data: existing, error: categoryError } = await supabase
    .from("product_categories")
    .select("category_id")
    .eq("product_id", productId)
    .eq("category_id", categoryId)
    .maybeSingle();

  if (categoryError) return categoryError;

  if (existing) {
    const { error: clearError } = await supabase
      .from("product_categories")
      .update({ is_primary: false })
      .eq("product_id", productId)
      .neq("category_id", categoryId);
    if (clearError) return clearError;

    const { error } = await supabase
      .from("product_categories")
      .update({ is_primary: true })
      .eq("product_id", productId)
      .eq("category_id", categoryId);
    return error;
  }

  if (current) {
    const { error } = await supabase
      .from("product_categories")
      .update({ category_id: categoryId, is_primary: true })
      .eq("product_id", productId)
      .eq("category_id", current.category_id);
    return error;
  }

  const { error } = await supabase.from("product_categories").insert({
    product_id: productId,
    category_id: categoryId,
    is_primary: true,
  });
  return error;
}

export async function saveProductAction(previousState, formData) {
  const { supabase } = await requireStaff();
  const productId = String(formData.get("productId") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const priceValue = String(formData.get("price") || "").trim();
  const price = Number(priceValue);
  const status = String(formData.get("status") || "draft");
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const imageFile = formData.get("imageFile");
  const categoryId = String(formData.get("categoryId") || "").trim() || null;
  const specs = {
    dimensions: String(formData.get("dimensions") || "").trim(),
    material: String(formData.get("material") || "").trim(),
    details: String(formData.get("details") || "")
      .split("\n")
      .map((detail) => detail.trim())
      .filter(Boolean),
  };

  if (
    !name ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    !priceValue ||
    !Number.isFinite(price) ||
    price < 0 ||
    !PRODUCT_STATUSES.has(status)
  ) {
    return { error: "Enter a name, a valid slug, and a non-negative price." };
  }

  if (productId) {
    const { data: existingProduct, error } = await supabase
      .from("products")
      .select("type")
      .eq("id", productId)
      .maybeSingle();
    if (error || existingProduct?.type !== "simple") {
      return { error: "This editor only supports existing simple products." };
    }
  }

  if (imageUrl) {
    try {
      const { url } = getSupabaseConfig();
      const image = new URL(imageUrl);
      if (
        image.origin !== new URL(url).origin ||
        !image.pathname.startsWith("/storage/v1/object/public/product-images/")
      ) {
        return { error: "Use a public image URL from the product-images bucket." };
      }
    } catch {
      return { error: "Enter a valid public image URL from Supabase Storage." };
    }
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
    if (!allowedImageTypes.has(imageFile.type) || imageFile.size > 5 * 1024 * 1024) {
      return { error: "Choose a JPEG, PNG, WebP, or AVIF image up to 5 MB." };
    }
  }

  if (categoryId) {
    const { data: category, error } = await supabase
      .from("categories")
      .select("id")
      .eq("id", categoryId)
      .maybeSingle();
    if (error || !category) return { error: "Choose a valid product category." };
  }

  const productValues = {
    name,
    slug,
    type: "simple",
    short_description: String(formData.get("shortDescription") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    brand: String(formData.get("brand") || "").trim() || null,
    specs,
    is_featured: formData.get("isFeatured") === "on",
  };
  let savedProductId = productId;

  if (savedProductId) {
    const { error } = await supabase
      .from("products")
      .update(productValues)
      .eq("id", savedProductId)
      .eq("type", "simple");
    if (error) {
      console.error("Product update failed:", error.message);
      return { error: "Could not update this product. Check that its slug is unique." };
    }
  } else {
    const { data, error } = await supabase
      .from("products")
      .insert({ ...productValues, status: "draft" })
      .select("id")
      .single();
    if (error || !data) {
      console.error("Product creation failed:", error?.message);
      return { error: "Could not create this product. Check that its slug is unique." };
    }
    savedProductId = data.id;
  }

  const { data: defaultVariant, error: variantLookupError } = await supabase
    .from("product_variants")
    .select("id")
    .eq("product_id", savedProductId)
    .eq("is_default", true)
    .maybeSingle();

  if (variantLookupError) {
    console.error("Product variant lookup failed:", variantLookupError.message);
    return { error: "Product saved, but its price could not be updated." };
  }

  const variantValues = {
    regular_price: price,
    is_default: true,
    is_active: true,
  };
  const variantResult = defaultVariant
    ? await supabase.from("product_variants").update(variantValues).eq("id", defaultVariant.id)
    : await supabase.from("product_variants").insert({
        product_id: savedProductId,
        manage_stock: false,
        ...variantValues,
      });

  if (variantResult.error) {
    console.error("Product variant save failed:", variantResult.error.message);
    if (!productId) {
      await supabase.from("products").delete().eq("id", savedProductId);
    }
    return { error: "Could not save the product price." };
  }

  let finalImageUrl = imageUrl;
  let storagePath = null;
  if (imageFile instanceof File && imageFile.size > 0) {
    const extensions = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
    };
    storagePath = `products/${savedProductId}/${randomUUID()}.${extensions[imageFile.type]}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(storagePath, imageFile, { contentType: imageFile.type, upsert: false });
    if (uploadError) {
      console.error("Product image upload failed:", uploadError.message);
      return { error: "Could not upload the image. Check the product-images bucket and staff storage policy." };
    }
    finalImageUrl = supabase.storage.from("product-images").getPublicUrl(storagePath).data.publicUrl;
  }

  const imageError = await saveProductImage(supabase, savedProductId, finalImageUrl, storagePath);
  if (imageError && storagePath) {
    await supabase.storage.from("product-images").remove([storagePath]);
  }
  const categoryError = imageError
    ? null
    : await savePrimaryCategory(supabase, savedProductId, categoryId);
  if (imageError || categoryError) {
    console.error("Product details save failed:", imageError?.message || categoryError?.message);
    return { error: "Product saved, but its image or category could not be updated." };
  }

  const { error: statusError } = await supabase
    .from("products")
    .update({ status, deleted_at: null })
    .eq("id", savedProductId)
    .eq("type", "simple");
  if (statusError) {
    console.error("Product status update failed:", statusError.message);
    return { error: "Product saved, but its status could not be updated." };
  }

  redirect(`/admin/products?notice=${productId ? "updated" : "created"}`);
}

export async function importCurrentCatalogAction() {
  const { supabase } = await requireStaff();
  const categorySlugs = [...new Set(legacyProducts.map((product) => product.category).filter(Boolean))];
  let importedCount = 0;

  try {
    const { data: existingCategories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, slug")
      .in("slug", categorySlugs);
    if (categoriesError) throw categoriesError;

    const categoryIds = new Map((existingCategories || []).map((category) => [category.slug, category.id]));
    for (const slug of categorySlugs) {
      if (categoryIds.has(slug)) continue;
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: slug.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), slug, is_active: true })
        .select("id")
        .single();
      if (error) throw error;
      categoryIds.set(slug, data.id);
    }

    for (const product of legacyProducts) {
      const { data: existing, error: productLookupError } = await supabase
        .from("products")
        .select("id, type")
        .eq("slug", product.slug)
        .maybeSingle();
      if (productLookupError) throw productLookupError;
      if (existing && existing.type !== "simple") continue;

      let productId = existing?.id;
      if (!productId) {
        const { data, error } = await supabase
          .from("products")
          .insert({
            type: "simple",
            status: "published",
            name: product.name,
            slug: product.slug,
            short_description: product.description,
            description: product.description,
            specs: {
              dimensions: product.dimensions || "",
              material: product.material || "",
              details: product.details || [],
            },
          })
          .select("id")
          .single();
        if (error) throw error;
        productId = data.id;
        importedCount += 1;
      }

      const { data: defaultVariant, error: variantLookupError } = await supabase
        .from("product_variants")
        .select("id")
        .eq("product_id", productId)
        .eq("is_default", true)
        .maybeSingle();
      if (variantLookupError) throw variantLookupError;
      if (!defaultVariant) {
        const { error } = await supabase.from("product_variants").insert({
          product_id: productId,
          regular_price: product.price,
          is_default: true,
          is_active: true,
          manage_stock: false,
        });
        if (error) throw error;
      }

      const categoryId = categoryIds.get(product.category);
      if (categoryId) {
        const { data: categoryLink, error: categoryLinkError } = await supabase
          .from("product_categories")
          .select("category_id")
          .eq("product_id", productId)
          .eq("category_id", categoryId)
          .maybeSingle();
        if (categoryLinkError) throw categoryLinkError;
        if (!categoryLink) {
          const { error } = await supabase.from("product_categories").insert({
            product_id: productId,
            category_id: categoryId,
            is_primary: true,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("product_categories")
            .update({ is_primary: true })
            .eq("product_id", productId)
            .eq("category_id", categoryId);
          if (error) throw error;
        }
      }

      const { data: currentImages, error: imagesLookupError } = await supabase
        .from("product_images")
        .select("url")
        .eq("product_id", productId);
      if (imagesLookupError) throw imagesLookupError;
      const imageRows = (product.images || [])
        .filter((url) => !currentImages?.some((image) => image.url === url))
        .map((url, position) => ({ product_id: productId, url, position }));
      if (imageRows.length) {
        const { error } = await supabase.from("product_images").insert(imageRows);
        if (error) throw error;
      }
    }
  } catch (error) {
    console.error("Catalog import failed:", error.message);
    redirect("/admin/products?notice=import-error");
  }

  redirect(`/admin/products?notice=imported&count=${importedCount}`);
}

export async function archiveProductAction(formData) {
  const { supabase } = await requireStaff();
  const productId = String(formData.get("productId") || "").trim();

  if (!productId) redirect("/admin/products");

  const { error } = await supabase
    .from("products")
    .update({ status: "archived" })
    .eq("id", productId)
    .eq("type", "simple");

  if (error) {
    console.error("Product archive failed:", error.message);
    redirect("/admin/products?notice=archive-error");
  }

  redirect("/admin/products?notice=archived");
}