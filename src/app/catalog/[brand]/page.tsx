import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchCatalog } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CatalogSubNav from '@/components/catalog/CatalogSubNav';
import { getCategory, getLine, getCategoriesByBrand } from '@/lib/taxonomy';

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
  const categorySlug = sp(sq, 'category') || undefined;
  const lineSlug = sp(sq, 'line') || undefined;

  // Resolve taxonomy: чем фильтровать через `search` параметр phonebase
  const taxonomyCategory = categorySlug ? getCategory(categorySlug) : undefined;
  const taxonomyLine =
    taxonomyCategory && lineSlug ? getLine(taxonomyCategory, lineSlug) : undefined;

  // Приоритет search-запроса: line > storage (если оба заданы — line побеждает)
  const searchQuery = taxonomyLine?.searchQuery
    ?? taxonomyCategory?.lines.map((l) => l.searchQuery)[0] // fallback: первая линейка категории если line не выбран
    ?? storage;

  // brand из URL имеет приоритет; если в taxonomy выбрана категория, она должна совпасть.
  const effectiveBrand = taxonomyCategory?.brand ?? brandName;
  const brandsForBrand = getCategoriesByBrand(effectiveBrand);

  let catalog = null;
  try {
    catalog = await fetchCatalog({
      condition,
      brand: effectiveBrand,
      page,
      per_page: 24,
      sort,
      ...(searchQuery ? { search: searchQuery } : {}),
    });
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
      <h1 className="hero-title mb-3">
        {taxonomyLine?.label ?? taxonomyCategory?.label ?? brandName}
      </h1>
      <p className="hero-subtitle mb-10">Официальная гарантия · Trade-in · Рассрочка</p>

      {/* Категория chips: отдельные категории для текущего brand (для Samsung — Galaxy S, Galaxy A, Galaxy Watch) */}
      {brandsForBrand.length > 1 && (
        <nav aria-label="Категории" className="mb-6 flex gap-2 flex-wrap">
          {brandsForBrand.map((cat) => {
            const active = cat.slug === categorySlug;
            return (
              <Link
                key={cat.slug}
                href={`/catalog/${encodeURIComponent(cat.brand)}?category=${cat.slug}&condition=${condition}`}
                className="px-4 py-2 rounded-full text-[14px] font-medium transition-colors"
                style={{
                  background: active ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
                  color: active ? '#fff' : '#1d1d1f',
                }}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Линейки внутри выбранной категории (для iPhone — 17/17 Pro/Air/16/15/etc.) */}
      {taxonomyCategory && (
        <CatalogSubNav
          category={taxonomyCategory}
          brand={effectiveBrand}
          activeLineSlug={lineSlug}
        />
      )}

      {/* Condition switch */}
      <div className="flex gap-2 mb-8">
        {(['new', 'used'] as const).map((cond) => {
          const params = new URLSearchParams();
          params.set('condition', cond);
          if (categorySlug) params.set('category', categorySlug);
          if (lineSlug) params.set('line', lineSlug);
          return (
            <Link
              key={cond}
              href={`/catalog/${brand}?${params.toString()}`}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                condition === cond
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-border)]',
              ].join(' ')}
            >
              {cond === 'new' ? 'Новые' : 'Б/у'}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-10">
        {/* Main content (sidebar заменён на верхние chips через CatalogSubNav) */}
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
