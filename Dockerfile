# syntax=docker/dockerfile:1.7
# kiko.ai-web — Next.js 16 standalone for kikoai dev-app EC2 (ARM64).
#
# Strategy:
#   - Multi-stage: deps → builder → runner
#   - Base = node:22-alpine (Next.js 16 require Node 18.18+, 22 LTS 안정)
#   - corepack 으로 pnpm@10.33.2 자동 활성화 (package.json packageManager 필드)
#   - standalone build → server.js + node_modules 최소셋만 runner 에 포함
#   - Non-root nextjs uid 1001

# =============================================================================
# Stage 1: deps — production dependencies 설치 (cache 효율 위해 분리)
# =============================================================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
    && corepack prepare pnpm@10.33.2 --activate \
    && pnpm install --frozen-lockfile

# =============================================================================
# Stage 2: builder — Next.js build (standalone output)
# =============================================================================
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable \
    && corepack prepare pnpm@10.33.2 --activate \
    && pnpm run build

# =============================================================================
# Stage 3: runner — 최소 런타임
# =============================================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -q --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
