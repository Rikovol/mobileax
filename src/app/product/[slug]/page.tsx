import type { Metadata } from 'next';
import ProductDetailPage, {
  buildProductMetadata,
} from '@/components/product/ProductDetailPage';

// Legacy URL `/product/<slug>`. Сам ProductDetailPage делает 308 redirect
// на канонический `/new/<brand>/<cat>/<human>~~<slug>` или `/used/...`.
// Старые ссылки в индексе Яндекса/Google продолжают работать.

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildProductMetadata(slug, null);
}

export default async function LegacyProductPage({ params }: Props) {
  const { slug } = await params;
  return (
    <ProductDetailPage
      rawSlug={slug}
      currentPath={`/product/${slug}`}
      expectedCondition={null}
    />
  );
}
