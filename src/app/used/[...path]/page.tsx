import type { Metadata } from 'next';
import ProductDetailPage, {
  buildProductMetadata,
} from '@/components/product/ProductDetailPage';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ path: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const lastSegment = path[path.length - 1] ?? '';
  return buildProductMetadata(lastSegment, 'used');
}

export default async function UsedProductPage({ params }: Props) {
  const { path } = await params;
  const lastSegment = path[path.length - 1] ?? '';
  const currentPath = '/used/' + path.join('/');
  return (
    <ProductDetailPage
      rawSlug={lastSegment}
      currentPath={currentPath}
      expectedCondition="used"
    />
  );
}
