// TypeScript types generated from phonebase API contract
// Source: /docs/api-sites-contract.md

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export interface CatalogPromoBadge {
  promotion_id: string;
  title: string;
  code: string | null;
}

export interface CatalogItemOut {
  slug: string;
  condition: 'new' | 'used';
  brand: string | null;
  model: string;
  storage: string | null;
  color: string | null;
  battery_pct: string | null; // used only
  completeness: string | null;
  sim_count: number | null;
  sim_type: string | null;
  price_retail: number | null; // strikethrough (original)
  price_effective: number;     // final (after discount)
  discount_percent: number | null;
  promo: CatalogPromoBadge | null;
  photo_main: string | null;
  photos_count: number;
  total_quantity: number;
}

export interface CatalogOut {
  items: CatalogItemOut[];
  total: number;
  page: number;
  per_page: number;
  filters_applied: Record<string, unknown>;
}

export interface CatalogFilters {
  condition: 'new' | 'used';
  brand?: string;
  category?: string;
  search?: string;
  in_stock?: boolean;
  promo_only?: boolean;
  price_from?: number;
  price_to?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  per_page?: number;
}

// ---------------------------------------------------------------------------
// Product detail
// ---------------------------------------------------------------------------

export interface ProductPhotoItem {
  url: string;
  is_main: boolean;
  source: 'product' | 'catalog';
}

export interface ProductPromoOut {
  promotion_id: string;
  title: string;
  body: string | null;
  code: string | null;
  ends_at: string | null; // ISO datetime
}

export interface ProductDetailOut {
  slug: string;
  condition: 'new' | 'used';
  brand: string | null;
  model: string;
  storage: string | null;
  color: string | null;
  category: string | null;
  battery_pct: string | null;
  completeness: string | null;
  sim_count: number | null;
  sim_type: string | null;
  price_retail: number | null;
  price_effective: number;
  discount_percent: number | null;
  promo: ProductPromoOut | null;
  photos: ProductPhotoItem[];
  total_quantity: number;
  per_store_availability: Record<string, number> | null; // new only
}

// ---------------------------------------------------------------------------
// Facets (brands / categories)
// ---------------------------------------------------------------------------

export interface FacetItem {
  value: string;
  label: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Promotions & Bonuses
// ---------------------------------------------------------------------------

export interface PromotionOut {
  id: string;
  scope: 'store' | 'global';
  title: string;
  body: string | null;
  code: string | null;
  discount_type: 'percent' | 'fixed' | 'info_only';
  discount_value: number | null;
  banner_image: string | null;
  landing_url: string | null;
  starts_at: string | null; // ISO datetime
  ends_at: string | null;   // ISO datetime
  priority: number;
  applies_to_brand: string | null;
  applies_to_category: string | null;
}

export interface BonusOut {
  id: string;
  name: string;
  description: string | null;
  rule_type: 'cashback' | 'accrual' | 'signup' | 'referral';
  accrual_percent: number | null;
  accrual_fixed: number | null;
  redemption_rate: number | null;
  expires_days: number | null;
  max_percent_of_order: number | null;
}

// ---------------------------------------------------------------------------
// Auth / Visitor
// ---------------------------------------------------------------------------

export interface VisitorMe {
  id: string;
  store_id: string;
  auth_provider: 'vk' | 'telegram' | null;
  display_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  preferred_channel: string | null;
  total_messages_count: number;
  last_seen_at: string | null; // ISO datetime
}

// ---------------------------------------------------------------------------
// Messages / Applications
// ---------------------------------------------------------------------------

export interface TradeinFields {
  brand: string;
  model: string;
  storage?: string;
  color?: string;
  condition?: string; // JSON array of issues
  battery_pct?: number;
  completeness?: string;
  estimated_price?: number;
}

export interface MessageCreateIn {
  message_type: 'tradein' | 'contact' | 'feedback' | 'order';
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  preferred_channel?: 'telegram' | 'max' | 'vk' | 'phone' | 'email' | 'whatsapp';
  subject?: string;
  body?: string;
  tradein?: TradeinFields;
  // Anti-spam
  website?: string; // honeypot — must be empty
  time_to_submit_ms: number; // must be >= 3000
}

export interface MessageCreatedOut {
  id: string;
  status: string;
}

export interface MyMessageOut {
  id: string;
  message_type: 'tradein' | 'contact' | 'feedback' | 'order';
  status: string;
  body_preview: string | null;
  last_reply_text: string | null;
  answered_at: string | null; // ISO datetime
  created_at: string;          // ISO datetime
}

// ---------------------------------------------------------------------------
// Trade-in price feed  (/api/feeds/tradein-prices.json)
// ---------------------------------------------------------------------------

export interface TradeInPriceItem {
  brand: string;
  model: string;
  storage: string;
  colors: string[];
  excellent: number | null;
  good: number | null;
  poor: number | null;
  repair: number | null;
}

export interface TradeInPricesResponse {
  updated_at: string;
  markup_pct: number;
  items: TradeInPriceItem[];
}
