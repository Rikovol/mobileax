/**
 * Pure utility functions for Trade-in wizard.
 * Ported 1:1 from tradein-widget.js (Webasyst plugin), finalized 2026-04-22.
 * All functions are side-effect-free and unit-test friendly.
 */

// ---------------------------------------------------------------------------
// canonicalModel
// ---------------------------------------------------------------------------

/**
 * Normalises model name to canonical form: iPhone, iPad, MacBook, AirPods,
 * mini, Pro, Max, Plus, Ultra. Phonebase and 1C databases produce inconsistent
 * casing ('IPhone', 'Iphone', 'iphone', 'Macbook') which creates duplicate
 * series in the UI — this collapses all variants to one.
 * Also strips Samsung SKU suffixes (/DS, /SS), 'Ram 8Gb', '(Dual SIM)'.
 */
export function canonicalModel(model: string): string {
  if (!model) return model;
  return model
    .replace(/\b[Ii][Pp]hone\b/g, 'iPhone')
    .replace(/\b[Ii][Pp]ad\b/g, 'iPad')
    .replace(/\b[Mm]acbook\b/g, 'MacBook')
    .replace(/\b[Aa]ir[Pp]ods\b/g, 'AirPods')
    .replace(/\b[Mm]ini\b/g, 'mini')
    .replace(/\b[Pp]ro\b/g, 'Pro')
    .replace(/\b[Mm]ax\b/g, 'Max')
    .replace(/\b[Pp]lus\b/g, 'Plus')
    .replace(/\b[Uu]ltra\b/g, 'Ultra')
    .replace(/\b([Rr][Aa][Mm]|ОЗУ|ОЗу|ОзУ|озу)\s+/g, '')
    .replace(/\s*\(Dual\s+SIM\)\s*/gi, ' ')
    .replace(/\/[A-Z]{1,3}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// seriesKey — grouping key for accordion
// ---------------------------------------------------------------------------

const MODIFIERS =
  /^(Pro|Max|Plus|Ultra|mini|Mini|Lite|FE|Edge|5G|4G|NFC|DS|Dual|M\d+|\(M\d+\)|\(Lightning\)|\(USB-C\)|\(Wi-Fi\)|\(Cellular\))$/i;

const NUMERIC_SUFFIX = /^(\d+)([a-z])$/;

const REGIONAL_CODE = /^[A-Z]\d{3,4}[A-Z]{0,3}$/;

const RAM_SIZE_TOKEN = /^\d+\s*[Gg][Bb]$/;

function buildColorWords(): Set<string> {
  const swatchKeys = [
    'Black', 'Space Black', 'Midnight', 'Graphite', 'White', 'Starlight', 'Silver',
    'Gold', 'Blue', 'Sierra Blue', 'Pacific Blue', 'Deep Blue', 'Blue Titanium',
    'Purple', 'Deep Purple', 'Lavender', 'Violet', 'Pink', 'Red', 'Product Red',
    'Green', 'Alpine Green', 'Midnight Green', 'Yellow', 'Orange', 'Coral',
    'Natural Titanium', 'White Titanium', 'Black Titanium', 'Titanium',
    'Grey', 'Gray', 'Space Gray', 'Cyan', 'Teal', 'Ultramarine',
  ];
  const extras = [
    'awesome', 'phantom', 'marble', 'onyx', 'titanium', 'deep', 'space', 'cosmic',
    'sapphire', 'amber', 'sandstone', 'icy', 'flora', 'mint', 'sage', 'lavender',
    'mist', 'ultramarine', 'cobalt', 'violet', 'teal', 'jade', 'coral', 'graphite',
    'midnight', 'starlight', 'alpine', 'sierra', 'pacific', 'cream', 'navy',
    'beige', 'bronze', 'lime', 'jet',
  ];
  const words = new Set<string>();
  swatchKeys.forEach((c) => {
    c.split(/\s+/).forEach((w) => words.add(w.toLowerCase()));
  });
  extras.forEach((w) => words.add(w));
  return words;
}

const COLOR_WORDS = buildColorWords();

/**
 * Returns the series key for a model — used for accordion grouping.
 * Logic ported 1:1 from tradein-widget.js modelSeries().
 */
/**
 * Бренды/слова с фиксированным правописанием в выдаче — phonebase возвращает
 * их в разных регистрах ("Redmi Note 15" / "REDMI Note 15"), что приводит
 * к дублированию серий. Нормализуем здесь.
 */
function normalizeBrandCasing(model: string): string {
  return model
    .replace(/\bREDMI\b/g, 'Redmi')
    .replace(/\bIPHONE\b/gi, 'iPhone')
    .replace(/\bIPAD\b/gi, 'iPad')
    .replace(/\bMACBOOK\b/gi, 'MacBook')
    .replace(/\bAIRPODS\b/gi, 'AirPods')
    .replace(/\bSAMSUNG\b/g, 'Samsung')
    .replace(/\bGALAXY\b/g, 'Galaxy')
    .replace(/\bXIAOMI\b/g, 'Xiaomi')
    .replace(/\bPOCO\b/g, 'POCO');
}

export function seriesKey(model: string): string {
  const parts = normalizeBrandCasing(model).split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let seenNumber = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i > 0 && seenNumber && MODIFIERS.test(part)) break;
    if (i > 0 && seenNumber && REGIONAL_CODE.test(part)) break;
    if (i > 0 && seenNumber && RAM_SIZE_TOKEN.test(part)) break;
    if (i > 0 && seenNumber && COLOR_WORDS.has(part.toLowerCase())) break;

    const numSuffix = NUMERIC_SUFFIX.exec(part);
    if (numSuffix && i > 0) {
      out.push(numSuffix[1]);
      break;
    }

    if (i > 0 && /\d/.test(part) && /\+$/.test(part)) {
      out.push(part.replace(/\+$/, ''));
      break;
    }

    out.push(part);
    if (/\d/.test(part)) seenNumber = true;
  }

  let result = out.join(' ') || model;

  if (/\bS\d{2}$/.test(result)) {
    result += ' series';
  }

  return result;
}

