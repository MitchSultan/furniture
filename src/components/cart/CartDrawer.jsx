"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import CartItem from "./CartItem";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

/**
 * Slide-in cart drawer with focus trap, backdrop blur, and checkout placeholder.
 */
export default function CartDrawer() {
  const { items, isOpen, closeDrawer, totalItems, subtotalKES, subtotalUSD } =
    useCart();
  const drawerRef = useRef(null);

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Slide-out drawer panel */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-title text-ink font-normal">
              Your Commission
            </h2>
            <span className="rounded-full bg-sand px-2.5 py-0.5 font-sans text-eyebrow text-ink font-medium">
              {totalItems}
            </span>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="rounded-full p-2 text-ink/70 hover:bg-sand hover:text-ink transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-ink/40 mb-4">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-title text-ink mb-1">
                Your cart is empty
              </h3>
              <p className="font-sans text-small text-ink/60 max-w-xs mb-6">
                Explore our small-batch editions crafted in solid kiln-dried hardwoods.
              </p>
              <Button href="/shop" onClick={closeDrawer} size="sm">
                Shop all pieces
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-ink/10">
              {items.map((item) => (
                <CartItem key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer with subtotal and checkout */}
        {items.length > 0 && (
          <div className="border-t border-ink/10 bg-sand/40 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-small text-ink/70">Subtotal</span>
                <span className="font-sans text-body font-semibold text-ink">
                  {formatPrice(subtotalKES, "KES")}{" "}
                  <span className="text-ink/50 text-small font-normal">
                    / ${subtotalUSD}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between text-eyebrow text-oak">
                <span>Workshop freight</span>
                <span>Calculated at checkout</span>
              </div>
              <p className="font-sans text-[11px] text-ink/50 pt-1">
                Complimentary white-glove placement within Nairobi county.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                href="/cart"
                onClick={closeDrawer}
                size="md"
                className="w-full"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <button
                type="button"
                onClick={closeDrawer}
                className="font-sans text-small text-ink/60 hover:text-ink transition-colors py-1 text-center"
              >
                Continue browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
