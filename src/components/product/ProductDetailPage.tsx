import { redirect } from 'next/navigation';
import { cache } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchProduct, fetchCatalog } from '@/lib/phonebase-client';
import { formatPrice, formatSimType } from '@/lib/utils';
import { productHref, extractRealSlug } from '@/lib/product-url';
import ProductGallery from './ProductGallery';
import BuyButton from './BuyButton';
import ProductVariants from './ProductVariants';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const SITE_URL = 'https://xn--80abvjddo3a.xn--p1ai';

// React `cache()` дедуплицирует fetchProduct в рамках одного запроса —
// generateMetadata и default-экспорт оба зовут loadProduct(apiSlug),
// но реальный fetch происходит ровно один раз.
const loadProduct = cache(async (apiSlug: string) => {
  try {
    return await fetchProduct(apiSlug);
  } catch {
    return null;
  }
});

const loadVariants = cache(
  async (
    condition: 'new' | 'used',
    brand: string,
    model: string,
  ): Promise<Awaited<ReturnType<typeof fetchCatalog>>['items']> => {
    try {
      const catalog = await fetchCatalog({ condition, brand, search: model, per_page: 50 });
      return catalog.items.filter((v) => v.brand === brand && v.model === model);
    } catch {
      return [];
    }
  },
);

function canonicalPath(
  p: NonNullable<Awaited<ReturnType<typeof fetchProduct>>>,
  slug: string,
): string {
  return productHref({
    condition: p.condition,
    brand: p.brand,
    model: p.model,
    storage: p.storage,
    color: p.color,
    simType: p.sim_type,
    slug,
  });
}

// Сборка metadata для страницы товара. Вызывается из роутов
// /new/[...path], /used/[...path] и /product/[slug].
export async function buildProductMetadata(
  rawSlug: string,
  expectedCondition: 'new' | 'used' | null,
): Promise<Metadata> {
  const apiSlug = extractRealSlug(rawSlug);
  const product = await loadProduct(apiSlug);
  if (!product) return { title: 'Товар не найден' };

  // Если condition mismatch — компонент сделает HTTP redirect, body не дойдёт до клиента.
  // Возвращаем пустой metadata; canonical в этом случае бесполезен.
  if (expectedCondition && product.condition !== expectedCondition) {
    return {};
  }

  const name = [product.brand, product.model, product.storage, product.color]
    .filter(Boolean)
    .join(' ');
  const canonical = SITE_URL + canonicalPath(product, apiSlug);
  return {
    title: `${name} — купить в Орле`,
    description: `${name} в Орле. Цена ${formatPrice(product.price_effective)}. Гарантия, trade-in, рассрочка. Мобилакс.`,
    alternates: { canonical },
    openGraph: {
      title: `${name} — мобилакс`,
      description: `Купить ${name} за ${formatPrice(product.price_effective)}`,
      url: canonical,
      images: product.photos.filter((p) => p.is_main).map((p) => ({ url: p.url })),
    },
  };
}

function buildJsonLd(
  product: NonNullable<Awaited<ReturnType<typeof fetchProduct>>>,
  slug: string,
): string {
  const name = [product.brand, product.model, product.storage, product.color]
    .filter(Boolean)
    .join(' ');
  const availability =
    product.total_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    description: [
      product.storage && `Память: ${product.storage}`,
      product.color && `Цвет: ${product.color}`,
      product.condition === 'used' && product.battery_pct && `Батарея: ${product.battery_pct}`,
      product.condition === 'used' &&
        product.completeness &&
        `Комплект: ${product.completeness}`,
    ]
      .filter(Boolean)
      .join('. '),
    image: product.photos.map((p) => p.url),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: product.price_effective,
      availability,
      url: SITE_URL + canonicalPath(product, slug),
      seller: { '@type': 'Organization', name: 'Мобилакс' },
    },
  };
  return JSON.stringify(schema);
}

interface Props {
  // Сырое значение из URL — последний сегмент пути, `<human>~~<slug>` или просто `<slug>`.
  rawSlug: string;
  // Текущий полный path запроса (для сравнения с canonical и решения о redirect).
  currentPath: string;
  // Ожидаемая condition. null для legacy /product/<slug>.
  expectedCondition: 'new' | 'used' | null;
}

