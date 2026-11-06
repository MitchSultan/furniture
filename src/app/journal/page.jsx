import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Journal & Workshop Notes",
  description:
    "Dispatches on timber moisture equilibrium, handcrafted joinery, and glass-silvering in Nairobi.",
};

export default async function JournalPage() {
  const articles = await getAllArticles();

  return (
    <div className="w-full pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <div className="flex flex-col gap-12">
          {/* Header */}
          <SectionHeading
            eyebrow="FROM THE BENCH"
            title="The Workshop Journal"
            subtitle="Essays on slow craft, material honesty, and observations from our Karen atelier and Industrial Area silvering laboratory."
          />

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.slug} className="group flex flex-col gap-4">
                <Link
                  href={`/journal/${article.slug}`}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-sand shadow-sm block"
                >
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-eyebrow uppercase tracking-wider text-ink/60">
                    {article.displayDate}
                  </span>
                  <Link href={`/journal/${article.slug}`}>
                    <h2 className="font-serif text-2xl text-ink group-hover:text-oak transition-colors">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="font-sans text-body text-ink/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 font-sans text-small font-medium text-oak group-hover:text-ink transition-colors">
                      Read essay <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
