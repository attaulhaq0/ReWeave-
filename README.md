<div align="center">

<img src="https://img.shields.io/badge/ReWeave-AI%20Textile%20Waste%20Marketplace-0D9488?style=for-the-badge&logoColor=white" alt="ReWeave" />

# ReWeave ♻️

### AI-powered marketplace connecting textile factories with recyclers.
### Turning Pakistan's fabric waste into circular economy revenue.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.x-000000?style=flat-square&logo=fastify)](https://fastify.dev/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.3-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-MVP%20Development-orange?style=flat-square)]()

<br/>

> *"We turn fragmented textile waste into predictable, traceable, and tradeable feedstock —*
> *making waste streams visible, harvestable, and economically valuable."*

<br/>

[🚀 Live Demo](#) · [📖 Documentation](./docs) · [🐛 Report Bug](issues) · [💡 Request Feature](issues)

</div>

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [What ReWeave Does](#-what-reweave-does)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Services](#-running-the-services)
- [MVP Scope](#-mvp-scope)
- [MVP Progress Tracker](#-mvp-progress-tracker)
- [Database Schema](#-database-schema)
- [API Overview](#-api-overview)
- [AI Classification Pipeline](#-ai-classification-pipeline)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [Team](#-team)
- [License](#-license)

---

## 🧩 The Problem

Pakistan is one of the world's top 5 textile exporters — yet generates **1.5–2 million metric tons** of post-industrial textile waste every year.

| Pain Point | Reality |
|---|---|
| 🗑️ Where it ends up | 65%+ goes to landfill |
| 💸 Economic loss | Factories *pay* for disposal instead of earning |
| 🔍 Discovery | Manual brokers, WhatsApp groups, zero transparency |
| ⚖️ Consistency | Recyclers can't source reliable, classified feedstock |
| 🚛 Logistics | Unoptimized routes inflate costs by 30–40% |

**The global textile recycling market is worth $5.8B (2024) and growing at 8.1% CAGR. Pakistan's recycling rate? Under 20%.**

---

## ✨ What ReWeave Does

ReWeave is a **two-sided AI marketplace** that:

- 🤖 **Classifies** textile waste automatically via computer vision (EfficientNet-B4 + CLIP)
- 📊 **Forecasts** weekly supply per supplier using Prophet + LightGBM
- 🔀 **Matches** waste producers with the best-fit recyclers via a smart scoring engine
- 💰 **Facilitates** real-time auctions, fixed-price sales, and escrow-backed payments
- 🚚 **Optimizes** logistics with 3PL integration and route planning
- 📈 **Reports** ESG-ready procurement reports for sustainability-conscious buyers

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js (App Router) | 14.x | SSR/SSG, React Server Components |
| TypeScript | 5.3+ | Type safety across the entire codebase |
| Tailwind CSS | 3.4+ | Utility-first styling |
| shadcn/ui + Radix UI | Latest | Accessible, headless UI components |
| TanStack Query | 5.x | Server state management & caching |
| Zustand | 4.x | Lightweight global client state |
| React Hook Form + Zod | 7.x / 3.x | Form handling + schema validation |
| Socket.IO Client | 4.x | Real-time bid updates & notifications |
| Recharts + D3.js | 2.x / 7.x | Analytics dashboards & charts |
| Mapbox GL JS | 3.x | Logistics route visualization |
| Uppy (TUS Protocol) | Latest | Resumable multi-image uploads |
| next-intl | 3.x | English + Urdu (RTL) i18n |

### Backend — Core API
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | API runtime |
| Fastify | 4.x | HTTP framework (schema-first) |
| Drizzle ORM | Latest | Type-safe SQL with PostgreSQL |
| Better Auth | Latest | Sessions, OAuth, MFA, RBAC |
| BullMQ + Redis | 5.x | Background job queues |
| Meilisearch | Latest | Full-text waste catalog search |
| Resend + React Email | Latest | Transactional email |
| Twilio | Latest | SMS OTP + WhatsApp notifications |
| Cloudflare R2 | — | Waste image & document storage |
| Stripe + JazzCash | Latest | International + local PK payments |

### AI/ML Service
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.12 | ML runtime |
| FastAPI | 0.111+ | Async AI service API |
| PyTorch | 2.3+ | Deep learning framework |
| EfficientNet-B4 (timm) | 0.9+ | Textile waste image classification |
| CLIP ViT-B/32 | Latest | Zero-shot material detection fallback |
| Hugging Face Transformers | 4.41+ | Pre-trained model hub |
| Prophet + LightGBM | Latest | Supply volume forecasting |
| BentoML | Latest | Model serving & deployment |
| MLflow | 2.x | Experiment tracking & model registry |
| Apache Airflow | 2.9+ | ML pipeline orchestration |
| Evidently AI | Latest | Model drift monitoring |

### Infrastructure
| Technology | Purpose |
|---|---|
| PostgreSQL 16 (AWS RDS) | Primary database |
| pgvector | Vector similarity search for fabric embeddings |
| TimescaleDB | Time-series metrics & price trends |
| Redis (Upstash) | Cache, queues, rate limiting |
| AWS ECS Fargate | Managed container orchestration |
| Cloudflare CDN + WAF | Global CDN + DDoS + WAF protection |
| Terraform | Infrastructure as Code |
| GitHub Actions | CI/CD pipelines |
| Grafana + Prometheus | Monitoring & alerting |
| OpenTelemetry + Loki | Distributed tracing & logging |
| Sentry | Error tracking |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                     CLIENTS                         │
│   Next.js Web App  │  Mobile PWA  │  Partner APIs   │
└──────────────────────────┬──────────────────────────┘
                           │ HTTPS / WSS
           ┌───────────────▼──────────────────┐
           │   API Gateway (ALB + Cloudflare)  │
           │   Rate Limit · Auth · WAF · SSL   │
           └──┬──────┬──────┬──────┬──────┬───┘
              │      │      │      │      │
        ┌─────▼─┐ ┌──▼──┐ ┌▼────┐ ┌▼───┐ ┌▼──────┐
        │ auth  │ │mkt- │ │ ai  │ │lgst│ │notif- │
        │service│ │place│ │svc  │ │svc │ │cation │
        │(Node) │ │(Node│ │(Py) │ │(Nd)│ │ (Nd)  │
        └───────┘ └─────┘ └─────┘ └────┘ └───────┘
                           │
              ┌────────────▼────────────────┐
              │   Redis Streams / BullMQ    │
              └────────────┬────────────────┘
                           │
        ┌──────────────────▼─────────────────────┐
        │              DATA LAYER                 │
        │  PostgreSQL 16 │ Redis │ Meilisearch    │
        │  pgvector      │       │ Cloudflare R2  │
        └─────────────────────────────────────────┘
```

**Data Flow (Listing → Settlement):**
1. Supplier uploads waste photos → Cloudflare R2 via TUS
2. Webhook triggers AI classification job (BullMQ)
3. EfficientNet-B4 classifies material, grade, color → stored in PostgreSQL
4. Supplier reviews & confirms → listing goes ACTIVE
5. Meilisearch indexes listing → instantly searchable
6. Matching engine scores buyers → push/WhatsApp notifications sent
7. Buyer bids → Socket.IO broadcasts to all watchers
8. Auction closes → escrow payment initiated
9. 3PL pickup scheduled → delivery confirmed → escrow released

---

## 📁 Repository Structure

```
reweave/                          # pnpm workspace monorepo
├── apps/
│   ├── web/                      # Next.js 14 frontend
│   │   ├── app/                  # App Router pages
│   │   ├── components/           # UI components
│   │   └── lib/                  # Utilities & API clients
│   ├── api/                      # Node.js / Fastify core API
│   │   ├── src/
│   │   │   ├── routes/           # API route handlers
│   │   │   ├── services/         # Business logic
│   │   │   ├── jobs/             # BullMQ job processors
│   │   │   └── plugins/          # Fastify plugins
│   │   └── Dockerfile
│   └── ai-service/               # Python / FastAPI AI service
│       ├── app/
│       │   ├── api/              # FastAPI endpoints
│       │   ├── models/           # PyTorch model wrappers
│       │   ├── pipelines/        # Classification & forecasting
│       │   └── dags/             # Airflow DAGs
│       ├── models/               # Saved model weights (.pt)
│       └── Dockerfile
├── packages/
│   ├── ui/                       # Shared React component library
│   ├── types/                    # Shared TypeScript types + Zod schemas
│   └── database/                 # Drizzle ORM schema + migrations
├── infra/
│   ├── terraform/                # AWS infrastructure as code
│   └── docker/                   # Docker Compose configs
├── .github/
│   └── workflows/                # CI/CD pipelines
│       ├── ci.yml                # Lint, test, build on PR
│       └── deploy.yml            # Deploy on merge / tag
├── docs/                         # Extended documentation
│   ├── PRD.md
│   ├── API.md
│   ├── AI_ARCHITECTURE.md
│   └── DEPLOYMENT.md
├── scripts/                      # Dev setup & utility scripts
├── docker-compose.yml            # Local dev infrastructure
├── pnpm-workspace.yaml
├── turbo.json                    # Turborepo build config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node --version    # v20.x LTS
pnpm --version    # v9.x
python --version  # 3.12.x
docker --version  # 24.x+
git --version     # 2.x+
```

Install global tools:

```bash
npm install -g pnpm@9
pip install uv   # fast Python package manager
```

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reweave.git
cd reweave
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies (Node)
pnpm install

# Install Python dependencies for AI service
cd apps/ai-service
uv sync
cd ../..
```

### 3. Start Local Infrastructure

```bash
# Starts PostgreSQL, Redis, Meilisearch via Docker
docker compose up -d

# Verify all containers are healthy
docker compose ps
```

### 4. Set Up Environment Variables

```bash
# Copy all .env examples
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
cp apps/ai-service/.env.example apps/ai-service/.env
```

Fill in the required values — see [Environment Variables](#-environment-variables) section below.

### 5. Set Up the Database

```bash
# Run all migrations
pnpm db:migrate

# Seed with test data (suppliers, buyers, sample listings)
pnpm db:seed
```

### 6. Start All Services

```bash
# Starts web + api + ai-service concurrently via Turborepo
pnpm dev
```

| Service | URL |
|---|---|
| 🌐 Web App | http://localhost:3000 |
| ⚡ API | http://localhost:4000 |
| 📖 API Docs | http://localhost:4000/docs |
| 🤖 AI Service | http://localhost:8000 |
| 🤖 AI Docs | http://localhost:8000/docs |
| 🔍 Meilisearch | http://localhost:7700 |

---

## 🔐 Environment Variables

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
NEXT_PUBLIC_MEILISEARCH_URL=http://localhost:7700
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY=your_search_only_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### `apps/api/.env`

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://reweave:password@localhost:5432/reweave

# Auth
BETTER_AUTH_SECRET=your-256-bit-secret-here
BETTER_AUTH_URL=http://localhost:4000

# Redis
REDIS_URL=redis://localhost:6379

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=reweave-dev
R2_PUBLIC_URL=https://your-bucket.r2.dev

# Search
MEILISEARCH_URL=http://localhost:7700
MEILISEARCH_MASTER_KEY=your_master_key

# Payments
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Notifications
RESEND_API_KEY=re_your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+14155238886

# AI Service
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_API_KEY=your_internal_key

# Sentry
SENTRY_DSN=your_sentry_dsn
```

### `apps/ai-service/.env`

```env
PORT=8000
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://reweave:password@localhost:5432/reweave

# Storage
R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=reweave-dev

# Hugging Face
HUGGINGFACE_TOKEN=hf_your_token

# MLflow
MLFLOW_TRACKING_URI=http://localhost:5000

# Internal auth
API_SERVICE_KEY=your_internal_key
```

> ⚠️ **Never commit `.env` files.** They are already in `.gitignore`. Use [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) in production.

---

## ▶️ Running the Services

### Development (All at once)

```bash
pnpm dev              # runs all apps in parallel
```

### Development (Individual)

```bash
pnpm --filter web dev           # frontend only
pnpm --filter api dev           # API only
pnpm --filter ai-service dev    # AI service only
```

### Building for Production

```bash
pnpm build            # builds all apps
pnpm --filter web build         # frontend only
```

### Testing

```bash
pnpm test             # run all tests
pnpm test:e2e         # Playwright end-to-end tests
pnpm test:unit        # Vitest unit tests
pnpm test:coverage    # with coverage report
```

### Database Commands

```bash
pnpm db:migrate       # run pending migrations
pnpm db:migrate:new   # create a new migration
pnpm db:studio        # open Drizzle Studio (DB GUI)
pnpm db:seed          # seed development data
pnpm db:reset         # reset and re-seed (dev only)
```

### Linting & Formatting

```bash
pnpm lint             # ESLint + Pyright
pnpm format           # Prettier + Black
pnpm typecheck        # TypeScript type checking
```

---

## 🎯 MVP Scope

The MVP covers the **core marketplace loop**: list waste → classify → bid → pay → pickup.

### Phase 1 — Foundation `(Month 1)`
> Dev environment, auth, design system

- [ ] Monorepo setup (pnpm workspaces + Turborepo)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] PostgreSQL schema + Drizzle ORM setup
- [ ] Auth service (register, login, JWT, refresh tokens)
- [ ] KYB document submission flow
- [ ] Design system (Tailwind tokens, shadcn/ui setup)
- [ ] Base Next.js app shell (layout, navigation, auth pages)
- [ ] Docker Compose local dev environment

### Phase 2 — Core Marketplace `(Month 2)`
> Suppliers can list, buyers can browse

- [ ] Supplier onboarding flow (multi-step form)
- [ ] Waste image upload (Uppy + TUS + Cloudflare R2)
- [ ] AI classification integration (photo → results in <3s)
- [ ] Waste listing CRUD (create, edit, publish, cancel)
- [ ] Buyer registration & profile
- [ ] Marketplace catalog page (card grid + filters)
- [ ] Listing detail page (gallery, AI report, specs)
- [ ] Meilisearch integration (full-text + filter search)
- [ ] Supplier dashboard (listings, revenue summary)
- [ ] Buyer dashboard (bid history, watchlist)

### Phase 3 — Bidding & Payments `(Month 3)`
> Real-time auctions and secure payments

- [ ] Real-time bidding engine (Socket.IO rooms per listing)
- [ ] Auto-bid feature (set ceiling, auto-increment)
- [ ] Auction timer with urgency states
- [ ] Fixed-price instant buy
- [ ] Stripe payment integration (card payments)
- [ ] JazzCash / EasyPaisa integration (local PK)
- [ ] Escrow hold on payment
- [ ] Escrow release on delivery confirmation
- [ ] Email notifications (Resend + React Email templates)
- [ ] WhatsApp notifications (Twilio) for key events
- [ ] Basic logistics suggestion (pickup date, area)
- [ ] Order management (status tracking, history)
- [ ] Transaction receipts + invoice generation
- [ ] Admin panel (user management, listing moderation)

---

## ✅ MVP Progress Tracker

> Updated as development progresses. Contributions welcome — see [Contributing](#-contributing).

| Feature | Status | Owner | Notes |
|---|---|---|---|
| Monorepo setup | 🔲 Not Started | — | |
| CI/CD pipeline | 🔲 Not Started | — | |
| Auth (register/login) | 🔲 Not Started | — | |
| KYB flow | 🔲 Not Started | — | |
| AI classification | 🔲 Not Started | — | EfficientNet-B4 |
| Image upload | 🔲 Not Started | — | TUS + R2 |
| Waste listing CRUD | 🔲 Not Started | — | |
| Catalog + search | 🔲 Not Started | — | Meilisearch |
| Bidding engine | 🔲 Not Started | — | Socket.IO |
| Stripe payments | 🔲 Not Started | — | |
| JazzCash payments | 🔲 Not Started | — | |
| Escrow system | 🔲 Not Started | — | |
| WhatsApp notify | 🔲 Not Started | — | Twilio |
| Email notify | 🔲 Not Started | — | Resend |
| Supplier dashboard | 🔲 Not Started | — | |
| Buyer dashboard | 🔲 Not Started | — | |
| Admin panel | 🔲 Not Started | — | |

**Legend:** 🔲 Not Started · 🚧 In Progress · ✅ Complete · ⏸️ Blocked

---

## 🗄 Database Schema

Core tables (simplified):

```sql
-- Users: suppliers, buyers, admins
users (id, email, phone, role, kyb_status, trust_score, ...)

-- Supplier facility details
suppliers (id, user_id, facility_type, city, lat, lng, monthly_waste_capacity, ...)

-- Waste lots listed on marketplace
waste_listings (
  id, supplier_id, material_type, color_class, grade,
  weight_kg, floor_price_pkr, buy_now_price, listing_type,
  status, auction_end_at, images[], ai_classification JSONB,
  embedding VECTOR(512),   -- pgvector for similarity search
  ...
)

-- Buyer bids on listings
bids (id, listing_id, buyer_id, amount_pkr, status, auto_bid_max, ...)

-- Confirmed orders
orders (id, listing_id, supplier_id, buyer_id, final_price_pkr, escrow_held, ...)

-- Shipments & logistics
shipments (id, order_id, carrier, status, pickup_date, tracking_url, ...)
```

Full schema with migrations lives in `packages/database/`.

---

## 📡 API Overview

Base URL: `http://localhost:4000/api/v1`
Interactive docs: `http://localhost:4000/docs` (Scalar / OpenAPI 3.1)

### Auth
```
POST   /auth/register          Register supplier or buyer
POST   /auth/login             Login → returns JWT + refresh token
POST   /auth/refresh           Refresh access token
GET    /auth/me                Get current user profile
PATCH  /auth/kyb               Submit KYB documents
```

### Listings
```
GET    /listings               Search + filter catalog
POST   /listings               Create listing (draft)
GET    /listings/:id           Listing detail + bids
POST   /listings/:id/publish   Publish draft to marketplace
POST   /listings/:id/bids      Place a bid
POST   /listings/:id/buy-now   Instant purchase
GET    /listings/:id/similar   Similar listings (vector search)
```

### Orders
```
GET    /orders                 My orders (buyer or supplier)
GET    /orders/:id             Order detail + shipment
PATCH  /orders/:id/confirm     Confirm delivery (releases escrow)
```

### AI Service
```
POST   /ai/classify            Classify waste images → job ID
GET    /ai/classify/:jobId     Poll classification result
GET    /ai/forecast/:supplierId  8-week supply forecast
POST   /ai/match/:listingId    Top buyer matches for a listing
```

Full API documentation → [`docs/API.md`](./docs/API.md)

---

## 🤖 AI Classification Pipeline

```
Supplier uploads photos
        │
        ▼
Cloudflare R2 (storage)
        │
        ▼
BullMQ job triggered
        │
        ▼
┌───────────────────────────┐
│   Pre-processing          │
│   Pillow + OpenCV         │
│   Resize → normalize      │
└───────────┬───────────────┘
            │
     ┌──────┴──────┐
     ▼             ▼
EfficientNet-B4   CLIP ViT-B/32
(fine-tuned)      (zero-shot)
     │             │
     └──────┬──────┘
            ▼
     Ensemble (70/30)
            │
            ▼
┌────────────────────────────┐
│  Output:                   │
│  • material_type (0.94)    │
│  • color_class   (0.89)    │
│  • grade         (0.87)    │
│  • weight_kg (estimated)   │
│  • recyclability_score     │
│  • suggested_use_cases     │
└────────────────────────────┘
            │
            ▼
  Stored in PostgreSQL
  + 512-dim embedding → pgvector
```

Model weights, training scripts, and evaluation notebooks live in `apps/ai-service/`.

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. Fork & Clone

```bash
git fork https://github.com/your-username/reweave.git
git clone https://github.com/YOUR-FORK/reweave.git
```

### 2. Create a Branch

```bash
# Feature
git checkout -b feat/listing-search-filters

# Bug fix
git checkout -b fix/bid-websocket-reconnect

# AI/ML
git checkout -b ml/improve-classification-accuracy
```

### 3. Make Your Changes

- Follow the [TypeScript style guide](./.eslintrc.json)
- Write tests for new features (Vitest for TS, Pytest for Python)
- Keep PRs focused — one feature/fix per PR

### 4. Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add auto-bid ceiling feature
fix: resolve websocket disconnect on mobile
docs: update API endpoint documentation
test: add bid engine unit tests
chore: upgrade drizzle-orm to latest
ml: improve EfficientNet fine-tuning pipeline
```

### 5. Open a Pull Request

- Fill in the PR template completely
- Link any related issues (`Closes #42`)
- Request a review from a maintainer

### Development Workflow

```
main          ← production-ready, protected
  └── dev     ← integration branch
        └── feat/your-feature   ← your work
```

All PRs target `dev`. `dev` → `main` on release tags.

---

## 🗺 Roadmap

### ✅ MVP (Month 1–3)
Core marketplace: list → classify → bid → pay → pickup

### 🔜 Phase 2 — Growth (Month 4–6)
- [ ] Supply forecasting dashboard (8-week ahead)
- [ ] Price analytics & material trend charts
- [ ] Subscription tiers (Basic / Pro / Enterprise)
- [ ] 3PL partner API integration
- [ ] WhatsApp bot for listing management
- [ ] Mobile PWA (installable, offline-ready)

### 🔜 Phase 3 — Scale (Month 7–9)
- [ ] Quality certification & inspection module
- [ ] ERP integration API (for enterprise factories)
- [ ] Buyer recommendation engine (ML-powered)
- [ ] Flutter mobile app (iOS + Android)
- [ ] Advanced ESG reporting module

### 🔜 Phase 4 — Global (Month 10–12)
- [ ] Bangladesh market module
- [ ] Multi-currency support
- [ ] Bengali language support
- [ ] Export compliance & customs documentation
- [ ] EU market entry (GPSR compliance)
---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built with ❤️ in Pakistan 🇵🇰

**[reweave.ai](https://reweave.ai)** · [Twitter](https://twitter.com/reweaveai) · [LinkedIn](https://linkedin.com/company/reweaveai)

<br/>

*Pakistan generates 1.5M+ tons of textile waste yearly. Let's fix that.*

</div>
