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
    <nav aria-label={`Линейки ${category.label}`} className="-mx-5 md:mx-0 mt-2">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 md:px-0 pb-1">
        <Link
          href={`/catalog/${encodeURIComponent(brand)}?category=${category.slug}`}
          className="shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
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
              className="shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
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
