import type { Metadata } from 'next';
import Link from 'next/link';
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
    <div className="section-container py-6 md:py-8">
      <div className="mb-6 catalog-toolbar">
        <nav className="text-[12px] text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
            Главная
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-[var(--color-text)]">Б/У техника</span>
        </nav>

        <h1
          className="font-semibold tracking-tight mb-3"
          style={{
            fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}
        >
          Б/У техника
          <span
            className="ml-2 hidden sm:inline"
            style={{
              fontSize: 'clamp(0.75rem, 1.1vw, 0.9375rem)',
              fontWeight: 500,
              color: '#86868b',
            }}
          >
            · Гарантия 30 дней · Обмен 14 дней · Диагностика
          </span>
        </h1>

        {/* Trust pills — компактнее */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {['Проверка батареи', 'Диагностика', 'Гарантия 30 дней', 'Обмен 14 дней'].map((tag) => (
            <span
              key={tag}
              className="text-[12px] px-3 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-5">
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
