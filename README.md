# Jericho SIF Navigator

Investor-facing platform for Specialized Investment Funds (SIFs) by Jericho Ventures, an AMFI-registered SIF distributor.

**Live**: https://jericho-sif-navigator.vercel.app

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui + Framer Motion
- Supabase (PostgreSQL, Auth, RLS)
- TanStack Query (data fetching)
- Recharts (performance charts)
- Deployed on Vercel

## Local Development

```sh
git clone https://github.com/chipsyboi123/jericho-sif-navigator.git
cd jericho-sif-navigator
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

Deployed via Vercel with auto-deploy on push to `main`. Environment variables are set in the Vercel dashboard.

## Admin

NAV data upload is available at `/admin/login` for authenticated Supabase users.
