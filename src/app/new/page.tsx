import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCatalog } from '@/lib/phonebase-client';
import ProductCard from '@/components/catalog/ProductCard';

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

  // Запрашиваем Apple и Samsung параллельно — нет endpoint для всех брендов
  const [apple, samsung] = await Promise.allSettled([
    fetchCatalog({ condition: 'new', brand: 'Apple', page: 1, per_page: 24, sort }),
    fetchCatalog({ condition: 'new', brand: 'Samsung', page: 1, per_page: 24, sort }),
  ]);

  const items = [
    ...(apple.status === 'fulfilled' ? apple.value.items : []),
    ...(samsung.status === 'fulfilled' ? samsung.value.items : []),
  ];
  const total = items.length;

  return (
    <div className="section-container section-gap">
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Новые товары</span>
      </nav>

      <h1 className="hero-title mb-3">Новые товары</h1>
      <p className="hero-subtitle mb-10">Apple, Samsung — официальная гарантия</p>

      {total === 0 ? (
        <p className="text-[var(--color-text-secondary)]">Пока товары не загружены.</p>
      ) : (
        <>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">{total} товаров</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
