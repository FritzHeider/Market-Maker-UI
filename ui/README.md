# 🚀 Market Maker Bot – AI-Enhanced Trading Platform

A modular, scalable, AI-powered crypto market-making bot built with **Next.js**, **TailwindCSS**, **TypeScript**, and a **FastAPI backend**. Supports real-time data, WebSocket updates, and strategy customization.

---

## 🎯 Objective

Develop a full-stack market-making bot that supports:

- High-frequency trading
- Arbitrage scanning across exchanges
- OAuth-secured exchange integration
- Web-based control panel with real-time updates
- AI-powered dynamic strategy execution

---

## 🔧 Architecture

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | Next.js, TailwindCSS, TypeScript, Chart.js |
| Backend  | FastAPI (Python), Redis, PostgreSQL        |
| Hosting  | Vercel (frontend), Render or Railway (API) |
| Auth     | OAuth / Firebase / AWS Cognito             |
| Realtime | WebSockets, ccxt, REST APIs                |
| AI/ML    | TensorFlow / PyTorch + Backtrader          |

---

## 🧱 Frontend Structure

### `/pages`

- `index.tsx` – Landing page
- `dashboard.tsx` – Main trading interface (Chart, Ticker, Orders)

### `/components/ui`

- `MarketTicker.tsx` – Real-time price feed (via WebSocket)
- `PriceChart.tsx` – Historical prices
- `OrderPanel.tsx` – Submit buy/sell orders
- `StrategySelector.tsx` – Choose or build strategies

### `/lib`

- `types.ts` – Shared types (`PricePoint`, `Portfolio`, `Order`)
- `api.ts` – REST data fetchers
- `websocket.ts` – `useWebSocket` hook for real-time data
- `utils.ts` – Formatters (`formatCurrency`, `timeAgo`)

---

## 🌐 Environment Variables

| Key                   | Description                                   |
| --------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend URL for REST & WebSocket access       |

By default the UI uses a relative path (`''`) for API calls.
Set `NEXT_PUBLIC_API_URL` in `.env.local` and in your Vercel project settings when
the backend lives on a different domain.

---

## 🔌 Live Updates

- WebSocket feed: `/ws/ticker`
- Real-time ticker powered by custom `useWebSocket` hook
- Chart and Portfolio auto-refresh

---

## 📦 Tailwind Setup

TailwindCSS v4+ using ESM (`tailwind.config.ts`):

- `moduleResolution: "bundler"` in `tsconfig.json`
- PostCSS config uses `@tailwindcss/postcss`

---

## 🛠️ Current Status

- ✅ Fully functional frontend with dashboard UI
- ✅ Real-time ticker using WebSockets
- ✅ Shared `lib/` logic for clean architecture
- ✅ Engaging landing page with call-to-action and newsletter signup
- ⚠️ Backend endpoints pending (FastAPI integration)
- ⚠️ Auth and ML modules planned

---

## 🚀 Next Steps

- Connect FastAPI backend with portfolio, order, and websocket endpoints
- Implement real AI strategies and strategy optimizer
- Add user auth and secure key storage

---

Built for developers, quants, and AI traders. ✨
