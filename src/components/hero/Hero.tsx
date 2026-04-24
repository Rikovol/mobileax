'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] pt-32 pb-28">
      {/* Subtle radial gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="section-container text-center">
        <motion.p
          className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)] mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Орёл · Certified Re-Commerce
        </motion.p>

        <motion.h1
          className="hero-title mx-auto max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          iPhone, Samsung,
          <br />
          MacBook в Орле
        </motion.h1>

        <motion.p
          className="hero-subtitle mt-6 mx-auto max-w-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Новые и проверенные б/у устройства с гарантией.
          <br />
          Trade-in · рассрочка · доставка.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <Link href="/catalog/Apple" className="btn-accent">
            Смотреть каталог
          </Link>
          <Link
            href="/used"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-[1.0625rem] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-bg-secondary)]"
          >
            Б/у смартфоны
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
