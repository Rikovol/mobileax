# ============================================================
# Stage 1: Install dependencies
# ============================================================
FROM node:22-alpine AS deps
WORKDIR /app

# Install build tools for native addons if needed
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

# ============================================================
# Stage 2: Build Next.js app
# ============================================================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for bake-in (or leave empty to inject at runtime)
ARG NEXT_PUBLIC_SITE_ID=mobileax
ARG NEXT_PUBLIC_STORE_ID=
ARG NEXT_PUBLIC_PHONEBASE_API=http://localhost:8000

ENV NEXT_PUBLIC_SITE_ID=$NEXT_PUBLIC_SITE_ID
ENV NEXT_PUBLIC_STORE_ID=$NEXT_PUBLIC_STORE_ID
ENV NEXT_PUBLIC_PHONEBASE_API=$NEXT_PUBLIC_PHONEBASE_API
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ============================================================
# Stage 3: Runtime — standalone output
# ============================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy standalone bundle
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public         ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
