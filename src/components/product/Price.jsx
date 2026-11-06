import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Editorial price display showing primary KES and secondary USD.
 */
export default function Price({
  price,
  priceUSD,
  className = "",
  size = "md",
}) {
  const usd = priceUSD || Math.round(price / 130);

  const sizeClasses = {
    sm: "text-small",
    md: "text-body font-medium",
    lg: "text-title md:text-2xl font-normal font-serif",
  };

  return (
    <div className={cn("flex items-baseline gap-1.5 text-ink", sizeClasses[size], className)}>
      <span>{formatPrice(price, "KES")}</span>
      <span className="text-ink/40 font-normal font-sans text-small">
        / {formatPrice(usd, "USD")}
      </span>
    </div>
  );
}
