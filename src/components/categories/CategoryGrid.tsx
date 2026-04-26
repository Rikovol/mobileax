'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES, categoryUrl } from '@/lib/taxonomy';

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
      className="hidden md:flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      style={{
        background: 'rgba(255,255,255,0.85)',
        color: '#1d1d1f',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        {direction === 'left' ? (
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3L11 8L6 13"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
    const step = (card?.offsetWidth ?? 140) * 3 + 24;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  }

  return (
    <section
      aria-label="Категории"
      className="relative"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="py-4 md:py-6 relative">
        {/* Edge fade — left */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-300 hidden md:block"
          style={{
            opacity: atStart ? 0 : 1,
            background: 'linear-gradient(to right, var(--color-bg), transparent)',
          }}
        />
        {/* Edge fade — right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 transition-opacity duration-300 hidden md:block"
          style={{
            opacity: atEnd ? 0 : 1,
            background: 'linear-gradient(to left, var(--color-bg), transparent)',
          }}
        />

        {/* Arrow — left, vertically centered */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
          <ArrowButton
            direction="left"
            disabled={atStart}
            onClick={() => scrollByDir('left')}
          />
        </div>

        {/* Arrow — right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
          <ArrowButton
            direction="right"
            disabled={atEnd}
            onClick={() => scrollByDir('right')}
          />
        </div>

        <div
          ref={scrollerRef}
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

              <div className="relative flex-1 mt-1.5 [filter:drop-shadow(0_8px_14px_rgba(0,0,0,0.18))] group-hover:[filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.32))] transition-[filter] duration-500 ease-out">
                <Image src={cat.icon} alt={cat.label} fill className="object-contain" sizes="140px" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
