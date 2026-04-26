import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCatalog } from '@/lib/phonebase-client';
import type { CatalogItemOut } from '@/types/api';
import CatalogClientView from '@/components/catalog/CatalogClientView';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ItemListSchema from '@/components/seo/ItemListSchema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Новые товары — мобилакс',
  description: 'Каталог новой техники Apple и Samsung в Орле. Гарантия, Trade-In, рассрочка.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/new',
  },
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function sp(searchParams: Record<string, string | string[] | undefined>, key: string): string {
  const val = searchParams[key];
  return Array.isArray(val) ? (val[0] ?? '') : (val ?? '');
}

// Phonebase API ограничивает per_page значением 60.
// Грузим до 3 страниц = 180 товаров — достаточно для всего активного каталога.
const PER_PAGE = 60;
const MAX_PAGES = 3;

async function fetchAllNew(
  sort: 'price_asc' | 'price_desc' | 'newest',
): Promise<CatalogItemOut[]> {
  const items: CatalogItemOut[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const res = await fetchCatalog({ condition: 'new', page, per_page: PER_PAGE, sort });
      items.push(...res.items);
      if (res.items.length < PER_PAGE) break;
    } catch (err) {
      console.error('[/new] fetchCatalog page=' + page + ' failed:', err);
      break;
    }
  }
  return items;
}

export default async function NewProductsPage({ searchParams }: Props) {
  const sq = await searchParams;
  const sort = (sp(sq, 'sort') as 'price_asc' | 'price_desc' | 'newest') || 'newest';

  const items = await fetchAllNew(sort);

  return (
    <div className="section-container py-6 md:py-8">
      <Breadcrumbs items={[{ label: 'Новые товары', href: '/new' }]} />
      <ItemListSchema items={items} name="Новые товары" />
      <div className="mb-6 catalog-toolbar">
        <nav className="text-[12px] text-[var(--color-text-secondary)] mb-1.5 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
            Главная
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-[var(--color-text)]">Новые товары</span>
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
          Новые товары
          <span
            className="ml-2 hidden sm:inline"
            style={{
              fontSize: 'clamp(0.75rem, 1.1vw, 0.9375rem)',
              fontWeight: 500,
              color: '#86868b',
            }}
          >
            · Apple · Samsung · Официальная гарантия
          </span>
        </h1>
      </div>

      <CatalogClientView initialItems={items} />
    </div>
  );
}
