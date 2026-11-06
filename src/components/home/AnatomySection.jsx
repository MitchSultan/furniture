import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

/**
 * Anatomy of a Piece / Atelier Case Study: The Karura Fluted Credenza.
 * Tall rounded photo left, 3 detailed breakdown cards right.
 */
export default function AnatomySection() {
  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Tall Rounded Photo */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-sand shadow-md">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9GtT1FZrMaMULa1IHM6TTvORNtmB4_BYTjZONHK9jcq7AuIKDQWUUqwUdysb-Lk-uaOuRC8PPjRTx1OHZPWKknWDaDwzOUQg3gKKVcvkA1jAuDpqlpbFY_WJ7pypVHa85eEZ9m6EsXT2M7z-ZhIAZlMYb8goc7LQNlr9LB79IHdI1dPQveEuV_PveNRJDMliLH8_RvoLnguhvyPUadZXiWE-M78W_cFF8qG690qgm"
                alt="Karura Fluted Credenza in natural honey oak with reed fluted glass center doors"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-cream/90 backdrop-blur-md flex items-center justify-between border border-white/50">
                <span className="font-serif text-title text-ink">
                  The Karura Fluted Credenza
                </span>
                <span className="font-sans text-eyebrow text-oak font-semibold">
                  Karen Workshop Batch No. 12
                </span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Breakdowns */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Eyebrow>Atelier Case Study</Eyebrow>
              <h2 className="font-serif text-h2 text-ink">
                The Karura, up close.
              </h2>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <span className="font-serif text-2xl text-ink">
                  {formatPrice(165000, "KES")}{" "}
                  <span className="font-sans text-body text-ink/60">
                    / $1,270
                  </span>
                </span>
                <Button href="/products/karura-fluted-credenza" size="sm">
                  <span>View piece</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Detail 01 */}
              <div className="p-6 rounded-2xl bg-sand flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-oak">01</span>
                  <h3 className="font-serif text-title text-ink">
                    The corner
                  </h3>
                </div>
                <p className="font-sans text-body text-ink/75 pl-8 leading-relaxed">
                  Finger-jointed solid oak corners hand-planed to flush perfection without mechanical fasteners. Each joint is pinned with contrasting olivewood dowels for thermal longevity.
                </p>
              </div>

              {/* Detail 02 */}
              <div className="p-6 rounded-2xl bg-sand flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-oak">02</span>
                  <h3 className="font-serif text-title text-ink">
                    The detail
                  </h3>
                </div>
                <p className="font-sans text-body text-ink/75 pl-8 leading-relaxed">
                  Custom fluted cast-bronze hardware paired with hand-silvered reed glass paneling. The glass softens interior shadows while diffusing stored objects into warm textural silhouettes.
                </p>
              </div>

              {/* Detail 03 */}
              <div className="p-6 rounded-2xl bg-sand flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-oak">03</span>
                  <h3 className="font-serif text-title text-ink">
                    The foot
                  </h3>
                </div>
                <p className="font-sans text-body text-ink/75 pl-8 leading-relaxed">
                  Recessed plinth base carved from a single baobab timber offcut, grounded with natural wool pads. The shadow-gap creates an illusion of deliberate, anchored weightlessness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
