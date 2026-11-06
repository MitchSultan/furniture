import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import siteData from "@/data/site.json";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Piece Not Found" };
  }

  const primaryImage = product.images?.[0] || "";

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteData.name}`,
      description: product.description,
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  // Structured Data (JSON-LD Product Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: siteData.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteData.name,
      },
    },
  };

  return (
    <div className="w-full pt-28 pb-24 md:pt-36 md:pb-32">
      {/* JSON-LD Script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Container>
        {/* Main Product Stage: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 border-b border-ink/10">
          {/* Gallery: 7 Columns */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.name} />
          </div>

          {/* Product Meta & Actions: 5 Columns */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Pieces */}
        {related.length > 0 && (
          <div className="pt-20 flex flex-col gap-10">
            <SectionHeading
              eyebrow="COMPLEMENTARY EDITIONS"
              title="Pairs quietly with"
              subtitle="Pieces sharing the same timber acclimation and artisanal joinery signatures."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
