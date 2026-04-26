'use client';

import { useReducer, useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  canonicalModel,
  seriesKey,
  seriesOrder,
  mergeColors,
  storageLabel,
  fmtPrice,
  COLOR_SWATCH,
} from '@/lib/tradein-utils';
import { WIKI_COLORS } from '@/lib/tradein-wiki-colors';
import { postMessage } from '@/lib/phonebase-client';
import type { TradeInPricesResponse, TradeInPriceItem } from '@/types/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Condition = 'excellent' | 'good' | 'poor' | 'repair';
type Channel = 'telegram' | 'max' | 'vk' | 'phone' | 'email';

type Step =
  | 'brand'
  | 'model'
  | 'storage'
  | 'color'
  | 'screen'
  | 'body'
  | 'issues'
  | 'battery'
  | 'completeness'
  | 'result';

interface WizardState {
  step: Step;
  brand: string | null;
  model: string | null;
  storage: string | null;
  color: string | null;
  screen: string | null;
  body: string | null;
  issues: string[];
  battery: number;
  completeness: string[];
  modelSearch: string;
  expandedSeries: string | null;
  contact: {
    name: string;
    phone: string;
    email: string;
    channel: Channel | null;
  };
  submitState: 'idle' | 'loading' | 'success' | 'error';
}

type WizardAction =
  | { type: 'SET_BRAND'; brand: string }
  | { type: 'SET_MODEL'; model: string }
  | { type: 'SET_STORAGE'; storage: string }
  | { type: 'SET_COLOR'; color: string }
  | { type: 'SET_SCREEN'; screen: string }
  | { type: 'SET_BODY'; body: string }
  | { type: 'TOGGLE_ISSUE'; id: string }
  | { type: 'SET_BATTERY'; battery: number }
  | { type: 'TOGGLE_COMPLETENESS'; id: string }
  | { type: 'SET_STEP'; step: Step }
  | { type: 'SET_MODEL_SEARCH'; query: string }
  | { type: 'TOGGLE_SERIES'; series: string }
  | { type: 'SET_CONTACT'; field: keyof WizardState['contact']; value: string }
  | { type: 'SET_SUBMIT_STATE'; state: WizardState['submitState'] }
  | { type: 'RESET' };

const STEPS: Step[] = [
  'brand', 'model', 'storage', 'color', 'screen', 'body',
  'issues', 'battery', 'completeness', 'result',
];

function initialState(): WizardState {
  return {
    step: 'brand',
    brand: null,
    model: null,
    storage: null,
    color: null,
    screen: null,
    body: null,
    issues: [],
    battery: 100,
    completeness: [],
    modelSearch: '',
    expandedSeries: null,
    contact: { name: '', phone: '', email: '', channel: null },
    submitState: 'idle',
  };
}

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_BRAND':
      return { ...state, brand: action.brand, model: null, storage: null, color: null, modelSearch: '', expandedSeries: null };
    case 'SET_MODEL':
      return { ...state, model: action.model, storage: null, color: null };
    case 'SET_STORAGE':
      return { ...state, storage: action.storage, color: null };
    case 'SET_COLOR':
      return { ...state, color: action.color };
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };
    case 'SET_BODY':
      return { ...state, body: action.body };
    case 'TOGGLE_ISSUE': {
      if (action.id === 'none') return { ...state, issues: ['none'] };
      const without = state.issues.filter((x) => x !== 'none');
      const idx = without.indexOf(action.id);
      const issues = idx > -1
        ? without.filter((x) => x !== action.id)
        : [...without, action.id];
      return { ...state, issues };
    }
    case 'SET_BATTERY':
      return { ...state, battery: action.battery };
    case 'TOGGLE_COMPLETENESS': {
      const idx = state.completeness.indexOf(action.id);
      const completeness = idx > -1
        ? state.completeness.filter((x) => x !== action.id)
        : [...state.completeness, action.id];
      return { ...state, completeness };
    }
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'SET_MODEL_SEARCH':
      return { ...state, modelSearch: action.query };
    case 'TOGGLE_SERIES':
      return {
        ...state,
        expandedSeries: state.expandedSeries === action.series ? null : action.series,
      };
    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } };
    case 'SET_SUBMIT_STATE':
      return { ...state, submitState: action.state };
    case 'RESET':
      return initialState();
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const ISSUES = [
  { id: 'not_turn_on', label: 'Не включается', critical: true },
  { id: 'screen_broken', label: 'Не работает экран', critical: true },
  { id: 'faceid_touchid', label: 'Face ID / Touch ID не работает', critical: false },
  { id: 'camera', label: 'Проблемы с камерой', critical: true },
  { id: 'speaker', label: 'Не работает динамик', critical: false },
  { id: 'mic', label: 'Не работает микрофон', critical: false },
  { id: 'wifi', label: 'Проблемы с Wi-Fi / Bluetooth', critical: false },
  { id: 'charging', label: 'Плохо / не заряжается', critical: true },
  { id: 'buttons', label: 'Не работают кнопки', critical: false },
  { id: 'water', label: 'Был в воде / следы влаги', critical: true },
  { id: 'soft', label: 'Программные сбои', critical: false },
  { id: 'none', label: 'Неисправностей нет', critical: false },
];

