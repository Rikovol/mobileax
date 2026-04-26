/**
 * Сборка человекочитаемых URL товара.
 *
 * Формат: `/<condition>/<brand>/<category>/<human>~~<slug>`
 * Пример: `/new/apple/iphone/iphone-17-pro-512gb-silver~~base64slug`
 *         `/used/samsung/s-series/galaxy-s26-ultra-512gb-black~~uuid`
 *
 * `~~<slug>` остаётся в URL как невидимый дисамбигуатор:
 *  - для новых: base64('brand|model|storage|color')
 *  - для б/у:   UUID (несколько физических единиц с одинаковыми параметрами)
 *
 * При ресолве запроса: catch-all route берёт последний сегмент path,
 * извлекает часть после `~~` через `extractRealSlug()`.
 */

const CYRILLIC_MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .split('')
    .map((ch) => CYRILLIC_MAP[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

/** Slug бренда для URL: только латиница/цифры. */
export function brandSlug(brand: string | null | undefined): string {
  if (!brand) return 'misc';
  const s = brand.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return s || 'misc';
}

/**
 * Категория товара по brand+model. Используется для URL `/{cond}/{brand}/{category}/...`.
 * Возвращает kebab-slug. Намеренно консервативна: если ничего не подошло —
 * возвращаем brandSlug (категория = бренд, single-level).
 */
export function categorySlug(brand: string | null | undefined, model: string): string {
  const m = model.toLowerCase();
  if (/iphone/.test(m)) return 'iphone';
  if (/macbook|imac|mac\s*mini|mac\s*studio|\bmac\b/.test(m)) return 'mac';
  if (/ipad/.test(m)) return 'ipad';
  if (/airpods/.test(m)) return 'airpods';
  if (/apple\s*watch|^watch\b|watch\s+(series|ultra|se)/.test(m)) return 'watch';
  if (/vision\s*pro/.test(m)) return 'vision';
  if (/galaxy\s*s\d/.test(m)) return 's-series';
  if (/galaxy\s*a\d/.test(m)) return 'a-series';
  if (/galaxy\s*watch/.test(m)) return 'watch';
  if (/galaxy\s*tab/.test(m)) return 'tab';
  if (/galaxy\s*z?\s*fold/.test(m)) return 'fold';
  if (/galaxy\s*z?\s*flip/.test(m)) return 'flip';
  if (/galaxy\s*buds/.test(m)) return 'buds';
  return brandSlug(brand);
}

/**
 * Человекочитаемая часть URL: `iphone-17-pro-512gb-silver`.
 * Чистит модель от мусора:
 *  - префикс бренда (Apple/Samsung) удаляется — он уже есть в URL отдельно
 *  - скобочные пометки `(НОВЫЙ)`, `(2025)`, `(2024)` срезаются
 *  - storage / color / sim_type добавляются в конец
 */
export function humanSlug(parts: {
  brand?: string | null;
  model: string;
  storage?: string | null;
  color?: string | null;
  simType?: string | null;
}): string {
  let m = parts.model;
  if (parts.brand) {
    const re = new RegExp(`^\\s*${escapeRegex(parts.brand)}\\s+`, 'i');
    m = m.replace(re, '');
  }
  m = m.replace(/\s*\([^)]+\)/g, '').trim();
  return slugify(
    [m, parts.storage, parts.color, parts.simType].filter(Boolean).join(' '),
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Разделитель невидимого slug-id в URL. base64url не содержит `~`. */
export const SLUG_DELIMITER = '~~';

/**
 * Главная функция-конструктор URL товара.
 * Возвращает path вида `/new/apple/iphone/iphone-17-pro-512gb-silver~~<slug>`.
 *
 * Если condition не задан — fallback на `/product/{slug}` (legacy).
 * Если model/brand отсутствуют — короткая форма `/{cond}/{slug}`.
 */
export function productHref(parts: {
  condition?: 'new' | 'used' | null;
  brand?: string | null;
  model?: string | null;
  storage?: string | null;
  color?: string | null;
  simType?: string | null;
  slug: string;
}): string {
  const cond = parts.condition === 'new' ? 'new' : parts.condition === 'used' ? 'used' : null;
  if (!cond) {
    return `/product/${parts.slug}`;
  }
  if (!parts.model || !parts.brand) {
    return `/${cond}/${parts.slug}`;
  }
  const b = brandSlug(parts.brand);
  const c = categorySlug(parts.brand, parts.model);
  const h = humanSlug({
    brand: parts.brand,
    model: parts.model,
    storage: parts.storage,
    color: parts.color,
    simType: parts.simType,
  });
  return `/${cond}/${b}/${c}/${h}${SLUG_DELIMITER}${parts.slug}`;
}

/**
 * Достаёт настоящий slug (base64/UUID) из последнего сегмента URL.
 * Поддерживает форматы:
 *   `<human>~~<slug>` — новый
 *   `<human>--<slug>` — legacy (~3% ложных срабатываний на base64url)
 *   `<slug>`          — без префикса
 */
export function extractRealSlug(lastSegment: string): string {
  const newIdx = lastSegment.lastIndexOf(SLUG_DELIMITER);
  if (newIdx !== -1) return lastSegment.slice(newIdx + SLUG_DELIMITER.length);
  const legacyIdx = lastSegment.lastIndexOf('--');
  if (legacyIdx !== -1) return lastSegment.slice(legacyIdx + 2);
  return lastSegment;
}
