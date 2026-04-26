import { LEGAL } from '@/lib/legal';

const SITE_URL = 'https://xn--80abvjddo3a.xn--p1ai';

/**
 * Schema.org/Store (LocalBusiness) для /contacts.
 * Точные координаты, часы работы, контакты, sameAs ссылки на VK/TG/Y.Maps,
 * привязка к ОГРНИП — Yandex использует это для подтверждения локального
 * бизнеса в Картах и в выдаче по запросам «магазин в Орле».
 */
export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE_URL}/#store`,
    name: 'МобилАкс',
    description:
      'Магазин смартфонов, планшетов и ноутбуков Apple, Samsung в Орле. Гарантия, trade-in, рассрочка.',
    url: `${SITE_URL}/contacts`,
    telephone: LEGAL.phoneE164,
    email: LEGAL.email,
    image: `${SITE_URL}/themes/mobileax/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Автовокзальная, д. 1А',
      addressLocality: LEGAL.city,
      addressRegion: LEGAL.region,
      postalCode: LEGAL.postalCode,
      addressCountry: LEGAL.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LEGAL.geo.latitude,
      longitude: LEGAL.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: LEGAL.opensAt,
      closes: LEGAL.closesAt,
    },
    sameAs: [LEGAL.vkUrl, LEGAL.telegramUrl, LEGAL.yandexMapsUrl],
    founder: { '@type': 'Person', name: LEGAL.ownerName },
    foundingDate: LEGAL.brandFoundingYear,
    taxID: LEGAL.inn,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'ОГРНИП', value: LEGAL.ogrnip },
      { '@type': 'PropertyValue', propertyID: 'ИНН', value: LEGAL.inn },
    ],
    priceRange: '5000-200000 ₽',
    paymentAccepted: 'Наличные, банковские карты, безналичный расчёт',
    currenciesAccepted: 'RUB',
  };

  // eslint-disable-next-line react/no-danger
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