const COMPLETENESS_ITEMS = [
  { id: 'box', label: 'Коробка', bonus: 0.02 },
  { id: 'charger', label: 'Зарядка (блок)', bonus: 0.01 },
  { id: 'cable', label: 'Кабель', bonus: 0.005 },
  { id: 'headphones', label: 'Наушники', bonus: 0.01 },
  { id: 'receipt', label: 'Чек', bonus: 0.02 },
  { id: 'warranty', label: 'Гарантийный талон', bonus: 0.015 },
];

const SCREEN_OPTIONS = [
  { id: 'perfect', title: 'Как новый', desc: 'Без единой царапины, использовалось со стеклом' },
  { id: 'scratched', title: 'Мелкие царапины', desc: 'Незаметны при включённом экране' },
  { id: 'deep', title: 'Глубокие царапины / сколы', desc: 'Видны при работе, экран работает' },
  { id: 'broken', title: 'Разбит / не работает', desc: 'Трещины, битые пиксели, чёрные пятна' },
];

const BODY_OPTIONS = [
  { id: 'perfect', title: 'Как новый', desc: 'Корпус без царапин и сколов' },
  { id: 'scratched', title: 'Мелкие потёртости', desc: 'Следы аккуратного использования' },
  { id: 'chips', title: 'Сколы и заметные царапины', desc: 'Видны на краске или на рамке' },
  { id: 'dents', title: 'Вмятины / трещины', desc: 'Есть деформация корпуса' },
  { id: 'broken', title: 'Сильные повреждения', desc: 'Разбитая крышка, корпус треснул' },
];

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'telegram', label: 'Telegram' },
  { id: 'max', label: 'MAX' },
  { id: 'phone', label: 'Звонок' },
  { id: 'vk', label: 'ВКонтакте' },
  { id: 'email', label: 'Email' },
];

// ---------------------------------------------------------------------------
// Price evaluation
// ---------------------------------------------------------------------------

function worseCondition(a: Condition, b: Condition): Condition {
  const order: Condition[] = ['excellent', 'good', 'poor', 'repair'];
  return order.indexOf(a) > order.indexOf(b) ? a : b;
}

interface EvalResult {
  low: number;
  high: number;
  condition: Condition;
  entry: TradeInPriceItem;
}

function evaluate(
  state: WizardState,
  prices: TradeInPricesResponse,
): EvalResult | null {
  if (!state.brand || !state.model || !state.storage) return null;

  const entry = prices.items.find(
    (x) => x.brand === state.brand && x.model === state.model && x.storage === state.storage,
  );
  if (!entry) return null;

  let cond: Condition = 'excellent';

  if (state.screen === 'broken') cond = 'repair';
  else if (state.screen === 'deep') cond = worseCondition(cond, 'poor');
  else if (state.screen === 'scratched') cond = worseCondition(cond, 'good');

  if (state.body === 'broken') cond = worseCondition(cond, 'repair');
  else if (state.body === 'dents' || state.body === 'chips') cond = worseCondition(cond, 'poor');
  else if (state.body === 'scratched') cond = worseCondition(cond, 'good');

  const hasCritical = state.issues.some((id) => {
    const it = ISSUES.find((x) => x.id === id);
    return it?.critical;
  });
  const hasNone = state.issues.includes('none');
  if (hasCritical) cond = worseCondition(cond, 'repair');
  else if (!hasNone && state.issues.length >= 2) cond = worseCondition(cond, 'poor');
  else if (!hasNone && state.issues.length === 1) cond = worseCondition(cond, 'good');

  let batteryPenalty = 0;
  if (state.brand === 'Apple' && /iPhone/.test(state.model)) {
    if (state.battery < 80) batteryPenalty = 0.10;
    else if (state.battery < 85) batteryPenalty = 0.05;
  }

  const base = entry[cond] ?? 0;
  const markup = (prices.markup_pct || 0) / 100;
  let price = Math.round(base * (1 + markup) * (1 - batteryPenalty));

  if (cond !== 'repair') {
    let kitPct = 0;
    state.completeness.forEach((id) => {
      const k = COMPLETENESS_ITEMS.find((x) => x.id === id);
      if (k) kitPct += k.bonus;
    });
    price = Math.round(price * (1 + kitPct));
  }

  const low = Math.round((price * 0.95) / 500) * 500;
  const high = Math.round((price * 1.05) / 500) * 500;
  return { low, high, condition: cond, entry };
}

