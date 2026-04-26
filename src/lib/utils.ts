import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in RUB */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compute discount percentage display string */
export function discountLabel(discountPercent: number | null): string | null {
  if (!discountPercent) return null;
  return `-${discountPercent}%`;
}

/**
 * Перевод сырого `sim_type` из phonebase в читаемый русский ярлык.
 * Возможные значения от API: 'eSIM-only', 'SIM+eSIM', '2-SIM', '1-SIM',
 * 'Dual SIM', null. Возвращает null если значение пустое/неизвестное —
 * вызывающий код сам решает, рендерить ли строку.
 */
export function formatSimType(simType: string | null | undefined): string | null {
  if (!simType) return null;
  const v = simType.trim().toLowerCase();
  if (v === 'esim-only' || v === 'esim only' || v === 'only esim') return 'Только eSIM';
  if (v === 'sim+esim' || v === 'sim + esim' || v === 'nano-sim+esim') return 'Nano-SIM + eSIM';
  if (v === '2-sim' || v === 'dual sim' || v === '2 sim') return '2 × Nano-SIM';
  if (v === '1-sim' || v === '1 sim' || v === 'nano-sim') return 'Nano-SIM';
  // fallback — показываем как пришло
  return simType;
}

// Re-export нового модуля product-url. Старые импортёры `productHref`/`extractRealSlug`
// продолжают работать без изменений; всю логику смотрите в `lib/product-url.ts`.
export { productHref, extractRealSlug } from './product-url';

/** Resolve media path (`/media/...`) to absolute URL via NEXT_PUBLIC_PHONEBASE_API.
 *  Pass-through for already-absolute URLs and empty values.
 */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  // Pass-through for absolute URLs, protocol-relative, and data: URIs
  if (/^(?:https?:\/\/|\/\/|data:)/.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_PHONEBASE_API || '';
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}
