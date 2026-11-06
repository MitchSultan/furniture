import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Brand Statement / The Atelier Ethos:
 * "Made from solid sustainably harvested hardwood, by a few people, to be kept for good."
 * With small batch metric block.
 */
export default function BrandStatement() {
  return (
    <section className="w-full py-16 md:py-24" id="craft-story">
      <Container>
        <div className="rounded-2xl bg-sand p-8 sm:p-14 lg:p-20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Eyebrow>The Atelier Ethos — Nairobi</Eyebrow>
              <p className="font-serif text-h2 md:text-display-sm text-ink leading-tight">
                &ldquo;Made from solid sustainably harvested hardwood, by a few people, to be kept for good.&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <p className="font-sans text-body text-ink/75 leading-relaxed">
                  We reject the haste of modern flat-pack production. In our Karen workshop, wood is allowed to rest and acclimate before being shaped with handheld planes and traditional Japanese saws. Each joint is engineered to expand and contract with the changing seasons without losing structural cohesion.
                </p>
                <p className="font-sans text-body text-ink/75 leading-relaxed">
                  Finished with organic linseed oils, local beeswax, and natural citrus solvents, our surfaces remain breathable, velvet to the touch, and endlessly repairable. Furniture that doesn&rsquo;t shout for attention, but rather settles quietly into the cadence of a home.
                </p>
              </div>
            </div>

            {/* Metric Accent Pill Block */}
            <div className="lg:col-span-4 flex flex-col gap-4 bg-cream/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-oak">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-title text-ink font-normal">
                  Small Batch Atelier
                </h3>
              </div>
              <p className="font-sans text-small text-ink/70 leading-relaxed">
                Maximum 18 finished commissions per calendar month. Each piece is hand-stamped with the timber harvest provenance, wood moisture index, and artisan initials.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <div className="flex justify-between font-sans text-small">
                  <span className="text-ink/60">Annual Timber Seasoning</span>
                  <span className="font-semibold text-ink">18 Months Avg.</span>
                </div>
                <div className="w-full bg-ink/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-oak h-full rounded-full w-3/4" />
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="#materials"
                  className="font-sans text-small font-medium text-oak hover:text-ink transition-colors flex items-center gap-1.5"
                >
                  Read our material standards <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
