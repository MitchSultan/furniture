"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotalKES,
    subtotalUSD,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    // TODO: Wire up chosen payment gateway:
    // Option 1: M-Pesa Daraja STK Push API
    // Option 2: Stripe Checkout Session (stripe.checkout.sessions.create)
    // Option 3: Flutterwave Standard Payment
    alert(
      "TODO: Connect your payment gateway (M-Pesa STK Push / Stripe Checkout / Flutterwave).\n\nSubtotal: " +
        formatPrice(subtotalKES, "KES") +
        ` ($${subtotalUSD})`
    );
  };

  if (items.length === 0) {
    return (
      <div className="w-full pt-36 pb-32 text-center">
        <Container>
          <div className="max-w-md mx-auto flex flex-col items-center gap-4 py-16">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand text-ink/40 mb-2">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h1 className="font-serif text-h2 text-ink">
              Your commission is empty
            </h1>
            <p className="font-sans text-body text-ink/70">
              No pieces are currently reserved. Explore our small-batch collection of solid timber furniture.
            </p>
            <div className="pt-4">
              <Button href="/shop" size="lg">
                Explore All Pieces
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-ink/10">
            <SectionHeading
              eyebrow="RESERVED EDITIONS"
              title="Your Commission"
              subtitle="Every piece is hand-planed and individually numbered in our Karen workshop."
            />
            <button
              type="button"
              onClick={clearCart}
              className="text-small font-sans text-ink/50 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* 2-Column layout: Items Table & Checkout Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items Column */}
            <div className="lg:col-span-8 flex flex-col divide-y divide-ink/10">
              {items.map((item) => (
                <div key={item.slug} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  {/* Left: Image & Info */}
                  <div className="flex items-center gap-5">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative h-28 w-24 rounded-2xl overflow-hidden bg-sand flex-shrink-0"
                    >
                      <Image
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-serif text-title md:text-2xl text-ink hover:text-oak transition-colors"
                      >
                        {item.name}
                      </Link>
                      <span className="font-sans text-small text-ink/60">
                        {item.dimensions || item.material}
                      </span>
                      <span className="font-serif text-title text-ink font-normal mt-1">
                        {formatPrice(item.price, "KES")}{" "}
                        <span className="font-sans text-small text-ink/40">
                          / ${item.priceUSD || Math.round(item.price / 130)}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper & Delete */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="flex items-center rounded-full border border-ink/20 px-3 py-1 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity - 1)
                        }
                        className="p-1 text-ink/60 hover:text-ink text-body"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-sans text-small font-medium px-3 text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity + 1)
                        }
                        className="p-1 text-ink/60 hover:text-ink text-body"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      className="text-ink/40 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-sans text-small font-medium text-ink hover:text-oak transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue exploring other pieces
                </Link>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 rounded-2xl bg-sand p-8 flex flex-col gap-6 border border-ink/5">
              <h2 className="font-serif text-title text-ink">
                Commission Summary
              </h2>

              <div className="flex flex-col gap-3 font-sans text-small border-b border-ink/10 pb-6">
                <div className="flex justify-between">
                  <span className="text-ink/70">Selected pieces</span>
                  <span className="font-medium text-ink">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/70">Subtotal</span>
                  <span className="font-semibold text-ink">
                    {formatPrice(subtotalKES, "KES")}
                  </span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>USD equivalent</span>
                  <span>${subtotalUSD}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/70">White-glove placement</span>
                  <span className="text-oak font-medium">Complimentary (Nairobi)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-title text-ink">Total</span>
                  <span className="font-serif text-2xl text-ink">
                    {formatPrice(subtotalKES, "KES")}
                  </span>
                </div>
                <span className="font-sans text-eyebrow text-ink/50 text-right">
                  Approx. ${subtotalUSD} USD
                </span>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full">
                Proceed with Acquisition
              </Button>

              <div className="flex items-center gap-2 text-ink/60 font-sans text-[12px] pt-2">
                <ShieldCheck className="h-4 w-4 text-oak flex-shrink-0" />
                <span>25-year structural joint guarantee included with every piece.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
