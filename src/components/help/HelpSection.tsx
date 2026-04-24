import Link from 'next/link';
import type { ReactNode } from 'react';

interface HelpItem {
  icon: ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const HELP_ITEMS: HelpItem[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 9.11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Консультация специалиста',
    description: 'Позвоните или напишите нам — поможем выбрать устройство под ваш бюджет.',
    cta: 'Позвонить',
    href: 'tel:+79300632370',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
      </svg>
    ),
    title: 'Рассрочка 0%',
    description: 'До 24 месяцев без переплаты. Оформляем прямо в магазине через партнёрские банки.',
    cta: 'Подробнее',
    href: '/delivery',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <polyline points="23 20 23 14 17 14"/>
        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
      </svg>
    ),
    title: 'Trade-In',
    description: 'Оцениваем устройство при вас в магазине. Учитываем в счёт нового телефона.',
    cta: 'Оценить устройство',
    href: '/trade-in',
  },
];

export default function HelpSection() {
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-bold tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
          >
            Нужна помощь с покупкой?
          </h2>
          <p className="text-[1.0625rem]" style={{ color: 'var(--color-text-secondary)' }}>
            Мы здесь, чтобы помочь выбрать именно то, что вам подойдёт.
          </p>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {HELP_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 border"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
              >
                {item.icon}
              </div>
              <h3
                className="font-semibold text-[1.0625rem] mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-[0.875rem] leading-[1.5] mb-5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.description}
              </p>
              <span
                className="inline-flex items-center gap-1 text-[0.875rem] font-semibold transition-gap duration-200 group-hover:gap-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {item.cta}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
