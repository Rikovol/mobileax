import Link from 'next/link';
import Image from 'next/image';
import type { HomeCardData } from '@/lib/home-content';
import { homeImageUrl } from '@/lib/home-content';
import { getBgStyle, getCtaBg } from '@/lib/home-presets';

/**
 * Apple Store promo banners — 2-column большие cards.
 * Карточки приходят из phonebase CMS (props.cards). Пусто → fallback.
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
  ctaBg: string;
}

const FALLBACK: PromoBanner[] = [
  {
    eyebrow: 'Trade-In',
    title: 'Сдайте старое.\nПолучите новое со скидкой.',
    cta: 'Оценить устройство',
    href: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.png',
    imgAlt: 'Trade-In',
    bg: '#fbfbfd',
    textDark: true,
    ctaBg: '#0071e3',
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
    ctaBg: '#0071e3',
  },
];

function cardsFromCms(cms: HomeCardData[] | undefined): PromoBanner[] {
  if (!cms || cms.length === 0) return FALLBACK;
  return cms.map((c) => {
    const style = getBgStyle(c.bg_preset);
    return {
      eyebrow: c.eyebrow ?? '',
      title: c.title ?? '',
      cta: c.cta_label ?? '',
      href: c.cta_href ?? '#',
      imgSrc: homeImageUrl(c.image_url) ?? '/themes/mobileax/heroes/iphone-17-pro.png',
      imgAlt: c.title ?? '',
      bg: style.bg,
      textDark: c.text_dark || !!style.isLight,
      ctaBg: getCtaBg(c.cta_color),
    };
  });
}

interface Props {
  cards?: HomeCardData[];
}

export default function HighlightCards({ cards }: Props = {}) {
  const PROMOS = cardsFromCms(cards);
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {PROMOS.map((p) => {
            const dark = !p.textDark;
            return (
              <Link
                key={p.eyebrow + p.title}
                href={p.href || '#'}
                className="group relative flex flex-col rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.005]"
                style={{
                  background: p.bg,
                  minHeight: 460,
                  textDecoration: 'none',
                }}
                aria-label={p.eyebrow}
              >
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
                  {p.cta && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className="inline-flex items-center justify-center px-5 py-2 rounded-full font-medium text-[14px] transition-opacity group-hover:opacity-90"
                        style={{ background: p.ctaBg, color: '#fff' }}
                      >
                        {p.cta}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative flex-1 mt-4 min-h-[220px]">
                  {p.imgSrc && (
                    <Image
                      src={p.imgSrc}
                      alt={p.imgAlt}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
