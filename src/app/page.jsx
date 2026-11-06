import Hero from "@/components/home/Hero";
import FeaturedShowcase from "@/components/home/FeaturedShowcase";
import BrandStatement from "@/components/home/BrandStatement";
import CollectionCards from "@/components/home/CollectionCards";
import NewThisSeason from "@/components/home/NewThisSeason";
import AnatomySection from "@/components/home/AnatomySection";
import MaterialsList from "@/components/home/MaterialsList";
import StatsRow from "@/components/home/StatsRow";
import ReviewsSlider from "@/components/home/ReviewsSlider";
import JournalPreview from "@/components/home/JournalPreview";
import Newsletter from "@/components/home/Newsletter";
import Reveal from "@/components/motion/Reveal";
import { getAllProducts, getFeaturedProduct } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();
  const featuredProduct = await getFeaturedProduct();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero indexProducts={products} />

      {/* 2. Featured Product Strip */}
      <Reveal>
        <FeaturedShowcase product={featuredProduct} />
      </Reveal>

      {/* 3. Brand Statement / Atelier Ethos */}
      <Reveal>
        <BrandStatement />
      </Reveal>

      {/* 4. Curated Collections */}
      <Reveal>
        <CollectionCards />
      </Reveal>

      {/* 5. New This Season (Autumn Editions) with Client Filters */}
      <Reveal>
        <NewThisSeason products={products.filter((p) => p.isNew)} />
      </Reveal>

      {/* 6. Anatomy of a Piece (Case Study) */}
      <Reveal>
        <AnatomySection />
      </Reveal>

      {/* 7. Materials Index */}
      <Reveal>
        <MaterialsList />
      </Reveal>

      {/* 8. Trust Stats */}
      <Reveal>
        <StatsRow />
      </Reveal>

      {/* 9. Reviews Carousel Slider */}
      <Reveal>
        <ReviewsSlider />
      </Reveal>

      {/* 10. Journal Preview */}
      <Reveal>
        <JournalPreview />
      </Reveal>

      {/* 11. Newsletter Subscription */}
      <Reveal>
        <Newsletter />
      </Reveal>
    </div>
  );
}
