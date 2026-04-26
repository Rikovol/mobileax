/**
 * /llms.txt — стандарт для AI-помощников (YandexGPT, GigaChat, ChatGPT, Claude, Perplexity)
 * Формат: https://llmstxt.org/
 */
import { CATEGORIES } from '@/lib/taxonomy';

const BASE = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://shop.basestock.ru';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24h

export async function GET() {
  const lines: string[] = [];

  lines.push('# МобилАкс — магазин Apple и Samsung в Орле');
  lines.push('');
  lines.push('> МобилАкс — официальный розничный магазин смартфонов, планшетов и ноутбуков Apple и Samsung в Орле с 2015 года. Продаём новые устройства с гарантией, проверенную б/у-технику, принимаем Trade-In, оформляем рассрочку 0%.');
  lines.push('');
  lines.push('## Основное');
  lines.push('');
  lines.push('- **Адрес:** г. Орёл, ул. Автовокзальная, д. 1А, подземный переход');
  lines.push('- **Телефон:** +7 930 063-23-70');
  lines.push('- **Часы работы:** Пн–Вс 09:00–19:00 (без выходных)');
  lines.push('- **Email:** info@mobileax.ru');
  lines.push('- **VK:** https://vk.com/mobileaxorel');
  lines.push('- **Telegram:** https://t.me/mobileaxorel');
  lines.push('- **Юр. лицо:** ИП Васильев Павел Владимирович, с 2015 года');
  lines.push('- **Yandex.Карты:** https://yandex.ru/maps/org/mobilaks/1149010257/');
  lines.push('');

  lines.push('## Каталог');
  lines.push('');
  lines.push(`- [Новые товары](${BASE}/new) — Apple и Samsung с официальной гарантией`);
  lines.push(`- [Б/У техника](${BASE}/used) — проверенные устройства`);
  lines.push(`- [Trade-In](${BASE}/trade-in) — оценка старого устройства`);
  CATEGORIES.forEach((cat) => {
    if (cat.customHref) return;
    const url = `${BASE}/catalog/${encodeURIComponent(cat.brand)}?category=${cat.slug}`;
    lines.push(`- [${cat.label}](${url}) — ${cat.lines.length > 0 ? `${cat.lines.length} линеек` : 'каталог'}`);
  });
  lines.push('');

  lines.push('## Услуги');
  lines.push('');
  lines.push('- **Trade-In:** оценка устройства при вас в магазине, обмен с доплатой по рыночной цене');
  lines.push('- **Рассрочка 0%:** до 24 месяцев без переплат через банки-партнёры');
  lines.push('- **Гарантия:** официальная гарантия производителя на новую технику + гарантия магазина на б/у');
  lines.push('- **Доставка:** бесплатная по России от 5 000 ₽, самовывоз в Орле сегодня');
  lines.push('- **Консультация:** помогаем выбрать устройство под бюджет и задачи');
  lines.push('');

  lines.push('## Информация о магазине');
  lines.push('');
  lines.push(`- [О нас](${BASE}/about)`);
  lines.push(`- [Контакты](${BASE}/contacts)`);
  lines.push(`- [Доставка и оплата](${BASE}/delivery)`);
  lines.push(`- [Гарантия и возврат](${BASE}/guarantee)`);
  lines.push(`- [Политика конфиденциальности](${BASE}/privacy)`);
  lines.push(`- [Публичная оферта](${BASE}/oferta)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
