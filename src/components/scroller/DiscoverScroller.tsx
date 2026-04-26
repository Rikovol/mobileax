'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Apple Store "Discover values" — горизонтальный rf-cards-scroller
 * с marketing-style cards: фишки и сервисы магазина.
 */

interface DiscoverCard {
  id: string;
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark: boolean;
}

const CARDS: DiscoverCard[] = [
  {
    id: 'vision-pro',
    eyebrow: 'Apple Vision Pro',
    title: 'Будущее уже здесь.',
    cta: 'Узнать больше',
    href: '/catalog/Apple?category=vision',
    imgSrc: '/themes/mobileax/categories/vision-pro.png',
    imgAlt: 'Apple Vision Pro',
    bg: '#1a1a1c',
    textDark: false,
  },
  {
    id: 'galaxy-s26',
    eyebrow: 'Galaxy S26 Ultra',
    title: 'Флагман Samsung. AI на каждый день.',
    cta: 'Купить',
    href: '/catalog/Samsung?category=galaxy-s&line=s26-ultra',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.png',
    imgAlt: 'Galaxy S26 Ultra',
    bg: '#0a0a14',
    textDark: false,
  },
  {
    id: 'used',
    eyebrow: 'Б/У с гарантией',
    title: 'Проверенная техника.\nЦена — честная.',
    cta: 'Смотреть Б/У',
    href: '/used',
    imgSrc: '/themes/mobileax/heroes/macbook.png',
    imgAlt: 'Б/У техника',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    id: 'trade-in',
    eyebrow: 'Trade-In',
    title: 'Сдай старое.\nПолучи скидку.',
    cta: 'Оценить устройство',
    href: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.png',
    imgAlt: 'Trade-In',
    bg: '#0a2a4a',
    textDark: false,
  },
  {
    id: 'installment',
    eyebrow: 'Рассрочка 0%',
    title: 'Сегодня — техника.\nПлатите потом.',
    cta: 'Узнать условия',
    href: '/delivery',
    imgSrc: '/themes/mobileax/heroes/airpods-max.png',
    imgAlt: 'Рассрочка',
    bg: '#1d1d1f',
    textDark: false,
  },
  {
    id: 'store',
    eyebrow: 'Магазин в Орле',
    title: 'ул. Автовокзальная, 1.\nПн-Вс 09:00–19:00.',
    cta: 'На карте',
    href: '/contacts',
    imgSrc: '/themes/mobileax/categories/iphone.png',
    imgAlt: 'Магазин',
    bg: '#fbfbfd',
    textDark: true,
  },
];

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
      style={{ background: 'rgba(0,0,0,0.06)', color: '#1d1d1f' }}
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

export default function DiscoverScroller() {
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
    const card = el.querySelector('[data-discover-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  }

  return (
    <section aria-label="Откройте больше" style={{ background: 'var(--color-bg)' }}>
      <div className="rf-cards-scroller py-12 md:py-16">
        <div className="section-container flex items-end justify-between gap-6 mb-6 md:mb-8">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
            }}
          >
            Откройте больше
          </h2>
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" disabled={atStart} onClick={() => scrollByDir('left')} />
            <ArrowButton direction="right" disabled={atEnd} onClick={() => scrollByDir('right')} />
          </div>
        </div>

        <div className="rf-cards-scroller-crop relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{ opacity: atStart ? 0 : 1, background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{ opacity: atEnd ? 0 : 1, background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
          />

          <div
            ref={scrollerRef}
            data-core-scroller=""
            className="rf-cards-scroller-content overflow-x-auto no-scrollbar"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            <div
              className="rf-cards-scroller-platter flex gap-4"
              style={{
                paddingLeft: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
                paddingRight: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
              }}
            >
              {CARDS.map((card) => {
                const dark = !card.textDark;
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    data-discover-card
                    className="group relative flex flex-col flex-shrink-0 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.015]"
                    style={{
                      background: card.bg,
                      width: 'clamp(280px, 75vw, 360px)',
                      minHeight: 460,
                      scrollSnapAlign: 'start',
                      textDecoration: 'none',
                    }}
                    aria-label={card.title}
                  >
                    <div className="relative z-10 p-7">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-2"
                        style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
                      >
                        {card.eyebrow}
                      </p>
                      <h3
                        className="font-semibold leading-tight tracking-tight whitespace-pre-line mb-4"
                        style={{
                          fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)',
                          letterSpacing: '-0.025em',
                          color: dark ? '#f5f5f7' : '#1d1d1f',
                        }}
                      >
                        {card.title}
                      </h3>
                      <span
                        className="inline-flex items-center justify-center px-5 py-2 rounded-full font-medium text-[13px] text-white transition-opacity hover:opacity-90"
                        style={{ background: '#0071e3' }}
                      >
                        {card.cta}
                      </span>
                    </div>

                    <div className="relative flex-1 mt-2">
                      <Image
                        src={card.imgSrc}
                        alt={card.imgAlt}
                        fill
                        className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="360px"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
