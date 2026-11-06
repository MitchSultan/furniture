"use client";

import { useState } from "react";
import { Check, ShieldCheck, Truck, Clock } from "lucide-react";
import Price from "./Price";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { useCart } from "@/components/cart/CartProvider";

/**
 * Product detail specifications, purchase action, and atelier notes.
 */
export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Eyebrow & Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Eyebrow>
            {product.category} · Karen Atelier Batch
          </Eyebrow>
          {product.isNew && (
            <span className="rounded-full bg-sand px-3 py-1 font-sans text-eyebrow text-ink font-medium">
              Autumn Release
            </span>
          )}
        </div>
        <h1 className="font-serif text-h2 text-ink font-normal tracking-tight">
          {product.name}
        </h1>
        {product.dimensions && (
          <p className="font-sans text-body text-ink/60">
            {product.dimensions}
          </p>
        )}
      </div>

      {/* Pricing display */}
      <div className="py-2 border-y border-ink/10 flex items-baseline justify-between">
        <Price price={product.price} priceUSD={product.priceUSD} size="lg" />
        <span className="font-sans text-small text-oak font-medium">
          Handcrafted to order
        </span>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4 font-sans text-body text-ink/80 leading-relaxed">
        <p>{product.description}</p>
        {product.material && (
          <p className="font-medium text-ink">
            Material: <span className="font-normal text-ink/80">{product.material}</span>
          </p>
        )}
      </div>

      {/* Add to cart section */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        {/* Quantity selector */}
        <div className="flex items-center justify-between rounded-full border border-ink/20 px-4 py-3 bg-white min-w-[120px]">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-ink/60 hover:text-ink text-body font-medium px-2"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="font-sans font-medium text-ink">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="text-ink/60 hover:text-ink text-body font-medium px-2"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add button */}
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1"
          variant={added ? "accent" : "primary"}
        >
          {added ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" /> Added to Commission
            </span>
          ) : (
            `Acquire Piece · ${quantity}`
          )}
        </Button>
      </div>

      {/* Craft Details List */}
      {product.details?.length > 0 && (
        <div className="rounded-2xl bg-sand/60 p-6 flex flex-col gap-3">
          <h3 className="font-serif text-title text-ink font-normal">
            Atelier Specifications
          </h3>
          <ul className="flex flex-col gap-2 font-sans text-small text-ink/75 divide-y divide-ink/5">
            {product.details.map((detail, idx) => (
              <li key={idx} className="pt-2 first:pt-0 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-oak mt-1.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-ink/70">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-oak flex-shrink-0" />
          <span className="font-sans text-small">25-Year Joint Warranty</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Truck className="h-5 w-5 text-oak flex-shrink-0" />
          <span className="font-sans text-small">Free Nairobi Delivery</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="h-5 w-5 text-oak flex-shrink-0" />
          <span className="font-sans text-small">8-Week Craft Cadence</span>
        </div>
      </div>
    </div>
  );
}
