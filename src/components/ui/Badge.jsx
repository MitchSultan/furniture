import { cn } from "@/lib/utils";

/**
 * Subtle pill badge for product cards and indices.
 */
export default function Badge({
  children,
  variant = "dark",
  className = "",
}) {
  const variants = {
    dark: "bg-ink text-cream",
    sand: "bg-sand text-ink",
    white: "bg-white/90 backdrop-blur-md text-ink",
    oak: "bg-oak text-white",
    outline: "border border-ink/20 text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full font-sans text-eyebrow font-medium select-none",
        variants[variant] || variants.dark,
        className
      )}
    >
      {children}
    </span>
  );
}
