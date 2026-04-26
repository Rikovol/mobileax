import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'О магазине МобилАкс — iPhone, Samsung в Орле',
  description:
    'МобилАкс — магазин техники Apple и Samsung в Орле с 2010 года. Гарантия, Trade-In, рассрочка 0%.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/about',
  },
};

const FEATURES = [
  {
    title: 'Новая техника',
    text: 'Apple и Samsung с официальной гарантией',
    gradient: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
    shadow: '0 12px 32px rgba(0, 120, 255, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
  },
  {
    title: 'Б/У с гарантией',
    text: 'Каждое устройство проверяется и тестируется',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    shadow: '0 12px 32px rgba(34, 197, 94, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Trade-In',
    text: 'Сдайте старое — получите новое со скидкой',
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
    shadow: '0 12px 32px rgba(255, 107, 53, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    title: 'Сервис',
    text: 'Помощь, настройка, перенос данных',
    gradient: 'linear-gradient(135deg, #8a5cf6 0%, #a78bfa 100%)',
    shadow: '0 12px 32px rgba(138, 92, 246, 0.25)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '15+', label: 'лет на рынке Орла' },
  { value: '10 000+', label: 'довольных клиентов' },
  { value: '5,0', label: 'рейтинг на Я.Картах' },
  { value: '24/7', label: 'поддержка онлайн' },
];

/** Двухцветное «МобилАкс» — как на логотипе: «Мобил» темный, «акс» — Apple-blue. */
function BrandName({ size = 'inherit' }: { size?: string }) {
  return (
    <span style={{ fontSize: size, whiteSpace: 'nowrap' }}>
      <span style={{ color: '#1d1d1f' }}>Мобил</span>
      <span
        style={{
          background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        акс
      </span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="section-container py-6 md:py-10">
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">О нас</span>
      </nav>

      {/* Hero — большой название с гладиентным фоном */}
      <section
        className="relative rounded-3xl overflow-hidden mb-10 px-6 md:px-12 py-12 md:py-16"
        style={{
          background:
            'linear-gradient(135deg, #fff5e6 0%, #fef3c7 30%, #ffe4cc 60%, #ffd5b8 100%)',
        }}
      >
        {/* Декоративные blobs */}
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

        <div className="relative">
          <h1
            className="font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            <BrandName />
          </h1>
          <p
            className="mb-2"
            style={{
              fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)',
              lineHeight: 1.5,
              color: '#1d1d1f',
              maxWidth: 720,
              fontWeight: 500,
            }}
          >
            Магазин техники Apple и Samsung в Орле{' '}
            <span style={{ color: '#0066ff', fontWeight: 700 }}>с 2010 года</span>.
          </p>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(0,0,0,0.7)',
              maxWidth: 720,
            }}
          >
            Официальная гарантия, проверенная б/у-техника, Trade-In и рассрочка 0%.
          </p>
        </div>
      </section>

      {/* Цифры */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl px-4 py-5 md:px-6 md:py-6 text-center transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              className="font-bold tabular-nums leading-none mb-1.5"
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                letterSpacing: '-0.025em',
              }}
            >
              {s.value}
            </div>
            <div
              className="text-[12px] md:text-[13px]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Что мы делаем — цветные плашки */}
      <section className="mb-14">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)', letterSpacing: '-0.025em' }}
        >
          Что мы делаем
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl p-6 text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1"
              style={{ background: f.gradient, boxShadow: f.shadow }}
            >
              {/* Декоративный белый blob в углу */}
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
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {f.icon}
                </div>
                <h3
                  className="font-semibold text-[1.125rem] mb-2 leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {f.title}
                </h3>
                <p className="text-[14px] leading-relaxed opacity-95">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Команда & магазин — placeholders */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-14">
        <div
          className="rounded-3xl flex items-center justify-center aspect-[4/3]"
          style={{
            background: 'linear-gradient(135deg, #fbfbfd 0%, #e0eaff 100%)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p className="text-[14px]">📷 Фото магазина — добавить</p>
        </div>
        <div
          className="rounded-3xl flex items-center justify-center aspect-[4/3]"
          style={{
            background: 'linear-gradient(135deg, #fbfbfd 0%, #ffeae0 100%)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p className="text-[14px]">👥 Фото команды — добавить</p>
        </div>
      </section>

      {/* История — компактная */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)', letterSpacing: '-0.025em' }}
        >
          С 2010 года в Орле
        </h2>
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background:
              'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-secondary) 100%)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--color-text)',
              maxWidth: 720,
            }}
          >
            Больше пятнадцати лет мы помогаем жителям Орла выбрать технику под их задачи и
            бюджет — от первого смартфона до профессионального MacBook. Знаем устройства
            изнутри, не продаём «то, что хотим продать», а советуем то, что вам реально
            подойдёт.
          </p>
        </div>
      </section>

      {/* CTA-блок */}
      <section
        className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
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
            style={{ fontSize: 'clamp(1.375rem, 2.6vw, 2rem)', letterSpacing: '-0.025em' }}
          >
            Приходите выбирать
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
            Орёл, ул. Автовокзальная, д. 1А (подземный переход).
            Пн–Вс с 09:00 до 19:00. Звоните, заходите, пишите.
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
              Контакты и адрес
            </Link>
            <Link
              href="/trade-in"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.10)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Trade-In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