// ---------------------------------------------------------------------------
// Step navigation helpers
// ---------------------------------------------------------------------------

function nextStep(current: Step, brand: string | null): Step {
  const idx = STEPS.indexOf(current);
  let next = STEPS[idx + 1];
  // Skip battery step for non-Apple or non-iPhone
  if (next === 'battery' && !(brand === 'Apple')) {
    next = STEPS[idx + 2];
  }
  return next ?? current;
}

function prevStep(current: Step, brand: string | null): Step {
  const idx = STEPS.indexOf(current);
  let prev = STEPS[idx - 1];
  if (prev === 'battery' && !(brand === 'Apple')) {
    prev = STEPS[idx - 2];
  }
  return prev ?? current;
}

// ---------------------------------------------------------------------------
// Framer Motion config
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">{title}</h2>
      {hint && (
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{hint}</p>
      )}
    </div>
  );
}

function NavBar({
  onBack,
  onNext,
  nextLabel = 'Далее',
  nextDisabled = false,
  showBack = true,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="flex gap-3 mt-8">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-12 rounded-full border border-[var(--color-border)] text-[var(--color-text)] font-medium text-base transition-colors hover:bg-[var(--color-bg-secondary)]"
          aria-label="Назад"
        >
          Назад
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={cn(
            'flex-[2] h-12 rounded-full font-medium text-base transition-all',
            nextDisabled
              ? 'bg-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed'
              : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
          )}
          aria-label={nextLabel}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Brand
// ---------------------------------------------------------------------------

const BRAND_ICONS: Record<string, string> = {
  Apple: '/icons/tradein/brand-apple.svg',
  Samsung: '/icons/tradein/brand-samsung.svg',
  Xiaomi: '/icons/tradein/brand-xiaomi.svg',
};

function StepBrand({
  brands,
  selected,
  onSelect,
  onNext,
}: {
  brands: string[];
  selected: string | null;
  onSelect: (b: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeader title="Какая у вас техника?" hint="Выберите производителя" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            aria-label={`Выбрать бренд ${b}`}
            aria-pressed={selected === b}
            onClick={() => onSelect(b)}
            className={cn(
              'group flex flex-col items-center gap-2 p-5 rounded-2xl border-2 text-base font-medium transition-all hover:scale-[1.03] hover:-translate-y-0.5',
              selected === b
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)] shadow-[0_8px_24px_rgba(0,113,227,0.15)]'
                : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/50 text-[var(--color-text)]',
            )}
          >
            <span
              className="block w-14 h-14 transition-transform duration-300 group-hover:scale-110"
              style={{ color: selected === b ? 'var(--color-accent)' : '#1d1d1f' }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_ICONS[b] ?? '/icons/tradein/brand-samsung.svg'}
                alt=""
                className="w-full h-full"
              />
            </span>
            <span>{b}</span>
          </button>
        ))}
      </div>
      <NavBar showBack={false} onNext={onNext} nextDisabled={!selected} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Model
// ---------------------------------------------------------------------------

