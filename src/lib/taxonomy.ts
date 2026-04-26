/**
 * Каталог: категории и подкатегории (линейки моделей).
 * Используется для:
 *  - Header / Footer / CategoryGrid / HeroSlider — построение ссылок
 *  - app/catalog/[brand]/page.tsx — фильтрация через `search`-параметр phonebase API
 *  - CatalogSubNav — chips для переключения линейки в каталоге
 *
 * Каждая `line` отображается в `search`-запрос через `searchQuery` —
 * подстрока имени модели в phonebase (нечувствительная к регистру).
 */

export interface CategoryLine {
  slug: string;
  label: string;
  /** Подстрока для phonebase /catalog?search= */
  searchQuery: string;
}

export interface Category {
  slug: string;
  brand: string; // brand из phonebase /brands
  label: string;
  /** Иконка из public/themes/mobileax/categories/ */
  icon: string;
  lines: CategoryLine[];
  /** Кастомная ссылка (если задана — игнорирует brand-based URL). */
  customHref?: string;
  /** search-фильтр для всей категории, когда линия не выбрана.
   *  Используется в /catalog/[brand]?category=X (без line) — иначе brand даёт всё подряд
   *  (iPhone, MacBook, iPad смешанно). Для категорий-«всё» (used) — пусто. */
  searchQuery?: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'used',
    brand: 'Apple', // multi-brand, главное — condition=used
    label: 'Б/У техника',
    icon: '/themes/mobileax/categories/used.png',
    lines: [],
    customHref: '/used',
  },
  {
    slug: 'iphone',
    brand: 'Apple',
    label: 'iPhone',
    icon: '/themes/mobileax/categories/iphone.png',
    searchQuery: 'iPhone',
    lines: [
      { slug: '17', label: 'iPhone 17', searchQuery: 'iPhone 17 ' }, // включает и 17e (search префиксный)
      { slug: '17-pro', label: 'iPhone 17 Pro', searchQuery: 'iPhone 17 Pro' },
      { slug: '17-pro-max', label: 'iPhone 17 Pro Max', searchQuery: 'iPhone 17 Pro Max' },
      { slug: 'air', label: 'iPhone Air', searchQuery: 'iPhone Air' },
      { slug: '16', label: 'iPhone 16', searchQuery: 'iPhone 16 ' },
      { slug: '16-pro', label: 'iPhone 16 Pro', searchQuery: 'iPhone 16 Pro' },
      { slug: '16-pro-max', label: 'iPhone 16 Pro Max', searchQuery: 'iPhone 16 Pro Max' },
      { slug: '15', label: 'iPhone 15', searchQuery: 'iPhone 15' },
      { slug: '14', label: 'iPhone 14', searchQuery: 'iPhone 14' },
      { slug: '13', label: 'iPhone 13', searchQuery: 'iPhone 13' },
    ],
  },
  {
    slug: 'mac',
    searchQuery: 'Mac',
    brand: 'Apple',
    label: 'Mac',
    icon: '/themes/mobileax/categories/mac.png',
    lines: [
      { slug: 'macbook-air', label: 'MacBook Air', searchQuery: 'MacBook Air' },
      { slug: 'macbook-pro', label: 'MacBook Pro', searchQuery: 'MacBook Pro' },
      { slug: 'imac', label: 'iMac', searchQuery: 'iMac' },
      { slug: 'mac-mini', label: 'Mac mini', searchQuery: 'Mac mini' },
      { slug: 'mac-studio', label: 'Mac Studio', searchQuery: 'Mac Studio' },
    ],
  },
  {
    slug: 'ipad',
    brand: 'Apple',
    searchQuery: 'iPad',
    label: 'iPad',
    icon: '/themes/mobileax/categories/ipad.png',
    lines: [
      { slug: 'ipad-pro', label: 'iPad Pro', searchQuery: 'iPad Pro' },
      { slug: 'ipad-air', label: 'iPad Air', searchQuery: 'iPad Air' },
      { slug: 'ipad', label: 'iPad', searchQuery: 'iPad ' },
      { slug: 'ipad-mini', label: 'iPad mini', searchQuery: 'iPad mini' },
    ],
  },
  {
    slug: 'watch',
    searchQuery: 'Watch',
    brand: 'Apple',
    label: 'Apple Watch',
    icon: '/themes/mobileax/categories/watch.png',
    lines: [
      { slug: 'series-10', label: 'Apple Watch Series 10', searchQuery: 'Watch Series 10' },
      { slug: 'series-11', label: 'Apple Watch Series 11', searchQuery: 'Watch Series 11' },
      { slug: 'ultra', label: 'Apple Watch Ultra', searchQuery: 'Watch Ultra' },
      { slug: 'se', label: 'Apple Watch SE', searchQuery: 'Watch SE' },
    ],
  },
  {
    slug: 'airpods',
    searchQuery: 'AirPods',
    brand: 'Apple',
    label: 'AirPods',
    icon: '/themes/mobileax/categories/airpods.png',
    lines: [
      { slug: 'pro-3', label: 'AirPods Pro 3', searchQuery: 'AirPods Pro 3' },
      { slug: 'pro-2', label: 'AirPods Pro 2', searchQuery: 'AirPods Pro 2' },
      { slug: 'max', label: 'AirPods Max', searchQuery: 'AirPods Max' },
      { slug: '4', label: 'AirPods 4', searchQuery: 'AirPods 4' },
    ],
  },
  {
    slug: 'samsung',
    searchQuery: 'Galaxy',
    brand: 'Samsung',
    label: 'Samsung',
    icon: '/themes/mobileax/categories/samsung.png',
    lines: [
      { slug: 's26-ultra', label: 'Galaxy S26 Ultra', searchQuery: 'Galaxy S26 Ultra' },
      { slug: 's26-plus', label: 'Galaxy S26+', searchQuery: 'Galaxy S26+' },
      { slug: 's26', label: 'Galaxy S26', searchQuery: 'Galaxy S26 ' },
      { slug: 's25-ultra', label: 'Galaxy S25 Ultra', searchQuery: 'Galaxy S25 Ultra' },
      { slug: 's25', label: 'Galaxy S25', searchQuery: 'Galaxy S25 ' },
      { slug: 's24', label: 'Galaxy S24', searchQuery: 'Galaxy S24' },
      { slug: 'a56', label: 'Galaxy A56', searchQuery: 'Galaxy A56' },
      { slug: 'a36', label: 'Galaxy A36', searchQuery: 'Galaxy A36' },
      { slug: 'a26', label: 'Galaxy A26', searchQuery: 'Galaxy A26' },
      { slug: 'a25', label: 'Galaxy A25', searchQuery: 'Galaxy A25' },
      { slug: 'a17', label: 'Galaxy A17', searchQuery: 'Galaxy A17' },
      { slug: 'a07', label: 'Galaxy A07', searchQuery: 'Galaxy A07' },
      { slug: 'watch-8-ultra', label: 'Galaxy Watch 8 Ultra', searchQuery: 'Galaxy Watch 8 Ultra' },
      { slug: 'watch-7-ultra', label: 'Galaxy Watch 7 Ultra', searchQuery: 'Galaxy Watch 7 Ultra' },
    ],
  },
  {
    slug: 'sony',
    brand: 'Sony',
    label: 'Sony',
    icon: '/themes/mobileax/categories/sony.png',
    lines: [],
  },
  {
    slug: 'dyson',
    brand: 'Dyson',
    label: 'Dyson',
    icon: '/themes/mobileax/categories/dyson.png',
    lines: [],
  },
  {
    slug: 'jbl',
    brand: 'JBL',
    label: 'JBL',
    icon: '/themes/mobileax/categories/jbl.png',
    lines: [],
  },
];

/** Найти категорию по slug. */
export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Найти категории по brand-имени (нечувствительно к регистру). */
export function getCategoriesByBrand(brand: string): Category[] {
  const b = brand.toLowerCase();
  return CATEGORIES.filter((c) => c.brand.toLowerCase() === b);
}

/** Построить URL для категории. Использует customHref если задан, иначе /catalog/<brand>?category=...&line=... */
export function categoryUrl(category: Category, line?: CategoryLine | string): string {
  if (category.customHref && !line) return category.customHref;
  const params = new URLSearchParams();
  params.set('category', category.slug);
  if (line) {
    const slug = typeof line === 'string' ? line : line.slug;
    params.set('line', slug);
  }
  return `/catalog/${encodeURIComponent(category.brand)}?${params.toString()}`;
}

/** Найти линию по slug внутри категории. */
export function getLine(category: Category, lineSlug: string): CategoryLine | undefined {
  return category.lines.find((l) => l.slug === lineSlug);
}
