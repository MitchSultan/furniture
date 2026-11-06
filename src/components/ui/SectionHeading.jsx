import Eyebrow from "./Eyebrow";
import { cn } from "@/lib/utils";

/**
 * Editorial section heading with optional eyebrow and subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
  titleClassName = "",
}) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-2 max-w-2xl", alignmentClasses[align], className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className={cn("font-serif text-h2 text-ink font-normal tracking-tight", titleClassName)}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="font-sans text-body text-ink/70 max-w-xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
