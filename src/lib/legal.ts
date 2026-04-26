/**
 * Юридические реквизиты ИП Васильев П.В.
 * ЕДИНЫЙ источник истины — Footer, /contacts, Schema.tsx, /privacy, /oferta, /trade-in.
 */

export const LEGAL = {
  fullName: 'Индивидуальный предприниматель Васильев Павел Владимирович',
  shortName: 'ИП Васильев П. В.',
  ownerName: 'Васильев Павел Владимирович',

  ogrnip: '308574204500067',
  inn: '575106652934',

  // Регистрация ИП — 14 февраля 2008 г. (по выписке ЕГРИП)
  registrationDate: '14 февраля 2008 г.',
  taxRegistrationDate: '29 августа 2022 г.',
  taxAuthority: 'Управление Федеральной налоговой службы по Орловской области',
  taxRegime: 'УСН',

  // Бренд «МобилАкс» работает с 2015 года
  brandFoundingYear: '2015',

  // Росстат
  okpo: '0154496456',
  okato: '54401364000',
  oktmo: '54701000001',

  // ПФР
  pfrRegNumber: '1310300908',
  pfrRegistrationDate: '23 октября 2018 г.',
  pfrAuthority: 'Отделение Фонда пенсионного и социального страхования РФ по Орловской области',

  // Контакты
  phone: '+7 930 063-23-70',
  phoneE164: '+79300632370',
  email: 'info@mobileax.ru',

  // Адрес
  legalAddress: '302040, г. Орёл, ул. Автовокзальная, д. 1А',
  actualAddress: '302040, г. Орёл, ул. Автовокзальная, д. 1А, подземный переход',
  postalCode: '302040',
  city: 'Орёл',
  region: 'Орловская область',
  country: 'RU',
  countryName: 'Россия',

  // Часы
  openingHours: 'Пн–Вс 09:00 — 19:00',
  workingDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  opensAt: '09:00',
  closesAt: '19:00',

  // Координаты для Schema.org GeoCoordinates
  geo: {
    latitude: 52.953619,
    longitude: 36.090876,
  },

  // Соцсети и Я.Карты
  vkUrl: 'https://vk.com/mobileaxorel',
  telegramUrl: 'https://t.me/mobileaxorel',
  yandexMapsUrl: 'https://yandex.ru/maps/org/mobilaks/1149010257/',
  yandexOrgId: '1149010257',
} as const;

/** Однострочное описание для Footer copyright. */
export function legalShortLine(): string {
  return `${LEGAL.shortName}. ОГРНИП ${LEGAL.ogrnip}. ИНН ${LEGAL.inn}`;
}
