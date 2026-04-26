'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { getActiveTheme } from '@/lib/theme-resolver';

const theme = getActiveTheme();

const NAV_LINKS = [
  { label: 'iPhone', href: '/catalog/Apple?category=iphone' },
  { label: 'Mac', href: '/catalog/Apple?category=mac' },
  { label: 'iPad', href: '/catalog/Apple?category=ipad' },
  { label: 'Watch', href: '/catalog/Apple?category=watch' },
  { label: 'AirPods', href: '/catalog/Apple?category=airpods' },
  { label: 'Samsung', href: '/catalog/Samsung?category=samsung' },
  { label: 'Sony', href: '/catalog/Sony?category=sony' },
  { label: 'Trade-In', href: '/trade-in' },
  { label: 'Б/У', href: '/used' },
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
          <Link href="/" className="flex items-center shrink-0 mr-8" aria-label={theme.name}>
            <Image
              src="/themes/mobileax/logo.svg"
              alt={theme.name}
              width={120}
              height={32}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV_LINKS.map((link) => (
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
            ))}
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="py-3.5 text-[17px] border-b"
              style={{ color: '#f5f5f7', borderColor: '#2c2c2e' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="tel:+79300632370"
            className="mt-6 text-[15px] font-semibold"
            style={{ color: 'var(--color-accent)' }}
            onClick={() => setMobileOpen(false)}
          >
            +7 930 063-23-70
          </Link>
        </div>
      </nav>
    </>
  );
}
