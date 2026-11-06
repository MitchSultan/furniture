import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";
import { requireStaff } from "@/lib/supabase/auth";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Edit Product ${id} | Studio Admin` };
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const { supabase, profile } = await requireStaff();
  const [{ data: product, error }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, slug, short_description, description, brand, specs, is_featured, status, product_variants(id, regular_price, is_default, manage_stock), product_images(id, url, storage_path, position), product_categories(category_id, is_primary)")
      .eq("id", id)
      .eq("type", "simple")
      .is("deleted_at", null)
      .maybeSingle(),
    supabase.from("categories").select("id, name").eq("is_active", true).order("sort_order"),
  ]);

  if (error || !product) notFound();

  const variant = product.product_variants?.find((item) => item.is_default) || product.product_variants?.[0];
  const image = [...(product.product_images || [])].sort((first, second) => first.position - second.position)[0];
  const category = product.product_categories?.find((item) => item.is_primary);

  return (
    <AdminShell profile={profile}>
      <ProductForm
        categories={categories || []}
        product={{
          ...product,
          price: variant ? Number(variant.regular_price) : "",
          manageStock: variant?.manage_stock ?? true,
          imageUrl: image?.url || "",
          categoryId: category?.category_id || "",
        }}
      />
    </AdminShell>
  );
}