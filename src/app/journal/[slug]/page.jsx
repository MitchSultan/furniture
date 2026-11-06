import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import siteData from "@/data/site.json";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Journal`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${siteData.name}`,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }],
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Back link */}
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-sans text-small text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workshop Journal
          </Link>

          {/* Heading meta */}
          <div className="flex flex-col gap-3">
            <Eyebrow>{article.displayDate}</Eyebrow>
            <h1 className="font-serif text-h2 md:text-display-sm text-ink leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-sand shadow-sm">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              preload={true}
            />
          </div>

          {/* Body Content */}
          <div className="flex flex-col gap-6 font-sans text-body-lg text-ink/80 leading-relaxed pt-4">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Author Footnote */}
          <div className="mt-8 pt-8 border-t border-ink/10 flex items-center justify-between text-ink/60 font-sans text-small">
            <span>Written from Karen Atelier, Nairobi</span>
            <Link
              href="/shop"
              className="font-medium text-oak hover:text-ink transition-colors"
            >
              Explore our current commissions &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
