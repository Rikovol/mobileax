'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollerCard {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark?: boolean;
}

const CARDS: ScrollerCard[] = [
  {
    id: 0,
    eyebrow: 'Выгода',
    title: 'Trade-In',
    subtitle: 'Сдай старое — получи скидку',
    cta: 'Оценить',
    ctaHref: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.png',
    imgAlt: 'Trade-In',
    bg: '#0a2a4a',
  },
  {
    id: 1,
    eyebrow: 'Новинка',
    title: 'iPhone 17 Pro',
    subtitle: 'Самый продвинутый iPhone',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=iphone&line=17-pro',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.png',
    imgAlt: 'iPhone 17 Pro',
    bg: '#000000',
  },
  {
    id: 2,
    eyebrow: 'Доступно',
    title: 'iPhone 17e',
    subtitle: 'Та же мощь, проще цена',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=iphone&line=17',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.png',
    imgAlt: 'iPhone 17e',
    bg: '#1d1d1f',
  },
  {
    id: 3,
    eyebrow: 'Производительность',
    title: 'MacBook',
    subtitle: 'Лёгкий и мощный',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=mac&line=macbook-pro',
    imgSrc: '/themes/mobileax/heroes/macbook.png',
    imgAlt: 'MacBook',
    bg: '#1d1d1f',
  },
  {
    id: 4,
    eyebrow: 'Звук',
    title: 'AirPods Max',
    subtitle: 'Активное шумоподавление',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=airpods&line=max',
    imgSrc: '/themes/mobileax/heroes/airpods-max.png',
    imgAlt: 'AirPods Max',
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

export default function ShopLatestScroller() {
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
    const card = el.querySelector('[data-scroller-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  }

  return (
    <section aria-label="Витрина новинок" style={{ background: 'var(--color-bg)' }}>
      <div className="rf-cards-scroller py-14 md:py-20">
        {/* Header row — title left, arrows right */}
        <div className="section-container flex items-end justify-between gap-6 mb-6 md:mb-8">
          <div>
            <h2
              className="font-semibold tracking-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              Выбрать новую технику
            </h2>
            <p
              className="mt-2 text-[0.9375rem] md:text-[1.0625rem]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Лучшее прямо сейчас.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" disabled={atStart} onClick={() => scrollByDir('left')} />
            <ArrowButton direction="right" disabled={atEnd} onClick={() => scrollByDir('right')} />
          </div>
        </div>

        {/* Scroller — Apple rf-cards-scroller pattern */}
        <div className="rf-cards-scroller-crop relative overflow-hidden">
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
            style={{
              opacity: atStart ? 0 : 1,
              background: 'linear-gradient(to right, var(--color-bg), transparent)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 transition-opacity duration-300"
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
              scrollPaddingLeft: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
              scrollPaddingRight: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
            }}
          >
            <div
              className="rf-cards-scroller-platter flex gap-4"
              style={{
                paddingLeft: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
                paddingRight: 'max(20px, calc((100% - 1200px) / 2 + 20px))',
                paddingBottom: 4,
              }}
            >
              {CARDS.map((card) => {
                const dark = !card.textDark;
                return (
                  <Link
                    key={card.id}
                    href={card.ctaHref}
                    data-scroller-card
                    className="group relative flex flex-col flex-shrink-0 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.015]"
                    style={{
                      background: card.bg,
                      width: 'clamp(260px, 75vw, 340px)',
                      minHeight: 440,
                      scrollSnapAlign: 'start',
                      textDecoration: 'none',
                    }}
                    aria-label={card.title}
                  >
                    {/* Text */}
                    <div className="relative z-10 p-7">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-2"
                        style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
                      >
                        {card.eyebrow}
                      </p>
                      <h3
                        className="font-semibold leading-tight mb-1"
                        style={{
                          fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)',
                          letterSpacing: '-0.025em',
                          color: dark ? '#f5f5f7' : '#1d1d1f',
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-[0.9375rem]"
                        style={{ color: dark ? 'rgba(255,255,255,0.65)' : '#6e6e73' }}
                      >
                        {card.subtitle}
                      </p>
                      <span
                        className="inline-flex items-center justify-center mt-5 px-5 py-2 rounded-full font-medium text-[13px] text-white transition-opacity hover:opacity-90"
                        style={{ background: '#0071e3' }}
                      >
                        {card.cta}
                      </span>
                    </div>

                    {/* Product image — fills bottom */}
                    <div className="relative flex-1 overflow-hidden">
                      <Image
                        src={card.imgSrc}
                        alt={card.imgAlt}
                        fill
                        className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="340px"
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
