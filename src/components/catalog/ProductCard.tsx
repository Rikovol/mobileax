'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { CatalogItemOut } from '@/types/api';
import { formatPrice, discountLabel, mediaUrl, formatSimType } from '@/lib/utils';

interface Props {
  item: CatalogItemOut;
}

export default function ProductCard({ item }: Props) {
  const name = [item.brand, item.model, item.storage].filter(Boolean).join(' ');
  const discount = discountLabel(item.discount_percent ?? null);

  // Tilt effect via pointer tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <Link
        href={`/product/${item.slug}`}
        className="product-card group flex flex-col h-full rounded-2xl bg-[var(--color-bg-secondary)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.10)]"
        title={name}
      >
        {/* Image area */}
        <div className="aspect-square relative overflow-hidden">
          {item.photo_main ? (
            <Image
              src={mediaUrl(item.photo_main)}
              alt={name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--color-text-secondary)] text-4xl select-none">
              📱
            </div>
          )}

          {/* Promo badge — top left */}
          {item.promo && (
            <span className="absolute top-3 left-3 bg-[var(--color-accent)] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full leading-none shadow-sm">
              {item.promo.title}
            </span>
          )}

          {/* Discount badge — top right */}
          {discount && (
            <span className="absolute top-3 right-3 bg-[var(--color-success)] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full leading-none shadow-sm">
              {discount}
            </span>
          )}
        </div>

        {/* Info block */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[11px] text-[var(--color-text-secondary)] mb-1 uppercase tracking-widest font-medium">
            {item.brand}
          </p>
          <p
            className="font-semibold text-[var(--color-text)] leading-snug line-clamp-2 text-[15px]"
            style={{ minHeight: '2.6em' }}
          >
            {item.model}
            {item.storage && ` ${item.storage}`}
            {item.color && (
              <span className="font-normal text-[var(--color-text-secondary)]"> · {item.color}</span>
            )}
          </p>

          {item.condition === 'used' && item.battery_pct && (
            <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
              <span>🔋</span>
              <span>Батарея {item.battery_pct}</span>
            </p>
          )}

          {item.condition === 'new' && formatSimType(item.sim_type) && (
            <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
              <span>📱</span>
              <span>{formatSimType(item.sim_type)}</span>
            </p>
          )}

          <div className="mt-auto pt-3 flex flex-col" style={{ minHeight: '3.25rem' }}>
            {item.price_retail && item.price_retail > item.price_effective ? (
              <p className="line-through text-xs text-[var(--color-text-secondary)]">
                {formatPrice(item.price_retail)}
              </p>
            ) : (
              <p className="text-xs invisible select-none" aria-hidden>
                &nbsp;
              </p>
            )}
            <p className="text-[17px] font-semibold text-[var(--color-text)]">
              {formatPrice(item.price_effective)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
