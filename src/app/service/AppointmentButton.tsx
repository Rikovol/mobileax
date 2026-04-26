'use client';

import { openMessageWidget } from '@/components/messages/MessageWidget';

interface Props {
  variant?: 'primary' | 'ghost';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function AppointmentButton({
  variant = 'primary',
  className = '',
  style,
  children,
}: Props) {
  const handleClick = () => {
    openMessageWidget({
      messageType: 'contact',
      subject: 'Запись на ремонт',
      body: 'Здравствуйте! Хочу записаться на ремонт. Устройство: ',
    });
  };

  const baseStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
          boxShadow: '0 6px 16px rgba(0, 120, 255, 0.45)',
          color: '#fff',
        }
      : {
          background: 'rgba(255, 255, 255, 0.10)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.25)',
        };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[14px] transition-all hover:translate-y-[-2px] ${className}`}
      style={{ ...baseStyle, ...style }}
    >
      {children}
    </button>
  );
}
