'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

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
    eyebrow: 'Новинка',
    title: 'iPhone 17 Pro Max',
    subtitle: 'Самый продвинутый',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone 17 Pro Max',
    bg: '#1c1c1e',
  },
  {
    id: 1,
    eyebrow: 'Ультратонкий',
    title: 'iPhone 17 Air',
    subtitle: 'Невероятно тонкий',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone 17 Air',
    bg: '#2a2a2e',
  },
  {
    id: 2,
    eyebrow: 'Производительность',
    title: 'MacBook Air M4',
    subtitle: 'Лёгкий и мощный',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0001-0001-0001-000000000001/3b64e3a140ed4520b4a968d77a93bde7.jpg',
    imgAlt: 'MacBook Air M4',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    id: 3,
    eyebrow: 'Новинка',
    title: 'iPad Pro M4',
    subtitle: 'Невероятно быстрый',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/148/12.png',
    imgAlt: 'iPad Pro M4',
    bg: '#e8f0f8',
    textDark: true,
  },
  {
    id: 4,
    eyebrow: 'Приключения',
    title: 'Apple Watch Ultra 3',
    subtitle: 'Для приключений',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/149/13.png',
    imgAlt: 'Apple Watch Ultra 3',
    bg: '#2c2c2e',
  },
  {
    id: 5,
    eyebrow: 'Звук',
    title: 'AirPods Pro 3',
    subtitle: 'Активное шумоподавление',
    cta: 'Купить',
    ctaHref: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/150/14.png',
    imgAlt: 'AirPods Pro 3',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    id: 6,
    eyebrow: 'Android',
    title: 'Galaxy S26 Ultra',
    subtitle: 'AI на каждый день',
    cta: 'Купить',
    ctaHref: '/catalog/Samsung',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'Samsung Galaxy S26 Ultra',
    bg: '#1a1a2e',
  },
  {
    id: 7,
    eyebrow: 'Выгода',
    title: 'Trade-In',
    subtitle: 'Сдай старое — получи скидку',
    cta: 'Оценить',
    ctaHref: '/trade-in',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/products/30/02/10230/images/11504/11504.240.jpg',
    imgAlt: 'Trade-In',
    bg: '#1a3a2a',
  },
];

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
      style={{
        background: 'rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.1)',
        color: '#1d1d1f',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

export default function ShopLatestScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('a')?.offsetWidth ?? 300;
    el.scrollBy({ left: direction === 'right' ? cardWidth + 12 : -(cardWidth + 12), behavior: 'smooth' });
  }

  return (
    <section aria-label="Выбор техники" style={{ background: 'var(--color-bg)' }}>
      <div className="py-14 md:py-20">
        {/* Header row */}
        <div className="section-container flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2
              className="font-bold tracking-tight"
              style={{
                fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              Последние новинки
            </h2>
            <p
              className="mt-1 text-[0.9375rem]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Лучшие устройства прямо сейчас
            </p>
          </div>

          {/* Arrow buttons — desktop only */}
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={() => scrollBy('left')} />
            <ArrowButton direction="right" onClick={() => scrollBy('right')} />
          </div>
        </div>

        {/* Scrollable track — full-bleed, padding inside */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-5 md:px-12"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '4px', /* room for box-shadow */
          }}
        >
          {CARDS.map((card) => {
            const dark = !card.textDark;
            return (
              <Link
                key={card.id}
                href={card.ctaHref}
                className="group relative flex flex-col flex-shrink-0 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: card.bg,
                  width: 'clamp(260px, 78vw, 300px)',
                  minHeight: '340px',
                  scrollSnapAlign: 'start',
                  textDecoration: 'none',
                }}
                aria-label={card.title}
              >
                {/* Text block — top */}
                <div className="relative z-10 p-6">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2"
                    style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="font-bold leading-tight mb-1"
                    style={{
                      fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
                      letterSpacing: '-0.025em',
                      color: dark ? '#f5f5f7' : '#1d1d1f',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[0.8125rem] mb-4"
                    style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6e6e73' }}
                  >
                    {card.subtitle}
                  </p>
                  <span
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full font-medium text-[0.8125rem] text-white"
                    style={{ background: '#0071e3' }}
                  >
                    {card.cta}
                    <svg className="ml-1" width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Product image — fills bottom half */}
                <div
                  className="relative flex-1 flex items-end justify-center px-4 pb-0"
                  style={{ minHeight: '160px' }}
                >
                  <div className="relative w-full h-[160px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                    <Image
                      src={card.imgSrc}
                      alt={card.imgAlt}
                      fill
                      className={`object-contain object-bottom${card.textDark ? ' mix-blend-multiply' : ''}`}
                      sizes="300px"
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Trailing spacer so last card has right padding */}
          <div className="flex-shrink-0 w-5 md:w-12" aria-hidden />
        </div>
      </div>
    </section>
  );
}
