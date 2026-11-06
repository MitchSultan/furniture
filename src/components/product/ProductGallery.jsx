"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial product gallery:
 * Main 4:5 image, thumbnail rail, and fullscreen accessible lightbox modal.
 */
export default function ProductGallery({ images = [], title = "Product" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main hero image */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-sand shadow-sm group">
        <Image
          src={currentImage}
          alt={`${title} - view ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          preload={true}
        />

        {/* Lightbox trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Enlarge image"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/80 backdrop-blur-md text-ink hover:bg-cream transition-colors shadow-sm"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Prev / Next overlay arrows if multiple */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-cream/70 backdrop-blur-md text-ink hover:bg-cream transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-cream/70 backdrop-blur-md text-ink hover:bg-cream transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail rail */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Select image ${idx + 1}`}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-sand transition-all duration-200 border-2",
                selectedIndex === idx
                  ? "border-oak shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close modal"
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <Image
              src={currentImage}
              alt={`${title} enlarged`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-small text-cream/70">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
