import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Отзывы клиентов — МобилАкс',
  description:
    'Все отзывы о магазине МобилАкс — на Яндекс.Картах. Рейтинг 5,0, более сотни подтверждённых отзывов клиентов из Орла.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/reviews',
  },
  robots: { index: false, follow: true },
};

export default function ReviewsPage() {
  return (
    <div className="section-container py-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Отзывы', href: '/reviews' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Отзывы</span>
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
        Отзывы клиентов
      </h1>
      <p className="text-[15px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Все отзывы о магазине — на Яндекс.Картах. Это подтверждённые отзывы реальных клиентов,
        которые приходили к нам в Орле.
      </p>

      {/* Большая 5,0 рейтинг-карточка */}
      <section className="mb-8">
        <div
          className="rounded-3xl border p-6 md:p-8"
          style={{
            borderColor: 'var(--color-border)',
            background: 'linear-gradient(135deg, #fffbed 0%, #fff5d6 100%)',
          }}
        >
          <a
            href="https://yandex.ru/maps/org/mobilaks/1149010257/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 mb-5 group"
            aria-label="Открыть отзывы на Яндекс.Картах"
          >
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-6 py-4"
              style={{
                background: 'linear-gradient(135deg, #ffcc00 0%, #ff9b21 100%)',
                boxShadow: '0 8px 22px rgba(255,170,0,0.40)',
                color: '#1d1d1f',
                minWidth: 120,
              }}
            >
              <div
                className="font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', letterSpacing: '-0.025em' }}
              >
                5,0
              </div>
              <div className="flex gap-0.5 mt-2" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#1d1d1f">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div
                className="font-semibold leading-tight mb-1.5"
                style={{ color: 'var(--color-text)', fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)' }}
              >
                Рейтинг на Яндекс.Картах
              </div>
              <div
                className="text-[14px] group-hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Подтверждённые отзывы клиентов · смотреть все →
              </div>
            </div>
          </a>

          <div className="border-t pt-5" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p
              className="text-[14px] mb-4"
              style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}
            >
              Мы не публикуем отзывы у себя на сайте, чтобы не было соблазна их редактировать.
              Все мнения собираем на независимых платформах — там вы видите честную картину.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://yandex.ru/maps/org/mobilaks/1149010257/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white font-medium text-[14px] transition-opacity hover:opacity-90"
                style={{ background: '#0071e3' }}
              >
                Все отзывы на Я.Картах →
              </a>
              <a
                href="https://yandex.ru/maps/org/mobilaks/1149010257/?action=newReview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium text-[14px] transition-colors"
                style={{
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
              >
                Оставить отзыв
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Доп. ссылки */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/contacts"
          className="group rounded-3xl p-6 border transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h3
            className="font-semibold text-[1.0625rem] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            Связаться с нами →
          </h3>
          <p
            className="text-[14px]"
            style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55 }}
          >
            Адрес, телефон, мессенджеры и часы работы магазина в Орле.
          </p>
        </Link>
        <Link
          href="/about"
          className="group rounded-3xl p-6 border transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h3
            className="font-semibold text-[1.0625rem] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            О магазине →
          </h3>
          <p
            className="text-[14px]"
            style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55 }}
          >
            15+ лет в Орле, более 10 000 довольных клиентов, новая и проверенная б/у-техника.
          </p>
        </Link>
      </section>
    </div>
  );
}
