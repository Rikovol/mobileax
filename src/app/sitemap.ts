import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/taxonomy';

const BASE = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://shop.basestock.ru';

const STATIC_PAGES: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/new', changeFrequency: 'daily', priority: 0.9 },
  { path: '/used', changeFrequency: 'daily', priority: 0.9 },
  { path: '/trade-in', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contacts', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/accessories', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/oferta', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/delivery', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/guarantee', changeFrequency: 'monthly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Динамические категории/линейки из taxonomy
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.flatMap((cat) => {
    const baseHref = cat.customHref ?? `/catalog/${encodeURIComponent(cat.brand)}?category=${cat.slug}`;
    const cards: MetadataRoute.Sitemap = [
      { url: `${BASE}${baseHref}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    ];
    if (!cat.customHref) {
      cat.lines.forEach((line) => {
        cards.push({
          url: `${BASE}/catalog/${encodeURIComponent(cat.brand)}?category=${cat.slug}&line=${line.slug}`,
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      });
    }
    return cards;
  });

  return [...staticEntries, ...categoryEntries];
}
