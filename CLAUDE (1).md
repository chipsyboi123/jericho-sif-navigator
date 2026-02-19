# CLAUDE.md — Jericho SIF Navigator

## Project Overview
Investor-facing platform for SEBI Specialized Investment Funds (SIF). Built by Jericho Ventures, an AMFI-registered SIF distributor. This site exists to educate investors, help them explore SIF funds, and capture leads for Jericho's advisory team. React + Vite + TypeScript + Tailwind + shadcn/ui + Framer Motion. No backend yet (Supabase planned).

**Jericho IS the distributor.** This is not a platform for MFDs or other distributors. Every CTA should drive investors toward Jericho's advisory team.

## Key Rules — NEVER Break These
- **NEVER use rounded corners.** Set `rounded-none` everywhere. Sharp corners = Jericho identity. The tailwind config `--radius` should be `0`.
- **NEVER use em dashes** in any content. Replace with commas, periods, or rewording.
- **NEVER use Inter as body font.** Headlines: Playfair Display. Body: DM Sans (migrate from Inter). Data: monospace where appropriate.
- **All financial data must be accurate.** When in doubt, leave a placeholder with a comment rather than guess.
- **Gold accent (#c48a48 / HSL 38 70% 50%)** is the primary interactive color. Buttons, links, highlights.
- **Every page must have the SEBI disclaimer** in the footer: "All SIF investments are subject to market risks. Read all scheme-related documents carefully before investing."
- **Content tone:** Authoritative but accessible. A wealth advisor talking to a smart client over coffee. Not a textbook. Not marketing fluff. No "cutting-edge", "revolutionary", "seamlessly", "holistic", "unlock the power of".

## Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS with HSL CSS variables (shadcn/ui pattern)
- shadcn/ui components in `src/components/ui/`
- Framer Motion for animations
- React Router DOM for routing
- TanStack Query (installed, not yet used for data fetching)
- Supabase for backend (Phase 2)
- Recharts for charts (available via shadcn chart component)

## File Structure
```
src/
  assets/        — Static images (hero-sif.jpg)
  components/
    home/        — Home page section components (7 sections)
    ui/          — shadcn/ui primitives (do not edit directly)
    Navbar.tsx   — Fixed top nav with mobile menu
    Footer.tsx   — Site footer with links and SEBI disclaimer
    Layout.tsx   — Wraps all routes (Navbar + Outlet + Footer)
  data/
    sifFunds.ts  — Hardcoded fund data (NEEDS CORRECTION — see handover doc)
  lib/
    utils.ts     — cn() helper for Tailwind class merging
  pages/         — One file per route
```

## Routes
```
/              — Home
/sif-101       — SIF 101 (learning modules + risk profiler)
/funds         — Fund Explorer (card grid with filters)
/tracker       — SIF Tracker (launched table + coming soon cards)
/compare       — Fund Comparison (2-3 funds side by side)
/knowledge     — Knowledge Hub (article listings)
/contact       — Contact / Lead capture form (investor inquiries)
/why-jericho   — Why Jericho (NEEDS BUILDING)
/funds/:slug   — Fund Detail (NEEDS BUILDING)
```

## Commands
```bash
npm run dev      — Start dev server (Vite)
npm run build    — Production build
npm run preview  — Preview production build
```

## Design Tokens (from src/index.css)
- Primary (gold): HSL 38 70% 50%
- Background (dark): HSL 215 25% 11%
- Card: HSL 215 25% 15%
- Foreground (cream): HSL 40 20% 92%
- Muted: HSL 215 18% 18%
- Uses CSS custom properties (HSL values without hsl() wrapper, composed at usage with `hsl(var(--token))`)

## Current State
- 7 pages built, 2 missing (why-jericho full page, fund detail pages)
- Fund data has significant errors (wrong AMC-brand mappings, wrong risk bands, wrong fund managers)
- No backend, all data hardcoded
- Contact form doesn't submit anywhere yet
- Risk profiler questionnaire not built (only a teaser CTA)
- Blog articles are placeholders ("Coming soon")

## Handover Document
Read `JERICHO-SIF-HANDOVER-V2.md` in repo root for the complete gap analysis, corrected fund data, database schema, and priority execution order.
