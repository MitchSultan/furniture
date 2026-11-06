import { cn } from "@/lib/utils";

/**
 * Centered responsive page container with max-w-[1360px] and px-5 md:px-10.
 */
export default function Container({
  children,
  className = "",
  as = "div",
  ...props
}) {
  const Component = as;
  return (
    <Component
      className={cn("mx-auto w-full max-w-container px-5 md:px-10", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
