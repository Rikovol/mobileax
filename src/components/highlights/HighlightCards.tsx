import Link from 'next/link';
import Image from 'next/image';

/**
 * Apple Store promo banners — 2-column большие cards.
 * Replicate of "Save with Apple Trade In" + "Carrier deals" section.
 */

interface PromoBanner {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark: boolean;
}

const PROMOS: PromoBanner[] = [
  {
    eyebrow: 'Trade-In',
    title: 'Сдайте старое.\nПолучите новое со скидкой.',
    cta: 'Оценить устройство',
    href: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.png',
    imgAlt: 'Trade-In',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    eyebrow: 'Рассрочка 0%',
    title: 'Сегодня — техника.\nПлатите потом.',
    cta: 'Узнать условия',
    href: '/delivery',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.png',
    imgAlt: 'Рассрочка',
    bg: '#1d1d1f',
    textDark: false,
  },
];

export default function HighlightCards() {
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {PROMOS.map((p) => {
            const dark = !p.textDark;
            return (
              <Link
                key={p.eyebrow}
                href={p.href}
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
                    className="font-semibold tracking-tight whitespace-pre-line"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      letterSpacing: '-0.025em',
                      color: dark ? '#f5f5f7' : '#1d1d1f',
                      lineHeight: 1.15,
                    }}
                  >
                    {p.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center justify-center px-5 py-2 rounded-full font-medium text-[14px] transition-opacity group-hover:opacity-90"
                      style={
                        dark
                          ? { background: '#0071e3', color: '#fff' }
                          : { background: '#0071e3', color: '#fff' }
                      }
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
