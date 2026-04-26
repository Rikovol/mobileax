import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, categoryUrl } from '@/lib/taxonomy';

/**
 * Category cards — без header'а, без arrow buttons.
 * Просто горизонтальный flex с парением + drop-shadow на иконку.
 */

export default function CategoryGrid() {
  return (
    <section aria-label="Категории" style={{ background: 'var(--color-bg)' }}>
      <div className="py-4 md:py-6">
        <div
          className="rf-cards-scroller-platter flex gap-3 md:gap-4 overflow-x-auto no-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
            paddingRight: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={categoryUrl(cat)}
              data-category-card
              className="group relative flex flex-col flex-shrink-0 transition-transform duration-500 ease-out hover:-translate-y-3 hover:z-10"
              style={{
                width: 'clamp(110px, 28vw, 140px)',
                height: 170,
                scrollSnapAlign: 'start',
                textDecoration: 'none',
              }}
              aria-label={cat.label}
            >
              {/* Label — top */}
              <div className="relative z-10 pt-1 px-1">
                <h3
                  className="font-semibold leading-tight tracking-tight text-center"
                  style={{
                    fontSize: '0.875rem',
                    letterSpacing: '-0.02em',
                    color: '#1d1d1f',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {cat.label}
                </h3>
              </div>

              {/* Image + drop-shadow (Tailwind) усиливается при hover группы */}
              <div className="relative flex-1 mt-1.5 [filter:drop-shadow(0_8px_14px_rgba(0,0,0,0.18))] group-hover:[filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.32))] transition-[filter] duration-500 ease-out">
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
