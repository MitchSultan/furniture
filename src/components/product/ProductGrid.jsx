import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

/**
 * Responsive product grid (1 col mobile, 2 sm, 4 lg).
 */
export default function ProductGrid({
  products = [],
  className = "",
  emptyMessage = "No pieces found in this category.",
}) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-title text-ink/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
        className
      )}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.slug} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
