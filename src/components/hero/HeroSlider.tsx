import Link from 'next/link';
import Image from 'next/image';

/**
 * Hero — две inline карточки с PNG (без фона), цветными градиентами,
 * геометрическими акцентами и яркими CTA в Apple Store-style.
 */

interface HeroProductCard {
  eyebrow: string;
  title: string;
  cta: string;
  ctaHref: string;
  imgSrc: string;
  imgAlt: string;
  /** Стилистика: 'pro' = тёмный titanium / 'e' = светлый peach */
  variant: 'pro' | 'e';
}

const PRODUCTS: HeroProductCard[] = [
  {
    eyebrow: 'iPhone 17 Pro',
    title: 'Идеальный iPhone.',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=iphone&line=17-pro',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.png',
    imgAlt: 'iPhone 17 Pro',
    variant: 'pro',
  },
  {
    eyebrow: 'Trade-In',
    title: 'Сдай старый — получи скидку.',
    cta: 'Оценить',
    ctaHref: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/tradein.png',
    imgAlt: 'Trade-In: обмен старого телефона на новый',
    variant: 'e',
  },
];

function ProDecorations() {
  return (
    <>
      {/* Большое холодное голубое сияние сверху-слева */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '-15%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(80,160,255,0.45) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Фиолетовое сияние снизу-справа */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: '-20%',
          right: '-15%',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(180,120,255,0.32) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Кольцо */}
      <svg
        aria-hidden
        className="pointer-events-none absolute"
        style={{ top: '8%', right: '6%', width: 90, height: 90, opacity: 0.35 }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
      </svg>
      {/* Точечная сетка */}
      <svg
        aria-hidden
        className="pointer-events-none absolute"
        style={{ bottom: '12%', left: '6%', width: 100, height: 60, opacity: 0.18 }}
        viewBox="0 0 100 60"
      >
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 9 + 2} cy={r * 9 + 2} r="0.9" fill="white" />
          )),
        )}
      </svg>
    </>
  );
}

function EDecorations() {
  return (
    <>
      {/* Тёплый персиковый blob сверху-справа */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '-15%',
          right: '-10%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(255,180,140,0.65) 0%, transparent 65%)',
          filter: 'blur(35px)',
        }}
      />
      {/* Мягкий жёлтый blob снизу-слева */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: '-15%',
          left: '-15%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(255,210,150,0.55) 0%, transparent 60%)',
          filter: 'blur(45px)',
        }}
      />
      {/* Кольцо */}
      <svg
        aria-hidden
        className="pointer-events-none absolute"
        style={{ top: '10%', left: '6%', width: 80, height: 80, opacity: 0.5 }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="#d97757" strokeWidth="1" />
      </svg>
      {/* Тонкая диагональная линия */}
      <svg
        aria-hidden
        className="pointer-events-none absolute"
        style={{ top: '40%', right: '10%', width: 120, height: 2, opacity: 0.35 }}
        viewBox="0 0 120 2"
      >
        <line x1="0" y1="1" x2="120" y2="1" stroke="#d97757" strokeWidth="1.2" strokeDasharray="3 4" />
      </svg>
    </>
  );
}

export default function HeroSlider() {
  return (
    <section aria-label="Витрина новинок" style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-3 md:py-5">
        {/* Top headline */}
        <div className="mb-4 md:mb-5">
          {/* На широких экранах — одна строка во всю ширину контейнера.
              На мобильных — заголовок и подзаголовок переносятся на 2 строки. */}
          <h1
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
              letterSpacing: '-0.025em',
              color: '#1d1d1f',
              lineHeight: 1.2,
            }}
          >
            <span className="block md:inline">Лучшее уже здесь.</span>{' '}
            <span
              className="block md:inline mt-1 md:mt-0"
              style={{
                color: '#86868b',
                fontSize: 'clamp(0.8125rem, 1.2vw, 1rem)',
                fontWeight: 500,
              }}
            >
              Откройте для себя последнюю серию iPhone, Mac, AirPods и многое другое.
            </span>
          </h1>
        </div>

        {/* 2 inline product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {PRODUCTS.map((p) => {
            const isPro = p.variant === 'pro';
            const cardBg = isPro
              ? 'linear-gradient(135deg, #0a0f1f 0%, #14192e 50%, #0d1226 100%)'
              : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 50%, #ffd5b8 100%)';
            const eyebrowColor = isPro ? 'rgba(255,255,255,0.6)' : 'rgba(80,40,20,0.55)';
            const titleColor = isPro ? '#f5f5f7' : '#1d1d1f';
            const ctaGradient = isPro
              ? 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)'
              : 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)';
            const ctaShadow = isPro
              ? '0 8px 24px rgba(0,120,255,0.45), inset 0 1px 0 rgba(255,255,255,0.25)'
              : '0 8px 24px rgba(255,107,53,0.45), inset 0 1px 0 rgba(255,255,255,0.3)';

            return (
              <Link
                key={p.eyebrow}
                href={p.ctaHref}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.005]"
                style={{
                  background: cardBg,
                  minHeight: 600,
                  textDecoration: 'none',
                }}
                aria-label={p.eyebrow}
              >
                {/* Геометрические декорации */}
                {isPro ? <ProDecorations /> : <EDecorations />}

                {/* Text — top */}
                <div className="relative z-10 p-7 md:p-9 pb-0">
                  <p
                    className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: eyebrowColor }}
                  >
                    {p.eyebrow}
                  </p>
                  <h2
                    className="font-semibold tracking-tight"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      letterSpacing: '-0.025em',
                      color: titleColor,
                      lineHeight: 1.1,
                    }}
                  >
                    {p.title}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-white font-semibold text-[14px] transition-all duration-200 group-hover:translate-y-[-2px] group-hover:brightness-110"
                      style={{
                        background: ctaGradient,
                        boxShadow: ctaShadow,
                      }}
                    >
                      {p.cta}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Image — крупный hero; внешний scale + inner hover scale */}
                <div
                  className="relative flex-1 mt-1 min-h-[380px] z-[1]"
                  style={{
                    transform: 'scale(1.45)',
                    transformOrigin: 'bottom center',
                  }}
                >
                  <Image
                    src={p.imgSrc}
                    alt={p.imgAlt}
                    fill
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 130vw, 70vw"
                    priority
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
