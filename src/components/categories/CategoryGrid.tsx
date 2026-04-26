'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES, categoryUrl } from '@/lib/taxonomy';

/**
 * Apple Store "Browse by category" — horizontal rf-cards-scroller
 * с маленькими category cards. Каждая card с соответствующим background-цветом.
 */

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
      className="hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
      style={{
        background: 'rgba(0,0,0,0.06)',
        color: '#1d1d1f',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        {direction === 'left' ? (
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function CategoryGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds);
    return () => {
      el.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, [updateBounds]);

  function scrollByDir(direction: 'left' | 'right') {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-category-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 240) + 16;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  }

  return (
    <section aria-label="Категории" style={{ background: 'var(--color-bg)' }}>
      <div className="rf-cards-scroller py-12 md:py-16">
        {/* Header row — "Browse by category" (как у Apple) */}
        <div className="section-container flex items-end justify-between gap-6 mb-6 md:mb-8">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.375rem, 2.6vw, 1.75rem)',
              letterSpacing: '-0.025em',
              color: 'var(--color-text)',
            }}
          >
            Выберите категорию
          </h2>
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" disabled={atStart} onClick={() => scrollByDir('left')} />
            <ArrowButton direction="right" disabled={atEnd} onClick={() => scrollByDir('right')} />
          </div>
        </div>

        {/* Scroller — Apple rf-cards-scroller pattern */}
        <div className="rf-cards-scroller-crop relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-300"
            style={{
              opacity: atStart ? 0 : 1,
              background: 'linear-gradient(to right, var(--color-bg), transparent)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-300"
            style={{
              opacity: atEnd ? 0 : 1,
              background: 'linear-gradient(to left, var(--color-bg), transparent)',
            }}
          />

          <div
            ref={scrollerRef}
            data-core-scroller=""
            className="rf-cards-scroller-content overflow-x-auto no-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              className="rf-cards-scroller-platter flex gap-3 md:gap-4"
              style={{
                paddingLeft: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
                paddingRight: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
              }}
            >
              {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={categoryUrl(cat)}
                    data-category-card
                    className="group relative flex flex-col flex-shrink-0 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.08]"
                    style={{
                      width: 'clamp(110px, 28vw, 140px)',
                      height: 170,
                      scrollSnapAlign: 'start',
                      textDecoration: 'none',
                    }}
                    aria-label={cat.label}
                  >
                    {/* Label — top */}
                    <div className="relative z-10 pt-1">
                      <h3
                        className="font-semibold leading-tight tracking-tight text-center"
                        style={{
                          fontSize: '0.875rem',
                          letterSpacing: '-0.02em',
                          color: '#1d1d1f',
                        }}
                      >
                        {cat.label}
                      </h3>
                    </div>

                    {/* Image — без card background; не масштабируем image,
                        только card целиком парит вверх (через .group hover на Link) */}
                    <div className="relative flex-1 mt-1.5 overflow-hidden">
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
        </div>
      </div>
    </section>
  );
}
