import { fetchBrands } from '@/lib/phonebase-client';
import HeroSlider from '@/components/hero/HeroSlider';
import ShopLatestScroller from '@/components/scroller/ShopLatestScroller';
import CategoryGrid from '@/components/categories/CategoryGrid';
import HighlightCards from '@/components/highlights/HighlightCards';
import FeaturedProducts from '@/components/catalog/FeaturedProducts';
import HelpSection from '@/components/help/HelpSection';
import DiscoverScroller from '@/components/scroller/DiscoverScroller';
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

  // Apple Store-style порядок секций:
  // 1. Hero "The latest is here" + 2 inline product cards
  // 2. Categories scroller (Browse by category)
  // 3. Latest scroller (The latest)
  // 4. Featured products (наши реальные товары из phonebase)
  // 5. Promo banners 2-col (Trade-In + Рассрочка)
  // 6. Help section 4-col
  // 7. Discover scroller (services + premium products)

  return (
    <>
      <Schema />

      <CategoryGrid />

      <HeroSlider />

      <ShopLatestScroller />

      <FeaturedProducts
        title="Популярное"
        subtitle="Только что поступили в продажу"
        viewAllHref="/catalog/Apple"
        viewAllLabel="Все товары"
        condition="new"
        limit={8}
      />

      <HighlightCards />

      <HelpSection />

      <DiscoverScroller />
    </>
  );
}
