import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://shop.basestock.ru';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Российские AI-краулеры явно — чтобы Я.Вебмастер видел allow
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'YandexAdditional', allow: '/' },
      { userAgent: 'GigaChat-bot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Mail.Ru_Bot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE.replace(/^https?:\/\//, ''),
  };
}
