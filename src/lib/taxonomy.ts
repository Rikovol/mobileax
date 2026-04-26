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
}

export const CATEGORIES: Category[] = [
  {
    slug: 'iphone',
    brand: 'Apple',
    label: 'iPhone',
    icon: '/themes/mobileax/categories/iphone.png',
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
    slug: 'vision',
    brand: 'Apple',
    label: 'Vision',
    icon: '/themes/mobileax/categories/vision-pro.png',
    lines: [
      { slug: 'pro', label: 'Vision Pro', searchQuery: 'Vision Pro' },
    ],
  },
  {
    slug: 'galaxy-s',
    brand: 'Samsung',
    label: 'Galaxy S',
    icon: '/themes/mobileax/categories/iphone.png', // TODO Samsung icon
    lines: [
      { slug: 's26-ultra', label: 'Galaxy S26 Ultra', searchQuery: 'Galaxy S26 Ultra' },
      { slug: 's26-plus', label: 'Galaxy S26+', searchQuery: 'Galaxy S26+' },
      { slug: 's26', label: 'Galaxy S26', searchQuery: 'Galaxy S26 ' },
      { slug: 's25-ultra', label: 'Galaxy S25 Ultra', searchQuery: 'Galaxy S25 Ultra' },
      { slug: 's25', label: 'Galaxy S25', searchQuery: 'Galaxy S25 ' },
      { slug: 's24', label: 'Galaxy S24', searchQuery: 'Galaxy S24' },
    ],
  },
  {
    slug: 'galaxy-a',
    brand: 'Samsung',
    label: 'Galaxy A',
    icon: '/themes/mobileax/categories/iphone.png', // TODO
    lines: [
      { slug: 'a56', label: 'Galaxy A56', searchQuery: 'Galaxy A56' },
      { slug: 'a36', label: 'Galaxy A36', searchQuery: 'Galaxy A36' },
      { slug: 'a26', label: 'Galaxy A26', searchQuery: 'Galaxy A26' },
      { slug: 'a25', label: 'Galaxy A25', searchQuery: 'Galaxy A25' },
      { slug: 'a17', label: 'Galaxy A17', searchQuery: 'Galaxy A17' },
      { slug: 'a07', label: 'Galaxy A07', searchQuery: 'Galaxy A07' },
    ],
  },
  {
    slug: 'galaxy-watch',
    brand: 'Samsung',
    label: 'Galaxy Watch',
    icon: '/themes/mobileax/categories/watch.png',
    lines: [
      { slug: 'watch-8-ultra', label: 'Galaxy Watch 8 Ultra', searchQuery: 'Galaxy Watch 8 Ultra' },
      { slug: 'watch-7-ultra', label: 'Galaxy Watch 7 Ultra', searchQuery: 'Galaxy Watch 7 Ultra' },
    ],
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

/** Построить URL: /catalog/<brand>?category=<cat>&line=<line>. */
export function categoryUrl(category: Category, line?: CategoryLine | string): string {
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
