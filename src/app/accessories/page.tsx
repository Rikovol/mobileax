import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Аксессуары — мобилакс',
  description: 'Аксессуары для смартфонов, планшетов и ноутбуков в Орле.',
};

export default function AccessoriesPage() {
  return (
    <div className="section-container section-gap text-center py-20 md:py-32">
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center justify-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Аксессуары</span>
      </nav>
      <h1
        className="font-semibold tracking-tight mb-4"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
      >
        Аксессуары
      </h1>
      <p className="text-[1.125rem] mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        Раздел в подготовке. Скоро здесь появятся чехлы, защитные стёкла, зарядки и кабели.
      </p>
      <Link
        href="/contacts"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-medium text-[15px] transition-opacity hover:opacity-90"
        style={{ background: '#0071e3' }}
      >
        Спросить в магазине
      </Link>
    </div>
  );
}
