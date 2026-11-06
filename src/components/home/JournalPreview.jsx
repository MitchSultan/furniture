import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import articlesData from "@/data/articles.json";

/**
 * Journal Preview / From the Bench: 3 articles with 4:3 images.
 */
export default function JournalPreview() {
  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Eyebrow>FROM THE BENCH</Eyebrow>
              <h2 className="font-serif text-h2 text-ink">
                Notes on slow craft
              </h2>
            </div>
            <Link
              href="/journal"
              className="font-sans text-small font-medium text-ink hover:text-oak transition-colors flex items-center gap-1"
            >
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articlesData.map((article) => (
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
                <div className="flex flex-col gap-1.5">
                  <span className="font-sans text-eyebrow uppercase tracking-wider text-ink/60">
                    {article.displayDate}
                  </span>
                  <Link href={`/journal/${article.slug}`}>
                    <h3 className="font-serif text-title md:text-2xl text-ink group-hover:text-oak transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="font-sans text-small text-ink/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
