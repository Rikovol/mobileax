'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category } from '@/lib/taxonomy';

interface Props {
  category: Category;
  brand: string;
  activeLineSlug?: string;
}

function MiniArrow({
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
      className="hidden md:flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none shadow-sm"
      style={{
        background: 'rgba(255,255,255,0.95)',
        color: '#1d1d1f',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        {direction === 'left' ? (
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3L11 8L6 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/**
 * Горизонтальный chip-навигатор по линейкам внутри одной категории.
 * Apple-style pill buttons со стрелками прокрутки на десктопе.
 */
export default function CatalogSubNav({ category, brand, activeLineSlug }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setOverflowing(scrollWidth > clientWidth + 4);
    setAtStart(scrollLeft <= 4);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4);
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
    const step = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  }

  const allLink = `/catalog/${encodeURIComponent(brand)}?category=${category.slug}`;

  return (
    <nav
      aria-label={`Линейки ${category.label}`}
      className="-mx-5 md:mx-0 mt-2 relative flex items-center gap-2"
    >
      {overflowing && (
        <MiniArrow
          direction="left"
          disabled={atStart}
          onClick={() => scrollByDir('left')}
        />
      )}

      <div className="relative flex-1 min-w-0">
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 transition-opacity duration-200 hidden md:block"
          style={{
            opacity: overflowing && !atStart ? 1 : 0,
            background: 'linear-gradient(to right, var(--color-bg), transparent)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 transition-opacity duration-200 hidden md:block"
          style={{
            opacity: overflowing && !atEnd ? 1 : 0,
            background: 'linear-gradient(to left, var(--color-bg), transparent)',
          }}
        />

        <div
          ref={scrollerRef}
          className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 md:px-0 pb-1 scroll-smooth"
        >
          <Link
            href={allLink}
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
      </div>

      {overflowing && (
        <MiniArrow
          direction="right"
          disabled={atEnd}
          onClick={() => scrollByDir('right')}
        />
      )}
    </nav>
  );
}
