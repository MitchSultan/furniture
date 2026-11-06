"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

/**
 * Editorial cart line item.
 */
export default function CartItem({ item }) {
  const { updateQuantity, removeItem, closeDrawer } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-ink/10 last:border-b-0">
      <Link
        href={`/products/${item.slug}`}
        onClick={closeDrawer}
        className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sand"
      >
        <Image
          src={item.images?.[0] || item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col">
          <Link
            href={`/products/${item.slug}`}
            onClick={closeDrawer}
            className="font-serif text-title text-ink hover:text-oak transition-colors line-clamp-1"
          >
            {item.name}
          </Link>
          <span className="font-sans text-small text-ink/60 line-clamp-1">
            {item.dimensions || item.material}
          </span>
          <span className="font-sans text-small font-medium text-ink mt-0.5">
            {formatPrice(item.price, "KES")}{" "}
            <span className="text-ink/40 font-normal">
              / ${item.priceUSD || Math.round(item.price / 130)}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity stepper */}
          <div className="flex items-center rounded-full border border-ink/20 px-2 py-0.5 bg-white">
            <button
              type="button"
              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-1 text-ink/70 hover:text-ink transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="font-sans text-small font-medium px-2 min-w-[20px] text-center text-ink">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
              aria-label="Increase quantity"
              className="p-1 text-ink/70 hover:text-ink transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.slug)}
            aria-label={`Remove ${item.name}`}
            className="text-ink/40 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
