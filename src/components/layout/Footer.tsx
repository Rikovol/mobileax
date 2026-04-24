import Link from 'next/link';
import { getActiveTheme } from '@/lib/theme-resolver';

const theme = getActiveTheme();

const FOOTER_COLS = [
  {
    heading: 'Каталог',
    links: [
      { label: 'iPhone', href: '/catalog/Apple' },
      { label: 'Samsung', href: '/catalog/Samsung' },
      { label: 'MacBook', href: '/catalog/Apple' },
      { label: 'iPad', href: '/catalog/Apple' },
      { label: 'Apple Watch', href: '/catalog/Apple' },
      { label: 'AirPods', href: '/catalog/Apple' },
      { label: 'Б/У техника', href: '/used' },
    ],
  },
  {
    heading: 'Услуги',
    links: [
      { label: 'Trade-In', href: '/trade-in' },
      { label: 'Доставка и оплата', href: '/delivery' },
      { label: 'Рассрочка 0%', href: '/delivery' },
      { label: 'Сервисный центр', href: '/service' },
      { label: 'Гарантия и возврат', href: '/guarantee' },
    ],
  },
  {
    heading: 'Компания',
    links: [
      { label: 'О нас', href: '/about' },
      { label: 'Отзывы', href: '/reviews' },
      { label: 'Блог', href: '/blog' },
    ],
  },
  {
    heading: 'Помощь',
    links: [
      { label: 'Контакты', href: '/contacts' },
      { label: 'Условия доставки', href: '/delivery' },
      { label: 'Возврат и обмен', href: '/guarantee' },
    ],
  },
];

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.41c-.53 0-.7-.42-1.65-1.39-.83-.81-1.18-.91-1.38-.91-.28 0-.36.08-.36.47v1.28c0 .33-.1.53-1 .53-1.47 0-3.1-.89-4.25-2.55-1.72-2.42-2.19-4.23-2.19-4.6 0-.2.08-.38.47-.38h1.41c.35 0 .48.16.62.53.68 1.97 1.83 3.7 2.3 3.7.18 0 .25-.08.25-.52V9.53c-.05-.88-.52-.95-.52-1.27 0-.15.12-.3.32-.3h2.22c.3 0 .4.16.4.5v2.77c0 .3.13.4.22.4.18 0 .33-.1.66-.43 1.02-1.14 1.75-2.9 1.75-2.9.1-.2.26-.38.6-.38h1.41c.42 0 .52.22.42.5-.17.8-1.85 3.16-1.85 3.16-.14.23-.2.33 0 .58.15.2.63.62.95.99.59.67 1.04 1.24 1.16 1.63.12.38-.07.58-.46.58z"/>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.57-.46.71-.93.44l-2.57-1.89-1.24 1.19c-.14.14-.26.26-.53.26l.18-2.65 4.73-4.27c.2-.18-.05-.28-.32-.1L7.53 14.8l-2.5-.78c-.54-.17-.55-.54.12-.8l9.74-3.76c.45-.16.85.11.75.34z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-light)' }}
    >
      <div className="section-container py-14 md:py-20">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-[17px] font-semibold" style={{ color: 'var(--color-text)' }}>
                {theme.name}
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              Смартфоны, планшеты, ноутбуки Apple и Samsung в Орле.
            </p>
            <p className="text-[12px] mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              ул. Автовокзальная, д. 1, Орёл (302040)
            </p>
            <p className="text-[12px] mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Пн–Вс 9:00–19:00
            </p>
            <Link
              href="tel:+79300632370"
              className="text-[13px] font-medium mt-2 inline-block transition-colors hover:opacity-70"
              style={{ color: 'var(--color-accent)' }}
            >
              +7 930 063-23-70
            </Link>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              <Link
                href="https://vk.com/mobileaxorel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:opacity-70"
                style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <VkIcon />
              </Link>
              <Link
                href="https://t.me/mobileaxorel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:opacity-70"
                style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <TelegramIcon />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-[11px] font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + fine print */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ borderColor: 'var(--color-border-light)' }}>
          <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
            &copy; 2015–{new Date().getFullYear()} {theme.name}. ИП Васильев П.В. ОГРН 315574900011628. ИНН 575002497083
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[11px] transition-colors hover:opacity-80" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
              Политика конфиденциальности
            </Link>
            <Link href="/oferta" className="text-[11px] transition-colors hover:opacity-80" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
