"use client";

import { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import reviewsData from "@/data/reviews.json";

/**
 * Reviews Slider:
 * Client component, prev/next buttons, "01 / 03" counter,
 * keyboard accessible, no external slider library.
 */
export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const reviews = reviewsData;
  const current = reviews[currentIndex];

  const handleNext = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setFading(false);
    }, 150);
  };

  const handlePrev = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setFading(false);
    }, 150);
  };

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full py-16 md:py-24" id="reviews">
      <Container>
        <div className="w-full rounded-2xl bg-sand p-8 sm:p-14 lg:p-16 flex flex-col justify-between gap-10">
          {/* Review Header & Aggregate Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>CLIENT TESTIMONIALS</Eyebrow>
            <div className="flex items-center gap-2">
              <div className="flex text-oak">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-oak text-oak" />
                ))}
              </div>
              <span className="font-sans text-small text-ink font-medium">
                4.9 out of 5 from 142 clients
              </span>
            </div>
          </div>

          {/* Quote Content Container */}
          <div className="max-w-4xl flex flex-col gap-6 min-h-[140px]">
            <blockquote
              className={`font-serif text-2xl sm:text-3xl lg:text-4xl text-ink leading-snug transition-opacity duration-200 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div
              className={`flex flex-col gap-0.5 transition-opacity duration-200 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="font-serif text-title text-ink">
                {current.author}
              </span>
              <span className="font-sans text-small text-ink/60">
                {current.piece}
              </span>
            </div>
          </div>

          {/* Controls & Slider Counter */}
          <div className="flex items-center justify-between pt-4 border-t border-ink/10">
            <span className="font-sans text-small font-medium text-ink tracking-widest">
              0{currentIndex + 1} / 0{reviews.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink hover:bg-ink hover:text-cream transition-colors shadow-sm focus-visible:outline-oak"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink hover:bg-ink hover:text-cream transition-colors shadow-sm focus-visible:outline-oak"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
