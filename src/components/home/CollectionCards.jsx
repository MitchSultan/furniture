import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import collectionsData from "@/data/collections.json";

/**
 * Curated Collections / Spaces of Intention:
 * 3 cards for Living, Study, and Gather with 4:3 images.
 */
export default function CollectionCards() {
  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Eyebrow>Spaces of Intention</Eyebrow>
              <h2 className="font-serif text-h2 text-ink">
                Curated Collections
              </h2>
            </div>
            <p className="font-sans text-small text-ink/70 max-w-md">
              Three permanent realms of our studio practice, each shaped for specific domestic rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collectionsData.map((col) => (
              <div
                key={col.id}
                className="group rounded-2xl bg-sand p-6 flex flex-col justify-between gap-8 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-sand">
                    <Image
                      src={col.image}
                      alt={col.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cream/90 backdrop-blur-md font-sans text-eyebrow text-ink font-medium">
                      {col.count}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-title md:text-2xl text-ink group-hover:text-oak transition-colors">
                      {col.title}
                    </h3>
                    <p className="font-sans text-body text-ink/70">
                      {col.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={col.href}
                    className="inline-flex items-center gap-1.5 font-sans text-small font-medium text-ink group-hover:text-oak transition-colors"
                  >
                    Explore collection <ArrowRight className="h-4 w-4" />
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
