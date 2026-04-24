import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TrustItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const ITEMS: TrustItem[] = [
  {
    title: 'Бесплатная доставка',
    description: 'По России от 5 000 ₽. Самовывоз в Орле — сегодня.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Гарантия магазина',
    description: 'Плюс официальная гарантия производителя на всю новую технику.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Trade-In',
    description: 'Обмен старой техники на новую с доплатой по рыночной цене.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" />
        <polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
  {
    title: 'Рассрочка 0%',
    description: 'До 24 месяцев без переплат через партнёрские банки.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
];

export default function TrustBar({ className }: { className?: string }) {
  return (
    <div
      className={cn('border-t border-b', className)}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="section-container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex gap-3.5 items-start">
              <div
                className="shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="text-[14px] font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h4>
                <p className="text-[12px] leading-[1.35] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
