import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL } from '@/lib/legal';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';

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
      <LocalBusinessSchema />
      <Breadcrumbs items={[{ label: 'Контакты', href: '/contacts' }]} />
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
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-4 opacity-60"
            style={{ color: 'var(--color-text)' }}
          >
            Email & соцсети
          </p>

          {/* Email — карточка с иконкой */}
          <a
            href="mailto:info@mobileax.ru"
            className="group flex items-center gap-3 mb-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <span
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#0071e3', color: '#fff' }}
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider opacity-60" style={{ color: 'var(--color-text)' }}>
                E-mail
              </div>
              <div
                className="text-[15px] font-medium truncate group-hover:opacity-80 transition-opacity"
                style={{ color: 'var(--color-text)' }}
              >
                info@mobileax.ru
              </div>
            </div>
          </a>

          {/* Соцсети — три кнопки в ряд с фирменными цветами и SVG-иконками */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href="https://vk.com/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{ background: '#0077FF', boxShadow: '0 4px 12px rgba(0,119,255,0.25)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.5 17.5h1.4c.5 0 .7-.3.7-.7 0-1.4 0-2.7 1-2.7.4 0 .9.3 1.7 1.1 1.4 1.4 1.7 2.3 2.6 2.3h2.4c.7 0 1-.3.8-.9-.3-.9-2-2.7-2.1-2.8-.4-.5-.5-.7 0-1.3.4-.4 2.6-3.2 2.8-4.3.1-.4 0-.8-.6-.8h-2.4c-.6 0-.8.3-.9.7 0 0-1.2 2.6-2.7 4.3-.5.5-.7.7-1 .7-.2 0-.4-.2-.4-.7v-4.1c0-.6-.2-.9-.7-.9H7.7c-.4 0-.6.2-.6.5 0 .6.9.7 1 2.4v3.6c0 .8-.1.9-.4.9-.7 0-2-2-3.1-4.3-.2-.5-.4-.7-1-.7H1.2c-.4 0-.6.2-.6.5 0 .7 1.5 4.6 4.5 7.7 2 2.1 4.7 3.2 7.4 3.2z"/>
              </svg>
              <span className="text-[12px] font-semibold">VK</span>
            </a>
            <a
              href="https://t.me/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{ background: '#229ED9', boxShadow: '0 4px 12px rgba(34,158,217,0.25)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.7 4 2.6 11c-1.2.5-1.2 1.2-.2 1.5l4.6 1.5L17.7 7c.5-.3 1-.2.6.2L9 15.5v.1l-.4 5c.4 0 .6-.2.9-.4l2.1-2 4.4 3.3c.8.5 1.4.2 1.6-.7L21.5 5c.3-1.2-.4-1.7-1.2-1z"/>
              </svg>
              <span className="text-[12px] font-semibold">Telegram</span>
            </a>
            <a
              href="https://max.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MAX"
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{ background: '#1d1d1f', boxShadow: '0 4px 12px rgba(0,0,0,0.18)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 21V3h3l5 8 5-8h3v18h-3V9l-5 8L6 9v12z"/>
              </svg>
              <span className="text-[12px] font-semibold">MAX</span>
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
          style={{ borderColor: 'var(--color-border)' }}
        >
          <iframe
            src="https://yandex.ru/sprav/widget/rating-badge/1149010257?type=award"
            width="100%"
            height="100"
            title="Рейтинг МобилАкс на Яндекс.Картах"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="px-5 py-4 md:px-6 md:py-5">
            <p className="text-[13px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              Все отзывы — на Яндекс.Картах. Поделитесь своим, это помогает другим орловцам.
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
            <Field label="Полное наименование" value={LEGAL.fullName} />
            <Field label="Сокращённое" value={LEGAL.shortName} />
            <Field label="Вид предпринимательства" value="Индивидуальный предприниматель" />
            <Field label="ОГРНИП" value={LEGAL.ogrnip} />
            <Field label="ИНН" value={LEGAL.inn} />
            <Field label="Дата регистрации ИП" value={LEGAL.registrationDate} />
            <Field label="Постановка на налоговый учёт" value={LEGAL.taxRegistrationDate} />
            <Field label="Налоговый орган" value={LEGAL.taxAuthority} />
            <Field label="Налоговый режим" value={LEGAL.taxRegime} />
            <Field label="ОКПО" value={LEGAL.okpo} />
            <Field label="ОКАТО" value={LEGAL.okato} />
            <Field label="ОКТМО" value={LEGAL.oktmo} />
            <Field label="Регистрационный номер ПФР" value={LEGAL.pfrRegNumber} />
            <Field label="Дата регистрации в ПФР" value={LEGAL.pfrRegistrationDate} />
            <Field label="Юридический адрес" value={LEGAL.legalAddress} />
            <Field label="Фактический адрес" value={LEGAL.actualAddress} />
            <Field label="Телефон" value={LEGAL.phone} />
            <Field label="Email" value={LEGAL.email} />
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
