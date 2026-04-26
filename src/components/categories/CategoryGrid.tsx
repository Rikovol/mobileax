'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CATEGORIES, categoryUrl } from '@/lib/taxonomy';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

// Subtitle для каждой категории — отображает количество линеек
function categorySubtitle(category: typeof CATEGORIES[number]): string {
  const linesCount = category.lines.length;
  if (category.brand === 'Apple') {
    if (category.slug === 'iphone') return 'Серия 17, 16, 15, 14, 13';
    if (category.slug === 'mac') return 'MacBook, iMac, Mac mini';
    if (category.slug === 'ipad') return 'Pro, Air, mini';
    if (category.slug === 'watch') return 'Series 10/11, Ultra, SE';
    if (category.slug === 'airpods') return 'Pro 3, Pro 2, Max, AirPods 4';
    if (category.slug === 'vision') return 'Vision Pro';
  }
  if (category.brand === 'Samsung') {
    if (category.slug === 'galaxy-s') return 'S26 Ultra, S26, S25, S24';
    if (category.slug === 'galaxy-a') return 'A56, A36, A26, A17';
    if (category.slug === 'galaxy-watch') return 'Watch 8 Ultra, Watch 7 Ultra';
  }
  return `${linesCount} линеек`;
}

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
            Apple и Samsung — новые и проверенные б/у с гарантией.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.slug} variants={cardVariants}>
              <Link
                href={categoryUrl(category)}
                className="group relative block rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99]"
                style={{ background: '#fbfbfd', aspectRatio: '4/3' }}
                aria-label={category.label}
              >
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.04] group-hover:-translate-y-0.5">
                    <Image
                      src={category.icon}
                      alt={category.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 45vw, 30vw"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <p
                    className="text-[10px] font-medium uppercase tracking-[0.1em] mb-0.5 opacity-50"
                    style={{ color: '#1d1d1f' }}
                  >
                    {categorySubtitle(category)}
                  </p>
                  <h3
                    className="font-semibold text-[1.1875rem] md:text-[1.375rem] leading-tight"
                    style={{ color: '#1d1d1f', letterSpacing: '-0.02em' }}
                  >
                    {category.label}
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
