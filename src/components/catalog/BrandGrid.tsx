'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { FacetItem } from '@/types/api';

// Fallback brand list when API is not connected yet
const FALLBACK_BRANDS: FacetItem[] = [
  { value: 'Apple', label: 'Apple', count: 0 },
  { value: 'Samsung', label: 'Samsung', count: 0 },
  { value: 'Xiaomi', label: 'Xiaomi', count: 0 },
  { value: 'Google', label: 'Google', count: 0 },
];

interface Props {
  brands: FacetItem[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function BrandGrid({ brands }: Props) {
  const displayBrands = brands.length > 0 ? brands : FALLBACK_BRANDS;

  return (
    <section className="bg-[var(--color-bg-secondary)]">
      <div className="section-container section-gap">
        <h2 className="text-2xl font-semibold mb-10">Бренды</h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {displayBrands.map((brand) => (
            <motion.div key={brand.value} variants={itemVariants}>
              <Link
                href={`/catalog/${encodeURIComponent(brand.value)}`}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-200 hover:shadow-md group"
              >
                <span className="text-lg font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {brand.label}
                </span>
                {brand.count > 0 && (
                  <span className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {brand.count} товаров
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
