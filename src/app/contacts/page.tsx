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
    <div className="section-container py-6 md:py-8">
      <LocalBusinessSchema />
      <Breadcrumbs items={[{ label: 'Контакты', href: '/contacts' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Контакты</span>
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
        Контакты
        <span
          className="ml-2 hidden sm:inline"
          style={{
            fontSize: 'clamp(0.8125rem, 1.2vw, 1rem)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
          }}
        >
          · Звоните, приходите, пишите.
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-12">
        {/* Адрес */}
        <div
          className="group rounded-3xl p-6 md:p-7 border flex items-start gap-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <span
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)' }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5 opacity-60"
              style={{ color: 'var(--color-text)' }}
            >
              Адрес
            </p>
            <p className="text-[16px] leading-snug font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              г. Орёл, ул. Автовокзальная, д. 1А
            </p>
            <p className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
              Подземный переход
            </p>
          </div>
        </div>

        {/* Время */}
        <div
          className="group rounded-3xl p-6 md:p-7 border flex items-start gap-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <span
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5 opacity-60"
              style={{ color: 'var(--color-text)' }}
            >
              Часы работы
            </p>
            <p className="text-[16px] leading-snug font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              Пн–Вс: 09:00 — 19:00
            </p>
            <p className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
              Без выходных
            </p>
          </div>
        </div>

        {/* Телефон + WhatsApp + Telegram */}
        <div
          className="rounded-3xl p-6 md:p-7 border flex flex-col gap-4 transition-all duration-200 hover:shadow-lg"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-start gap-4">
            <span
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)' }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5 opacity-60"
                style={{ color: 'var(--color-text)' }}
              >
                Телефон
              </p>
              <a
                href="tel:+79300632370"
                className="block text-[20px] leading-snug font-bold mb-1 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text)', textDecoration: 'none' }}
              >
                +7 930 063-23-70
              </a>
              <p className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                Звонки и сообщения в мессенджерах
              </p>
            </div>
          </div>

          {/* WhatsApp + Telegram — быстрые мессенджер-кнопки */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="https://wa.me/79300632370"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="group flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                boxShadow: '0 4px 12px rgba(37,211,102,0.30)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://t.me/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className="group flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #229ED9 0%, #54A9EB 100%)',
                boxShadow: '0 4px 12px rgba(34,158,217,0.30)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
          </div>
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
          {/* Соцсети: VK + MAX. Официальные brand-цвета и логотипы. */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://vk.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="group flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #0077FF 0%, #2787F5 100%)',
                boxShadow: '0 4px 12px rgba(0,119,255,0.30)',
              }}
            >
              {/* VK официальный wordmark — закруглённый «V» (vk.com/brand). */}
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <path d="M16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5.5 7.44.5 16 7.44 31.5 16 31.5z" fill="rgba(255,255,255,0.18)"/>
                <path d="M17.05 22.62c-7.07 0-11.41-4.86-11.59-12.94h3.6c.13 5.94 2.78 8.46 4.85 8.97V9.68h3.43v5.18c2.01-.22 4.13-2.55 4.85-5.18h3.39c-.55 3.24-2.85 5.57-4.49 6.53 1.64.78 4.27 2.81 5.28 6.41h-3.74c-.79-2.43-2.74-4.31-5.28-4.57v4.57h-.3z"/>
              </svg>
              VK
            </a>
            <a
              href="https://max.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MAX"
              className="group flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #6B40FF 0%, #B649FF 100%)',
                boxShadow: '0 4px 12px rgba(107,64,255,0.30)',
              }}
            >
              {/* MAX (мессенджер от VK Group) — буква M в скруглённом квадрате. */}
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <path d="M16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5.5 7.44.5 16 7.44 31.5 16 31.5z" fill="rgba(255,255,255,0.18)"/>
                <path d="M8.6 23V9h3.05l4.35 7.1L20.35 9h3.05v14h-3.2v-8.6l-4.2 6.6-4.2-6.6V23H8.6z"/>
              </svg>
              MAX
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
          className="rounded-3xl border p-6 md:p-7"
          style={{
            borderColor: 'var(--color-border)',
            background: 'linear-gradient(135deg, #fffbed 0%, #fff5d6 100%)',
          }}
        >
          {/* Большая карточка рейтинга — собственный дизайн вместо мелкого iframe-badge */}
          <a
            href="https://yandex.ru/maps/org/mobilaks/1149010257/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 mb-5 group"
            aria-label="Открыть отзывы на Яндекс.Картах"
          >
            {/* Цифра рейтинга */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-5 py-3"
              style={{
                background: 'linear-gradient(135deg, #ffcc00 0%, #ff9b21 100%)',
                boxShadow: '0 6px 18px rgba(255,170,0,0.35)',
                color: '#1d1d1f',
                minWidth: 96,
              }}
            >
              <div
                className="font-bold tabular-nums leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', letterSpacing: '-0.02em' }}
              >
                5,0
              </div>
              <div className="flex gap-0.5 mt-1.5" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#1d1d1f">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Текст рядом */}
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold leading-tight"
                style={{ color: 'var(--color-text)', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
              >
                Рейтинг на Яндекс.Картах
              </div>
              <div
                className="text-[13px] mt-1 group-hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Подтверждённые отзывы клиентов · смотреть все →
              </div>
            </div>
          </a>

          <div className="border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p className="text-[13px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              Поделитесь своим отзывом — это помогает другим орловцам выбрать правильный магазин.
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
