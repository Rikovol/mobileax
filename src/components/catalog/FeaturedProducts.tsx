import Link from 'next/link';
import { fetchCatalog } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';
import type { CatalogItemOut } from '@/types/api';

interface Props {
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  condition?: 'new' | 'used';
  limit?: number;
}

async function getProducts(condition: 'new' | 'used', limit: number): Promise<CatalogItemOut[]> {
  try {
    const catalog = await fetchCatalog({ condition, sort: 'newest', per_page: limit });
    return catalog.items;
  } catch {
    return [];
  }
}

export default async function FeaturedProducts({
  title = 'Популярное',
  subtitle,
  viewAllHref = '/catalog/Apple',
  viewAllLabel = 'Все товары →',
  condition = 'new',
  limit = 8,
}: Props) {
  const items = await getProducts(condition, limit);

  if (items.length === 0) return null;

  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container section-gap">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: 'clamp(1.375rem, 3vw, 1.75rem)', letterSpacing: '-0.02em', color: 'var(--color-text)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-[0.9375rem]" style={{ color: 'var(--color-text-secondary)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="text-sm font-medium shrink-0 ml-4 transition-colors hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            {viewAllLabel}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
