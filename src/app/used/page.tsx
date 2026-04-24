import type { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchCatalog } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Б/У техника с гарантией — мобилакс',
  description:
    'Б/у смартфоны Apple, Samsung, Xiaomi с проверкой батареи и гарантией магазина. Орёл — мобилакс.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/used',
  },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function sp(searchParams: Record<string, string | string[] | undefined>, key: string): string {
  const val = searchParams[key];
  return Array.isArray(val) ? (val[0] ?? '') : (val ?? '');
}

export default async function UsedPage({ searchParams }: Props) {
  const sq = await searchParams;
  const sort = (sp(sq, 'sort') as 'price_asc' | 'price_desc' | 'newest') || 'newest';
  const batteryMin = sp(sq, 'battery_min') || undefined;
  const completeness = sp(sq, 'completeness') || undefined;
  const page = Math.max(1, Number(sp(sq, 'page')) || 1);

  let catalog = null;
  try {
    catalog = await fetchCatalog({
      condition: 'used',
      per_page: 24,
      page,
      sort,
    });
  } catch {
    // API not yet connected
  }

  // Filter by battery client-side since API may not support battery_min directly
  const filteredItems = catalog
    ? catalog.items.filter((item) => {
        if (batteryMin && item.battery_pct) {
          const pct = parseInt(item.battery_pct, 10);
          if (!isNaN(pct) && pct < parseInt(batteryMin, 10)) return false;
        }
        if (completeness && item.completeness) {
          if (!item.completeness.toLowerCase().includes(completeness.toLowerCase())) return false;
        }
        return true;
      })
    : [];

  const completenessOptions =
    catalog
      ? Array.from(
          new Set(catalog.items.map((i) => i.completeness).filter(Boolean) as string[]),
        ).map((c) => ({ value: c, label: c }))
      : [];

  return (
    <div className="section-container section-gap">
      {/* Heading */}
      <h1 className="hero-title mb-3">Б/У техника с гарантией</h1>
      <p className="hero-subtitle mb-10">
        Каждый телефон проверен. Батарея, корпус, функционал — всё в порядке.
      </p>

      {/* Trust pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Проверка батареи', 'Диагностика перед продажей', 'Гарантия 30 дней', 'Обмен в течение 14 дней'].map(
          (tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              ✓ {tag}
            </span>
          ),
        )}
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Suspense>
          <CatalogFilters
            completenessOptions={completenessOptions}
            mode="used"
          />
        </Suspense>
      </div>

      {/* Count */}
      {catalog && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-5">
          {filteredItems.length} товаров
          {batteryMin && ` · батарея от ${batteryMin}%`}
        </p>
      )}

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[var(--color-text-secondary)] text-lg">Нет доступных товаров.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
