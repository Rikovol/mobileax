'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getActiveTheme } from '@/lib/theme-resolver';

const theme = getActiveTheme();

const NAV_LINKS = [
  { label: 'Новые', href: '/catalog/Apple' },
  { label: 'Б/у', href: '/used' },
  { label: 'Trade-in', href: '/trade-in' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="section-container h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/themes/mobileax/logo.svg"
            alt={theme.name}
            width={32}
            height={32}
            priority
          />
          <span className="font-semibold text-[var(--color-text)] text-lg leading-none">
            {theme.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/trade-in" className="btn-accent !px-4 !py-2 text-sm">
            Оценить телефон
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-[var(--color-text)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--color-border)] bg-white">
          <div className="section-container py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[var(--color-text)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