function highlightText(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-[var(--color-accent)]/15 text-[var(--color-accent)] rounded px-0.5">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

function StepModel({
  brand,
  allModels,
  selected,
  onSelect,
  onBack,
  search,
  onSearchChange,
  expandedSeries,
  onToggleSeries,
}: {
  brand: string;
  allModels: string[];
  selected: string | null;
  onSelect: (m: string) => void;
  onBack: () => void;
  search: string;
  onSearchChange: (q: string) => void;
  expandedSeries: string | null;
  onToggleSeries: (s: string) => void;
}) {
  // Group by series
  const bySeries: Record<string, string[]> = {};
  allModels.forEach((m) => {
    const s = seriesKey(m);
    if (!bySeries[s]) bySeries[s] = [];
    bySeries[s].push(m);
  });

  const seriesList = Object.keys(bySeries).sort((a, b) => {
    const oa = seriesOrder(a);
    const ob = seriesOrder(b);
    if (oa[0] !== ob[0]) return oa[0] - ob[0];
    if (oa[1] !== ob[1]) return oa[1] - ob[1];
    return a.localeCompare(b, 'ru');
  });

  const q = search.trim().toLowerCase();
  const hasQuery = q.length > 0;

  const visibleSeries = seriesList.filter((s) => {
    if (!hasQuery) return true;
    return bySeries[s].some((m) => m.toLowerCase().includes(q));
  });

  return (
    <div>
      <StepHeader title="Модель" hint={brand} />
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск: iPhone 15, Galaxy S24, POCO..."
        autoComplete="off"
        aria-label="Поиск модели"
        className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-base outline-none focus:border-[var(--color-accent)] transition-colors mb-4"
      />

      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {visibleSeries.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)] py-4 text-center">
            Ничего не найдено. Позвоните нам — оценим по телефону.
          </p>
        )}
        {visibleSeries.map((series) => {
          const models = hasQuery
            ? bySeries[series].filter((m) => m.toLowerCase().includes(q))
            : bySeries[series];
          const isOpen = hasQuery || expandedSeries === series;

          return (
            <div key={series} className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={`Серия ${series}`}
                onClick={() => onToggleSeries(series)}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)]/40 transition-colors"
              >
                <span className="font-medium text-sm">
                  {highlightText(series, search)}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] ml-2">
                  {bySeries[series].length} мод.{' '}
                  <span className={cn('transition-transform inline-block', isOpen ? 'rotate-180' : '')}>▾</span>
                </span>
              </button>
              {isOpen && (
                <div className="px-3 py-2 grid grid-cols-1 gap-1">
                  {models.map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-label={`Выбрать модель ${m}`}
                      aria-pressed={selected === m}
                      onClick={() => onSelect(m)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        selected === m
                          ? 'bg-[var(--color-accent)] text-white font-medium'
                          : 'hover:bg-[var(--color-bg-secondary)]',
                      )}
                    >
                      {highlightText(m, search)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <NavBar onBack={onBack} onNext={undefined} nextDisabled={!selected} showBack={true} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Storage
// ---------------------------------------------------------------------------

function StepStorage({
  storages,
  selected,
  onSelect,
  onBack,
  onNext,
  hint,
}: {
  storages: string[];
  selected: string | null;
  onSelect: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
  hint: string;
}) {
  return (
    <div>
      <StepHeader title="Объём памяти" hint={hint} />
      <div className="flex flex-wrap gap-3">
        {storages.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`Объём памяти ${storageLabel(s)}`}
            aria-pressed={selected === s}
            onClick={() => onSelect(s)}
            className={cn(
              'h-12 px-6 rounded-full border-2 text-base font-medium transition-all',
              selected === s
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/60',
            )}
          >
            {storageLabel(s)}
          </button>
        ))}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={!selected} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Color
// ---------------------------------------------------------------------------

function StepColor({
  colors,
  selected,
  onSelect,
  onBack,
  onNext,
  hint,
}: {
  colors: string[];
  selected: string | null;
  onSelect: (c: string) => void;
  onBack: () => void;
  onNext: () => void;
  hint: string;
}) {
  const sorted = [...colors].sort((a, b) => a.localeCompare(b, 'ru'));

  return (
    <div>
      <StepHeader title="Цвет устройства" hint={hint} />
      <div className="flex flex-wrap gap-2">
        {sorted.map((c) => {
          const hex = COLOR_SWATCH[c] ?? null;
          return (
            <button
              key={c}
              type="button"
              aria-label={`Цвет ${c}`}
              aria-pressed={selected === c}
              onClick={() => onSelect(c)}
              className={cn(
                'inline-flex items-center gap-2 h-10 px-4 rounded-full border-2 text-sm font-medium transition-all',
                selected === c
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/50',
              )}
            >
              <span
                className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                style={hex ? { background: hex } : { background: 'transparent', borderColor: '#aaa' }}
                aria-hidden="true"
              />
              {c}
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Другой цвет или не знаю"
          aria-pressed={selected === '__other'}
          onClick={() => onSelect('__other')}
          className={cn(
            'inline-flex items-center gap-2 h-10 px-4 rounded-full border-2 text-sm font-medium transition-all',
            selected === '__other'
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)]'
              : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/50',
          )}
        >
          <span className="w-4 h-4 rounded-full border border-dashed border-[var(--color-text-secondary)] flex-shrink-0" aria-hidden="true" />
          Другой / не знаю
        </button>
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={!selected} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Wide radio options (Screen / Body)
// ---------------------------------------------------------------------------

function StepWideOptions({
  title,
  hint,
  options,
  selected,
  onSelect,
  onBack,
  onNext,
  iconBase,
}: {
  title: string;
  hint: string;
  options: { id: string; title: string; desc: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
  /** Префикс пути к SVG-иконке: `/icons/tradein/screen` → `screen-{id}.svg`. */
  iconBase?: string;
}) {
  return (
    <div>
      <StepHeader title={title} hint={hint} />
      <div className="space-y-2">
        {options.map((o) => {
          const active = selected === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={o.title}
              onClick={() => onSelect(o.id)}
              className={cn(
                'group w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01]',
                active
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-[0_8px_24px_rgba(0,113,227,0.10)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/40',
              )}
            >
              {iconBase && (
                <span
                  className="flex-shrink-0 w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: active ? 'var(--color-accent)' : '#1d1d1f' }}
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${iconBase}-${o.id}.svg`} alt="" className="w-full h-full" />
                </span>
              )}
              <span
                className={cn(
                  'mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
                  active
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                    : 'border-[var(--color-border)]',
                )}
                aria-hidden="true"
              >
                {active && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base">{o.title}</div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-0.5">{o.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={!selected} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Issues
// ---------------------------------------------------------------------------

function StepIssues({
  selected,
  onToggle,
  onBack,
  onNext,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeader
        title="Неисправности"
        hint="Отметьте всё, что есть. Если ничего — выберите «Неисправностей нет»"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ISSUES.map((issue) => {
          const isChecked = selected.includes(issue.id);
          return (
            <button
              key={issue.id}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              aria-label={issue.label}
              onClick={() => onToggle(issue.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all',
                isChecked
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/40',
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all',
                  isChecked
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                    : 'border-[var(--color-border)]',
                )}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {issue.label}
            </button>
          );
        })}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={selected.length === 0} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Battery
// ---------------------------------------------------------------------------

function StepBattery({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: number;
  onChange: (v: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeader
        title="Ёмкость аккумулятора"
        hint="Настройки → Аккумулятор → Состояние и зарядка → Максимальная ёмкость"
      />
      <div className="flex items-center gap-4 mb-2">
        <span className="text-5xl font-bold tracking-tight text-[var(--color-text)]">{value}%</span>
        <span className="text-sm text-[var(--color-text-secondary)]">максимальная ёмкость</span>
      </div>
      <input
        type="range"
        min={50}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Ёмкость аккумулятора"
        className="w-full h-2 accent-[var(--color-accent)] cursor-pointer"
      />
      <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
        <span>50%</span>
        <span>100%</span>
      </div>
      {value < 80 && (
        <p className="mt-3 text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-2">
          При ёмкости ниже 80% цена снижается на 10%.
        </p>
      )}
      <NavBar onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Completeness
// ---------------------------------------------------------------------------

function StepCompleteness({
  selected,
  onToggle,
  onBack,
  onNext,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeader
        title="Комплектация"
        hint="Отметьте всё, что будете сдавать вместе с телефоном"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {COMPLETENESS_ITEMS.map((item) => {
          const isChecked = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              aria-label={item.label}
              onClick={() => onToggle(item.id)}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all hover:scale-[1.02]',
                isChecked
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/40',
              )}
            >
              <span
                className="flex-shrink-0 w-9 h-9 transition-transform duration-300 group-hover:scale-110"
                style={{ color: isChecked ? 'var(--color-accent)' : '#1d1d1f' }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/tradein/comp-${item.id}.svg`}
                  alt=""
                  className="w-full h-full"
                />
              </span>
              <span
                className={cn(
                  'w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all',
                  isChecked
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                    : 'border-[var(--color-border)]',
                )}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.bonus > 0 && (
                <span className="text-xs text-[var(--color-success)] font-normal">
                  +{Math.round(item.bonus * 100)}%
                </span>
              )}
            </button>
          );
        })}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextLabel="Рассчитать стоимость" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step: Result
// ---------------------------------------------------------------------------

const COND_LABELS: Record<Condition, string> = {
  excellent: 'Отличное',
  good: 'Хорошее',
  poor: 'Удовлетворительное',
  repair: 'На запчасти',
};

function labelScreen(id: string | null) {
  const map: Record<string, string> = {
    perfect: 'Как новый',
    scratched: 'Мелкие царапины',
    deep: 'Глубокие царапины / сколы',
    broken: 'Разбит / не работает',
  };
  return id ? (map[id] ?? '—') : '—';
}

function labelBody(id: string | null) {
  const map: Record<string, string> = {
    perfect: 'Как новый',
    scratched: 'Мелкие потёртости',
    chips: 'Сколы',
    dents: 'Вмятины / трещины',
    broken: 'Сильные повреждения',
  };
  return id ? (map[id] ?? '—') : '—';
}

function StepResult({
  state,
  result,
  onBack,
  onReset,
  dispatch,
  mountTime,
}: {
  state: WizardState;
  result: EvalResult | null;
  onBack: () => void;
  onReset: () => void;
  dispatch: React.Dispatch<WizardAction>;
  mountTime: number;
}) {
  const issueLabels =
    state.issues.includes('none') || state.issues.length === 0
      ? 'Нет'
      : state.issues
          .map((id) => ISSUES.find((x) => x.id === id)?.label ?? id)
          .join(', ');

  const completenessLabels =
    state.completeness.length === 0
      ? 'Только телефон'
      : state.completeness
          .map((id) => COMPLETENESS_ITEMS.find((x) => x.id === id)?.label ?? id)
          .join(', ');

  const isIPhone = state.brand === 'Apple' && state.model && /iPhone/.test(state.model);

  const canSubmit =
    state.contact.name.trim().length >= 2 &&
    (state.contact.phone.replace(/\D/g, '').length >= 10 ||
      state.contact.email.includes('@')) &&
    state.contact.channel !== null;

  async function handleSubmit() {
    if (!canSubmit || !result) return;
    dispatch({ type: 'SET_SUBMIT_STATE', state: 'loading' });

    const elapsed = Math.round(performance.now() - mountTime);
    const issuesForPayload =
      state.issues.includes('none') || state.issues.length === 0 ? [] : state.issues;

    try {
      await postMessage({
        message_type: 'tradein',
        contact_name: state.contact.name,
        contact_phone: state.contact.phone || undefined,
        contact_email: state.contact.email || undefined,
        preferred_channel: state.contact.channel ?? undefined,
        tradein: {
          brand: state.brand!,
          model: state.model!,
          storage: state.storage ?? undefined,
          color: state.color === '__other' ? undefined : (state.color ?? undefined),
          condition: JSON.stringify(issuesForPayload),
          battery_pct: isIPhone ? state.battery : undefined,
          completeness: completenessLabels,
          estimated_price: Math.round(result.high),
        },
        website: '',
        time_to_submit_ms: elapsed,
      });
      dispatch({ type: 'SET_SUBMIT_STATE', state: 'success' });
    } catch {
      dispatch({ type: 'SET_SUBMIT_STATE', state: 'error' });
    }
  }

  if (state.submitState === 'success') {
    const chName = { telegram: 'Telegram', max: 'MAX', phone: 'телефону', vk: 'ВКонтакте', email: 'Email' }[state.contact.channel ?? 'phone'];
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Заявка отправлена</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Мы свяжемся с вами через {chName} в ближайшее время.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="h-12 px-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] font-medium text-base transition-colors hover:bg-[var(--color-border)]"
          aria-label="Новая оценка"
        >
          Новая оценка
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Не удалось рассчитать</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Этой модели нет в прайсе. Позвоните — оценим вручную.
        </p>
        <NavBar onBack={onBack} onNext={undefined} showBack />
      </div>
    );
  }

  return (
    <div>
      {/* Result banner */}
      <div className="rounded-2xl bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 px-6 py-5 mb-6">
        <div className="text-sm text-[var(--color-text-secondary)] mb-1">
          Ориентировочная стоимость выкупа
        </div>
        <div className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-1">
          до {fmtPrice(result.high)}
        </div>
        <div className="text-sm text-[var(--color-text-secondary)]">
          Состояние: {COND_LABELS[result.condition]}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-3">
          Точная цена — после осмотра менеджером. Отклонение обычно 5–10%. Оплата сразу.
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-2xl bg-[var(--color-bg-secondary)] px-5 py-4 mb-6 space-y-2 text-sm">
        <h3 className="font-semibold text-base mb-3">Ваш телефон</h3>
        {([
          ['Модель', `${state.brand} ${state.model} · ${storageLabel(state.storage!)}`],
          state.color ? ['Цвет', state.color === '__other' ? 'Не указан' : state.color] : null,
          ['Состояние экрана', labelScreen(state.screen)],
          ['Состояние корпуса', labelBody(state.body)],
          ['Неисправности', issueLabels],
          isIPhone ? ['Ёмкость батареи', `${state.battery}%`] : null,
          ['Комплектация', completenessLabels],
        ].filter(Boolean) as Array<[string, string]>)
          .map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-[var(--color-text-secondary)]">{label}</span>
              <span className="text-right font-medium">{value}</span>
            </div>
          ))}
      </div>

      {/* Contact form */}
      <div className="rounded-2xl border border-[var(--color-border)] px-5 py-5 mb-6">
        <h3 className="font-semibold text-base mb-1">Отправить заявку</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Менеджер свяжется с вами для встречи. Без обязательств.
        </p>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-[var(--color-text-secondary)] mb-1 block">Ваше имя *</span>
            <input
              type="text"
              value={state.contact.name}
              onChange={(e) =>
                dispatch({ type: 'SET_CONTACT', field: 'name', value: e.target.value })
              }
              placeholder="Как к вам обращаться"
              aria-label="Ваше имя"
              className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-base outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-sm text-[var(--color-text-secondary)] mb-1 block">Телефон *</span>
            <input
              type="tel"
              value={state.contact.phone}
              onChange={(e) =>
                dispatch({ type: 'SET_CONTACT', field: 'phone', value: e.target.value })
              }
              placeholder="+7 ___ ___-__-__"
              aria-label="Телефон"
              className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-base outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-sm text-[var(--color-text-secondary)] mb-1 block">Email (необязательно)</span>
            <input
              type="email"
              value={state.contact.email}
              onChange={(e) =>
                dispatch({ type: 'SET_CONTACT', field: 'email', value: e.target.value })
              }
              placeholder="your@email.ru"
              aria-label="Email"
              className="w-full h-11 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-base outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </label>

          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="website"
            defaultValue=""
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          />

          <div>
            <span className="text-sm text-[var(--color-text-secondary)] mb-2 block">
              Как удобнее связаться? *
            </span>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  aria-label={`Канал связи ${ch.label}`}
                  aria-pressed={state.contact.channel === ch.id}
                  onClick={() =>
                    dispatch({ type: 'SET_CONTACT', field: 'channel', value: ch.id })
                  }
                  className={cn(
                    'h-9 px-4 rounded-full border-2 text-sm font-medium transition-all',
                    state.contact.channel === ch.id
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/60',
                  )}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {state.submitState === 'error' && (
        <p className="text-sm text-red-600 mb-3">
          Ошибка отправки. Попробуйте ещё раз или позвоните нам.
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-12 rounded-full border border-[var(--color-border)] font-medium text-base transition-colors hover:bg-[var(--color-bg-secondary)]"
          aria-label="Назад"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || state.submitState === 'loading'}
          className={cn(
            'flex-[2] h-12 rounded-full font-medium text-base transition-all',
            canSubmit && state.submitState !== 'loading'
              ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
              : 'bg-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed',
          )}
          aria-label="Отправить заявку"
        >
          {state.submitState === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({
  steps,
  current,
}: {
  steps: Step[];
  current: Step;
}) {
  const idx = steps.indexOf(current);
  return (
    <div className="flex gap-1 mb-8" role="progressbar" aria-valuenow={idx + 1} aria-valuemax={steps.length} aria-label="Шаг визарда">
      {steps.map((s, i) => (
        <div
          key={s}
          className={cn(
            'flex-1 h-1 rounded-full transition-all duration-300',
            i < idx
              ? 'bg-[var(--color-accent)]'
              : i === idx
              ? 'bg-[var(--color-accent)]/50'
              : 'bg-[var(--color-border)]',
          )}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface TradeinWizardProps {
  initialPrices: TradeInPricesResponse;
}

export function TradeinWizard({ initialPrices }: TradeinWizardProps) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const topRef = useRef<HTMLDivElement>(null);
  const mountTimeRef = useRef(
    typeof performance !== 'undefined' ? performance.now() : 0,
  );
  const lastStepRef = useRef<Step>('brand');
  const [animKey, setAnimKey] = useState(0);

  // Scroll to top on step change
  useEffect(() => {
    if (state.step !== lastStepRef.current) {
      lastStepRef.current = state.step;
      setAnimKey((k) => k + 1);
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state.step]);

  // Build prices index: brand → model → storage → item
  const pricesIndex = useMemo(() => {
    const idx: Record<string, Record<string, Record<string, TradeInPriceItem>>> = {};
    initialPrices.items.forEach((x) => {
      if (!idx[x.brand]) idx[x.brand] = {};
      if (!idx[x.brand][x.model]) idx[x.brand][x.model] = {};
      idx[x.brand][x.model][x.storage] = x;
    });
    return idx;
  }, [initialPrices]);

  const brands = Object.keys(pricesIndex);

  function modelsForBrand(brand: string): string[] {
    const raw = Object.keys(pricesIndex[brand] ?? {});
    // Deduplicate by canonical name
    const canonMap: Record<string, string[]> = {};
    raw.forEach((m) => {
      const c = canonicalModel(m);
      if (!canonMap[c]) canonMap[c] = [];
      canonMap[c].push(m);
    });
    return Object.keys(canonMap).sort();
  }

  function storagesForModel(brand: string, model: string): string[] {
    const brandIdx = pricesIndex[brand] ?? {};
    // Find raw keys that canonicalise to this model
    const storageSet = new Set<string>();
    Object.keys(brandIdx).forEach((rawModel) => {
      if (canonicalModel(rawModel) === model) {
        Object.keys(brandIdx[rawModel] ?? {}).forEach((s) => storageSet.add(s));
      }
    });
    return Array.from(storageSet).sort((a, b) => Number(a) - Number(b));
  }

  function colorsForSelection(brand: string, model: string, storage: string): string[] {
    const brandIdx = pricesIndex[brand] ?? {};
    let feedColors: string[] = [];
    Object.keys(brandIdx).forEach((rawModel) => {
      if (canonicalModel(rawModel) === model) {
        const entry = brandIdx[rawModel]?.[storage];
        if (entry?.colors) feedColors = [...feedColors, ...entry.colors];
      }
    });
    const wikiKey = `${brand} ${model}`;
    const wiki = WIKI_COLORS[wikiKey] ?? [];
    return mergeColors(feedColors, wiki);
  }

  function rawModelForCanonical(brand: string, canonical: string): string {
    const raw = Object.keys(pricesIndex[brand] ?? {});
    return raw.find((m) => canonicalModel(m) === canonical) ?? canonical;
  }

  // Visible steps (battery only for Apple iPhones)
  const isIPhone = state.brand === 'Apple' && state.model && /iPhone/.test(state.model);
  const visibleSteps = STEPS.filter((s) => s !== 'battery' || isIPhone);

  function goNext() {
    const next = nextStep(state.step, state.brand);
    // Auto-skip color if no colors available
    if (next === 'color' && state.brand && state.model && state.storage) {
      const colors = colorsForSelection(state.brand, state.model, state.storage);
      if (colors.length === 0) {
        const afterColor = nextStep('color', state.brand);
        dispatch({ type: 'SET_STEP', step: afterColor });
        return;
      }
    }
    dispatch({ type: 'SET_STEP', step: next });
  }

  function goBack() {
    const prev = prevStep(state.step, state.brand);
    dispatch({ type: 'SET_STEP', step: prev });
  }

  const evalResult = evaluate(state, initialPrices);

  function renderStep() {
    switch (state.step) {
      case 'brand':
        return (
          <StepBrand
            brands={brands}
            selected={state.brand}
            onSelect={(b) => {
              dispatch({ type: 'SET_BRAND', brand: b });
            }}
            onNext={goNext}
          />
        );

      case 'model':
        return (
          <StepModel
            brand={state.brand!}
            allModels={modelsForBrand(state.brand!)}
            selected={state.model ? canonicalModel(state.model) : null}
            onSelect={(canonical) => {
              const raw = rawModelForCanonical(state.brand!, canonical);
              dispatch({ type: 'SET_MODEL', model: raw });
              goNext();
            }}
            onBack={goBack}
            search={state.modelSearch}
            onSearchChange={(q) => dispatch({ type: 'SET_MODEL_SEARCH', query: q })}
            expandedSeries={state.expandedSeries}
            onToggleSeries={(s) => dispatch({ type: 'TOGGLE_SERIES', series: s })}
          />
        );

      case 'storage':
        return (
          <StepStorage
            storages={storagesForModel(state.brand!, canonicalModel(state.model!))}
            selected={state.storage}
            onSelect={(s) => dispatch({ type: 'SET_STORAGE', storage: s })}
            onBack={goBack}
            onNext={goNext}
            hint={`${state.brand} ${canonicalModel(state.model!)}`}
          />
        );

      case 'color': {
        const colors = state.brand && state.model && state.storage
          ? colorsForSelection(state.brand, canonicalModel(state.model), state.storage)
          : [];
        return (
          <StepColor
            colors={colors}
            selected={state.color}
            onSelect={(c) => dispatch({ type: 'SET_COLOR', color: c })}
            onBack={goBack}
            onNext={goNext}
            hint={`${state.brand} ${canonicalModel(state.model!)} · ${storageLabel(state.storage!)}`}
          />
        );
      }

      case 'screen':
        return (
          <StepWideOptions
            title="Состояние экрана"
            hint="Посмотрите на экран при ярком свете под углом"
            options={SCREEN_OPTIONS}
            selected={state.screen}
            onSelect={(id) => dispatch({ type: 'SET_SCREEN', screen: id })}
            onBack={goBack}
            onNext={goNext}
            iconBase="/icons/tradein/screen"
          />
        );

      case 'body':
        return (
          <StepWideOptions
            title="Состояние корпуса"
            hint="Оцените корпус, рамку и заднюю крышку"
            options={BODY_OPTIONS}
            selected={state.body}
            onSelect={(id) => dispatch({ type: 'SET_BODY', body: id })}
            onBack={goBack}
            onNext={goNext}
            iconBase="/icons/tradein/body"
          />
        );

      case 'issues':
        return (
          <StepIssues
            selected={state.issues}
            onToggle={(id) => dispatch({ type: 'TOGGLE_ISSUE', id })}
            onBack={goBack}
            onNext={goNext}
          />
        );

      case 'battery':
        return (
          <StepBattery
            value={state.battery}
            onChange={(v) => dispatch({ type: 'SET_BATTERY', battery: v })}
            onBack={goBack}
            onNext={goNext}
          />
        );

      case 'completeness':
        return (
          <StepCompleteness
            selected={state.completeness}
            onToggle={(id) => dispatch({ type: 'TOGGLE_COMPLETENESS', id })}
            onBack={goBack}
            onNext={goNext}
          />
        );

      case 'result':
        return (
          <StepResult
            state={state}
            result={evalResult}
            onBack={goBack}
            onReset={() => dispatch({ type: 'RESET' })}
            dispatch={dispatch}
            mountTime={mountTimeRef.current}
          />
        );
    }
  }

  return (
    <div ref={topRef} className="max-w-xl mx-auto">
      <ProgressBar steps={visibleSteps} current={state.step} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={animKey}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}