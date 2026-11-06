"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Pill from "@/components/ui/Pill";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "living", label: "Living" },
  { id: "dining", label: "Dining" },
  { id: "study", label: "Study" },
];

/**
 * Autumn Editions section with fast client-side filter pills
 * and no page reload.
 */
export default function NewThisSeason({ products = [] }) {
  const [filter, setFilter] = useState("all");

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="w-full py-16 md:py-24" id="autumn-editions">
      <Container>
        <div className="flex flex-col gap-10">
          {/* Section Header & Interactive Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Eyebrow>NEW THIS SEASON</Eyebrow>
              <h2 className="font-serif text-h2 text-ink">
                Autumn Editions
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <Pill
                  key={cat.id}
                  active={filter === cat.id}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </Pill>
              ))}
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>

          {/* Centered Shop All Pill Button */}
          <div className="flex justify-center pt-6">
            <Button href="/shop" size="lg">
              <span>Shop all 26 pieces</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
