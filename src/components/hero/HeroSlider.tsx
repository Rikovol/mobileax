import Link from 'next/link';
import Image from 'next/image';

/**
 * Apple Store hero — точная репликация:
 * "Welcome to the Apple Store. The latest is here."
 * + 2 inline product cards (iPhone 17 Pro + iPhone 17e)
 */

interface HeroProductCard {
  eyebrow: string;
  title: string;
  cta: string;
  ctaHref: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark: boolean;
}

const PRODUCTS: HeroProductCard[] = [
  {
    eyebrow: 'iPhone 17 Pro',
    title: 'The ultimate iPhone.',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=iphone&line=17-pro',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.jpg',
    imgAlt: 'iPhone 17 Pro',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    eyebrow: 'iPhone 17e',
    title: 'iPhone in a new key.',
    cta: 'Купить',
    ctaHref: '/catalog/Apple?category=iphone&line=17',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.jpg',
    imgAlt: 'iPhone 17e',
    bg: '#fbfbfd',
    textDark: true,
  },
];

export default function HeroSlider() {
  return (
    <section aria-label="Витрина новинок" style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-10 md:py-14">
        {/* Top headline — "Store. The latest is here." (минимум, как у Apple) */}
        <div className="mb-6 md:mb-8">
          <p
            className="text-[14px] md:text-[15px] font-semibold mb-1.5"
            style={{ color: '#1d1d1f' }}
          >
            МобилАкс
          </p>
          <h1
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              letterSpacing: '-0.03em',
              color: '#1d1d1f',
              lineHeight: 1.1,
            }}
          >
            Лучшее уже здесь.{' '}
            <span style={{ color: '#86868b' }}>
              Откройте для себя последнюю серию iPhone, Mac, AirPods и многое другое.
            </span>
          </h1>
        </div>

        {/* 2 inline product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {PRODUCTS.map((p) => {
            const dark = !p.textDark;
            return (
              <Link
                key={p.eyebrow}
                href={p.ctaHref}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.005]"
                style={{
                  background: p.bg,
                  minHeight: 460,
                  textDecoration: 'none',
                }}
                aria-label={p.eyebrow}
              >
                {/* Text — top */}
                <div className="relative z-10 p-7 md:p-9 pb-0">
                  <p
                    className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}
                  >
                    {p.eyebrow}
                  </p>
                  <h2
                    className="font-semibold tracking-tight"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      letterSpacing: '-0.025em',
                      color: dark ? '#f5f5f7' : '#1d1d1f',
                      lineHeight: 1.1,
                    }}
                  >
                    {p.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white font-medium text-[14px] transition-opacity group-hover:opacity-90"
                      style={{ background: '#0071e3' }}
                    >
                      {p.cta}
                    </span>
                  </div>
                </div>

                {/* Image — fills remaining bottom area */}
                <div className="relative flex-1 mt-4 min-h-[220px]">
                  <Image
                    src={p.imgSrc}
                    alt={p.imgAlt}
                    fill
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
