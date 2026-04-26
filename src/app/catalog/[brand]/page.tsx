import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchCatalog } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CatalogSubNav from '@/components/catalog/CatalogSubNav';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ItemListSchema from '@/components/seo/ItemListSchema';
import { getCategory, getLine, getCategoriesByBrand, categoryUrl } from '@/lib/taxonomy';

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

  // Приоритет search-запроса: line > storage. Без линейки — без search (показать всю категорию)
  // Приоритет: line > category > storage. Без searchQuery brand-фильтр даёт всё подряд
  // (iPhone + Mac + iPad смешано), поэтому категория должна сузить до своего семейства.
  const searchQuery =
    taxonomyLine?.searchQuery ?? taxonomyCategory?.searchQuery ?? storage;

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
    <div className="section-container py-6 md:py-8">
      <Breadcrumbs
        items={[
          { label: brandName, href: `/catalog/${brand}` },
          ...(taxonomyCategory
            ? [{ label: taxonomyCategory.label, href: `/catalog/${brand}?category=${categorySlug}` }]
            : []),
          ...(taxonomyLine
            ? [
                {
                  label: taxonomyLine.label,
                  href: `/catalog/${brand}?category=${categorySlug}&line=${lineSlug}`,
                },
              ]
            : []),
        ]}
      />
      {catalog?.items && (
        <ItemListSchema
          items={catalog.items}
          name={`${brandName}${taxonomyCategory ? ` — ${taxonomyCategory.label}` : ''}`}
        />
      )}
      {/* Compact toolbar — breadcrumb + h1 inline + chips + condition + filters */}
      <div className="mb-6 catalog-toolbar">
        {/* Breadcrumb (тонкий) */}
        <nav className="text-[12px] text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
            Главная
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-[var(--color-text)]">{brandName}</span>
        </nav>

        {/* H1 + subtitle на одной строке (Apple Store-style) */}
        <h1
          className="font-semibold tracking-tight mb-3"
          style={{
            fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}
        >
          {taxonomyLine?.label ?? taxonomyCategory?.label ?? brandName}
          <span
            className="ml-2 hidden sm:inline"
            style={{
              fontSize: 'clamp(0.75rem, 1.1vw, 0.9375rem)',
              fontWeight: 500,
              color: '#86868b',
            }}
          >
            · Гарантия · Trade-In · Рассрочка
          </span>
        </h1>

        {/* Один ряд: brand-chips + condition (если на узком — wrap) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {brandsForBrand.length > 1 &&
            brandsForBrand.map((cat) => {
              const active = cat.slug === categorySlug;
              const href = cat.customHref ?? categoryUrl(cat);
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: active ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
                    color: active ? '#fff' : '#1d1d1f',
                  }}
                >
                  {cat.label}
                </Link>
              );
            })}
          {brandsForBrand.length > 1 && (
            <span className="mx-1 h-5 w-px bg-[var(--color-border)] hidden sm:inline-block" aria-hidden />
          )}
          {(['new', 'used'] as const).map((cond) => {
            const params = new URLSearchParams();
            params.set('condition', cond);
            if (categorySlug) params.set('category', categorySlug);
            if (lineSlug) params.set('line', lineSlug);
            const active = condition === cond;
            return (
              <Link
                key={cond}
                href={`/catalog/${brand}?${params.toString()}`}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                style={{
                  background: active ? '#0071e3' : 'rgba(0,0,0,0.05)',
                  color: active ? '#fff' : '#1d1d1f',
                }}
              >
                {cond === 'new' ? 'Новые' : 'Б/у'}
              </Link>
            );
          })}
        </div>

        {/* Линейки внутри категории — chips только если категория выбрана */}
        {taxonomyCategory && (
          <CatalogSubNav
            category={taxonomyCategory}
            brand={effectiveBrand}
            activeLineSlug={lineSlug}
          />
        )}
      </div>

      <div className="flex gap-10">
        <div className="flex-1 min-w-0">
          {/* Filters row */}
          <div className="mb-5">
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