// ---------------------------------------------------------------------------
// seriesOrder — for sorting
// ---------------------------------------------------------------------------

export function seriesOrder(series: string): [number, number] {
  const isSE = /\bSE\b/i.test(series) || /\d+SE\b/i.test(series);
  if (isSE) {
    const yearMatch = series.match(/\(?(20\d{2})\)?/);
    const year = yearMatch ? Number(yearMatch[1]) : 0;
    return [3, -year];
  }
  const numMatch = series.match(/\d+/);
  const num = numMatch ? Number(numMatch[0]) : 0;
  if (num > 0) return [1, -num];
  return [2, 0];
}

// ---------------------------------------------------------------------------
// mergeColors
// ---------------------------------------------------------------------------

export function mergeColors(feedColors: string[], wikiColors: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const c of [...feedColors, ...wikiColors]) {
    const key = (c || '').toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(c);
  }
  return result;
}

// ---------------------------------------------------------------------------
// canonicalStorage / canonicalBrand / storageLabel / fmtPrice
// ---------------------------------------------------------------------------

export function canonicalStorage(s: string): string {
  const clean = s.replace(/\s+/g, '').toUpperCase();
  if (clean === '1TB') return '1024';
  return s.replace(/\D/g, '') || s;
}

export function canonicalBrand(b: string): string {
  if (!b) return b;
  return b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();
}

export function storageLabel(s: string): string {
  return s === '1024' ? '1 TB' : `${s} GB`;
}

export function fmtPrice(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}

// ---------------------------------------------------------------------------
// COLOR_SWATCH — hex for color bubbles
// ---------------------------------------------------------------------------

export const COLOR_SWATCH: Record<string, string> = {
  'Black': '#111',
  'Черный': '#111',
  'Чёрный': '#111',
  'Space Black': '#1c1c1e',
  'Midnight': '#1a1b21',
  'Graphite': '#555',
  'White': '#f5f5f7',
  'Белый': '#f5f5f7',
  'Starlight': '#faf6ef',
  'Silver': '#d0d0d0',
  'Серебристый': '#d0d0d0',
  'Серебристый (Silver)': '#d0d0d0',
  'Gold': '#e5c27c',
  'Золотой': '#e5c27c',
  'Blue': '#3068a7',
  'Синий': '#3068a7',
  'Sierra Blue': '#8ec3e0',
  'Pacific Blue': '#1e4a73',
  'Deep Blue': '#14365a',
  'Blue Titanium': '#4a5866',
  'Purple': '#b8a8d6',
  'Фиолетовый': '#b8a8d6',
  'Deep Purple': '#4f3e5e',
  'Lavender': '#c6b8d7',
  'Violet': '#8e7cc3',
  'Pink': '#f4c5d0',
  'Розовый': '#f4c5d0',
  'Red': '#c02b2b',
  'Красный': '#c02b2b',
  'Product Red': '#c02b2b',
  'Green': '#4a7b54',
  'Зелёный': '#4a7b54',
  'Зеленый': '#4a7b54',
  'Alpine Green': '#5b7a5c',
  'Midnight Green': '#31473c',
  'Yellow': '#f3dd60',
  'Жёлтый': '#f3dd60',
  'Желтый': '#f3dd60',
  'Orange': '#e58e3a',
  'Оранжевый': '#e58e3a',
  'Natural Titanium': '#c7b9a0',
  'White Titanium': '#ece9e1',
  'Black Titanium': '#3f3f3f',
  'Titanium': '#9a968c',
  'Grey': '#8a8a8a',
  'Gray': '#8a8a8a',
  'Серый': '#8a8a8a',
  'Space Gray': '#535358',
  'Coral': '#f08375',
  'Cyan': '#6dd1d7',
  'Teal': '#4a9ba3',
  'Ultramarine': '#3e69d6',
};
