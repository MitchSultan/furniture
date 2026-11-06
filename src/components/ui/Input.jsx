import { cn } from "@/lib/utils";

/**
 * Editorial input component with subtle borders and clear focus ring.
 */
export default function Input({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="font-sans text-small font-medium text-ink/80"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={cn(
          "w-full rounded-xl bg-white px-5 py-3.5 font-sans text-body text-ink placeholder:text-ink/40 border border-ink/10 transition-all duration-200 focus:border-oak focus:outline-none focus:ring-1 focus:ring-oak",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <span className="font-sans text-small text-red-600">{error}</span>
      )}
    </div>
  );
}
