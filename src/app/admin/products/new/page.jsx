import AdminShell from "@/components/admin/AdminShell";
import ProductForm from "@/components/admin/ProductForm";
import { requireStaff } from "@/lib/supabase/auth";

export const metadata = { title: "New Product | Studio Admin" };

export default async function NewProductPage() {
  const { supabase, profile } = await requireStaff();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <AdminShell profile={profile}>
      <ProductForm categories={categories || []} />
    </AdminShell>
  );
}