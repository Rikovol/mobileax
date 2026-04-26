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

/**
 * Транслитерация кириллицы в латиницу + slugify для URL-prefix.
 * Используется ТОЛЬКО для человекочитаемого префикса, не для идентификации товара.
 * Backend по-прежнему ищет товар по base64-части после `--`.
 */
const CYRILLIC_MAP: Record<string, string> = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'i',
  к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
  х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .split('')
    .map((ch) => CYRILLIC_MAP[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80); // не раздуваем URL
}

/**
 * Строит человекочитаемую ссылку на товар:
 * `/product/{slugified-brand-model-storage-color}--{base64-slug}`
 * Backend разбирает по `--` и берёт последнюю часть как идентификатор.
 * Если префикс пустой/слишком короткий — возвращаем чистый slug (back-compat).
 */
export function productHref(parts: {
  brand?: string | null;
  model?: string | null;
  storage?: string | null;
  color?: string | null;
  slug: string;
}): string {
  const human = slugify(
    [parts.brand, parts.model, parts.storage, parts.color].filter(Boolean).join(' '),
  );
  return human ? `/product/${human}--${parts.slug}` : `/product/${parts.slug}`;
}

/**
 * Достаёт «настоящий» slug (base64) из URL-параметра, удаляя человекочитаемый
 * префикс. Совместим со старыми URL без префикса.
 */
export function extractRealSlug(slug: string): string {
  const idx = slug.lastIndexOf('--');
  if (idx === -1) return slug;
  return slug.slice(idx + 2);
}

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
