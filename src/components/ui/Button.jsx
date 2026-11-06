import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Pill-shaped button following design specs.
 * Supports `href` (renders Next Link) or standard button element.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oak select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-ink text-cream hover:bg-oak hover:text-white shadow-sm active:scale-[0.99]",
    secondary:
      "bg-sand text-ink hover:bg-ink hover:text-cream active:scale-[0.99]",
    outline:
      "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream active:scale-[0.99]",
    glass:
      "bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 active:scale-[0.99]",
    accent:
      "bg-oak text-white hover:bg-ink active:scale-[0.99]",
    ghost:
      "text-ink hover:text-oak hover:bg-sand/50",
  };

  const sizes = {
    sm: "text-small px-4 py-2 gap-1.5",
    md: "text-small md:text-body px-6 py-3 gap-2",
    lg: "text-body px-8 py-4 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
