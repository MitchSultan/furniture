import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import materialsData from "@/data/materials.json";

/**
 * Materials Section: Five materials. Nothing else.
 * 5-row index with hairline dividers.
 */
export default function MaterialsList() {
  return (
    <section className="w-full py-16 md:py-24" id="materials">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="max-w-2xl flex flex-col gap-3">
            <Eyebrow>Uncompromised Truth</Eyebrow>
            <h2 className="font-serif text-h2 text-ink">
              Five materials. Nothing else.
            </h2>
            <p className="font-sans text-body-lg text-ink/75">
              We use zero composite substrates, synthetic foams, or chemical curing agents. Every element originates from the earth and returns to it without residue.
            </p>
          </div>

          {/* 5-Row Material Index with Hairline Dividers */}
          <div className="flex flex-col bg-sand rounded-2xl overflow-hidden divide-y divide-ink/10">
            {materialsData.map((item) => (
              <div
                key={item.index}
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-cream/60 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <span className="font-serif text-2xl text-oak w-8">
                    {item.index}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-title md:text-2xl text-ink">
                      {item.name}
                    </h3>
                    <p className="font-sans text-body text-ink/75 max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pl-12 lg:pl-0">
                  <Link
                    href={`/products/${item.referenceSlug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-small font-medium text-ink hover:text-oak transition-colors"
                  >
                    See it on {item.referenceProduct}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
