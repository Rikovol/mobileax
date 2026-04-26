'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardSlide {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark: boolean;
}

interface HeroCard {
  id: string;
  slides: CardSlide[];
  autoplayMs?: number;
}

const CARDS: HeroCard[] = [
  {
    id: 'iphone',
    autoplayMs: 6500,
    slides: [
      {
        eyebrow: 'Новинка',
        title: 'iPhone 17 Pro',
        subtitle: 'Камера. Производительность. Титан.',
        ctaLabel: 'Купить',
        ctaHref: '/catalog/Apple?category=iphone',
        imgSrc: '/themes/mobileax/heroes/iphone-17-pro.jpg',
        imgAlt: 'iPhone 17 Pro',
        bg: '#000000',
        textDark: false,
      },
      {
        eyebrow: 'Доступно',
        title: 'iPhone 17e',
        subtitle: 'Та же мощь. Цена приятнее.',
        ctaLabel: 'Купить',
        ctaHref: '/catalog/Apple?category=iphone',
        imgSrc: '/themes/mobileax/heroes/iphone-17e.jpg',
        imgAlt: 'iPhone 17e',
        bg: '#fbfbfd',
        textDark: true,
      },
    ],
  },
  {
    id: 'mac',
    autoplayMs: 7500,
    slides: [
      {
        eyebrow: 'Производительность',
        title: 'MacBook',
        subtitle: 'Лёгкий. Быстрый. До 18 часов.',
        ctaLabel: 'Купить',
        ctaHref: '/catalog/Apple?category=mac',
        imgSrc: '/themes/mobileax/heroes/macbook.jpg',
        imgAlt: 'MacBook',
        bg: '#fbfbfd',
        textDark: true,
      },
      {
        eyebrow: 'Звук',
        title: 'AirPods Max',
        subtitle: 'Активное шумоподавление',
        ctaLabel: 'Купить',
        ctaHref: '/catalog/Apple?category=airpods',
        imgSrc: '/themes/mobileax/heroes/airpods-max.jpg',
        imgAlt: 'AirPods Max',
        bg: '#1d1d1f',
        textDark: false,
      },
    ],
  },
  {
    id: 'trade-in',
    autoplayMs: 8500,
    slides: [
      {
        eyebrow: 'Trade-In',
        title: 'Сдайте старое.\nПолучите новое.',
        subtitle: 'Мгновенная оценка при вас.',
        ctaLabel: 'Оценить устройство',
        ctaHref: '/trade-in',
        imgSrc: '/themes/mobileax/heroes/iphone-17-pro.jpg',
        imgAlt: 'Trade-In iPhone',
        bg: '#0a2a4a',
        textDark: false,
      },
      {
        eyebrow: 'Рассрочка 0%',
        title: 'Сегодня — техника.\nПлатите потом.',
        subtitle: 'До 24 месяцев без переплат.',
        ctaLabel: 'Узнать условия',
        ctaHref: '/delivery',
        imgSrc: '/themes/mobileax/heroes/iphone-17e.jpg',
        imgAlt: 'Рассрочка',
        bg: '#1c1c1e',
        textDark: false,
      },
    ],
  },
];

function CardSliderInner({ card, big = false }: { card: HeroCard; big?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || card.slides.length <= 1) return;
    const t = setTimeout(
      () => setIdx((i) => (i + 1) % card.slides.length),
      card.autoplayMs ?? 6500,
    );
    return () => clearTimeout(t);
  }, [idx, paused, card.slides.length, card.autoplayMs]);

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {card.slides.map((s, i) => {
        const dark = !s.textDark;
        const active = i === idx;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: active ? 1 : 0,
              pointerEvents: active ? 'auto' : 'none',
              background: s.bg,
            }}
            aria-hidden={!active}
          >
            <Link
              href={s.ctaHref}
              className="group relative block h-full w-full"
              aria-label={s.title}
              style={{ textDecoration: 'none' }}
            >
              {/* Text — top */}
              <div className={`relative z-10 ${big ? 'p-8 lg:p-10' : 'p-6 lg:p-7'}`}>
                <p
                  className={`font-semibold uppercase tracking-[0.14em] mb-3 ${
                    big ? 'text-[12px]' : 'text-[11px]'
                  }`}
                  style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
                >
                  {s.eyebrow}
                </p>
                <h2
                  className="font-semibold leading-tight mb-2 whitespace-pre-line"
                  style={{
                    fontSize: big ? 'clamp(1.5rem, 2.4vw, 2.25rem)' : 'clamp(1.125rem, 1.8vw, 1.5rem)',
                    letterSpacing: '-0.03em',
                    color: dark ? '#f5f5f7' : '#1d1d1f',
                  }}
                >
                  {s.title}
                </h2>
                <p
                  className={big ? 'text-[15px] mb-6' : 'text-[13px] mb-5'}
                  style={{ color: dark ? 'rgba(255,255,255,0.62)' : '#6e6e73' }}
                >
                  {s.subtitle}
                </p>
                <span
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white font-medium text-[13px] transition-opacity group-hover:opacity-90"
                  style={{ background: '#0071e3' }}
                >
                  {s.ctaLabel}
                </span>
              </div>

              {/* Image — fills bottom */}
              <div className={`absolute left-0 right-0 bottom-0 ${big ? 'h-[55%]' : 'h-[50%]'}`}>
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt}
                    fill
                    priority={i === 0}
                    sizes={big ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </Link>
          </div>
        );
      })}

      {/* Dots — only if >1 slide */}
      {card.slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {card.slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIdx(i);
              }}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === idx}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 18 : 6,
                background: !card.slides[idx].textDark
                  ? i === idx
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.35)'
                  : i === idx
                  ? 'rgba(0,0,0,0.7)'
                  : 'rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CardWrapper({ card, big = false }: { card: HeroCard; big?: boolean }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        minHeight: big ? 460 : 340,
        background: card.slides[0].bg,
      }}
    >
      <CardSliderInner card={card} big={big} />
    </div>
  );
}

export default function HeroSlider() {
  return (
    <section aria-label="Витрина" style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-8 md:py-12">
        {/* Desktop: 3 equal columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          {CARDS.map((card) => (
            <CardWrapper key={card.id} card={card} />
          ))}
        </div>

        {/* Mobile: first card big, then 2-cell grid for rest */}
        <div className="md:hidden flex flex-col gap-3">
          <CardWrapper card={CARDS[0]} big />
          <div className="grid grid-cols-2 gap-3">
            {CARDS.slice(1).map((card) => (
              <CardWrapper key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
