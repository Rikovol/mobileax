'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { getActiveTheme } from '@/lib/theme-resolver';

const theme = getActiveTheme();

const NAV_LINKS = [
  { label: 'Новые товары', href: '/new' },
  { label: 'Б/У техника', href: '/used' },
  { label: 'Trade-In', href: '/trade-in' },
  { label: 'Аксессуары', href: '/accessories' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Promo bar */}
      <div
        className="text-center text-[13px] px-5 py-2.5"
        style={{ background: '#1d1d1f', color: '#f5f5f7' }}
      >
        Лучший способ купить технику, которую вы любите.{' '}
        <Link
          href="/contacts"
          className="ml-1 underline-offset-2 hover:underline"
          style={{ color: '#7DA3F5' }}
        >
          Связаться со специалистом →
        </Link>
      </div>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div
          className="h-14 flex items-center"
          style={{ padding: '0 max(20px, calc((100% - 980px) / 2))' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="logo-glow flex items-center shrink-0 mr-8"
            aria-label={theme.name}
          >
            <Image
              src="/themes/mobileax/logo.png"
              alt={theme.name}
              width={184}
              height={50}
              priority
              style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV_LINKS.map((link) => {
              if (link.href === '/trade-in') {
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="nav-trade-in text-[13px]"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[13px] px-3.5 leading-[56px] transition-colors hover:opacity-100"
                  style={{ color: '#424245' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#1d1d1f')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#424245')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            {/* Phone — hide text on mobile */}
            <Link
              href="tel:+79300632370"
              className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold transition-colors hover:opacity-80"
              style={{ color: 'var(--color-text)', whiteSpace: 'nowrap' }}
              aria-label="Позвонить"
            >
              <span style={{ color: 'var(--color-accent)', fontSize: '15px' }}>☎</span>
              +7 930 063-23-70
            </Link>

            {/* Search icon */}
            <button
              type="button"
              aria-label="Поиск"
              className="hidden sm:flex items-center justify-center"
              style={{ color: '#424245' }}
            >
              <Search size={18} />
            </button>

            {/* Mobile burger */}
            <button
              className="lg:hidden p-1.5 -mr-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              style={{ color: '#424245' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay — вне header, чтобы выйти из его stacking context */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — z-[110] чтобы поверх hero/scroller'ов */}
      <nav
        className="fixed top-0 right-0 h-full w-[82%] max-w-[320px] z-[110] flex flex-col overflow-y-auto transition-transform duration-300 lg:hidden"
        style={{
          background: '#1d1d1f',
          color: '#f5f5f7',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          padding: '24px 22px',
        }}
        aria-label="Мобильное меню"
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="self-end mb-3 text-[22px] leading-none"
          style={{ color: '#d1d1d6', background: 'none', border: 0 }}
          onClick={() => setMobileOpen(false)}
        >
          &times;
        </button>

        <div className="flex flex-col">
          {NAV_LINKS.map((link) => {
            const isTradeIn = link.href === '/trade-in';
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`py-3.5 text-[17px] border-b ${isTradeIn ? 'nav-trade-in-mobile' : ''}`}
                style={{
                  color: isTradeIn ? undefined : '#f5f5f7',
                  borderColor: '#2c2c2e',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="tel:+79300632370"
            className="mt-6 text-[15px] font-semibold"
            style={{ color: 'var(--color-accent)' }}
            onClick={() => setMobileOpen(false)}
          >
            +7 930 063-23-70
          </Link>

          {/* Социальные сети — VK / Telegram / MAX */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://vk.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.96]"
              style={{ background: '#0077FF', color: '#fff' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21.547 6.4a1.04 1.04 0 0 0-1.024-.8h-2.36c-.55 0-.886.196-1.077.65 0 0-1.45 3.07-3.07 5.16-.51.51-.74.673-1.018.673-.14 0-.342-.163-.342-.62V6.4c0-.547-.16-.8-.617-.8H8.31c-.342 0-.547.262-.547.51 0 .518.776.638.856 2.105v3.176c0 .697-.125.823-.404.823-.74 0-2.6-3.083-3.7-6.617-.215-.6-.43-.8-.984-.8H1.176c-.547 0-.66.262-.66.51 0 .57.74 3.86 3.84 8.21 2.066 2.974 4.99 4.583 7.65 4.583 1.6 0 1.797-.357 1.797-.886v-2.05c0-.6.127-.717.55-.717.31 0 .855.16 2.123 1.376 1.45 1.45 1.69 2.105 2.5 2.105h2.36c.547 0 .823-.275.665-.815-.345-1.066-2.66-3.26-2.764-3.404-.275-.345-.197-.5 0-.823 0 0 2.2-3.097 2.43-4.143z"/>
              </svg>
              VK
            </a>
            <a
              href="https://t.me/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.96]"
              style={{ background: '#229ED9', color: '#fff' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </a>
            <a
              href="https://max.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MAX"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.96]"
              style={{ background: 'linear-gradient(135deg, #ff3d5a 0%, #ff5e7a 100%)', color: '#fff' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.5 4.5h2.6L12 12.3l4.9-7.8h2.6V19.5h-2.6V9.4l-4.9 7.7-4.9-7.7v10.1H4.5z" />
              </svg>
              MAX
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
