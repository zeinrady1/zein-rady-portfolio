# Astro-Orbit

A personal aerospace engineering portfolio website with an animated starfield and a rocket that orbits an Earth model as you scroll. Built as a pnpm monorepo with a React frontend, Express API, and PostgreSQL backend.

**Live site:** [zeinrady.vercel.app](https://zeinrady.vercel.app)

## Features

- Animated starfield background with 220+ twinkling stars
- Rocket that traces an elliptical orbit around an Earth model, synchronized to scroll position (2 full orbits across the page)
- Sections: Hero, About / Skills, Projects, Contact
- Contact form via [EmailJS](https://www.emailjs.com/) — no backend required for email
- Fully responsive (mobile + desktop)
- Dark aerospace theme with Framer Motion animations

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| Email | EmailJS (client-side, no server needed) |
| API server | Express 5, Node.js 24 |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod (v4) |
| API codegen | Orval (OpenAPI → React hooks + Zod schemas) |
| Build | esbuild (API), Vite (frontend) |
| Package manager | pnpm workspaces |
| Deployment | Vercel |

## Project structure

```
astro-orbit/
├── artifacts/
│   ├── portfolio/       # React + Vite frontend
│   │   └── src/
│   │       ├── pages/Home.tsx    # Main portfolio page (all sections)
│   │       └── components/ui/   # shadcn/ui components
│   ├── api-server/      # Express 5 API
│   │   └── src/routes/
│   └── mockup-sandbox/  # Design prototyping scratch space
├── lib/
│   ├── api-spec/        # OpenAPI spec (source of truth for API contracts)
│   ├── api-client-react/# Generated React hooks (from Orval)
│   ├── api-zod/         # Generated Zod schemas (from Orval)
│   └── db/              # Drizzle ORM schema + config
├── scripts/             # Workspace utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── vercel.json
```

## Setup

### Prerequisites

- Node.js 24+
- pnpm (`npm install -g pnpm`)
- PostgreSQL (local or hosted, e.g. [Neon](https://neon.tech))

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/astro-orbit.git
cd astro-orbit
pnpm install
```

### 2. Configure environment

```bash
cp artifacts/portfolio/.env.example artifacts/portfolio/.env
```

Fill in the EmailJS values (see below) and your PostgreSQL connection string.

### 3. Set up EmailJS (for contact form)

1. Sign up at [emailjs.com](https://www.emailjs.com/) — free tier is 200 emails/month
2. Create a service, an email template, and copy your public key
3. Add to `artifacts/portfolio/.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Set up the database

```bash
# Set your Postgres connection string
export DATABASE_URL=postgresql://user:password@host:5432/dbname

# Push the Drizzle schema
pnpm --filter @workspace/db run push
```

### 5. Run locally

```bash
# Frontend (port 5173)
pnpm --filter @workspace/portfolio run dev

# API server (port 5000)
pnpm --filter @workspace/api-server run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 6. Regenerate API types (after changing the OpenAPI spec)

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Personalizing

To make it your own:

- **Content** — edit `artifacts/portfolio/src/pages/Home.tsx`: update the hero text, about section, skills list, and projects array
- **Contact links** — update the LinkedIn, GitHub, and email links in the same file
- **Theme / colors** — edit `artifacts/portfolio/src/index.css` (Tailwind CSS variables)
- **EmailJS template** — customize the template in your EmailJS dashboard to match your preferred email format

## Deployment

The repo is configured for Vercel. Connect your GitHub repo in the Vercel dashboard and set the build settings:

- **Framework preset:** Vite
- **Root directory:** `artifacts/portfolio`
- **Build command:** `pnpm run build`
- **Output directory:** `dist`
- **Environment variables:** add your `VITE_EMAILJS_*` keys in the Vercel project settings
