"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import siteData from "@/data/site.json";
import Button from "@/components/ui/Button";

/**
 * Fullscreen mobile navigation overlay with focus trapping and keyboard access.
 */
export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-cream/95 backdrop-blur-xl transition-all duration-300 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      ref={menuRef}
    >
      {/* Top Bar */}
      <div className="flex h-20 items-center justify-between px-5 border-b border-ink/10">
        <Link
          href="/"
          onClick={onClose}
          className="font-serif text-title text-ink lowercase tracking-tight"
        >
          {siteData.name.toLowerCase()}.
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-full p-2 text-ink hover:bg-sand transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col justify-center px-8 py-10 gap-6">
        {siteData.nav.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            onClick={onClose}
            className="flex items-center justify-between font-serif text-3xl text-ink hover:text-oak transition-colors py-2 border-b border-ink/5"
          >
            <span>{item.label}</span>
            <ArrowRight className="h-5 w-5 text-ink/30" />
          </Link>
        ))}
        <div className="pt-6 flex flex-col gap-3">
          <Button href="/contact" onClick={onClose} size="lg" className="w-full">
            Inquire / Showroom Visit
          </Button>
        </div>
      </nav>

      {/* Bottom info */}
      <div className="border-t border-ink/10 p-6 bg-sand/40">
        <p className="font-sans text-small text-ink/70">
          Atelier Karen, Nairobi · Showroom SoHo, New York
        </p>
        <p className="font-sans text-eyebrow text-oak uppercase tracking-wider mt-1">
          {siteData.tagline}
        </p>
      </div>
    </div>
  );
}
