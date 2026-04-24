// Placeholder theme for ремгсм — to be designed later

export const remgsmTheme = {
  id: 'remgsm',
  name: 'РемГСМ',
  domain: 'ремгсм.рф',
  colors: {
    bg: '#ffffff',
    bgSecondary: '#f5f9f5',
    text: '#1a2e1a',
    textSecondary: '#6b7a6b',
    accent: '#16a34a',
    accentHover: '#15803d',
    success: '#22c55e',
    surface: '#f8fdf8',
    border: '#d1e7d1',
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Inter, system-ui, sans-serif',
  },
  radius: {
    sm: '0.375rem',
    md: '0.625rem',
    lg: '1rem',
    xl: '1.25rem',
  },
  spacing: {
    sectionGap: '5rem',
    containerPx: '1.5rem',
  },
  typography: {
    heroSize: '72px',
    heroSizeMobile: '42px',
    subtitleSize: '20px',
    cardTitleSize: '18px',
    bodySize: '16px',
    captionSize: '12px',
    lineHeight: '1.15',
  },
  transitions: {
    base: '0.25s ease',
    spring: '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export type RemgsmTheme = typeof remgsmTheme;
