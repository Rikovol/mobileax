'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  storageOptions?: FilterOption[];
  colorOptions?: FilterOption[];
  batteryOptions?: FilterOption[];
  completenessOptions?: FilterOption[];
  sortOptions?: FilterOption[];
  mode?: 'catalog' | 'used';
}

const DEFAULT_SORT: FilterOption[] = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'price_asc', label: 'Дешевле' },
  { value: 'price_desc', label: 'Дороже' },
];

const BATTERY_OPTIONS: FilterOption[] = [
  { value: '80', label: 'от 80%' },
  { value: '85', label: 'от 85%' },
  { value: '90', label: 'от 90%' },
  { value: '95', label: 'от 95%' },
];

export default function CatalogFilters({
  storageOptions = [],
  colorOptions = [],
  batteryOptions = BATTERY_OPTIONS,
  completenessOptions = [],
  sortOptions = DEFAULT_SORT,
  mode = 'catalog',
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 on filter change
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const current = (key: string) => searchParams.get(key) ?? '';

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Sort */}
      <FilterSelect
        label="Сортировка"
        options={sortOptions}
        value={current('sort')}
        onChange={(v) => setParam('sort', v || null)}
      />

      {/* Storage */}
      {storageOptions.length > 0 && (
        <FilterSelect
          label="Объём"
          options={storageOptions}
          value={current('storage')}
          onChange={(v) => setParam('storage', v || null)}
        />
      )}

      {/* Color */}
      {colorOptions.length > 0 && (
        <FilterSelect
          label="Цвет"
          options={colorOptions}
          value={current('color')}
          onChange={(v) => setParam('color', v || null)}
        />
      )}

      {/* Battery — used only */}
      {mode === 'used' && (
        <FilterSelect
          label="Батарея"
          options={batteryOptions}
          value={current('battery_min')}
          onChange={(v) => setParam('battery_min', v || null)}
        />
      )}

      {/* Completeness — used only */}
      {mode === 'used' && completenessOptions.length > 0 && (
        <FilterSelect
          label="Комплект"
          options={completenessOptions}
          value={current('completeness')}
          onChange={(v) => setParam('completeness', v || null)}
        />
      )}

      {/* Reset if any filter active */}
      {(current('sort') || current('storage') || current('color') || current('battery_min') || current('completeness')) && (
        <button
          onClick={() => {
            const params = new URLSearchParams();
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="text-sm text-[var(--color-accent)] hover:underline ml-1"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

function FilterSelect({ label, options, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-1.5 pr-7 appearance-none cursor-pointer hover:border-[var(--color-accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
      aria-label={label}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
      }}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
