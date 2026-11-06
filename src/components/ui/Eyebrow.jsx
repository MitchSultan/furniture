import { cn } from "@/lib/utils";

/**
 * Eyebrow / kicker label: 12px uppercase tracking-[0.18em].
 */
export default function Eyebrow({
  children,
  className = "",
  color = "oak",
}) {
  const colorClasses = {
    oak: "text-oak",
    ink: "text-ink/80",
    dim: "text-ink/60",
    white: "text-white/80",
  };

  return (
    <span
      className={cn(
        "block font-sans text-eyebrow uppercase tracking-[0.18em] font-medium",
        colorClasses[color] || colorClasses.oak,
        className
      )}
    >
      {children}
    </span>
  );
}
