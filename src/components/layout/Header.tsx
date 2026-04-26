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
              href="https://vk.com/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VK"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.96]"
              style={{ background: '#0077FF', color: '#fff' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.5 17.5h1.4c.5 0 .7-.3.7-.7 0-1.4 0-2.7 1-2.7.4 0 .9.3 1.7 1.1 1.4 1.4 1.7 2.3 2.6 2.3h2.4c.7 0 1-.3.8-.9-.3-.9-2-2.7-2.1-2.8-.4-.5-.5-.7 0-1.3.4-.4 2.6-3.2 2.8-4.3.1-.4 0-.8-.6-.8h-2.4c-.6 0-.8.3-.9.7 0 0-1.2 2.6-2.7 4.3-.5.5-.7.7-1 .7-.2 0-.4-.2-.4-.7v-4.1c0-.6-.2-.9-.7-.9H7.7c-.4 0-.6.2-.6.5 0 .6.9.7 1 2.4v3.6c0 .8-.1.9-.4.9-.7 0-2-2-3.1-4.3-.2-.5-.4-.7-1-.7H1.2c-.4 0-.6.2-.6.5 0 .7 1.5 4.6 4.5 7.7 2 2.1 4.7 3.2 7.4 3.2z"/>
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
                <path d="M20.7 4 2.6 11c-1.2.5-1.2 1.2-.2 1.5l4.6 1.5L17.7 7c.5-.3 1-.2.6.2L9 15.5v.1l-.4 5c.4 0 .6-.2.9-.4l2.1-2 4.4 3.3c.8.5 1.4.2 1.6-.7L21.5 5c.3-1.2-.4-1.7-1.2-1z"/>
              </svg>
              Telegram
            </a>
            <a
              href="https://max.ru/mobileaxorel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MAX"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.96]"
              style={{ background: '#1d1d1f', color: '#fff', border: '1px solid #3a3a3c' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 21V3h3l5 8 5-8h3v18h-3V9l-5 8L6 9v12z"/>
              </svg>
              MAX
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
