'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroCard {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark: boolean;
}

const CARDS: HeroCard[] = [
  {
    id: 0,
    eyebrow: 'Новинка',
    title: 'iPhone 17 Pro Max.',
    subtitle: 'Камера. Производительность. Титан.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Apple',
    secondaryLabel: 'Подробнее',
    secondaryHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone 17 Pro Max',
    bg: '#1c1c1e',
    textDark: false,
  },
  {
    id: 1,
    eyebrow: 'Производительность',
    title: 'MacBook Air M3.',
    subtitle: 'Лёгкий. Быстрый. До 18 часов работы.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Apple',
    secondaryLabel: 'Подробнее',
    secondaryHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0001-0001-0001-000000000001/3b64e3a140ed4520b4a968d77a93bde7.jpg',
    imgAlt: 'MacBook Air M3',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    id: 2,
    eyebrow: 'Trade‑In',
    title: 'Сдайте старое. Получите новое.',
    subtitle: 'Мгновенная оценка при вас. Лучшая цена.',
    ctaLabel: 'Оценить устройство',
    ctaHref: '/trade-in',
    secondaryLabel: 'Как это работает',
    secondaryHref: '/trade-in',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/products/30/02/10230/images/11504/11504.240.jpg',
    imgAlt: 'Trade-In MacBook',
    bg: '#e8f4f8',
    textDark: true,
  },
];

function HeroCardDesktop({ card }: { card: HeroCard }) {
  const dark = !card.textDark;
  return (
    <Link
      href={card.ctaHref}
      className="group relative flex flex-col rounded-3xl overflow-hidden"
      style={{ background: card.bg, minHeight: '460px', textDecoration: 'none' }}
      aria-label={card.title}
    >
      {/* Text — top */}
      <div className="relative z-10 p-7 lg:p-8">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-3"
          style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
        >
          {card.eyebrow}
        </p>
        <h2
          className="font-bold leading-tight mb-2"
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            letterSpacing: '-0.03em',
            color: dark ? '#f5f5f7' : '#1d1d1f',
          }}
        >
          {card.title}
        </h2>
        <p
          className="text-[0.8125rem] leading-snug mb-6"
          style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#6e6e73' }}
        >
          {card.subtitle}
        </p>
        <div className="flex flex-wrap gap-2">
          <span
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white font-medium text-[0.8125rem]"
            style={{ background: '#0071e3' }}
          >
            {card.ctaLabel}
          </span>
          <span
            className="inline-flex items-center justify-center px-5 py-2 rounded-full font-medium text-[0.8125rem]"
            style={
              dark
                ? { color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }
                : { color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.2)' }
            }
          >
            {card.secondaryLabel}
            <svg className="ml-1" width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Product image — fills bottom */}
      <div className="relative flex-1 flex items-end justify-center px-4 pb-0" style={{ minHeight: '200px' }}>
        <div className="relative w-full" style={{ height: '220px' }}>
          <Image
            src={card.imgSrc}
            alt={card.imgAlt}
            fill
            className={`object-contain object-bottom${card.textDark ? ' mix-blend-multiply' : ''}`}
            sizes="33vw"
            priority={card.id === 0}
            unoptimized
          />
        </div>
      </div>
    </Link>
  );
}

function HeroCardMobile({ card }: { card: HeroCard }) {
  const dark = !card.textDark;
  return (
    <Link
      href={card.ctaHref}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{ background: card.bg, minHeight: '180px', textDecoration: 'none' }}
      aria-label={card.title}
    >
      <div className="relative z-10 p-5">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5"
          style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
        >
          {card.eyebrow}
        </p>
        <h2
          className="font-bold leading-tight mb-3"
          style={{
            fontSize: '0.9375rem',
            letterSpacing: '-0.02em',
            color: dark ? '#f5f5f7' : '#1d1d1f',
          }}
        >
          {card.title}
        </h2>
        <span
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-white font-medium text-[0.75rem]"
          style={{ background: '#0071e3' }}
        >
          {card.ctaLabel}
        </span>
      </div>
      <div className="relative flex items-end justify-center px-3 pb-0" style={{ height: '100px' }}>
        <div className="relative w-full h-full">
          <Image
            src={card.imgSrc}
            alt={card.imgAlt}
            fill
            className={`object-contain object-bottom${card.textDark ? ' mix-blend-multiply' : ''}`}
            sizes="45vw"
            unoptimized
          />
        </div>
      </div>
    </Link>
  );
}

export default function HeroSlider() {
  return (
    <section aria-label="Витрина товаров" style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-8 md:py-12">

        {/* Desktop: 3 equal columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          {CARDS.map((card) => (
            <HeroCardDesktop key={card.id} card={card} />
          ))}
        </div>

        {/* Mobile: first card full-width, then 2-column for the rest */}
        <div className="md:hidden flex flex-col gap-3">
          <HeroCardDesktop card={CARDS[0]} />
          <div className="grid grid-cols-2 gap-3">
            {CARDS.slice(1).map((card) => (
              <HeroCardMobile key={card.id} card={card} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
