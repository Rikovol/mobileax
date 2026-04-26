import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Гарантия и возврат — МобилАкс',
  description:
    'Гарантия на технику Apple и Samsung в МобилАкс: 1 год на новую, 30 дней на б/у. Условия возврата по ст. 18, 25 ЗоЗПП.',
  alternates: {
    canonical: 'https://xn--80abvjddo3a.xn--p1ai/guarantee',
  },
};

export default function GuaranteePage() {
  return (
    <div className="section-container py-6 md:py-10">
      <Breadcrumbs items={[{ label: 'Гарантия и возврат', href: '/guarantee' }]} />
      <nav className="text-sm text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Гарантия и возврат</span>
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
        Гарантия и возврат
      </h1>
      <p className="text-[15px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Если что-то пошло не так — поможем разобраться. Здесь собраны все условия гарантии
        и возврата по Закону «О защите прав потребителей».
      </p>

      {/* Гарантии — две карточки */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Сроки гарантии
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-3xl p-6 md:p-7 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
              boxShadow: '0 12px 32px rgba(0, 120, 255, 0.25)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: '-30%',
                right: '-30%',
                width: '70%',
                height: '70%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            <div className="relative">
              <div
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ background: 'rgba(255,255,255,0.22)' }}
              >
                Новая техника
              </div>
              <div
                className="font-bold mb-2"
                style={{ fontSize: '2rem', letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                12 месяцев
              </div>
              <p className="text-[14px] opacity-95 leading-relaxed">
                Официальная гарантия производителя на Apple и Samsung. Сервисное обслуживание
                в авторизованных сервис-центрах по всей России.
              </p>
            </div>
          </div>

          <div
            className="rounded-3xl p-6 md:p-7 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: '0 12px 32px rgba(34, 197, 94, 0.25)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                top: '-30%',
                right: '-30%',
                width: '70%',
                height: '70%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            <div className="relative">
              <div
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ background: 'rgba(255,255,255,0.22)' }}
              >
                Б/У техника
              </div>
              <div
                className="font-bold mb-2"
                style={{ fontSize: '2rem', letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                30 дней
              </div>
              <p className="text-[14px] opacity-95 leading-relaxed">
                Гарантия магазина на проверенную б/у-технику. Каждое устройство проходит
                диагностику перед продажей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Возврат надлежащего качества — критично, ВЫДЕЛЯЕМ */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Возврат товара надлежащего качества
        </h2>
        <div
          className="rounded-3xl p-6 md:p-7 relative overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
            border: '1px solid rgba(255, 107, 53, 0.20)',
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)' }}
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <div className="flex-1">
              <h3
                className="font-semibold text-[1.0625rem] mb-2"
                style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
              >
                Смартфоны и сложная техника возврату не подлежат
              </h3>
              <p className="text-[14px]" style={{ color: 'rgba(0,0,0,0.75)', lineHeight: 1.6 }}>
                Согласно Постановлению Правительства РФ № 2463 от 31.12.2020, технически
                сложные товары бытового назначения (смартфоны, ноутбуки, планшеты, умные часы)
                не подлежат возврату или обмену надлежащего качества. Это норма федерального
                законодательства, а не правило магазина.
              </p>
              <p
                className="text-[13px] mt-3 pt-3 border-t"
                style={{ color: 'rgba(0,0,0,0.65)', borderColor: 'rgba(0,0,0,0.10)' }}
              >
                <strong>Что мы можем предложить:</strong> Trade-In — обмен с доплатой по
                рыночной оценке вашего устройства. Это удобный способ поменять технику без
                продажи через объявления.
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/trade-in"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-accent)' }}
        >
          Перейти в раздел Trade-In
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>

      {/* Возврат ненадлежащего качества — обычные секции */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Возврат товара ненадлежащего качества
        </h2>
        <div
          className="rounded-3xl p-6 md:p-7 border space-y-4 text-[15px]"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            lineHeight: 1.65,
          }}
        >
          <p>
            Если в товаре обнаружен недостаток, по{' '}
            <strong>статье 18 Закона «О защите прав потребителей»</strong> вы можете требовать:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>замены на товар той же марки и модели</li>
            <li>замены на товар другой марки с перерасчётом цены</li>
            <li>соразмерного уменьшения покупной цены</li>
            <li>безвозмездного устранения недостатков (ремонта)</li>
            <li>возврата уплаченной суммы и расторжения договора</li>
          </ul>
          <div
            className="rounded-2xl p-4"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <p className="text-[14px]" style={{ lineHeight: 1.6 }}>
              <strong>Сроки:</strong> для смартфонов и других технически сложных товаров
              обмен или возврат возможен в течение <strong>15 дней</strong> с момента передачи
              товара. После этого — только при существенном недостатке (ст. 18 ЗоЗПП).
            </p>
          </div>
          <p>
            Гарантийный ремонт по{' '}
            <strong>статье 19 ЗоЗПП</strong> производится в течение всего гарантийного срока.
            Сроки устранения недостатков по закону — не более 45 дней.
          </p>
        </div>
      </section>

      {/* Что нужно для возврата */}
      <section className="mb-12">
        <h2
          className="font-semibold tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', letterSpacing: '-0.025em' }}
        >
          Что нужно для обращения
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              t: 'Документы',
              d: 'Паспорт, чек или иной документ, подтверждающий покупку (при отсутствии — поможем восстановить по базе).',
            },
            {
              t: 'Сам товар',
              d: 'В заводской упаковке, с комплектацией и аксессуарами, без следов вмешательства.',
            },
            {
              t: 'Описание проблемы',
              d: 'Расскажите, что произошло — это поможет ускорить диагностику и решение.',
            },
          ].map((s, idx) => (
            <div
              key={s.t}
              className="rounded-3xl p-6 border"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div
                className="font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '1.75rem',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                {idx + 1}
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
            Куда обращаться
          </h2>
          <p
            className="mb-6 mx-auto"
            style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.85, maxWidth: 560 }}
          >
            Приходите в магазин с устройством и чеком — разберём ситуацию на месте.
            Можно также описать проблему по телефону или в мессенджере.
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
            <a
              href="tel:+79300632370"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.10)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              +7 930 063-23-70
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
