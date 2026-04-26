import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Доставка и оплата — МобилАкс',
  description:
    'Способы доставки и оплаты в МобилАкс: самовывоз в Орле, курьер по городу, СДЭК и Boxberry по РФ. Карты, наличные, рассрочка 0%.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/delivery',
  },
};

const DELIVERY = [
  {
    title: 'Самовывоз из магазина',
    badge: 'Бесплатно',
    text: 'Орёл, ул. Автовокзальная, д. 1А, подземный переход. Пн–Вс 09:00–19:00. Заберите сразу после оплаты.',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    shadow: '0 12px 32px rgba(34, 197, 94, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Курьер по Орлу',
    badge: 'День в день',
    text: 'Я.Доставка / Достависта по Орлу. Стоимость рассчитывается по тарифу службы — обычно 250–450 ₽.',
    gradient: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
    shadow: '0 12px 32px rgba(0, 120, 255, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'СДЭК / Boxberry',
    badge: '2–7 дней',
    text: 'Доставка по всей России в пункт выдачи или курьером до двери. Стоимость по тарифу транспортной компании.',
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
    shadow: '0 12px 32px rgba(255, 107, 53, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const PAYMENT = [
  {
    title: 'Наличные',
    text: 'При получении в магазине. Чек по 54-ФЗ выдаётся на месте.',
    color: '#16a34a',
  },
  {
    title: 'Банковская карта',
    text: 'Visa, Mastercard, МИР. Терминал в магазине или онлайн при оформлении.',
    color: '#0066ff',
  },
  {
    title: 'Безналичный перевод',
    text: 'Для юр.лиц и ИП — счёт на оплату с реквизитами и закрывающими документами.',
    color: '#8a5cf6',
  },
  {
    title: 'Рассрочка 0%',
    text: 'От Тинькофф / Сбербанка на 3, 6, 12 месяцев без переплаты. Решение за 1 минуту.',
    color: '#ff6b35',
  },
];

export default function DeliveryPage() {
  return (
    <div className="section-container py-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Доставка и оплата', href: '/delivery' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Доставка и оплата</span>
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
        Доставка и оплата
      </h1>
      <p className="text-[15px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Получите технику удобным способом — заберите из магазина в Орле или закажите доставку
        по всей России.
      </p>

      {/* Способы доставки — цветные плашки */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Способы доставки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DELIVERY.map((d) => (
            <div
              key={d.title}
              className="rounded-3xl p-6 text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{ background: d.gradient, boxShadow: d.shadow }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  top: '-30%',
                  right: '-30%',
                  width: '70%',
                  height: '70%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <div className="relative">
                <div className="mb-4 inline-block">{d.icon}</div>
                <div
                  className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-2"
                  style={{ background: 'rgba(255,255,255,0.22)' }}
                >
                  {d.badge}
                </div>
                <h3
                  className="font-semibold text-[1.125rem] mb-2 leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {d.title}
                </h3>
                <p className="text-[14px] leading-relaxed opacity-95">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Сроки */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Сроки
        </h2>
        <div
          className="rounded-3xl p-6 md:p-8 border"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <ul className="space-y-3 text-[15px]" style={{ color: 'var(--color-text)' }}>
            <li className="flex gap-3">
              <span style={{ color: '#22c55e', fontWeight: 700, minWidth: 28 }}>•</span>
              <span>
                <strong>Самовывоз</strong> — сразу после подтверждения заказа в часы работы.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: '#0066ff', fontWeight: 700, minWidth: 28 }}>•</span>
              <span>
                <strong>Курьер по Орлу</strong> — день в день при заказе до 16:00, иначе на следующий день.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: '#ff6b35', fontWeight: 700, minWidth: 28 }}>•</span>
              <span>
                <strong>СДЭК / Boxberry</strong> — 2–7 рабочих дней в зависимости от региона.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Способы оплаты */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Способы оплаты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAYMENT.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl p-6 border"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="w-1.5 h-8 rounded-full mb-3"
                style={{ background: p.color }}
                aria-hidden
              />
              <h3
                className="font-semibold text-[1.0625rem] mb-1.5"
                style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
              >
                {p.title}
              </h3>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Рассрочка — отдельная промо-карточка */}
      <section className="mb-12">
        <div
          className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fff5e6 0%, #fef3c7 50%, #ffd5b8 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              bottom: '-30%',
              right: '-15%',
              width: '50%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 65%)',
              filter: 'blur(50px)',
            }}
          />
          <div className="relative">
            <div
              className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold mb-3"
              style={{ background: 'rgba(255,107,53,0.18)', color: '#9a3412' }}
            >
              Рассрочка 0%
            </div>
            <h3
              className="font-semibold tracking-tight mb-2"
              style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', color: '#1d1d1f' }}
            >
              Купите сейчас, платите частями
            </h3>
            <p
              className="text-[15px] mb-3"
              style={{ color: 'rgba(0,0,0,0.75)', maxWidth: 640, lineHeight: 1.6 }}
            >
              Оформите рассрочку через Тинькофф или Сбербанк прямо в магазине — на 3, 6 или 12
              месяцев без переплаты. Решение приходит за минуту, нужен только паспорт.
            </p>
            <p className="text-[12px]" style={{ color: 'rgba(0,0,0,0.55)' }}>
              Услугу предоставляет банк-партнёр на условиях соответствующего банка.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0f1f 0%, #14192e 50%, #0d1226 100%)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: '-20%',
            right: '-10%',
            width: '40%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(0,180,255,0.4) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div className="relative">
          <h2
            className="font-semibold tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', letterSpacing: '-0.025em' }}
          >
            Остались вопросы?
          </h2>
          <p
            className="mb-6 mx-auto"
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              opacity: 0.85,
              maxWidth: 560,
            }}
          >
            Поможем рассчитать доставку, подобрать удобный способ оплаты и оформить рассрочку.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-[14px] transition-all hover:translate-y-[-2px]"
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                boxShadow: '0 6px 16px rgba(0, 120, 255, 0.45)',
              }}
            >
              Связаться с нами
            </Link>
            <a
              href="https://wa.me/79300632370"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.10)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
