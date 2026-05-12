# kiko.ai-web

Marketing landing page for **kiko.ai** — a chat-native shopping agent that lives in Telegram and iMessage.

Single viewport, "noscroll" inspired one-pager. Drop a Pinterest, Instagram, or product link to `@kiko_fashion_ai_bot` and kiko hunts the same item across the web in under 30 seconds.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** · **TypeScript**
- **Tailwind CSS v4** · **shadcn/ui** (base-nova, neutral)
- **lucide-react** icons
- **pnpm** workspace, Node 22

## Quick start

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Project layout

```
src/
├── app/
│   ├── layout.tsx           # Helvetica system stack, dark body, metadata
│   ├── page.tsx             # Composes Starfield + Hero + Features + Footer
│   ├── globals.css          # Tailwind v4 + kiko shimmer tokens
│   └── favicon.ico
├── components/
│   ├── landing/
│   │   ├── starfield.tsx    # Canvas star background
│   │   ├── hero.tsx         # "Stop browsing. Ask kiko.ai." + CTA + mockup
│   │   ├── telegram-mockup.tsx  # Auto-played Pinterest → cheaper demo
│   │   ├── connect-modal.tsx    # iMessage/Telegram tab modal + QR
│   │   ├── features.tsx     # 3×2 dark feature cards
│   │   └── footer.tsx
│   └── ui/                  # shadcn primitives
└── lib/utils.ts
```

## Brand

- Hero copy: **Stop browsing. Ask kiko.ai.**
- Accent: orange shimmer gradient (`#8B1A00` → `#F5A623`, 60s loop)
- Mascot: 🐈‍⬛ in a shopping bag (`public/logo.jpg`)
- Bot handle: [`@kiko_fashion_ai_bot`](https://t.me/kiko_fashion_ai_bot)

## Branches

- `main` — release branch (production)
- `dev` — default working branch
- `feature/*` — work branches, PR'd into `dev`

## CI

GitHub Actions runs **Lint** + **Build** on every push and PR to `main` / `dev`. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

PRs are auto-assigned, labeled by commit message convention (`feat:`, `fix:`, `docs:` …), and reviewed by [@bbbang105](https://github.com/bbbang105).
