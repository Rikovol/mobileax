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
    href: '/catalog/Apple?category=iphone',
    imgSrc: '/themes/mobileax/categories/iphone.png',
    imgAlt: 'iPhone',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    name: 'Mac',
    sub: 'MacBook Air и Pro',
    href: '/catalog/Apple?category=mac',
    imgSrc: '/themes/mobileax/categories/mac.png',
    imgAlt: 'Mac',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    name: 'iPad',
    sub: 'iPad Pro и Air',
    href: '/catalog/Apple?category=ipad',
    imgSrc: '/themes/mobileax/categories/ipad.png',
    imgAlt: 'iPad',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    name: 'Apple Watch',
    sub: 'Series и Ultra',
    href: '/catalog/Apple?category=watch',
    imgSrc: '/themes/mobileax/categories/watch.png',
    imgAlt: 'Apple Watch',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    name: 'AirPods',
    sub: 'AirPods Pro и Max',
    href: '/catalog/Apple?category=airpods',
    imgSrc: '/themes/mobileax/categories/airpods.png',
    imgAlt: 'AirPods',
    bg: '#fbfbfd',
    textDark: true,
  },
  {
    name: 'Vision',
    sub: 'Apple Vision Pro',
    href: '/catalog/Apple?category=vision',
    imgSrc: '/themes/mobileax/categories/vision-pro.png',
    imgAlt: 'Apple Vision Pro',
    bg: '#fbfbfd',
    textDark: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function CategoryGrid() {
  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div className="section-container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
            }}
          >
            Выберите категорию
          </h2>
          <p className="mt-3 text-[1.0625rem]" style={{ color: 'var(--color-text-secondary)' }}>
            Apple и Samsung. Новые и проверенные б/у — с гарантией.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.name} variants={cardVariants}>
              <Link
                href={cat.href}
                className="group relative block rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
                style={{ background: cat.bg, aspectRatio: '4/3' }}
                aria-label={cat.name}
              >
                {/* Badge */}
                {cat.badge && (
                  <span
                    className="absolute top-4 left-4 z-20 text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                    style={{ background: '#0071e3', color: '#fff' }}
                  >
                    {cat.badge}
                  </span>
                )}

                {/* Product image — fills card */}
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.04] group-hover:-translate-y-0.5">
                    <Image
                      src={cat.imgSrc}
                      alt={cat.imgAlt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 45vw, 30vw"
                    />
                  </div>
                </div>

                {/* Text overlay — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.1em] mb-0.5 opacity-50"
                    style={{ color: '#1d1d1f' }}
                  >
                    {cat.sub}
                  </p>
                  <h3
                    className="font-semibold text-[1.1875rem] md:text-[1.375rem] leading-tight"
                    style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
                  >
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
