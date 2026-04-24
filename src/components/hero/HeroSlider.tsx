'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  eyebrow: string;
  title: string;
  titleAccent?: string;
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

const SLIDES: Slide[] = [
  {
    id: 0,
    eyebrow: 'Новинка',
    title: 'iPhone 17',
    titleAccent: 'Pro Max.',
    subtitle: 'Камера. Производительность. Титан.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Apple',
    secondaryLabel: 'Подробнее',
    secondaryHref: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone 17 Pro Max',
    bg: 'linear-gradient(160deg, #1c1c1e 0%, #2c2c2e 60%, #3a3a3c 100%)',
    textDark: false,
  },
  {
    id: 1,
    eyebrow: 'Galaxy S26 Ultra',
    title: 'Samsung.',
    titleAccent: 'Другой уровень.',
    subtitle: 'AI-камера 200 Мп. S Pen. Cosmic Violet.',
    ctaLabel: 'Купить',
    ctaHref: '/catalog/Samsung',
    secondaryLabel: 'Все Samsung',
    secondaryHref: '/catalog/Samsung',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/products/66/19/11966/images/12270/12270.240.jpg',
    imgAlt: 'Samsung Galaxy S26 Ultra',
    bg: 'linear-gradient(160deg, #f0f0f5 0%, #e8e8f0 100%)',
    textDark: true,
  },
  {
    id: 2,
    eyebrow: 'Trade‑In',
    title: 'Сдайте старое.',
    titleAccent: 'Получите новое.',
    subtitle: 'Мгновенная оценка при вас. Лучшая цена.',
    ctaLabel: 'Оценить устройство',
    ctaHref: '/trade-in',
    secondaryLabel: 'Как это работает',
    secondaryHref: '/trade-in',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/products/30/02/10230/images/11504/11504.240.jpg',
    imgAlt: 'Trade-In MacBook',
    bg: 'linear-gradient(160deg, #e8f4f8 0%, #d0e8f0 100%)',
    textDark: true,
  },
];

const INTERVAL_MS = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  const goto = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, INTERVAL_MS);
  }, [total]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq || !mq.matches) startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') { goto(current - 1); startTimer(); }
      else if (e.key === 'ArrowRight') { goto(current + 1); startTimer(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goto, startTimer]);

  const touchStartX = useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) { goto(current + (delta < 0 ? 1 : -1)); startTimer(); }
    touchStartX.current = null;
  }

  const slide = SLIDES[current];
  const dark = !slide.textDark;

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'min(100svh, 680px)' }}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Слайдер главной страницы"
    >
      {/* Background transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ background: slide.bg }}
        />
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 h-full"
        >
          <div
            className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 px-6 md:px-16 lg:px-24 py-16 md:py-20"
            style={{ maxWidth: '1400px', minHeight: 'min(100svh, 680px)' }}
          >
            {/* Text block */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)' }}
              >
                {slide.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold tracking-tight leading-[1.03]"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.04em',
                  color: dark ? '#f5f5f7' : '#1d1d1f',
                }}
              >
                {slide.title}
                {slide.titleAccent && (
                  <span
                    className="block"
                    style={{ color: dark ? '#fff' : '#1d1d1f' }}
                  >
                    {slide.titleAccent}
                  </span>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="mt-4 text-[1.0625rem] md:text-[1.1875rem] leading-snug"
                style={{ color: dark ? 'rgba(255,255,255,0.65)' : '#424245' }}
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <a
                  href={slide.ctaHref}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full text-white font-medium text-[0.9375rem] transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={{ background: '#0071e3' }}
                >
                  {slide.ctaLabel}
                </a>
                <a
                  href={slide.secondaryHref}
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full font-medium text-[0.9375rem] transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={
                    dark
                      ? { color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }
                      : { color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.25)' }
                  }
                >
                  {slide.secondaryLabel}
                  <svg className="ml-1.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Product image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 flex items-center justify-center order-1 md:order-2"
            >
              <div className="relative w-[240px] h-[280px] md:w-[340px] md:h-[400px] lg:w-[420px] lg:h-[480px]">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-75"
                  style={{ background: dark ? '#fff' : '#0071e3' }}
                />
                <Image
                  src={slide.imgSrc}
                  alt={slide.imgAlt}
                  fill
                  className="object-contain relative z-10 drop-shadow-2xl"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 340px, 420px"
                  priority={current === 0}
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => { goto(current - 1); startTimer(); }}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style={{
          background: dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)',
          backdropFilter: 'blur(12px)',
          border: dark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.12)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#1d1d1f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Следующий слайд"
        onClick={() => { goto(current + 1); startTimer(); }}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style={{
          background: dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)',
          backdropFilter: 'blur(12px)',
          border: dark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.12)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#1d1d1f'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Слайд ${i + 1}`}
            onClick={() => { goto(i); startTimer(); }}
            className="rounded-full transition-all duration-300 border-0 p-0 cursor-pointer"
            style={{
              height: '7px',
              width: i === current ? '26px' : '7px',
              background: dark
                ? i === current ? '#fff' : 'rgba(255,255,255,0.3)'
                : i === current ? '#1d1d1f' : 'rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
