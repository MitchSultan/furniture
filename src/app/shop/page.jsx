import { Suspense } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import FilterBar from "@/components/product/FilterBar";
import { getAllProducts, getByCategory } from "@/lib/products";

export const metadata = {
  title: "Shop All Pieces",
  description:
    "Explore our complete catalog of small-batch solid hardwood furniture and hand-silvered mirrors.",
};

export default async function ShopPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || "all";
  const products = await getByCategory(category);

  return (
    <div className="w-full pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink/10">
            <SectionHeading
              eyebrow="ATELIER CATALOG"
              title="Shop the Editions"
              subtitle="Solid kiln-dried hardwoods, organic oil finishes, and hand-silvered reed mirrors. Each commission is built to order in Karen, Nairobi."
            />

            {/* Suspense wrapper for client-side search params reading */}
            <Suspense fallback={<div className="h-10 w-48 bg-sand rounded-full animate-pulse" />}>
              <FilterBar activeCategory={category} />
            </Suspense>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} />
        </div>
      </Container>
    </div>
  );
}
