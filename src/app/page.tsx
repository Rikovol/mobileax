import { fetchBrands, fetchCatalog } from '@/lib/phonebase-client';
import Hero from '@/components/hero/Hero';
import BrandGrid from '@/components/catalog/BrandGrid';
import ProductCard from '@/components/catalog/ProductCard';
import Link from 'next/link';
import type { FacetItem, CatalogItemOut } from '@/types/api';

// Revalidate every 5 minutes
export const revalidate = 300;

async function getBrands(): Promise<FacetItem[]> {
  try {
    return await fetchBrands();
  } catch {
    return [];
  }
}

async function getNewest(): Promise<CatalogItemOut[]> {
  try {
    const catalog = await fetchCatalog({ condition: 'new', sort: 'newest', per_page: 6 });
    return catalog.items;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [brands, newest] = await Promise.all([getBrands(), getNewest()]);

  return (
    <>
      <Hero />
      <BrandGrid brands={brands} />

      {/* Popular / newest section */}
      {newest.length > 0 && (
        <section className="bg-[var(--color-bg)]">
          <div className="section-container section-gap">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="text-[1.75rem] font-semibold tracking-tight">Популярное</h2>
              <Link
                href="/catalog/Apple"
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Все товары →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {newest.map((item) => (
                <ProductCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
