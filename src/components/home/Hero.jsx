import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { formatPrice } from "@/lib/format";

/**
 * Editorial Hero Section matching Figma design:
 * Rounded full-width image canvas, ambient warm gradient overlays,
 * prominent serif headline, and a floating spec index card listing 6 editions.
 */
export default function Hero({ indexProducts = [] }) {
  return (
    <section className="w-full pt-24 pb-16 md:pt-28 md:pb-24">
      <Container>
        <div className="relative w-full rounded-2xl overflow-hidden bg-sand min-h-[640px] lg:min-h-[760px] flex flex-col justify-between p-6 sm:p-10 lg:p-16 shadow-sm">
          {/* Background Image with Ambient Warm Overlay */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQK-Al__JESlHMIHx8WDnVzs6bgsnsesr2bn3qKgKFYRAU2JeIO7IHqOoX6cAbNLVybXzy1BGBiEq2UzAn2mo8-ErmZ4QkXP1tINWPQEAT-uwYF16WNl3388wW6Q6bzIM_0-be2V23QkwWo0AEKUIbEQZWMiY7iwwyrH07OgswEoFby-Tcx0BIYaFAuQuZv2p3UvCtp-hDpXao3IrbpYBq8mjJkalQmAPKkxkQt7Bm')",
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/15" />
          <div className="absolute inset-0 bg-ink/15 mix-blend-multiply" />

          {/* Top Tagline & Region Origin Marker */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-sans text-eyebrow tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-oak" />
              Handcrafted in Nairobi · Built to order
            </span>
            <span className="font-sans text-eyebrow text-white/80 hidden sm:inline-block">
              No. 08 — Autumn 2025 Release
            </span>
          </div>

          {/* Center & Bottom Layout Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-20 sm:pt-32">
            {/* Headline & Primary Action */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-white max-w-2xl">
              <Eyebrow color="white">zia glass &amp; mirror atelier</Eyebrow>
              <h1 className="font-serif text-display text-white tracking-tight leading-tight">
                Furniture that settles in.
              </h1>
              <p className="font-sans text-body-lg text-cream/90 max-w-xl font-normal leading-relaxed">
                Solid kiln-dried hardwoods, artisanal fluted mirrors, and unhurried hand-rubbed oil finishes. Handcrafted piece by piece in our Karen atelier, designed to anchor interiors for generations.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="#autumn-editions" variant="primary" size="lg">
                  Shop the collection
                </Button>
                <Button href="#craft-story" variant="glass" size="lg">
                  <span>Our Nairobi workshop</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Floating Glassmorphism Spec Index Card */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-white/95 backdrop-blur-xl p-6 sm:p-7 text-ink shadow-2xl flex flex-col gap-4 border border-white/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-sans text-eyebrow uppercase tracking-wider text-oak block">
                      Edition Index
                    </span>
                    <h3 className="font-serif text-title text-ink">
                      Autumn: 6 of 26 pieces
                    </h3>
                  </div>
                  <span className="font-sans text-eyebrow px-2.5 py-1 rounded-full bg-sand text-ink/75 font-medium">
                    Batch 04
                  </span>
                </div>

                {/* 6 numbered products */}
                <div className="flex flex-col divide-y divide-ink/10 text-small">
                  {indexProducts.slice(0, 6).map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/products/${item.slug}`}
                      className="py-2.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-sans text-eyebrow text-oak font-semibold">
                          0{index + 1}
                        </span>
                        <span className="font-medium text-ink group-hover:text-oak transition-colors">
                          {item.name}
                        </span>
                      </span>
                      <span className="font-sans text-small text-ink/60">
                        {formatPrice(item.price, "KES")}{" "}
                        <span className="text-ink/40">
                          / ${item.priceUSD || Math.round(item.price / 130)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-small border-t border-ink/5">
                  <Link
                    href="/shop"
                    className="font-sans text-small font-medium text-ink hover:text-oak transition-colors flex items-center gap-1"
                  >
                    Shop all pieces <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="font-sans text-eyebrow text-ink/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-oak" />
                    Free delivery within Nairobi county
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
