// Apple Store-inspired design for мобилакс.рф
// Design principles: whitespace, large typography, subtle gradients, smooth transitions

export const mobileaxTheme = {
  id: 'mobileax',
  name: 'МобилАкс',
  domain: 'мобилакс.рф',
  colors: {
    bg: '#ffffff',
    bgSecondary: '#f5f5f7',
    text: '#1d1d1f',
    textSecondary: '#6e6e73',
    accent: '#0071e3',        // Apple Blue — main accent
    accentHover: '#0062c4',
    accentLight: '#e8f1fc',
    success: '#27bf52',
    surface: '#fbfbfd',
    border: '#e8e8ed',
    borderLight: '#d2d2d7',
  },
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
    display: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.125rem',
    xl: '1.5rem',
    '2xl': '1.5rem',
    '3xl': '1.5rem',   // card: rounded-3xl (24px)
    full: '9999px',    // buttons
  },
  spacing: {
    sectionGap: '7rem',
    containerPx: '1.25rem',
  },
  typography: {
    heroSize: '88px',
    heroSizeMobile: '40px',
    heroLineHeight: '1.03',
    heroLetterSpacing: '-0.04em',
    subtitleSize: '19px',
    cardTitleSize: '19px',
    bodySize: '17px',
    captionSize: '11px',
  },
  transitions: {
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    spring: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  shadows: {
    card: '0 20px 50px rgba(0,0,0,0.09)',
    hero: '0 40px 80px rgba(0,0,0,0.14)',
    subtle: '0 2px 8px rgba(0,0,0,0.06)',
  },
} as const;

export type MobileaxTheme = typeof mobileaxTheme;