export default async function ProductDetailPage({
  rawSlug,
  currentPath,
  expectedCondition,
}: Props) {
  const apiSlug = extractRealSlug(rawSlug);
  const product = await loadProduct(apiSlug);

  if (!product) {
    return (
      <div className="section-container section-gap">
        <p className="text-[var(--color-text-secondary)] text-lg">Товар не найден.</p>
        <Link
          href="/"
          className="mt-4 inline-block text-[var(--color-accent)] hover:underline text-sm"
        >
          На главную
        </Link>
      </div>
    );
  }

  const canon = canonicalPath(product, apiSlug);
  // Редирект на каноник если:
  //  - пришли по legacy /product/<slug> (expectedCondition=null) → всегда редирект
  //  - пришли по /new/... но товар used (или наоборот) — condition mismatch
  //  - пришли по /<cond>/<slug> без brand/category prefix — это разрешённый укороченный URL,
  //    канон тоже будет /<cond>/<brand>/<cat>/<human>~~<slug>, делаем 308.
  if (canon !== currentPath) {
    redirect(canon);
  }

  const variants =
    product.brand && product.model
      ? await loadVariants(product.condition, product.brand, product.model)
      : [];

  const name = [product.brand, product.model, product.storage, product.color]
    .filter(Boolean)
    .join(' ');
  const hasDiscount =
    product.price_retail != null && product.price_retail > product.price_effective;

  return (
    <>
      {/* JSON-LD: только серверные значения, без user-input. */}
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJsonLd(product, apiSlug) }}
      />
      <Breadcrumbs
        items={[
          ...(product.brand
            ? [{ label: product.brand, href: `/catalog/${encodeURIComponent(product.brand)}` }]
            : []),
          { label: name, href: '#' },
        ]}
      />

      <div className="section-container section-gap">
        <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
            Главная
          </Link>
          <span>/</span>
          {product.brand && (
            <>
              <Link
                href={`/catalog/${encodeURIComponent(product.brand)}`}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {product.brand}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[var(--color-text)]">{product.model}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ProductGallery photos={product.photos} name={name} />

          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              {product.brand}
            </p>

            <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-tight tracking-tight text-[var(--color-text)]">
              {product.model}
              {product.storage && (
                <span className="text-[var(--color-text-secondary)]"> {product.storage}</span>
              )}
            </h1>

            <ProductVariants
              variants={variants}
              currentSlug={apiSlug}
              currentStorage={product.storage}
              currentColor={product.color}
              currentSimType={product.sim_type}
            />

            {product.color && (
              <p className="text-[var(--color-text-secondary)] -mt-2">{product.color}</p>
            )}

            <div className="mt-2 flex flex-col gap-1">
              {hasDiscount && (
                <p className="line-through text-[var(--color-text-secondary)] text-lg">
                  {formatPrice(product.price_retail!)}
                </p>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-[2.25rem] font-semibold text-[var(--color-text)]">
                  {formatPrice(product.price_effective)}
                </span>
                {product.discount_percent && (
                  <span className="inline-flex items-center bg-[var(--color-success)] text-white text-sm font-semibold px-3 py-1 rounded-full">
                    -{product.discount_percent}%
                  </span>
                )}
              </div>
            </div>

            {product.promo && (
              <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                <p className="font-semibold text-[var(--color-accent)] mb-1">{product.promo.title}</p>
                {product.promo.body && (
                  <p className="text-sm text-[var(--color-text-secondary)]">{product.promo.body}</p>
                )}
                {product.promo.code && (
                  <p className="mt-2 text-sm">
                    Промокод:{' '}
                    <code className="font-mono bg-[var(--color-border)] px-2 py-0.5 rounded text-[var(--color-text)]">
                      {product.promo.code}
                    </code>
                  </p>
                )}
                {product.promo.ends_at && (
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    До {new Date(product.promo.ends_at).toLocaleDateString('ru-RU')}
                  </p>
                )}
              </div>
            )}

            {product.condition === 'used' && (
              <div className="space-y-2 text-sm">
                {product.battery_pct && <SpecRow label="Батарея" value={product.battery_pct} />}
                {product.completeness && (
                  <SpecRow label="Комплектация" value={product.completeness} />
                )}
              </div>
            )}

            {product.condition === 'new' &&
              product.per_store_availability &&
              Object.keys(product.per_store_availability).length > 0 && (
                <div className="rounded-xl bg-[var(--color-bg-secondary)] p-4 text-sm flex items-center justify-between">
                  <span className="font-semibold">Наличие</span>
                  <span className="font-medium text-[var(--color-text)]">
                    {Object.values(product.per_store_availability).reduce(
                      (sum, qty) => sum + (Number(qty) || 0),
                      0,
                    )}{' '}
                    шт.
                  </span>
                </div>
              )}

            <div className="grid grid-cols-2 gap-3 text-sm mt-2">
              {(() => {
                const simLabel = formatSimType(product.sim_type);
                if (simLabel) return <SpecChip label="SIM" value={simLabel} />;
                if (product.sim_count != null)
                  return <SpecChip label="SIM" value={String(product.sim_count)} />;
                return null;
              })()}
              {product.storage && <SpecChip label="Память" value={product.storage} />}
              {product.color && <SpecChip label="Цвет" value={product.color} />}
              {product.category && <SpecChip label="Тип" value={product.category} />}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <BuyButton
                productLabel={name}
                priceLabel={formatPrice(product.price_effective)}
                specs={{
                  storage: product.storage,
                  color: product.color,
                  sim: formatSimType(product.sim_type),
                  condition: product.condition,
                  batteryPct: product.condition === 'used' ? product.battery_pct : null,
                  completeness: product.condition === 'used' ? product.completeness : null,
                }}
              />
              <Link
                href={`/trade-in?model=${encodeURIComponent(name)}`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-[1.0625rem] text-[var(--color-accent)] border border-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
              >
                Trade-in на этот
              </Link>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">✓</span> Гарантия магазина
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">✓</span> Проверка при покупке
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">✓</span> Рассрочка без переплат
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--color-text-secondary)]">
      <span>{label}</span>
      <span className="font-medium text-[var(--color-text)]">{value}</span>
    </div>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--color-bg-secondary)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] mb-0.5">
        {label}
      </p>
      <p className="font-semibold text-[var(--color-text)] truncate">{value}</p>
    </div>
  );
}
