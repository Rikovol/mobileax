import type {
  CatalogFilters,
  CatalogOut,
  ProductDetailOut,
  FacetItem,
  PromotionOut,
  BonusOut,
  VisitorMe,
  MessageCreateIn,
  MessageCreatedOut,
  MyMessageOut,
  TradeInPricesResponse,
} from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_PHONEBASE_API || 'http://localhost:8000';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';

function storeBase(): string {
  return `${BASE_URL}/api/sites/${STORE_ID}`;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${storeBase()}${path}`;
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[phonebase] ${res.status} ${path}: ${text}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export async function fetchCatalog(params: CatalogFilters): Promise<CatalogOut> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      qs.set(key, String(val));
    }
  });
  return apiFetch<CatalogOut>(`/catalog?${qs.toString()}`);
}

export async function fetchProduct(slug: string): Promise<ProductDetailOut> {
  return apiFetch<ProductDetailOut>(`/product/${encodeURIComponent(slug)}`);
}

// ---------------------------------------------------------------------------
// Facets
// ---------------------------------------------------------------------------

export async function fetchBrands(): Promise<FacetItem[]> {
  return apiFetch<FacetItem[]>('/brands');
}

export async function fetchCategories(): Promise<FacetItem[]> {
  return apiFetch<FacetItem[]>('/categories');
}

// ---------------------------------------------------------------------------
// Promotions & Bonuses
// ---------------------------------------------------------------------------

export async function fetchPromotions(): Promise<PromotionOut[]> {
  return apiFetch<PromotionOut[]>('/promotions');
}

export async function fetchPromotion(id: string): Promise<PromotionOut> {
  return apiFetch<PromotionOut>(`/promotions/${id}`);
}

export async function fetchBonuses(): Promise<BonusOut[]> {
  return apiFetch<BonusOut[]>('/bonuses');
}

// ---------------------------------------------------------------------------
// Auth / Visitor
// ---------------------------------------------------------------------------

/** Returns current visitor or null if not authenticated */
export async function fetchMe(): Promise<VisitorMe | null> {
  try {
    return await apiFetch<VisitorMe>('/auth/me');
  } catch (err) {
    // 401 means not authenticated — treat as null
    if (err instanceof Error && err.message.includes('401')) {
      return null;
    }
    throw err;
  }
}

export async function logout(): Promise<void> {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function postMessage(data: MessageCreateIn): Promise<MessageCreatedOut> {
  return apiFetch<MessageCreatedOut>('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchMyMessages(): Promise<MyMessageOut[]> {
  return apiFetch<MyMessageOut[]>('/messages/my');
}

// ---------------------------------------------------------------------------
// Trade-in price feed  — server-side only (uses TRADEIN_FEED_TOKEN)
// ---------------------------------------------------------------------------

export async function fetchTradeInPrices(): Promise<TradeInPricesResponse> {
  const token = process.env.TRADEIN_FEED_TOKEN;
  if (!token) throw new Error('TRADEIN_FEED_TOKEN is not set');
  const url = `${BASE_URL}/api/feeds/tradein-prices.json?token=${encodeURIComponent(token)}`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // ISR 5 min
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[phonebase] tradein-prices ${res.status}: ${text}`);
  }
  return res.json() as Promise<TradeInPricesResponse>;
}
