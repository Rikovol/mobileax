'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductPhotoItem } from '@/types/api';

interface Props {
  photos: ProductPhotoItem[];
  name: string;
}

export default function ProductGallery({ photos, name }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-text-secondary)] text-5xl">
        📱
      </div>
    );
  }

  const active = photos[activeIdx];

  return (
    <div className="flex flex-col gap-4">
      {/* Main photo */}
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-[var(--color-bg-secondary)]">
        <Image
          src={active.url}
          alt={`${name} — фото ${activeIdx + 1}`}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIdx === 0}
        />
      </div>

      {/* Thumbnails — scrollable on mobile */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={[
                'shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200',
                idx === activeIdx
                  ? 'border-[var(--color-accent)] shadow-[0_0_0_2px_rgba(0,113,227,0.2)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50',
              ].join(' ')}
              aria-label={`Фото ${idx + 1}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.url}
                  alt={`${name} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
