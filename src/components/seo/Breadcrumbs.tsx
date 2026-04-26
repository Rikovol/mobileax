const SITE_URL = 'https://xn--80abvjddo3a.xn--p1ai';

interface Crumb {
  label: string;
  href: string;
}

interface Props {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: Props) {
  const list = [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL + '/' },
    ...items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: c.label,
      item: c.href.startsWith('http') ? c.href : `${SITE_URL}${c.href}`,
    })),
  ];

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list,
  });

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
