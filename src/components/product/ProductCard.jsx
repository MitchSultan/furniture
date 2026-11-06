import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Price from "./Price";
import { cn } from "@/lib/utils";

/**
 * Editorial product card:
 * 4:5 aspect ratio, hover swaps to second image, optional "New" badge,
 * name, dimensions, price. Whole card is a Link.
 */
export default function ProductCard({ product, priority = false }) {
  const primaryImage = product.images?.[0] || "/images/placeholder.jpg";
  const hoverImage = product.images?.[1] || primaryImage;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oak rounded-2xl p-1 -m-1 transition-all"
    >
      {/* 4:5 Image Container with hover swap */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-sand shadow-sm">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            product.images?.[1]
              ? "group-hover:opacity-0 group-hover:scale-105"
              : "group-hover:scale-105"
          )}
          preload={priority}
        />

        {/* Second Image on Hover (if available) */}
        {product.images?.[1] && (
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <Badge variant="dark">New</Badge>}
        </div>

        {product.indexNumber && (
          <span className="absolute bottom-3 right-3 rounded-full bg-cream/90 backdrop-blur-md px-2.5 py-0.5 font-sans text-eyebrow text-ink/70 font-medium">
            No. {product.indexNumber}
          </span>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-title text-ink group-hover:text-oak transition-colors line-clamp-1">
          {product.name}
        </h3>
        {product.dimensions && (
          <p className="font-sans text-small text-ink/60 line-clamp-1">
            {product.dimensions}
          </p>
        )}
        <Price
          price={product.price}
          priceUSD={product.priceUSD}
          size="sm"
          className="pt-0.5"
        />
      </div>
    </Link>
  );
}
