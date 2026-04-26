'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface HeroSlide {
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

const SLIDES: HeroSlide[] = [
  {
    id: 0,
    eyebrow: 'Новинка',
    title: 'iPhone 17 Pro',
    subtitle: 'Камера. Производительность. Титан.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Apple',
    secondaryLabel: 'Подробнее',
    secondaryHref: '/catalog/Apple',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.jpg',
    imgAlt: 'iPhone 17 Pro',
    bg: '#000000',
    textDark: false,
  },
  {
    id: 1,
    eyebrow: 'Производительность',
    title: 'MacBook',
    subtitle: 'Лёгкий. Быстрый. До 18 часов работы.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Apple',
    secondaryLabel: 'Подробнее',
    secondaryHref: '/catalog/Apple',
    imgSrc: '/themes/mobileax/heroes/macbook.jpg',
    imgAlt: 'MacBook',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    id: 2,
    eyebrow: 'Trade-In',
    title: 'Сдайте старое. Получите новое.',
    subtitle: 'Мгновенная оценка при вас. Лучшая цена.',
    ctaLabel: 'Оценить устройство',
    ctaHref: '/trade-in',
    secondaryLabel: 'Как это работает',
    secondaryHref: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/airpods-max.jpg',
    imgAlt: 'Trade-In',
    bg: '#1d1d1f',
    textDark: false,
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, goTo]);

  // Keyboard arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <section
      aria-label="Витрина"
      className="relative"
      style={{ background: 'var(--color-bg)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '720px' }}>
        {SLIDES.map((s, i) => {
          const dark = !s.textDark;
          const active = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-label={`Слайд ${i + 1} из ${SLIDES.length}`}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{
                opacity: active ? 1 : 0,
                pointerEvents: active ? 'auto' : 'none',
                background: s.bg,
              }}
            >
              {/* Background image — full bleed, right-aligned */}
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="relative h-full w-full md:w-[60%]">
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain object-right-bottom md:object-right"
                  />
                </div>
              </div>

              {/* Text — left side, vertical center */}
              <div className="relative h-full flex items-center">
                <div
                  className="px-6 md:px-16 max-w-[600px]"
                  style={{ paddingLeft: 'max(24px, calc((100% - 1200px) / 2 + 24px))' }}
                >
                  <p
                    className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] mb-3"
                    style={{ color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.5)' }}
                  >
                    {s.eyebrow}
                  </p>
                  <h1
                    className="font-semibold leading-[1.05]"
                    style={{
                      fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                      letterSpacing: '-0.04em',
                      color: dark ? '#f5f5f7' : '#1d1d1f',
                    }}
                  >
                    {s.title}
                  </h1>
                  <p
                    className="mt-4 max-w-[460px]"
                    style={{
                      fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                      lineHeight: 1.4,
                      color: dark ? 'rgba(255,255,255,0.72)' : '#6e6e73',
                    }}
                  >
                    {s.subtitle}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={s.ctaHref}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-medium text-[15px] transition-opacity hover:opacity-90"
                      style={{ background: '#0071e3' }}
                    >
                      {s.ctaLabel}
                    </Link>
                    <Link
                      href={s.secondaryHref}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium text-[15px] transition-colors"
                      style={
                        dark
                          ? { color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }
                          : { color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.2)' }
                      }
                    >
                      {s.secondaryLabel}
                      <svg className="ml-1.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Предыдущий слайд"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="#1d1d1f" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Следующий слайд"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="#1d1d1f" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Перейти к слайду ${i + 1}`}
              aria-current={i === index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 24 : 8,
                background: i === index
                  ? (SLIDES[index].textDark ? '#1d1d1f' : '#f5f5f7')
                  : (SLIDES[index].textDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)'),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
