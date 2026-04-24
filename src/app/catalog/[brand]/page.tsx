import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchCatalog, fetchCategories } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const brandName = decodeURIComponent(brand);
  const canonical = `https://xn--80abvjddo3a.xn--p1ai/catalog/${brand}`;

  return {
    title: `${brandName} в Орле — мобилакс`,
    description: `Купить ${brandName} в Орле. Новые смартфоны и планшеты с гарантией, trade-in и рассрочкой. Лучшие цены в мобилакс.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${brandName} в Орле — мобилакс`,
      description: `Каталог ${brandName}: новые устройства с официальной гарантией.`,
      url: canonical,
    },
  };
}

function sp(searchParams: Record<string, string | string[] | undefined>, key: string): string {
  const val = searchParams[key];
  return Array.isArray(val) ? (val[0] ?? '') : (val ?? '');
}

export default async function BrandCatalogPage({ params, searchParams }: Props) {
  const { brand } = await params;
  const sq = await searchParams;

  const brandName = decodeURIComponent(brand);
  const condition = (sp(sq, 'condition') as 'new' | 'used') || 'new';
  const page = Math.max(1, Number(sp(sq, 'page')) || 1);
  const sort = (sp(sq, 'sort') as 'price_asc' | 'price_desc' | 'newest') || 'newest';
  const storage = sp(sq, 'storage') || undefined;
  const color = sp(sq, 'color') || undefined;

  let catalog = null;
  let categories: { value: string; label: string; count: number }[] = [];

  try {
    [catalog, categories] = await Promise.all([
      fetchCatalog({
        condition,
        brand: brandName,
        page,
        per_page: 24,
        sort,
        ...(storage ? { search: storage } : {}),
      }),
      fetchCategories(),
    ]);
  } catch {
    // API not yet connected — show fallback
  }

  const totalPages = catalog ? Math.ceil(catalog.total / catalog.per_page) : 0;

  // Extract unique storage/color options from results for filters
  const storageOptions = catalog
    ? Array.from(new Set(catalog.items.map((i) => i.storage).filter(Boolean) as string[])).map(
        (s) => ({ value: s, label: s }),
      )
    : [];
  const colorOptions = catalog
    ? Array.from(new Set(catalog.items.map((i) => i.color).filter(Boolean) as string[])).map(
        (c) => ({ value: c, label: c }),
      )
    : [];

  return (
    <div className="section-container section-gap">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{brandName}</span>
      </nav>

      {/* Page heading */}
      <h1 className="hero-title mb-3">{brandName}</h1>
      <p className="hero-subtitle mb-10">Официальная гарантия · Trade-in · Рассрочка</p>

      {/* Condition switch */}
      <div className="flex gap-2 mb-8">
        {(['new', 'used'] as const).map((cond) => (
          <Link
            key={cond}
            href={`/catalog/${brand}?condition=${cond}`}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              condition === cond
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-border)]',
            ].join(' ')}
          >
            {cond === 'new' ? 'Новые' : 'Б/у'}
          </Link>
        ))}
      </div>

      <div className="flex gap-10">
        {/* Sidebar — categories, sticky */}
        {categories.length > 0 && (
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
                Категории
              </p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <Link
                      href={`/catalog/${brand}?condition=${condition}&category=${encodeURIComponent(cat.value)}`}
                      className="flex justify-between items-center px-3 py-2 rounded-lg text-sm hover:bg-[var(--color-bg-secondary)] transition-colors group"
                    >
                      <span className="group-hover:text-[var(--color-accent)] transition-colors">
                        {cat.label}
                      </span>
                      {cat.count > 0 && (
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {cat.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Filters row */}
          <div className="mb-6">
            <Suspense>
              <CatalogFilters
                storageOptions={storageOptions}
                colorOptions={colorOptions}
                mode="catalog"
              />
            </Suspense>
          </div>

          {/* Results count */}
          {catalog && (
            <p className="text-sm text-[var(--color-text-secondary)] mb-5">
              {catalog.total} товаров
            </p>
          )}

          {/* Grid */}
          {!catalog || catalog.items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[var(--color-text-secondary)] text-lg">Товары не найдены.</p>
              <Link
                href={`/catalog/${brand}`}
                className="mt-4 inline-block text-[var(--color-accent)] text-sm hover:underline"
              >
                Сбросить фильтры
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catalog.items.map((item) => (
                <ProductCard key={item.slug} item={item} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Страницы">
              {page > 1 && (
                <PaginationLink
                  href={buildPageUrl(brand, condition, sort, page - 1)}
                  label="← Назад"
                />
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (arr[idx - 1] as number) + 1 < p) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-[var(--color-text-secondary)]">
                      …
                    </span>
                  ) : (
                    <PaginationLink
                      key={p}
                      href={buildPageUrl(brand, condition, sort, p as number)}
                      label={String(p)}
                      active={p === page}
                    />
                  ),
                )}

              {page < totalPages && (
                <PaginationLink
                  href={buildPageUrl(brand, condition, sort, page + 1)}
                  label="Вперёд →"
                />
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function buildPageUrl(brand: string, condition: string, sort: string, page: number) {
  const params = new URLSearchParams({ condition, sort });
  if (page > 1) params.set('page', String(page));
  return `/catalog/${brand}?${params.toString()}`;
}

function PaginationLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        'min-w-[2.25rem] h-9 flex items-center justify-center px-3 rounded-full text-sm font-medium transition-all duration-200',
        active
          ? 'bg-[var(--color-accent)] text-white'
          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-border)]',
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
