"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { saveProductAction } from "@/app/admin/actions";

const fieldClass = "mt-2 h-11 w-full rounded-md border border-[#d6dbd3] bg-white px-3 text-sm text-[#202923] outline-none focus:border-[#3d6652] focus:ring-2 focus:ring-[#3d6652]/15";
const areaClass = "mt-2 min-h-28 w-full rounded-md border border-[#d6dbd3] bg-white px-3 py-2.5 text-sm text-[#202923] outline-none focus:border-[#3d6652] focus:ring-2 focus:ring-[#3d6652]/15";

export default function ProductForm({ product = {}, categories = [] }) {
  const [state, formAction, pending] = useActionState(saveProductAction, { error: "" });

  return (
    <form action={formAction} className="space-y-7">
      <input type="hidden" name="productId" value={product.id || ""} />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9ded6] pb-5">
        <div>
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-[#647168] hover:text-[#234534]">
            <ArrowLeft className="h-4 w-4" /> Products
          </Link>
          <h1 className="mt-3 font-serif text-3xl font-normal">{product.id ? "Edit product" : "New product"}</h1>
        </div>
        <button type="submit" disabled={pending} className="inline-flex h-11 items-center gap-2 rounded-md bg-[#234534] px-4 text-sm font-medium text-white transition hover:bg-[#172f23] disabled:cursor-wait disabled:opacity-60">
          <Save className="h-4 w-4" /> {pending ? "Saving" : "Save product"}
        </button>
      </div>

      {state.error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.error}</p>}

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <div className="grid gap-5 rounded-md border border-[#dce1d9] bg-white p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#647168]">Product details</h2>
            <label className="text-sm font-medium">Name
              <input className={fieldClass} name="name" required defaultValue={product.name || ""} />
            </label>
            <label className="text-sm font-medium">URL slug
              <input className={fieldClass} name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={product.slug || ""} />
            </label>
            <label className="text-sm font-medium">Short description
              <textarea className={areaClass} name="shortDescription" rows={3} defaultValue={product.short_description || ""} />
            </label>
            <label className="text-sm font-medium">Full description
              <textarea className={`${areaClass} min-h-40`} name="description" rows={6} defaultValue={product.description || ""} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Brand
                <input className={fieldClass} name="brand" defaultValue={product.brand || ""} />
              </label>
              <label className="text-sm font-medium">Category
                <select className={fieldClass} name="categoryId" defaultValue={product.categoryId || ""}>
                  <option value="">Uncategorized</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium">Dimensions
                <input className={fieldClass} name="dimensions" defaultValue={product.specs?.dimensions || ""} />
              </label>
              <label className="text-sm font-medium">Material
                <input className={fieldClass} name="material" defaultValue={product.specs?.material || ""} />
              </label>
            </div>
            <label className="text-sm font-medium">Craft details <span className="font-normal text-[#758078]">(one per line)</span>
              <textarea className={areaClass} name="details" rows={5} defaultValue={(product.specs?.details || []).join("\n")} />
            </label>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="space-y-5 rounded-md border border-[#dce1d9] bg-white p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#647168]">Listing</h2>
            <label className="text-sm font-medium">Status
              <select className={fieldClass} name="status" defaultValue={product.status || "draft"}>
                <option value="draft">Draft</option>
                <option value="pending">Pending review</option>
                <option value="private">Private</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="text-sm font-medium">Price (KES)
              <input className={fieldClass} name="price" type="number" min="0" step="0.01" required defaultValue={product.price ?? ""} />
            </label>
            <label className="text-sm font-medium">Public image URL
              <input className={fieldClass} name="imageUrl" type="url" placeholder="https://.../product-images/..." defaultValue={product.imageUrl || ""} />
            </label>
            <label className="text-sm font-medium">Or upload an image
              <input className="mt-2 block w-full text-sm text-[#66716a] file:mr-3 file:rounded-sm file:border-0 file:bg-[#e8ede7] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#315d41] hover:file:bg-[#dce6dd]" name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" />
              <span className="mt-1 block text-xs font-normal text-[#7b857e]">JPEG, PNG, WebP, or AVIF. Maximum 5 MB.</span>
            </label>
            <label className="flex items-center gap-3 border-t border-[#e7eae4] pt-4 text-sm">
              <input className="h-4 w-4 accent-[#234534]" type="checkbox" name="isFeatured" defaultChecked={Boolean(product.is_featured)} />
              Featured on the storefront
            </label>
          </section>

          {product.id && (
            <section className="rounded-md border border-[#dce1d9] bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#647168]">Product ID</p>
              <p className="mt-2 break-all font-mono text-xs text-[#66716a]">{product.id}</p>
            </section>
          )}
        </aside>
      </div>
    </form>
  );
}