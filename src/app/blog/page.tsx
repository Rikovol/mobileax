import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Блог — МобилАкс',
  description: 'Скоро здесь появятся обзоры, советы по выбору и новости Apple и Samsung.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/blog',
  },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <div className="section-container py-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Блог</span>
      </nav>

      <h1
        className="font-semibold tracking-tight mb-2"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          letterSpacing: '-0.025em',
          color: 'var(--color-text)',
          lineHeight: 1.15,
        }}
      >
        Блог
      </h1>
      <p className="text-[15px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Обзоры новинок Apple, советы по выбору, разборы технологий — всё это скоро появится здесь.
      </p>

      {/* Главный «coming soon» баннер */}
      <section
        className="rounded-3xl p-8 md:p-12 relative overflow-hidden mb-8"
        style={{
          background:
            'linear-gradient(135deg, #fff5e6 0%, #fef3c7 30%, #ffe4cc 60%, #ffd5b8 100%)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: 'radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            bottom: '-30%',
            left: '-10%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.20) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="relative" style={{ maxWidth: 720 }}>
          <div
            className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold mb-4"
            style={{ background: 'rgba(0,113,227,0.18)', color: '#0050a0' }}
          >
            Скоро
          </div>
          <h2
            className="font-semibold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '-0.03em',
              color: '#1d1d1f',
              lineHeight: 1.15,
            }}
          >
            Готовим обзоры, советы и разборы
          </h2>
          <p
            className="mb-2"
            style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: 'rgba(0,0,0,0.75)' }}
          >
            Здесь будут материалы о том, как выбрать iPhone под свои задачи, чем
            отличаются модели Samsung Galaxy, и какие функции реально стоят
            переплаты.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(0,0,0,0.65)' }}>
            А пока подписывайтесь на наш Telegram — там быстрые анонсы новых
            поступлений, скидки и короткие советы.
          </p>
        </div>
      </section>

      {/* CTA — Telegram */}
      <section
        className="rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #229ED9 0%, #54A9EB 100%)',
          boxShadow: '0 12px 32px rgba(34, 158, 217, 0.30)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: '-30%',
            right: '-15%',
            width: '50%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div className="relative">
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{ background: 'rgba(255,255,255,0.20)' }}
            aria-hidden
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </span>
          <h3
            className="font-semibold tracking-tight mb-2"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
          >
            Подписаться на Telegram-канал
          </h3>
          <p
            className="mb-6 mx-auto"
            style={{ fontSize: '15px', lineHeight: 1.6, opacity: 0.92, maxWidth: 480 }}
          >
            Новинки, акции, советы и анонсы — без спама, только то, что реально пригодится.
          </p>
          <a
            href="https://t.me/mobileaxorel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:translate-y-[-2px]"
            style={{
              background: '#fff',
              color: '#229ED9',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            }}
          >
            Перейти в Telegram →
          </a>
        </div>
      </section>
    </div>
  );
}
