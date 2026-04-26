// Schema.org JSON-LD — content is static, not user-supplied, safe for dangerouslySetInnerHTML
// nosec: static constant objects, no user input
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'МобилАкс',
  url: 'https://xn--80abvjddo3a.xn--p1ai/',
  logo: 'https://xn--80abvjddo3a.xn--p1ai/themes/mobileax/logo.png',
  telephone: '+7-930-063-23-70',
  email: 'info@mobileax.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Автовокзальная, д. 1',
    addressLocality: 'Орёл',
    addressRegion: 'Орловская область',
    postalCode: '302040',
    addressCountry: 'RU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: ['https://vk.ru/mobileaxorel', 'https://t.me/mobileaxorel'],
  founder: 'ИП Васильев П.В.',
  foundingDate: '2010',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1247',
    bestRating: '5',
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'МобилАкс',
  url: 'https://xn--80abvjddo3a.xn--p1ai/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://xn--80abvjddo3a.xn--p1ai/search/?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

/** Injects static JSON-LD Organization + WebSite schemas into <head> */
export default function Schema() {
  const orgJson = JSON.stringify(ORGANIZATION_SCHEMA);
  const siteJson = JSON.stringify(WEBSITE_SCHEMA);
  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- static constant, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgJson }} />
      {/* eslint-disable-next-line react/no-danger -- static constant, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteJson }} />
    </>
  );
}
