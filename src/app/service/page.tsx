import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import AppointmentButton from './AppointmentButton';

export const metadata: Metadata = {
  title: 'Сервисный центр — ремонт iPhone, MacBook, Samsung в Орле',
  description:
    'Ремонт техники Apple и Samsung в МобилАкс: замена дисплея, аккумулятора, после воды. Гарантия на работы 30 дней. Орёл, ул. Автовокзальная 1А.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/service',
  },
};

const REPAIR_IPHONE = [
  'Замена аккумулятора',
  'Замена дисплея и стекла',
  'Ремонт разъёма зарядки',
  'Восстановление корпуса',
  'После попадания воды',
];

const REPAIR_MAC = [
  'Замена АКБ MacBook',
  'Замена клавиатуры',
  'Чистка от пыли и термопаста',
  'После попадания жидкости',
];

const REPAIR_SAMSUNG = [
  'Замена дисплея Galaxy',
  'Замена аккумулятора',
  'Замена стекла камеры',
  'Восстановление после падения',
];

const NOT_DOING = [
  'Пайка материнских плат',
  'Микроэлектронный ремонт чипов',
  'Восстановление данных с нерабочих устройств',
];

export default function ServicePage() {
  return (
    <div className="section-container py-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Сервисный центр', href: '/service' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Сервисный центр</span>
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
        Сервисный центр
      </h1>
      <p className="text-[15px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Ремонт техники Apple и Samsung в Орле — диагностика бесплатная, гарантия на работы 30 дней.
      </p>

      {/* Что чиним — 3 категории */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Что мы чиним
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="rounded-3xl p-6 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
              boxShadow: '0 12px 32px rgba(0, 120, 255, 0.25)',
            }}
          >
            <h3 className="font-semibold text-[1.125rem] mb-3" style={{ letterSpacing: '-0.02em' }}>
              iPhone
            </h3>
            <ul className="space-y-1.5 text-[14px] opacity-95">
              {REPAIR_IPHONE.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-3xl p-6 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8a5cf6 0%, #a78bfa 100%)',
              boxShadow: '0 12px 32px rgba(138, 92, 246, 0.25)',
            }}
          >
            <h3 className="font-semibold text-[1.125rem] mb-3" style={{ letterSpacing: '-0.02em' }}>
              MacBook
            </h3>
            <ul className="space-y-1.5 text-[14px] opacity-95">
              {REPAIR_MAC.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-3xl p-6 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: '0 12px 32px rgba(34, 197, 94, 0.25)',
            }}
          >
            <h3 className="font-semibold text-[1.125rem] mb-3" style={{ letterSpacing: '-0.02em' }}>
              Samsung Galaxy
            </h3>
            <ul className="space-y-1.5 text-[14px] opacity-95">
              {REPAIR_SAMSUNG.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Что НЕ делаем + гарантия */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div
          className="rounded-3xl p-6 md:p-7 border"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: 'rgba(220, 38, 38, 0.10)', color: '#b91c1c' }}
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
            <h3 className="font-semibold text-[1.0625rem]" style={{ letterSpacing: '-0.02em' }}>
              Что мы не делаем
            </h3>
          </div>
          <ul
            className="space-y-1.5 text-[14px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {NOT_DOING.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p
            className="text-[13px] mt-3 pt-3 border-t"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border)',
            }}
          >
            Сложный ремонт материнских плат и микроэлектроники мы передаём проверенным
            партнёрам в Москве — это честнее, чем браться за работу без нужного
            оборудования.
          </p>
        </div>

        <div
          className="rounded-3xl p-6 md:p-7 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ecfccb 0%, #d1fae5 100%)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <h3
              className="font-semibold text-[1.0625rem]"
              style={{ letterSpacing: '-0.02em', color: '#1d1d1f' }}
            >
              Гарантия 30 дней
            </h3>
          </div>
          <p className="text-[14px]" style={{ color: 'rgba(0,0,0,0.75)', lineHeight: 1.6 }}>
            На все работы и установленные запчасти даём гарантию 30 дней. Если возникнет
            проблема — приходите, разберёмся без лишних вопросов.
          </p>
        </div>
      </section>

      {/* Как это работает */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Как это работает
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              n: '1',
              t: 'Запись и приёмка',
              d: 'Опишите проблему — мы пригласим в магазин или подскажем, какие данные подготовить.',
            },
            {
              n: '2',
              t: 'Диагностика',
              d: 'Бесплатная — оценим объём работ, запчасти и стоимость до начала ремонта.',
            },
            {
              n: '3',
              t: 'Ремонт и проверка',
              d: 'Меняем неисправный компонент, тестируем устройство, выдаём с гарантией 30 дней.',
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-3xl p-6 border"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="font-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '2.25rem',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <h3
                className="font-semibold text-[1rem] mb-1.5"
                style={{ letterSpacing: '-0.02em' }}
              >
                {s.t}
              </h3>
              <p
                className="text-[14px]"
                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55 }}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — запись на ремонт */}
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
            Записаться на ремонт
          </h2>
          <p
            className="mb-6 mx-auto"
            style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.85, maxWidth: 560 }}
          >
            Расскажите, что случилось — мы перезвоним, согласуем удобное время и подготовим
            запчасти заранее, чтобы ремонт прошёл быстрее.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <AppointmentButton variant="primary">Записаться на ремонт</AppointmentButton>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.10)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Контакты и адрес
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
