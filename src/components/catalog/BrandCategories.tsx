'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}

const CATEGORIES: Category[] = [
  {
    name: 'Б/У техника',
    href: '/used',
    imgSrc: 'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/148/12.png',
    imgAlt: 'Техника Б/У',
  },
  {
    name: 'iPhone',
    href: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0003-0003-0003-000000000003/f3e0b25d2aa04926ba1dbb0b494ccce1.jpg',
    imgAlt: 'iPhone',
  },
  {
    name: 'iPad',
    href: '/catalog/Apple',
    imgSrc: 'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/148/12.png',
    imgAlt: 'iPad',
  },
  {
    name: 'MacBook',
    href: '/catalog/Apple',
    imgSrc:
      'https://basestock.ru/media/catalog/11111111-0001-0001-0001-000000000001/3b64e3a140ed4520b4a968d77a93bde7.jpg',
    imgAlt: 'MacBook',
  },
  {
    name: 'Watch',
    href: '/catalog/Apple',
    imgSrc: 'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/149/13.png',
    imgAlt: 'Apple Watch',
  },
  {
    name: 'AirPods',
    href: '/catalog/Apple',
    imgSrc: 'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/150/14.png',
    imgAlt: 'AirPods',
  },
  {
    name: 'Samsung',
    href: '/catalog/Samsung',
    imgSrc:
      'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/products/66/19/11966/images/12270/12270.240.jpg',
    imgAlt: 'Samsung',
  },
  {
    name: 'Аксессуары',
    href: '/catalog/Apple',
    imgSrc: 'https://xn--80abvjddo3a.xn--p1ai/wa-data/public/shop/categories/151/15.png',
    imgAlt: 'Аксессуары',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function BrandCategories() {
  return (
    <div
      className="border-b"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        padding: '28px 0 24px',
      }}
    >
      <div className="section-container">
        <motion.div
          className="flex gap-4 md:gap-6 overflow-x-auto pb-1 justify-start md:justify-center"
          style={{ scrollbarWidth: 'none' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants} className="shrink-0">
              <Link href={cat.href} className="flex flex-col items-center group" aria-label={cat.name}>
                <div className="w-[68px] h-[68px] md:w-[78px] md:h-[78px] flex items-center justify-center">
                  <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={cat.imgSrc}
                      alt={cat.imgAlt}
                      fill
                      className="object-contain"
                      sizes="78px"
                      unoptimized
                    />
                  </div>
                </div>
                <span
                  className="mt-2 text-[12px] text-center leading-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
