import { fetchBrands } from '@/lib/phonebase-client';
import HeroSlider from '@/components/hero/HeroSlider';
import TrustBar from '@/components/trust/TrustBar';
import CategoryGrid from '@/components/categories/CategoryGrid';
import HighlightCards from '@/components/highlights/HighlightCards';
import FeaturedProducts from '@/components/catalog/FeaturedProducts';
import HelpSection from '@/components/help/HelpSection';
import Schema from '@/components/seo/Schema';

// Revalidate every 5 minutes
export const revalidate = 300;

async function warmBrands(): Promise<void> {
  try {
    await fetchBrands();
  } catch {
    // ignore
  }
}

export default async function HomePage() {
  await warmBrands();

  return (
    <>
      {/* JSON-LD Schema.org */}
      <Schema />

      {/* 1. Hero slider — full-bleed, Apple-level */}
      <HeroSlider />

      {/* 2. Trust bar — 4 преимущества */}
      <TrustBar />

      {/* 3. Category grid — Apple «Shop by category» */}
      <CategoryGrid />

      {/* 4. Популярное — новые товары из phonebase */}
      <FeaturedProducts
        title="Популярное"
        subtitle="Только что поступили в продажу"
        viewAllHref="/catalog/Apple"
        viewAllLabel="Все товары"
        condition="new"
        limit={8}
      />

      {/* 5. Highlights — Trade-In / Рассрочка / Б/У */}
      <HighlightCards />

      {/* 6. Б/У техника */}
      <FeaturedProducts
        title="Техника Б/У"
        subtitle="Проверенные устройства с гарантией магазина"
        viewAllHref="/used"
        viewAllLabel="Все б/у"
        condition="used"
        limit={4}
      />

      {/* 7. Help section — «Нужна помощь с покупкой?» */}
      <HelpSection />
    </>
  );
}
