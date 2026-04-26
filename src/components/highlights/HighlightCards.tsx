'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Highlight {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  bg: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    eyebrow: 'Trade-In',
    title: 'Сдайте старое — получите новое\nсо скидкой.',
    cta: 'Оценить устройство',
    href: '/trade-in',
    imgSrc: '/themes/mobileax/heroes/iphone-17e.jpg',
    imgAlt: 'Trade-In',
    bg: 'linear-gradient(135deg, #0a2a4a 0%, #1a4a6a 100%)',
  },
  {
    eyebrow: 'Рассрочка 0%',
    title: 'Новый iPhone сегодня.\nПлатите потом.',
    cta: 'Узнать условия',
    href: '/delivery',
    imgSrc: '/themes/mobileax/heroes/iphone-17-pro.jpg',
    imgAlt: 'Рассрочка',
    bg: 'linear-gradient(135deg, #1c1c1e 0%, #3a2a4a 100%)',
  },
  {
    eyebrow: 'Б/У с гарантией',
    title: 'Проверенная техника.\nЦена — честная.',
    cta: 'Смотреть б/у',
    href: '/used',
    imgSrc: '/themes/mobileax/heroes/macbook.jpg',
    imgAlt: 'Б/У техника',
    bg: 'linear-gradient(135deg, #1a3a2a 0%, #2a5a3a 100%)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HighlightCards() {
  return (
    <section style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="section-container py-20 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}
        >
          Специальные предложения
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {HIGHLIGHTS.map((card) => (
            <motion.div key={card.eyebrow} variants={cardVariants}>
              <Link
                href={card.href}
                className="group relative block rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.015]"
                style={{ background: card.bg, minHeight: 380 }}
              >
                {/* Product image — top right */}
                <div className="absolute top-6 right-6 w-[140px] h-[170px] md:w-[180px] md:h-[220px]">
                  <Image
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                    sizes="180px"
                  />
                </div>

                {/* Text — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-2 opacity-65"
                    style={{ color: '#fff' }}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="font-semibold leading-snug mb-5 whitespace-pre-line"
                    style={{
                      fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                      color: '#fff',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {card.title}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-full transition-all duration-200 group-hover:gap-2.5"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      color: '#fff',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {card.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6h7m0 0L6 2.5M9.5 6L6 9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
