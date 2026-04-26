/**
 * Загрузка блоков главной (CMS) из phonebase.
 *
 * phonebase отдаёт `/api/sites/{store_id}/home-blocks` — это публичный feed.
 * Кэш 5 минут (ISR), при ошибке возвращаем пустой массив — компоненты
 * страницы должны иметь fallback на свои hardcoded дефолты.
 */

export interface HomeCardData {
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  bg_preset: string;
  text_dark: boolean;
  cta_label: string | null;
  cta_href: string | null;
  cta_color: string;
}

export interface HomeSectionData {
  key: string;
  enabled: boolean;
  cards: HomeCardData[];
}

export interface HomeBlocks {
  sections: HomeSectionData[];
}

const BASE_URL = process.env.NEXT_PUBLIC_PHONEBASE_API || 'http://localhost:8000';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';

/**
 * Получает все блоки главной для текущего магазина.
 * При ошибке возвращает пустой объект — компоненты подхватят fallback.
 */
export async function fetchHomeBlocks(): Promise<HomeBlocks> {
  if (!STORE_ID) return { sections: [] };
  try {
    const res = await fetch(`${BASE_URL}/api/sites/${STORE_ID}/home-blocks`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error('[home-blocks] fetch failed:', res.status);
      return { sections: [] };
    }
    return (await res.json()) as HomeBlocks;
  } catch (err) {
    console.error('[home-blocks] error:', err);
    return { sections: [] };
  }
}

/** Найти секцию по ключу. Возвращает null если секция отсутствует или disabled. */
export function getSection(blocks: HomeBlocks, key: string): HomeSectionData | null {
  const section = blocks.sections.find((s) => s.key === key);
  if (!section || !section.enabled) return null;
  return section;
}

/** Преобразует относительный image_url (`/media/...` или `/themes/...`) в абсолютный.
 *  Для https:///data: оставляет как есть. Используется в карточке через next/image.
 */
export function homeImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (/^(https?:|data:)/i.test(url)) return url;
  if (url.startsWith('/themes/')) return url;  // локальные дефолтные ассеты
  if (url.startsWith('/media/')) return `${BASE_URL}${url}`;
  return url;
}
