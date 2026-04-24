import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getActiveTheme } from '@/lib/theme-resolver';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const theme = getActiveTheme();

export const metadata: Metadata = {
  title: {
    default: `${theme.name} — iPhone, Samsung, MacBook в Орле`,
    template: `%s | ${theme.name}`,
  },
  description:
    'Новые и б/у смартфоны, планшеты, ноутбуки Apple в Орле. Гарантия, trade-in, рассрочка.',
  metadataBase: new URL(`https://${theme.domain}`),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: theme.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
