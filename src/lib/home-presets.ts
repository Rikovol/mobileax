/**
 * Bg / CTA пресеты для карточек главной. Зеркалирует whitelist в phonebase
 * (backend/app/api/home_blocks_admin.py) — если phonebase отдаст неизвестный
 * пресет, фронт упадёт на 'dark'.
 */

export interface BgStyle {
  /** CSS background — solid color или gradient. */
  bg: string;
  /** Цвет основного текста (override-ится text_dark из карточки). */
  text: string;
  /** Цвет приглушённого текста (subtitle и т.п.). */
  muted: string;
  /** Цвет eyebrow (надзаголовка). */
  eyebrow: string;
  /** Цвет «light»? Для решений где надо отличить — например, hero декорации. */
  isLight?: boolean;
}

export const BG_PRESETS: Record<string, BgStyle> = {
  'dark': {
    bg: '#1d1d1f',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'light': {
    bg: '#fbfbfd',
    text: '#1d1d1f',
    muted: '#6e6e73',
    eyebrow: 'rgba(0,0,0,0.5)',
    isLight: true,
  },
  'black': {
    bg: '#000000',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'apple-blue': {
    bg: 'linear-gradient(135deg,#0a0f1f 0%,#14192e 50%,#0d1226 100%)',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'apple-pro-dark': {
    bg: 'linear-gradient(135deg,#0a0f1f 0%,#14192e 50%,#0d1226 100%)',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'trade-in-blue': {
    bg: '#0a2a4a',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'trade-in-orange': {
    bg: 'linear-gradient(135deg,#fff5e6 0%,#ffe4cc 50%,#ffd5b8 100%)',
    text: '#1d1d1f',
    muted: '#6e6e73',
    eyebrow: 'rgba(80,40,20,0.55)',
    isLight: true,
  },
  'samsung-blue': {
    bg: '#0a0a14',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
  'samsung-dark': {
    bg: '#1a1a1c',
    text: '#f5f5f7',
    muted: 'rgba(255,255,255,0.65)',
    eyebrow: 'rgba(255,255,255,0.6)',
  },
};

export function getBgStyle(preset: string): BgStyle {
  return BG_PRESETS[preset] ?? BG_PRESETS.dark;
}

export const CTA_COLORS: Record<string, string> = {
  'primary': '#0071e3',
  'dark': '#1d1d1f',
  'gradient-orange': 'linear-gradient(135deg,#ff6b35 0%,#ff8c42 100%)',
  'gradient-blue': 'linear-gradient(135deg,#0066ff 0%,#00b4ff 100%)',
};

export function getCtaBg(color: string): string {
  return CTA_COLORS[color] ?? CTA_COLORS.primary;
}
