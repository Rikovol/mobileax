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
  return buildProductMetadata(lastSegment, 'new');
}

export default async function NewProductPage({ params }: Props) {
  const { path } = await params;
  const lastSegment = path[path.length - 1] ?? '';
  const currentPath = '/new/' + path.join('/');
  return (
    <ProductDetailPage
      rawSlug={lastSegment}
      currentPath={currentPath}
      expectedCondition="new"
    />
  );
}
