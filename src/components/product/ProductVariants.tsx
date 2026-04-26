import Link from 'next/link';
import type { CatalogItemOut } from '@/types/api';
import { formatSimType, productHref } from '@/lib/utils';

interface Props {
  /** Все варианты текущей модели (одинаковый brand+model, разные storage/color/sim_type). */
  variants: CatalogItemOut[];
  /** Slug текущего товара — выделяется акцентом. */
  currentSlug: string;
  /** Storage текущего товара. */
  currentStorage: string | null;
  /** Color текущего товара. */
  currentColor: string | null;
  /** Тип SIM текущего товара. */
  currentSimType?: string | null;
}

/**
 * Selectors для памяти и цвета на странице товара.
 * Клик ведёт на /product/{другой_slug} — так пользователь переключается
 * между вариантами одной модели (разные storage / color комбинации).
 *
 * Memory selector фильтруется по текущему цвету: показывает только те
 * объёмы памяти которые доступны в этом цвете. Аналогично color selector.
 */
export default function ProductVariants({
  variants,
  currentSlug,
  currentStorage,
  currentColor,
  currentSimType,
}: Props) {
  if (variants.length <= 1) return null;

  // Memory: уникальные объёмы среди вариантов с тем же цветом и SIM (если заданы)
  const memoryCandidates = variants.filter(
    (v) =>
      (!currentColor || v.color === currentColor) &&
      (!currentSimType || v.sim_type === currentSimType),
  );
  const memories = uniqueByField(memoryCandidates, (v) => v.storage);

  // Color: уникальные цвета среди вариантов с той же памятью и SIM
  const colorCandidates = variants.filter(
    (v) =>
      (!currentStorage || v.storage === currentStorage) &&
      (!currentSimType || v.sim_type === currentSimType),
  );
  const colors = uniqueByField(colorCandidates, (v) => v.color);

  // SIM: уникальные типы SIM среди вариантов с той же памятью и цветом
  const simCandidates = variants.filter(
    (v) =>
      (!currentStorage || v.storage === currentStorage) &&
      (!currentColor || v.color === currentColor),
  );
  const sims = uniqueByField(simCandidates, (v) => v.sim_type);

  return (
    <div className="space-y-4">
      {memories.length > 1 && (
        <div>
          <div className="text-[12px] font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
            Память
          </div>
          <div className="flex flex-wrap gap-2">
            {memories.map((v) => {
              const active = v.slug === currentSlug;
              return (
                <Link
                  key={v.storage ?? v.slug}
                  href={productHref({
                    brand: v.brand,
                    model: v.model,
                    storage: v.storage,
                    color: v.color,
                    slug: v.slug,
                  })}
                  prefetch={false}
                  aria-current={active ? 'page' : undefined}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: active ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
                    color: active ? '#fff' : '#1d1d1f',
                    border: '1px solid transparent',
                  }}
                >
                  {v.storage ?? '—'}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {sims.length > 1 && (
        <div>
          <div className="text-[12px] font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
            SIM-карты
          </div>
          <div className="flex flex-wrap gap-2">
            {sims.map((v) => {
              const active = v.slug === currentSlug;
              const label = formatSimType(v.sim_type) || v.sim_type || '—';
              return (
                <Link
                  key={v.sim_type ?? v.slug}
                  href={productHref({
                    brand: v.brand,
                    model: v.model,
                    storage: v.storage,
                    color: v.color,
                    slug: v.slug,
                  })}
                  prefetch={false}
                  aria-current={active ? 'page' : undefined}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: active ? '#1d1d1f' : 'rgba(0,0,0,0.05)',
                    color: active ? '#fff' : '#1d1d1f',
                    border: '1px solid transparent',
                  }}
                >
                  <span aria-hidden>📱</span>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {colors.length > 1 && (
        <div>
          <div className="text-[12px] font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
            Цвет
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((v) => {
              const active = v.slug === currentSlug;
              return (
                <Link
                  key={v.color ?? v.slug}
                  href={productHref({
                    brand: v.brand,
                    model: v.model,
                    storage: v.storage,
                    color: v.color,
                    slug: v.slug,
                  })}
                  prefetch={false}
                  aria-current={active ? 'page' : undefined}
                  className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                  style={{
                    background: active
                      ? 'rgba(0, 113, 227, 0.10)'
                      : 'rgba(0, 0, 0, 0.04)',
                    color: 'var(--color-text)',
                    border: active
                      ? '1.5px solid var(--color-accent)'
                      : '1.5px solid transparent',
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full border"
                    style={{
                      background: cssColorFromRussian(v.color || ''),
                      borderColor: 'rgba(0,0,0,0.15)',
                    }}
                    aria-hidden
                  />
                  {v.color ?? '—'}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** Возвращает первый элемент с уникальным значением `pick(item)`, сохраняя порядок. */
function uniqueByField<T>(arr: T[], pick: (item: T) => unknown): T[] {
  const seen = new Set<unknown>();
  const out: T[] = [];
  for (const item of arr) {
    const v = pick(item);
    if (!v) continue;
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(item);
  }
  return out;
}

/** Маппинг русских названий цветов на CSS-цвет для preview-точки. */
function cssColorFromRussian(name: string): string {
  const n = name.toLowerCase();
  if (/чёрн|black|onyx|space\s*black/.test(n)) return '#1c1c1e';
  if (/бел|white|silver|серебр/.test(n)) return '#f5f5f7';
  if (/титан|titanium|natural\s*titanium|natural/.test(n)) return '#9da6ad';
  if (/desert|titan.*desert|пустын|gold|золот|champagne/.test(n)) return '#cfb88f';
  if (/синий|blue|deep\s*blue|sierra\s*blue|cobalt|midnight/.test(n)) return '#3a6fb0';
  if (/зелён|green|alpine|sage/.test(n)) return '#5d7e6b';
  if (/красн|red|product\s*red/.test(n)) return '#cc2236';
  if (/фиолет|purple|violet|lavender|сирен/.test(n)) return '#8d6cb6';
  if (/розов|pink|rose/.test(n)) return '#f4a8b5';
  if (/жёлт|yellow|gold/.test(n)) return '#f4d57a';
  if (/оранж|orange|cosmic|peach|coral/.test(n)) return '#ff7a45';
  if (/корич|brown|graphite|графит/.test(n)) return '#5a4a3a';
  if (/сер|gray|grey/.test(n)) return '#9e9e9e';
  return '#cfcfcf';
}
