import Link from "next/link";
import { Plus, Search } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { requireStaff } from "@/lib/supabase/auth";
import { archiveProductAction, importCurrentCatalogAction } from "@/app/admin/actions";
import { formatPrice } from "@/lib/format";

const notices = {
  created: "Product created.",
  updated: "Product updated.",
  archived: "Product archived.",
  "archive-error": "The product could not be archived.",
  imported: "Your existing catalog was imported.",
  "import-error": "The catalog import stopped. Check server logs, then retry; completed rows are safe to import again.",
};

export const metadata = { title: "Products | Studio Admin" };

export default async function AdminProductsPage({ searchParams }) {
  const { supabase, profile } = await requireStaff();
  const params = await searchParams;
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, slug, status, updated_at, product_variants(regular_price, is_default), product_images(url, position)")
    .eq("type", "simple")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  const notice = params?.notice === "imported"
    ? `${Number(params.count) || 0} products imported. Existing matching records were kept.`
    : notices[params?.notice];

  return (
    <AdminShell profile={profile}>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d9ded6] pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#68766d]">Catalog</p>
          <h1 className="mt-2 font-serif text-4xl font-normal">Products</h1>
          <p className="mt-2 text-sm text-[#69756e]">Manage simple product details and storefront visibility.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex h-11 items-center gap-2 rounded-md bg-[#234534] px-4 text-sm font-medium text-white transition hover:bg-[#172f23]">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </header>

      {notice && <p role="status" className="mt-5 border-l-2 border-[#49745d] bg-[#e6ede7] px-4 py-3 text-sm text-[#294b36]">{notice}</p>}
      {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">Could not load products. Confirm the schema is applied and staff RLS policies are active.</p>}

      {!error && products?.length === 0 && (
        <form action={importCurrentCatalogAction} className="mt-6 flex flex-col gap-4 border border-[#d6ddd4] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-sm font-semibold">Bring in the current storefront catalog</h2>
            <p className="mt-1 text-sm text-[#69756e]">Import existing product copy, prices, categories, and image links from the site.</p>
          </div>
          <button type="submit" className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-[#b7c3b8] px-4 text-sm font-medium text-[#315d41] transition hover:bg-[#f4f6f2]">Import catalog</button>
        </form>
      )}

      <div className="mt-7 flex items-center justify-between gap-4 border-b border-[#d9ded6] pb-3">
        <p className="text-sm text-[#69756e]">{products?.length || 0} products</p>
        <div className="inline-flex items-center gap-2 text-xs text-[#7b857e]">
          <Search className="h-4 w-4" /> Catalog
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d9ded6] text-[11px] uppercase tracking-[0.12em] text-[#79837c]">
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Updated</th>
              <th className="px-3 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((product) => {
              const variant = product.product_variants?.find((item) => item.is_default) || product.product_variants?.[0];
              const statusClass = product.status === "published"
                ? "bg-[#e4eee6] text-[#2e6040]"
                : "bg-[#ebece8] text-[#5d675f]";

              return (
                <tr key={product.id} className="border-b border-[#e0e4dd] transition hover:bg-white/60">
                  <td className="px-3 py-4">
                    <Link href={`/admin/products/${product.id}`} className="font-medium text-[#27382d] hover:text-[#49745d]">{product.name}</Link>
                    <p className="mt-1 text-xs text-[#808982]">/{product.slug}</p>
                  </td>
                  <td className="px-3 py-4"><span className={`inline-flex rounded-sm px-2 py-1 text-xs ${statusClass}`}>{product.status}</span></td>
                  <td className="px-3 py-4 text-sm">{variant ? formatPrice(Number(variant.regular_price), "KES") : "No price"}</td>
                  <td className="px-3 py-4 text-sm text-[#69756e]">{new Date(product.updated_at).toLocaleDateString("en-KE")}</td>
                  <td className="px-3 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Link href={`/admin/products/${product.id}`} className="text-sm font-medium text-[#315d41] hover:underline">Edit</Link>
                      <form action={archiveProductAction}>
                        <input type="hidden" name="productId" value={product.id} />
                        <button type="submit" className="text-sm text-[#8b4c42] hover:underline">Archive</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!error && products?.length === 0 && (
          <div className="py-16 text-center">
            <PackageEmpty />
            <h2 className="mt-4 font-serif text-2xl">The catalog is ready</h2>
            <p className="mt-2 text-sm text-[#69756e]">Add your first product to publish it to the storefront.</p>
            <Link href="/admin/products/new" className="mt-5 inline-flex h-10 items-center rounded-md border border-[#b7c3b8] px-4 text-sm font-medium text-[#315d41] hover:bg-white">Create first product</Link>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function PackageEmpty() {
  return <div aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center border border-[#ced6cd] text-[#52715d]"><Plus className="h-5 w-5" /></div>;
}