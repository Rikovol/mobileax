// Placeholder theme for айпрас — to be designed later

export const iprasTheme = {
  id: 'ipras',
  name: 'АйПрас',
  domain: 'айпрас.рф',
  colors: {
    bg: '#ffffff',
    bgSecondary: '#f0f4ff',
    text: '#1a1a2e',
    textSecondary: '#6b7280',
    accent: '#3b5bdb',
    accentHover: '#2f4acf',
    success: '#22c55e',
    surface: '#f8faff',
    border: '#dde2f0',
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

export type IprasTheme = typeof iprasTheme;
