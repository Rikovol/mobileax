// Apple Store-inspired design for мобилакс.рф
// Design principles: whitespace, large typography, subtle gradients, smooth transitions

export const mobileaxTheme = {
  id: 'mobileax',
  name: 'Мобилакс',
  domain: 'мобилакс.рф',
  colors: {
    bg: '#ffffff',
    bgSecondary: '#f5f5f7',
    text: '#1d1d1f',
    textSecondary: '#86868b',
    accent: '#0071e3',       // Apple blue
    accentHover: '#0077ed',
    success: '#27bf52',      // from Webasyst theme
    surface: '#fbfbfd',
    border: '#d2d2d7',
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
  },
  spacing: {
    sectionGap: '6rem',
    containerPx: '1.5rem',
  },
  typography: {
    heroSize: '80px',
    heroSizeMobile: '48px',
    subtitleSize: '21px',
    cardTitleSize: '19px',
    bodySize: '17px',
    captionSize: '12px',
    lineHeight: '1.1',
  },
  transitions: {
    base: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export type MobileaxTheme = typeof mobileaxTheme;
