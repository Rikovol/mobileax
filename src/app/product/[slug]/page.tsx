import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchProduct, fetchCatalog } from '@/lib/phonebase-client';
import { formatPrice, formatSimType } from '@/lib/utils';
import ProductGallery from '@/components/product/ProductGallery';
import BuyButton from '@/components/product/BuyButton';
import ProductVariants from '@/components/product/ProductVariants';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await fetchProduct(slug);
    const name = [product.brand, product.model, product.storage, product.color]
      .filter(Boolean)
      .join(' ');
    const canonical = `https://xn--80abvjddo3a.xn--p1ai/product/${slug}`;
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
  } catch {
    return { title: 'Товар не найден' };
  }
}

/** Build schema.org Product JSON-LD string (server-only, no user HTML input). */
function buildJsonLd(product: Awaited<ReturnType<typeof fetchProduct>>, slug: string): string {
  const name = [product.brand, product.model, product.storage, product.color]
    .filter(Boolean)
    .join(' ');
  const availability =
    product.total_quantity > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';
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
      url: `https://xn--80abvjddo3a.xn--p1ai/product/${slug}`,
      seller: { '@type': 'Organization', name: 'Мобилакс' },
    },
  };
  return JSON.stringify(schema);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product = null;
  try {
    product = await fetchProduct(slug);
  } catch {
    // API not yet connected
  }

  // Параллельно тянем варианты этой модели (другие память/цвет)
  let variants: Awaited<ReturnType<typeof fetchCatalog>>['items'] = [];
  if (product?.brand && product?.model) {
    try {
      const catalog = await fetchCatalog({
        condition: product.condition,
        brand: product.brand,
        search: product.model,
        per_page: 50,
      });
      // Фильтруем на тот же brand+model — search может зацепить лишние
      variants = catalog.items.filter(
        (v) => v.brand === product!.brand && v.model === product!.model,
      );
    } catch {
      /* ignore — variants просто не покажутся */
    }
  }

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

  const name = [product.brand, product.model, product.storage, product.color]
    .filter(Boolean)
    .join(' ');

  const hasDiscount =
    product.price_retail != null && product.price_retail > product.price_effective;

  return (
    <>
      {/* Schema.org JSON-LD — values come from our own API, no untrusted HTML */}
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        // Safe: JSON.stringify escapes all special characters; no user HTML involved.
        dangerouslySetInnerHTML={{ __html: buildJsonLd(product, slug) }}
      />

      <div className="section-container section-gap">
        {/* Breadcrumb */}
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

        {/* Main layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — gallery */}
          <ProductGallery photos={product.photos} name={name} />

          {/* Right — details */}
          <div className="flex flex-col gap-5">
            {/* Brand */}
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-tight tracking-tight text-[var(--color-text)]">
              {product.model}
              {product.storage && (
                <span className="text-[var(--color-text-secondary)]"> {product.storage}</span>
              )}
            </h1>

            {/* Variants — память / цвет / SIM с переходом на другие slug'и той же модели */}
            <ProductVariants
              variants={variants}
              currentSlug={slug}
              currentStorage={product.storage}
              currentColor={product.color}
              currentSimType={product.sim_type}
            />

            {/* Color (текстовая подпись) */}
            {product.color && (
              <p className="text-[var(--color-text-secondary)] -mt-2">{product.color}</p>
            )}

            {/* Price block */}
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

            {/* Promo */}
            {product.promo && (
              <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                <p className="font-semibold text-[var(--color-accent)] mb-1">
                  {product.promo.title}
                </p>
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

            {/* Used specs */}
            {product.condition === 'used' && (
              <div className="space-y-2 text-sm">
                {product.battery_pct && (
                  <SpecRow label="Батарея" value={product.battery_pct} />
                )}
                {product.completeness && (
                  <SpecRow label="Комплектация" value={product.completeness} />
                )}
              </div>
            )}

            {/* Total stock — суммарное наличие по всем магазинам */}
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

            {/* Specs grid */}
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

            {/* CTA buttons */}
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

            {/* Trust points */}
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
