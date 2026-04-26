import Link from 'next/link';
import type { Category } from '@/lib/taxonomy';

interface Props {
  category: Category;
  brand: string;
  activeLineSlug?: string;
}

/**
 * Горизонтальный chip-навигатор по линейкам внутри одной категории.
 * Apple-style pill buttons, scroll-x on mobile.
 */
export default function CatalogSubNav({ category, brand, activeLineSlug }: Props) {
  return (
    <nav
      aria-label={`Линейки ${category.label}`}
      className="mb-8 -mx-5 md:mx-0"
    >
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 md:px-0 pb-1">
        {/* "Все" — без line filter */}
        <Link
          href={`/catalog/${encodeURIComponent(brand)}?category=${category.slug}`}
          className="shrink-0 px-4 py-2 rounded-full text-[14px] font-medium transition-colors"
          style={{
            background: !activeLineSlug ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
            color: !activeLineSlug ? '#fff' : '#1d1d1f',
          }}
        >
          Все {category.label}
        </Link>

        {category.lines.map((line) => {
          const active = line.slug === activeLineSlug;
          return (
            <Link
              key={line.slug}
              href={`/catalog/${encodeURIComponent(brand)}?category=${category.slug}&line=${line.slug}`}
              className="shrink-0 px-4 py-2 rounded-full text-[14px] font-medium transition-colors"
              style={{
                background: active ? '#0071e3' : 'rgba(0,0,0,0.05)',
                color: active ? '#fff' : '#1d1d1f',
              }}
            >
              {line.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
