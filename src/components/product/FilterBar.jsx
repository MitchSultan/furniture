"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pill from "@/components/ui/Pill";

const CATEGORIES = [
  { id: "all", label: "All Pieces" },
  { id: "living", label: "Living" },
  { id: "dining", label: "Dining" },
  { id: "study", label: "Study" },
];

/**
 * Filter bar with interactive pills.
 * Updates URL searchParams for shareable filtered state.
 */
export default function FilterBar({ activeCategory = "all" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist">
      {CATEGORIES.map((cat) => {
        const isActive =
          activeCategory === cat.id ||
          (!activeCategory && cat.id === "all");
        return (
          <Pill
            key={cat.id}
            active={isActive}
            onClick={() => handleSelect(cat.id)}
            role="tab"
            aria-selected={isActive}
          >
            {cat.label}
          </Pill>
        );
      })}
    </div>
  );
}
