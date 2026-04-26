import type { CatalogItemOut } from '@/types/api';
import { productHref } from '@/lib/utils';

const SITE_URL = 'https://xn--80abvjddo3a.xn--p1ai';

interface Props {
  items: CatalogItemOut[];
  /** Заголовок списка, попадает в `name`. */
  name?: string;
}

/**
 * Schema.org/ItemList для catalog-страниц.
 * Yandex/Google используют это для rich-результатов (карусель карточек
 * товаров под результатом поиска).
 */
export default function ItemListSchema({ items, name }: Props) {
  if (!items || items.length === 0) return null;

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.slice(0, 50).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url:
        SITE_URL +
        productHref({
          brand: item.brand,
          model: item.model,
          storage: item.storage,
          color: item.color,
          slug: item.slug,
        }),
      name: [item.brand, item.model, item.storage, item.color].filter(Boolean).join(' '),
    })),
  });

  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
