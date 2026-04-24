'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  sub: string;
  badge?: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
  textDark?: boolean;
}

const CATEGORIES: Category[] = [
  {
    name: 'iPhone',
    sub: 'Серия iPhone 17',
    badge: 'Новинка',
    href: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone 17 Pro Max',
    bg: '#1c1c1e',
  },
  {
    name: 'Mac',
    sub: 'MacBook Air M3',
    href: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0001-0001-0001-000000000001/3b64e3a140ed4520b4a968d77a93bde7.jpg',
    imgAlt: 'MacBook Air M3',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    name: 'iPad',
    sub: 'iPad Air M2',
    href: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/148/12.png',
    imgAlt: 'iPad',
    bg: '#e8f0f8',
    textDark: true,
  },
  {
    name: 'Apple Watch',
    sub: 'Series 10',
    href: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/149/13.png',
    imgAlt: 'Apple Watch',
    bg: '#2c2c2e',
  },
  {
    name: 'AirPods',
    sub: 'AirPods Pro 2',
    href: '/catalog/Apple',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/150/14.png',
    imgAlt: 'AirPods',
    bg: '#f5f5f7',
    textDark: true,
  },
  {
    name: 'Б/У',
    sub: 'Проверенные устройства',
    href: '/used',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0001-0001-0001-000000000001/3b64e3a140ed4520b4a968d77a93bde7.jpg',
    imgAlt: 'Техника Б/У',
    bg: '#1a3a2a',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function CategoryGrid() {
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-20 md:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
          >
            Выберите категорию
          </h2>
          <p className="mt-3 text-[1.0625rem]" style={{ color: 'var(--color-text-secondary)' }}>
            Новая техника Apple и Samsung. С гарантией и поддержкой.
          </p>
        </motion.div>

        {/* Grid: 3 cols desktop, 2 cols tablet, adaptive */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIES.map((cat) => {
            const dark = !cat.textDark;
            return (
              <motion.div key={cat.name} variants={cardVariants}>
                <Link
                  href={cat.href}
                  className="group relative block rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
                  style={{ background: cat.bg, aspectRatio: '4/3' }}
                  aria-label={cat.name}
                >
                  {/* Badge */}
                  {cat.badge && (
                    <span
                      className="absolute top-4 left-4 z-20 text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                      style={{ background: '#0071e3', color: '#fff' }}
                    >
                      {cat.badge}
                    </span>
                  )}

                  {/* Product image */}
                  <div className="absolute inset-0 flex items-end justify-end p-4">
                    <div
                      className="relative w-[55%] h-[70%] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                    >
                      <Image
                        src={cat.imgSrc}
                        alt={cat.imgAlt}
                        fill
                        className={`object-contain${cat.textDark ? ' mix-blend-multiply' : ''}`}
                        sizes="(max-width: 768px) 45vw, 30vw"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <p
                      className="text-[11px] font-medium uppercase tracking-[0.1em] mb-0.5 opacity-60"
                      style={{ color: dark ? '#fff' : '#1d1d1f' }}
                    >
                      {cat.sub}
                    </p>
                    <h3
                      className="font-bold text-[1.1875rem] md:text-[1.375rem] leading-tight"
                      style={{ color: dark ? '#fff' : '#1d1d1f' }}
                    >
                      {cat.name}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 mt-2 text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }}
                    >
                      Смотреть
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
