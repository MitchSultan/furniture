"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu } from "lucide-react";
import siteData from "@/data/site.json";
import { useCart } from "@/components/cart/CartProvider";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

/**
 * Sticky header: transparent over hero, turns cream with blur after 24px scroll.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300",
          scrolled
            ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_8px_rgba(42,37,33,0.04)] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex w-full max-w-container items-center justify-between px-5 md:px-10">
          {/* Logo Wordmark */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-serif text-title md:text-2xl text-ink tracking-tight lowercase hover:text-oak transition-colors"
            >
              {siteData.name.toLowerCase()}.
            </Link>
            <span className="hidden xl:inline-block font-sans text-eyebrow uppercase text-ink/50 pl-2 border-l border-ink/20">
              {siteData.tagline}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {siteData.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className={cn(
                    "font-sans text-small transition-colors tracking-wide",
                    isActive
                      ? "text-ink font-medium"
                      : "text-ink/75 hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-ink text-cream font-sans text-small px-6 py-2.5 hover:bg-oak hover:text-white transition-all duration-300 shadow-sm"
            >
              Contact
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-sand/80 hover:bg-sand text-ink transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-oak text-[11px] font-semibold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/80 hover:bg-sand text-ink transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
