import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'О магазине МобилАкс — iPhone, Samsung в Орле',
  description: 'МобилАкс — магазин техники Apple и Samsung в Орле с 2015 года. Гарантия, Trade-In, рассрочка 0%.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/about',
  },
};

export default function AboutPage() {
  return (
    <div className="section-container section-gap">
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">О нас</span>
      </nav>

      <h1 className="hero-title mb-4">МобилАкс</h1>
      <p
        className="mb-12"
        style={{
          fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
          maxWidth: 720,
        }}
      >
        Мы продаём смартфоны, планшеты и ноутбуки Apple и Samsung в Орле с 2015 года.
        Официальная гарантия, проверенная б/у-техника, Trade-In и рассрочка 0%.
      </p>

      {/* Team & store фото — placeholder, Антон добавит позже */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
        <div
          className="rounded-3xl flex items-center justify-center aspect-[4/3]"
          style={{ background: '#fbfbfd', color: 'var(--color-text-secondary)' }}
        >
          <p className="text-[14px]">Фото магазина — добавить</p>
        </div>
        <div
          className="rounded-3xl flex items-center justify-center aspect-[4/3]"
          style={{ background: '#fbfbfd', color: 'var(--color-text-secondary)' }}
        >
          <p className="text-[14px]">Фото команды — добавить</p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-6"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.025em' }}
        >
          Что мы делаем
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Новая техника', text: 'Apple и Samsung с официальной гарантией' },
            { title: 'Б/У с гарантией', text: 'Каждое устройство проверяется и тестируется' },
            { title: 'Trade-In', text: 'Сдайте старое — получите новое со скидкой' },
            { title: 'Сервис', text: 'Помощь, настройка, перенос данных' },
          ].map((it) => (
            <div
              key={it.title}
              className="rounded-3xl p-7 border"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <h3
                className="font-semibold text-[1.0625rem] mb-2 leading-snug"
                style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
              >
                {it.title}
              </h3>
              <p className="text-[14px] leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          className="font-semibold tracking-tight mb-6"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.025em' }}
        >
          С 2015 года в Орле
        </h2>
        <p
          className="mb-4"
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            maxWidth: 720,
          }}
        >
          Десять лет мы помогаем жителям Орла выбрать технику под их задачи и бюджет —
          от первого смартфона до профессионального MacBook. Знаем устройства изнутри,
          не продаём «то, что хотим продать», а советуем то, что вам реально подойдёт.
        </p>
      </section>
    </div>
  );
}
