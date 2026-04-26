import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Контакты — МобилАкс в Орле',
  description: 'Адрес: ул. Автовокзальная, 1. Время работы пн-вс 09:00–19:00. Телефон +7 930 063-23-70.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/contacts',
  },
};

export default function ContactsPage() {
  return (
    <div className="section-container section-gap">
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Контакты</span>
      </nav>

      <h1 className="hero-title mb-3">Контакты</h1>
      <p className="hero-subtitle mb-10">Звоните, приходите, пишите.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
        {/* Адрес */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 opacity-60"
            style={{ color: 'var(--color-text)' }}
          >
            Адрес
          </p>
          <p className="text-[1.0625rem] leading-snug mb-2" style={{ color: 'var(--color-text)' }}>
            г. Орёл, ул. Автовокзальная, д. 1А
          </p>
          <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
            Подземный переход
          </p>
        </div>

        {/* Время */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 opacity-60"
            style={{ color: 'var(--color-text)' }}
          >
            Часы работы
          </p>
          <p className="text-[1.0625rem] leading-snug mb-2" style={{ color: 'var(--color-text)' }}>
            Пн–Вс: 09:00 — 19:00
          </p>
          <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
            Без выходных
          </p>
        </div>

        {/* Телефон */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 opacity-60"
            style={{ color: 'var(--color-text)' }}
          >
            Телефон
          </p>
          <a
            href="tel:+79300632370"
            className="inline-block text-[1.25rem] font-semibold leading-snug mb-2 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
          >
            +7 930 063-23-70
          </a>
          <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
            Звонки и WhatsApp
          </p>
        </div>

        {/* Email + Соц */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 opacity-60"
            style={{ color: 'var(--color-text)' }}
          >
            Email & соцсети
          </p>
          <a
            href="mailto:info@mobileax.ru"
            className="block text-[1.0625rem] mb-3 transition-colors hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
          >
            info@mobileax.ru
          </a>
          <div className="flex gap-3 text-[14px]">
            <a
              href="https://vk.com/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)' }}
              className="hover:opacity-80"
            >
              VK
            </a>
            <a
              href="https://t.me/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-accent)' }}
              className="hover:opacity-80"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Карта Яндекс с карточкой организации (org_id=1149010257) */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.375rem, 2.6vw, 1.75rem)', letterSpacing: '-0.025em' }}
        >
          Как нас найти
        </h2>
        <div
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)', aspectRatio: '16/9' }}
        >
          <iframe
            src="https://yandex.ru/map-widget/v1/?z=17&ol=biz&oid=1149010257"
            width="100%"
            height="100%"
            allowFullScreen
            title="МобилАкс на Яндекс.Картах"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-3 text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
          <a
            href="https://yandex.ru/maps/org/mobilaks/1149010257/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)' }}
          >
            Открыть в Яндекс.Картах →
          </a>
        </p>
      </section>

      {/* Отзывы Яндекс */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.375rem, 2.6vw, 1.75rem)', letterSpacing: '-0.025em' }}
        >
          Отзывы клиентов
        </h2>
        <div
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)', minHeight: 480 }}
        >
          <iframe
            src="https://yandex.ru/sprav/widget/rating-badge/1149010257?type=award"
            width="100%"
            height="120"
            title="Рейтинг МобилАкс на Яндекс.Картах"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="p-6 md:p-8">
            <p className="text-[14px] mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Все отзывы клиентов читайте на Яндекс.Картах. Поделитесь своим — это помогает другим
              орловцам выбрать правильный магазин.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://yandex.ru/maps/org/mobilaks/1149010257/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white font-medium text-[14px] transition-opacity hover:opacity-90"
                style={{ background: '#0071e3' }}
              >
                Все отзывы →
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

      {/* Реквизиты — раскрывающийся список */}
      <section>
        <details
          className="rounded-3xl border overflow-hidden"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <summary
            className="cursor-pointer p-6 md:p-7 select-none transition-colors hover:opacity-80"
            style={{ listStyle: 'none' }}
          >
            <span
              className="font-semibold text-[1.0625rem]"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
            >
              Реквизиты организации
            </span>
            <span
              className="ml-2 text-[14px]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              ИП Васильев Павел Владимирович — раскрыть
            </span>
          </summary>
          <div
            className="px-6 md:px-7 pb-6 md:pb-7 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[14px]"
            style={{ color: 'var(--color-text)' }}
          >
            <Field label="Полное наименование" value="Индивидуальный предприниматель Васильев Павел Владимирович" />
            <Field label="Сокращённое" value="ИП Васильев П. В." />
            <Field label="ОГРНИП" value="315574500000826" />
            <Field label="ИНН" value="572005412882" />
            <Field label="Дата регистрации" value="с 2015 года" />
            <Field label="Юридический адрес" value="г. Орёл, ул. Автовокзальная, д. 1" />
            <Field label="Фактический адрес" value="г. Орёл, ул. Автовокзальная, д. 1" />
            <Field label="Телефон" value="+7 930 063-23-70" />
            <Field label="Email" value="info@mobileax.ru" />
            <Field label="Налоговый режим" value="УСН" />
          </div>
        </details>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1 opacity-60"
        style={{ color: 'var(--color-text)' }}
      >
        {label}
      </p>
      <p className="leading-snug" style={{ color: 'var(--color-text)' }}>
        {value}
      </p>
    </div>
  );
}
