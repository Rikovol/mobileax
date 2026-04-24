# mobileax-next

Next.js 15 витрина для мобилакс.рф (и других магазинов сети).

## Как запустить

```bash
# 1. Установить зависимости
npm install

# 2. Настроить переменные окружения
cp .env.example .env.local
# Отредактировать .env.local: вписать NEXT_PUBLIC_STORE_ID из phonebase

# 3. Dev-режим
npm run dev     # http://localhost:3000

# 4. Production-сборка
npm run build
npm start
```

## Стек

- **Next.js 15** (App Router, RSC, standalone output)
- **TypeScript** + строгий режим
- **Tailwind CSS** — Apple-like дизайн-система через CSS custom properties
- **Framer Motion** — анимации Hero/BrandGrid
- **Radix UI primitives** — доступные компоненты
- **lucide-react** — иконки

## API

Данные берутся из phonebase API (`/api/sites/{store_id}/*`).
Контракт: `../../phonebase/docs/api-sites-contract.md`

Клиент: `src/lib/phonebase-client.ts`
Типы: `src/types/api.ts`

## Мульти-сайт

Один Docker-контейнер = один магазин. Тема выбирается по `NEXT_PUBLIC_SITE_ID`:
- `mobileax` → мобилакс.рф (Apple-like, по умолчанию)
- `ipras` → айпрас (заглушка)
- `remgsm` → ремгсм (заглушка)
