import Link from "next/link";
import { ArrowUpRight, LogOut, Package, Store } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";
import siteData from "@/data/site.json";

export default function AdminShell({ children, profile }) {
  const staffName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.email;

  return (
    <div className="min-h-screen bg-[#f2f3ed] text-[#202923] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-[#1d3028] text-[#f4f1e8] lg:min-h-screen">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 lg:block lg:px-7 lg:py-7">
          <div>
            <Link href="/admin/products" className="font-serif text-xl lowercase">
              {siteData.name.toLowerCase()}.
            </Link>
            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#afc0b2]">Studio admin</p>
          </div>
          <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md text-[#d1d9d1] hover:bg-white/10 lg:hidden" aria-label="Visit store">
            <Store className="h-4 w-4" />
          </Link>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-3 lg:flex-1 lg:flex-col lg:px-4 lg:py-7" aria-label="Admin navigation">
          <Link href="/admin/products" className="inline-flex h-10 shrink-0 items-center gap-3 rounded-md bg-white/10 px-3 text-sm text-white lg:w-full">
            <Package className="h-4 w-4" /> Products
          </Link>
          <Link href="/" className="hidden h-10 items-center gap-3 rounded-md px-3 text-sm text-[#c8d2c9] transition hover:bg-white/10 hover:text-white lg:flex">
            <ArrowUpRight className="h-4 w-4" /> View storefront
          </Link>
        </nav>

        <div className="hidden border-t border-white/10 p-4 lg:block">
          <p className="truncate px-2 text-xs text-[#b6c4b8]">{staffName}</p>
          <form action={signOutAction}>
            <button type="submit" className="mt-3 inline-flex h-10 w-full items-center gap-3 rounded-md px-2 text-sm text-[#e2e8e1] transition hover:bg-white/10">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
        <form action={signOutAction} className="px-4 pb-3 lg:hidden">
          <button type="submit" className="inline-flex h-9 items-center gap-2 rounded-md px-2 text-xs text-[#e2e8e1] hover:bg-white/10">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </aside>

      <div className="min-w-0 px-4 py-7 sm:px-7 lg:px-10 lg:py-10 xl:px-14">
        <div className="mx-auto w-full max-w-[1320px]">{children}</div>
      </div>
    </div>
  );
}