'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import type { CatalogItemOut } from '@/types/api';

interface Props {
  initialItems: CatalogItemOut[];
  /** Опционально — дополнительные dropdown'ы (комплектация для used). */
  extraSelects?: React.ReactNode;
  emptyMessage?: string;
}

/**
 * Клиентский фильтр для списка товаров: бренд + модель + память.
 * Используется на /new и /used.
 *
 * - Brand: derive из items, кнопки-чипы (multi-select).
 * - Model search: text-substring match на item.model (case-insensitive).
 * - Memory: derive из items, dropdown.
 *
 * Все фильтры working client-side — без re-fetch, потому что данные уже
 * прилетели SSR. Если в будущем понадобится server-side с пагинацией —
 * заменить useMemo на URLSearchParams + router.replace.
 */
export default function CatalogClientView({
  initialItems,
  extraSelects,
  emptyMessage = 'Пока товары не загружены.',
}: Props) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [modelQuery, setModelQuery] = useState('');
  const [activeMemory, setActiveMemory] = useState<string>('');

  // Уникальные значения для UI
  const brands = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((i) => i.brand && set.add(i.brand));
    return Array.from(set).sort();
  }, [initialItems]);

  const memories = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((i) => i.storage && set.add(i.storage));
    // Сортируем по числовому значению (256Gb < 512Gb < 1Tb)
    return Array.from(set).sort((a, b) => {
      const ax = parseInt(a.replace(/[^\d]/g, ''), 10) || 0;
      const bx = parseInt(b.replace(/[^\d]/g, ''), 10) || 0;
      const aTb = /tb/i.test(a) ? ax * 1000 : ax;
      const bTb = /tb/i.test(b) ? bx * 1000 : bx;
      return aTb - bTb;
    });
  }, [initialItems]);

  const filtered = useMemo(() => {
    return initialItems.filter((item) => {
      if (activeBrand && item.brand !== activeBrand) return false;
      if (modelQuery && !item.model.toLowerCase().includes(modelQuery.toLowerCase())) return false;
      if (activeMemory && item.storage !== activeMemory) return false;
      return true;
    });
  }, [initialItems, activeBrand, modelQuery, activeMemory]);

  const hasActiveFilters = !!activeBrand || !!modelQuery || !!activeMemory;
  const reset = () => {
    setActiveBrand(null);
    setModelQuery('');
    setActiveMemory('');
  };

  return (
    <>
      {/* Фильтры */}
      <div className="mb-5 space-y-3">
        {/* Бренды (chips) */}
        {brands.length > 1 && (
          <div className="flex gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveBrand(null)}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: !activeBrand ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
                color: !activeBrand ? '#fff' : '#1d1d1f',
              }}
            >
              Все бренды
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setActiveBrand(b)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                style={{
                  background: activeBrand === b ? '#0071e3' : 'rgba(0,0,0,0.05)',
                  color: activeBrand === b ? '#fff' : '#1d1d1f',
                }}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {/* Поиск по модели + память */}
        <div className="flex gap-2 flex-wrap items-center">
          <input
            type="text"
            value={modelQuery}
            onChange={(e) => setModelQuery(e.target.value)}
            placeholder="Поиск по модели (iPhone 15, Galaxy S26 Ultra…)"
            className="flex-1 min-w-[200px] px-3 py-1.5 rounded-full border text-sm focus:outline-none"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-bg)',
            }}
          />
          {memories.length > 1 && (
            <select
              value={activeMemory}
              onChange={(e) => setActiveMemory(e.target.value)}
              className="px-3 py-1.5 rounded-full border text-sm focus:outline-none"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg)',
              }}
            >
              <option value="">Любая память</option>
              {memories.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}
          {extraSelects}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={reset}
              className="text-[12px] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Сбросить
            </button>
          )}
        </div>

        {/* Результат */}
        <p className="text-[12px] text-[var(--color-text-secondary)]">
          {filtered.length} {pluralize(filtered.length, ['товар', 'товара', 'товаров'])}
          {hasActiveFilters && initialItems.length !== filtered.length && (
            <span> из {initialItems.length}</span>
          )}
        </p>
      </div>

      {/* Сетка */}
      {filtered.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] py-10 text-center">
          {hasActiveFilters
            ? 'Нет товаров по выбранным фильтрам. Попробуйте сбросить.'
            : emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}
