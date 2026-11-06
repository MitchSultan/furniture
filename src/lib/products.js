import { connection } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

function mapProduct(product) {
  const specs = product.specs || {};
  const variants = product.product_variants || [];
  const defaultVariant = variants.find((variant) => variant.is_default) || variants[0];
  const categories = product.product_categories || [];
  const category = categories.find((item) => item.is_primary) || categories[0];
  const images = product.product_images
    ? [...product.product_images]
        .sort((first, second) => first.position - second.position)
        .map((image) => image.url)
    : [product.image_url, product.hover_image_url].filter(Boolean);
  const price = Number(product.min_price ?? defaultVariant?.regular_price ?? 0);
  const isNew = product.is_new ?? (
    product.published_at &&
    Date.now() - new Date(product.published_at).getTime() < 30 * 24 * 60 * 60 * 1000
  );

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: category?.category?.slug || product.category_slugs?.[0] || "living",
    price,
    priceUSD: Math.round(price / 130),
    description: product.description || product.short_description || "",
    dimensions: specs.dimensions || "",
    material: specs.material || product.brand || "",
    details: Array.isArray(specs.details) ? specs.details : [],
    images,
    isNew: Boolean(isNew),
    isFeatured: Boolean(product.is_featured),
  };
}

export async function getAllProducts() {
  await connection();
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("product_listing")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load products: ${error.message}`);
  }

  return (data || []).map(mapProduct);
}

export async function getProductBySlug(slug) {
  await connection();
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, short_description, description, brand, specs, min_price, published_at, is_featured, product_variants(regular_price, is_default), product_images(url, position), product_categories(is_primary, category:categories(slug))")
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load product: ${error.message}`);
  }

  return data ? mapProduct(data) : null;
}

export async function getByCategory(category) {
  const products = await getAllProducts();
  if (!category || category === "all") return products;
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export async function getNewProducts() {
  const products = await getAllProducts();
  return products.filter((product) => product.isNew);
}

export async function getFeaturedProduct() {
  const products = await getAllProducts();
  return products.find((product) => product.isFeatured) || products[0] || null;
}
