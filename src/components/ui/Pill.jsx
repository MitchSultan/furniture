import { cn } from "@/lib/utils";

/**
 * Filter / tag pill button.
 */
export default function Pill({
  children,
  active = false,
  onClick,
  className = "",
  as = "button",
  ...props
}) {
  const Component = as;
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-5 py-2 font-sans text-small transition-all duration-200 select-none",
        active
          ? "bg-ink text-cream shadow-sm"
          : "bg-sand text-ink hover:bg-ink/10",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
