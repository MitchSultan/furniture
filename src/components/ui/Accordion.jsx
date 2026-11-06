"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion item with smooth toggle.
 */
export default function Accordion({ items = [], className = "" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={cn("divide-y divide-ink/10 rounded-2xl bg-sand", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="px-6 py-4">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-2 text-left font-serif text-title text-ink hover:text-oak transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-ink/60 transition-transform duration-300",
                  isOpen && "rotate-180 text-oak"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out font-sans text-body text-ink/70",
                isOpen ? "max-h-96 pt-2 pb-3 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
