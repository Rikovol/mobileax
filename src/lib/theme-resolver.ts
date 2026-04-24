import { mobileaxTheme } from '@/themes/mobileax';
import { iprasTheme } from '@/themes/ipras';
import { remgsmTheme } from '@/themes/remgsm';

type Theme = typeof mobileaxTheme | typeof iprasTheme | typeof remgsmTheme;

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'mobileax';

export function getActiveTheme(): Theme {
  switch (SITE_ID) {
    case 'mobileax':
      return mobileaxTheme;
    case 'ipras':
      return iprasTheme;
    case 'remgsm':
      return remgsmTheme;
    default:
      return mobileaxTheme;
  }
}

export function getStoreId(): string {
  return process.env.NEXT_PUBLIC_STORE_ID || '';
}

export function getSiteId(): string {
  return SITE_ID;
}
