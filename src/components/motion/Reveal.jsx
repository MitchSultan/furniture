"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Editorial scroll reveal component using GSAP ScrollTrigger.
 * Fade-up 0.6s, ease power2.out, once only.
 * Respects user's prefers-reduced-motion setting.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  duration = 0.6,
  as = "div",
}) {
  const ref = useRef(null);
  const Component = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, y]);

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
