import Link from 'next/link';
import { getActiveTheme } from '@/lib/theme-resolver';

const theme = getActiveTheme();

const FOOTER_LINKS = [
  { label: 'Каталог', href: '/catalog/Apple' },
  { label: 'Б/у', href: '/used' },
  { label: 'Trade-in', href: '/trade-in' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-semibold text-[var(--color-text)]">{theme.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Орёл · смартфоны, планшеты, ноутбуки Apple
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-xs text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} {theme.name}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
