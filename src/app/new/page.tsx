import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCatalog } from '@/lib/phonebase-client';
import CatalogClientView from '@/components/catalog/CatalogClientView';

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

export default async function NewProductsPage({ searchParams }: Props) {
  const sq = await searchParams;
  const page = Math.max(1, Number(sp(sq, 'page')) || 1);
  const sort = (sp(sq, 'sort') as 'price_asc' | 'price_desc' | 'newest') || 'newest';

  // Запрашиваем Apple и Samsung параллельно — нет endpoint для всех брендов.
  // Берём по 100 чтобы клиентские фильтры не показывали половину каталога.
  const [apple, samsung] = await Promise.allSettled([
    fetchCatalog({ condition: 'new', brand: 'Apple', page: 1, per_page: 100, sort }),
    fetchCatalog({ condition: 'new', brand: 'Samsung', page: 1, per_page: 100, sort }),
  ]);

  const items = [
    ...(apple.status === 'fulfilled' ? apple.value.items : []),
    ...(samsung.status === 'fulfilled' ? samsung.value.items : []),
  ];

  return (
    <div className="section-container py-6 md:py-8">
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
