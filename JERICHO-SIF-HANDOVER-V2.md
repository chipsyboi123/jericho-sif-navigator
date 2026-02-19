# JERICHO SIF NAVIGATOR — CLAUDE CODE HANDOVER

## READ THIS FIRST

This is the single source of truth for continuing development. The project was built in Lovable (React + Vite + Tailwind + TypeScript + shadcn/ui) and is now being migrated to Claude Code for backend integration, content fixes, missing features, and data accuracy corrections.

**GitHub Repo**: https://github.com/chipsyboi123/jericho-sif-navigator.git
**Live Preview**: https://jericho-sif-navigator.lovable.app/
**Tech**: React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + React Router + TanStack Query

**IMPORTANT CONTEXT**: Jericho IS the AMFI-registered SIF distributor. This website is purely for investors. There is no "become a distributor" flow, no distributor onboarding, no NISM prep resources. Every CTA on the site should drive investors toward Jericho's advisory team.

---

## PROJECT CONTEXT

### What This Is
An investor-facing platform for Specialized Investment Funds (SIFs), India's newest SEBI-regulated asset class launched April 2025. It sits between mutual funds (min Rs 500) and PMS (min Rs 50 lakh), with Rs 10 lakh minimum. Branded under "Jericho SIF", the SIF distribution arm of Jericho Ventures (a wealth management firm).

### Who It's For
- HNI investors (Rs 10L+ investable surplus) exploring SIF for the first time
- Existing Jericho Ventures clients considering SIF allocation
- Partners/prospects evaluating Jericho's SIF advisory capabilities

### What It Needs to Do
1. Educate investors on what SIFs are (most still don't know)
2. Let users explore, compare, and track all launched SIF funds
3. Position Jericho as the go-to SIF advisor (not just an aggregator)
4. Capture qualified investor leads
5. Serve as a living resource investors bookmark and return to

### Business Context
- Jericho Ventures is a wealth management firm (founder's brother)
- Jericho is registered as an AMFI SIF distributor
- The SIF market is nascent: ~13 AMCs approved, ~10 funds launched, most investors unaware
- No dominant SIF platform yet (SIF360.com is closest but is a generic aggregator with no advisory opinion)
- First-mover advantage on content and SEO is real and time-sensitive

---

## CODEBASE GAP ANALYSIS (What Exists vs What's Needed)

### What Lovable Built Well
- **Home page**: Complete with 7 sections (Hero, Fund Carousel, Comparison Table, Education Tabs, Why Jericho, Knowledge Preview, CTA Strip). Well-structured component composition.
- **Design system**: HSL CSS variables, gold/navy theme, Playfair Display + Inter fonts, gradient utilities. Dark theme supported.
- **Fund data structure**: Typed `SIFFund` interface in `src/data/sifFunds.ts` with 12 funds (8 launched + 4 coming soon).
- **Core pages**: 7 pages routed (Home, SIF 101, Fund Explorer, SIF Tracker, Compare, Knowledge Hub, Contact).
- **Fund Explorer**: Filterable by category with card-based layout showing allocation bars.
- **SIF Tracker**: Split into Launched (table) and Coming Soon (cards).
- **SIF Compare**: Interactive fund selector (2-3 funds) with comparison table.
- **Contact**: Dual-mode form (Investor/Distributor toggle) with relevant fields.
- **Animations**: Framer Motion fade-in on scroll throughout.
- **Mobile**: Hamburger nav with AnimatePresence.

### CRITICAL DATA ERRORS TO FIX

The hardcoded fund data in `src/data/sifFunds.ts` has significant inaccuracies:

| Fund | Field | Current (Wrong) | Correct |
|------|-------|-----------------|---------|
| SBI Magnum | riskBand | 4 | 1 |
| SBI Magnum | fundManagers | R. Srinivasan, Dinesh Balachandran | Gaurav Mehta |
| SBI Magnum | benchmark | Missing "TRI" suffix | NIFTY 50 Hybrid Composite Debt 50:50 Index TRI |
| SBI Magnum | exitLoad | 1% within 1 year | 0.50% within 15 days, 0.25% within 1 month, Nil after |
| SBI Magnum | redemptionTerms | T+3 settlement | Monday & Wednesday (twice a week) |
| Quant qSIF | riskBand | 5 | 3 |
| Quant qSIF | benchmark | NIFTY 500 | NIFTY 50 TRI |
| Quant qSIF | fundManagers | Missing 3 managers | Sandeep Tandon, Lokesh Garg, Ankit Pande, Sameer Kate, Sanjeev Sharma |
| Quant qSIF | redemptionTerms | T+3 | Every Tuesday and Wednesday |
| Edelweiss Altiva | benchmark | CRISIL Hybrid 35+65 | NIFTY 50 Hybrid Composite Debt 50:50 Index |
| Edelweiss Altiva | fundManagers | Trideep Bhattacharya | Bhavesh Jain, Bharat Lahoti, Dhawal Dalal, Pranavi Kulkarni, Amit Vora |
| Edelweiss Altiva | riskBand | 3 | 1 |
| Edelweiss Altiva | exitLoad | 0.5% within 1 year | 0.50% within 90 days, Nil after |
| Tata Titanium | fundManagers | Rahul Singh | TBD (not publicly confirmed) |
| ITI entry (id: iti-arudha) | WRONG AMC | Listed as ITI | Should be Bandhan MF (Arudha is Bandhan's brand) |
| ITI entry | sifBrand | Arudha SIF | Arudha is Bandhan's. ITI's brand is Diviniti. |
| Bandhan entry (id: bandhan-isif) | sifBrand | iSIF | iSIF is ICICI Prudential's brand. Bandhan = Arudha. |
| ICICI entry (id: icici-diviniti) | sifBrand | Diviniti SIF | Diviniti is ITI's brand. ICICI = iSIF. |
| All funds | navDate | "Feb 18, 2025" | Should say "Placeholder" (live data coming in Phase 2) |

**The AMC-to-brand mapping is scrambled for ITI, Bandhan, and ICICI. Urgent fix.**

Correct mapping:
- SBI MF -> Magnum SIF
- Quant MF -> qSIF (3 strategies: Equity LS, Hybrid LS, Equity Ex-100 LS)
- Edelweiss MF -> Altiva SIF
- Tata MF -> Titanium SIF
- Bandhan MF -> Arudha SIF
- ICICI Prudential MF -> iSIF (2 strategies: Hybrid LS, Equity Ex-100 LS)
- ITI MF -> Diviniti SIF (coming soon)
- 360 One MF -> Dyna SIF (approved, not launched)
- DSP, HDFC, Kotak, Mirae Asset (Platinum), Union -> approved, not launched
- Axis, Franklin Templeton -> applied

Current file has 8 "launched" + 4 "coming soon" = 12. Real count: 9 launched schemes + 1 coming soon (ITI Diviniti) + 7 approved AMCs awaiting launch. Fix accordingly.

### MISSING PAGES & FEATURES

| Feature | Status | Priority |
|---------|--------|----------|
| `/why-jericho` page | **MISSING** (WhyJericho exists only as a home section) | HIGH |
| `/funds/:slug` (Individual fund detail pages) | **MISSING** (Fund Explorer has cards but no detail pages) | MEDIUM |
| `/knowledge/:slug` (Individual blog post pages) | **MISSING** (all articles say "Coming soon") | LOW (Phase 2) |
| Risk Profiling Questionnaire | **MISSING** (SIF 101 has a teaser CTA linking to `/contact`) | HIGH |
| SIF 101 Module 7 (Risk Profiler) | **MISSING** (only 6 modules exist) | HIGH |

### THINGS TO REMOVE/CHANGE

| Item | Current State | Fix |
|------|--------------|-----|
| Contact form distributor toggle | Has "I'm a Distributor" button and ARN field | Remove distributor toggle entirely. This form is for investors only. |
| Footer "Jericho is an AMFI-registered distributor" | Mentioned in footer legal text | Keep but reframe as confidence signal: "Jericho Ventures is an AMFI-registered SIF distributor" (this tells investors they're dealing with a registered entity) |
| Any "For Distributors" nav links | None currently in nav (good) | Ensure none get added |
| Distributor registration form | None exists (good) | Don't build one |

### DESIGN ISSUES TO FIX

1. **`rounded-none` not enforced globally**: `rounded-md`, `rounded-lg`, `rounded-full` appear throughout. The CSS `--radius: 0.5rem` should be `0` or all components need `rounded-none`.

2. **Font: Inter instead of DM Sans**: Body font is Inter. Spec called for DM Sans. Not a blocker, but decide: keep Inter or switch.

3. **Hero image dependency**: `src/assets/hero-sif.jpg` (334KB). Verify it loads. If generic stock photo, consider a CSS gradient/pattern.

4. **No dark mode default**: CSS has both light and dark themes but no toggle or default. Site should default to dark (navy) since that's the Jericho aesthetic. Ensure `<html class="dark">` is set in `index.html`.

5. **Allocation bar uses rounded-full**: In `FundExplorer.tsx`. Should be `rounded-none`.

---

## PHASE 1: IMMEDIATE FIXES (No Backend Needed)

### 1.1 Fix Fund Data (`src/data/sifFunds.ts`)

Replace the entire file with corrected data:
- 9 launched funds (SBI x1, Quant x3, Edelweiss x1, Tata x1, Bandhan x1, ICICI x2)
- 1 coming soon (ITI Diviniti)
- 7+ approved AMCs not yet launched
- All correct AMC-to-brand mappings, fund managers, benchmarks, risk bands, exit loads, redemption terms
- NAV shown as placeholder with note

### 1.2 Fix Contact Form

In `Contact.tsx`:
- Remove the Investor/Distributor toggle entirely
- Remove the ARN Number field
- Keep: Name, Email, Phone, Investable Amount, Investment Horizon, Message
- Add a simple dropdown: "How did you hear about SIF?" (options: Advisor recommendation, Online research, Social media, Friend/family, Other)
- Rename submit button from "Submit Inquiry" to "Schedule a Consultation" or "Get Started"

### 1.3 Add Missing Routes

In `App.tsx`, add:
```typescript
import WhyJerichoPage from "./pages/WhyJerichoPage";
import FundDetail from "./pages/FundDetail";

// Inside Routes:
<Route path="/why-jericho" element={<WhyJerichoPage />} />
<Route path="/funds/:slug" element={<FundDetail />} />
```

### 1.4 Build Missing Pages

**Why Jericho full page** (`src/pages/WhyJerichoPage.tsx`):
- Expand the existing WhyJericho home component into a full page
- Section 1: Hero with positioning statement ("Not an aggregator. Your SIF advisor.")
- Section 2: The 3 pillars from home (Research-Led Conviction, Advisor-First Approach, Full Transparency) but expanded with more detail
- Section 3: "Our Process" - Assess (understand your goals, risk appetite, existing portfolio) -> Recommend (shortlist SIF strategies that fit) -> Execute (handle paperwork, allocation) -> Monitor (ongoing review, rebalancing guidance)
- Section 4: "Is SIF Right for You?" quick checklist
  - Consider SIF if: investable surplus above Rs 10L, can stay invested 3+ years, want advanced strategies in a regulated wrapper, comfortable with moderate liquidity
  - SIF may not be right if: need daily liquidity, investable surplus under Rs 10L, very conservative risk appetite, unfamiliar with equity markets
- Section 5: CTA to contact/schedule consultation

**Fund Detail page** (`src/pages/FundDetail.tsx`):
- Read fund slug from URL params
- Look up fund from sifFunds data
- Show: name, AMC, benchmark, objective, fund managers, risk band visualization, asset allocation breakdown, subscription/redemption terms, exit load, min investment
- Performance section placeholder: "Performance data will be available after sufficient trading history. Check back soon or contact us for the latest figures."
- CTAs: "Express Interest" (link to contact with fund name pre-filled), "Compare This Fund" (link to compare page)

### 1.5 Build Risk Profiling Questionnaire

Add as Module 7 in `src/pages/SIF101.tsx`:

```typescript
{
  id: 7,
  title: "Is SIF Right for You?",
  content: [],
  isQuestionnaire: true,
}
```

Build a `RiskProfiler` component with 5 questions:

Q1: Total investable surplus beyond emergency fund
- Under Rs 10 lakh -> 0 pts
- Rs 10-25 lakh -> 1 pt
- Rs 25-50 lakh -> 2 pts
- Rs 50L - 1 Cr -> 3 pts
- Above Rs 1 Cr -> 4 pts

Q2: How long can you stay invested?
- Less than 1 year -> 0
- 1-3 years -> 1
- 3-5 years -> 2
- 5+ years -> 3

Q3: Reaction to 15% quarterly drop?
- Sell immediately -> 0
- Anxious but hold -> 1
- Stay calm -> 2
- Invest more -> 3

Q4: Understanding of derivatives?
- Never heard of them -> 0
- Basic awareness -> 1
- Good understanding -> 2
- Actively trade derivatives -> 3

Q5: Current portfolio composition?
- Mostly FDs/savings -> 0
- Mutual funds only -> 1
- MFs + direct stocks -> 2
- MFs + PMS/AIF -> 3

Scoring:
- 0-4: "SIF may not be suitable right now. Consider building a diversified mutual fund portfolio first, and talk to us when you're ready to explore further."
- 5-9: "SIF could complement your portfolio. A hybrid long-short fund would be a good starting point for lower volatility. Let's discuss which one fits best."
- 10-13: "SIF aligns well with your profile. You could explore both equity and hybrid strategies depending on your market view. Schedule a call to discuss allocation."
- 14-16: "You're well-positioned for SIF. Consider allocating across multiple strategy types for diversification. Let's build a plan."

Every result should include a CTA: "Talk to our team" linking to `/contact`.

### 1.6 Fix rounded-none Globally

In `tailwind.config.ts`, change:
```typescript
borderRadius: {
  lg: "0",
  md: "0",
  sm: "0",
},
```

Or set `--radius: 0` in CSS. Test that all buttons, cards, inputs, badges lose rounded corners.

### 1.7 Update Navigation

In `Navbar.tsx`, add Why Jericho link:
```typescript
{ label: "Why Jericho", path: "/why-jericho" },
```

In `Footer.tsx`, add to Resources:
```typescript
{ label: "Why Jericho", path: "/why-jericho" },
```

Remove any distributor-related links if they exist anywhere.

### 1.8 Content Cleanup (All Pages)

Go through every page and:
- Remove any em dashes (replace with commas or periods)
- Remove fluff: "cutting-edge", "revolutionary", "seamlessly", "holistic"
- Verify all financial claims match SEBI circulars
- Change navDate from "Feb 18, 2025" to "Placeholder" across all funds
- Remove any references to "become a distributor" or distributor onboarding
- Ensure all CTAs point to investor actions (learn, explore, compare, contact Jericho)

---

## PHASE 2: SUPABASE BACKEND

### 2.1 Create Supabase Project
- Project name: jericho-sif
- Region: ap-south-1 (Mumbai)

### 2.2 Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2.3 Create Supabase Client
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2.4 Database Schema

```sql
-- AMCs
CREATE TABLE amcs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sif_brand TEXT,
  status TEXT CHECK (status IN ('active','approved','applied','upcoming')) DEFAULT 'upcoming',
  logo_url TEXT,
  website_url TEXT,
  sebi_approval_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SIF Funds
CREATE TABLE sif_funds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amc_id UUID REFERENCES amcs(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT CHECK (category IN (
    'equity_long_short','equity_ex_top_100','sector_rotation',
    'debt_long_short','sectoral_debt',
    'hybrid_long_short','multi_asset','active_asset_allocator'
  )),
  fund_type TEXT CHECK (fund_type IN ('open_ended','close_ended','interval')),
  benchmark TEXT,
  objective TEXT,
  fund_managers JSONB DEFAULT '[]',
  subscription_terms TEXT,
  redemption_terms TEXT,
  exit_load TEXT,
  risk_band INTEGER CHECK (risk_band BETWEEN 1 AND 5),
  min_investment INTEGER DEFAULT 1000000,
  indicative_allocation JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('nfo_open','launched','coming_soon','closed')) DEFAULT 'coming_soon',
  nfo_open_date DATE,
  nfo_close_date DATE,
  launch_date DATE,
  isid_url TEXT,
  current_nav DECIMAL(10,4),
  nav_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NAV History
CREATE TABLE nav_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id UUID REFERENCES sif_funds(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  nav DECIMAL(10,4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, date)
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT CHECK (category IN ('updates','strategy','tax','education')),
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'Jericho SIF Team',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  investment_range TEXT,
  investment_horizon TEXT,
  source TEXT,
  message TEXT,
  source_page TEXT,
  risk_profile_result JSONB,
  status TEXT CHECK (status IN ('new','contacted','qualified','converted','closed')) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sif_funds_slug ON sif_funds(slug);
CREATE INDEX idx_sif_funds_category ON sif_funds(category);
CREATE INDEX idx_sif_funds_status ON sif_funds(status);
CREATE INDEX idx_nav_history_fund_date ON nav_history(fund_id, date DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_leads_status ON leads(status);

-- RLS
ALTER TABLE amcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sif_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read AMCs" ON amcs FOR SELECT USING (true);
CREATE POLICY "Public read funds" ON sif_funds FOR SELECT USING (true);
CREATE POLICY "Public read NAV" ON nav_history FOR SELECT USING (true);
CREATE POLICY "Public read published blogs" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Anyone submit leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_amcs BEFORE UPDATE ON amcs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_funds BEFORE UPDATE ON sif_funds FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_blogs BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 2.5 Connect Contact Form to Supabase

Replace `onSubmit={(e) => e.preventDefault()}` in Contact.tsx:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { error } = await supabase.from('leads').insert({
    name: `${firstName} ${lastName}`,
    email, phone,
    investment_range: investableAmount,
    investment_horizon: horizon,
    source: howHeard,
    message,
    source_page: '/contact'
  });
  if (!error) setSubmitted(true);
};
```

### 2.6 Migrate Fund Data to Supabase

Seed `amcs` and `sif_funds` tables with corrected data. Replace hardcoded imports in components with Supabase queries using TanStack Query (already installed).

### 2.7 NAV Data Pipeline

Free source: https://api.mfapi.in/mf/{scheme_code} (returns full NAV history as JSON).

Steps:
1. Find scheme codes for each SIF on AMFI's scheme list
2. Build Supabase Edge Function or cron job for daily fetch
3. Upsert into nav_history
4. Update current_nav on sif_funds

---

## PHASE 3: VERCEL DEPLOYMENT

1. Connect GitHub repo to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
5. Custom domain when ready

---

## PRIORITY EXECUTION ORDER

```
PHASE 1 (Frontend, no backend):
 1. Read entire codebase
 2. Fix fund data in src/data/sifFunds.ts (CRITICAL)
 3. Fix Contact form: remove distributor toggle, simplify to investor-only
 4. Fix rounded-none globally (tailwind config)
 5. Add missing routes (why-jericho, fund detail)
 6. Build Why Jericho full page
 7. Build Fund Detail page template
 8. Build Risk Profiler questionnaire in SIF 101 (Module 7)
 9. Update navbar and footer links
10. Content cleanup pass (em dashes, fluff, accuracy, remove distributor references)
11. Verify dark mode defaults correctly
12. Verify mobile responsiveness

PHASE 2 (Backend):
13. Create Supabase project, run SQL migrations
14. Install @supabase/supabase-js, create client
15. Connect Contact form to leads table
16. Migrate fund data to Supabase, replace hardcoded queries
17. Seed blog posts
18. Deploy to Vercel

PHASE 3 (Enhancement):
19. NAV data pipeline
20. Performance charts (Recharts on NAV history)
21. SEO: meta tags, sitemap, structured data
22. Blog article pages with markdown rendering
```

---

## REGULATORY QUICK REFERENCE

- SIF introduced: SEBI circular Feb 27, 2025. Effective April 1, 2025.
- Min investment: Rs 10 lakh per PAN per AMC
- Accredited investors: Exempt from minimum
- Max unhedged short: 25% of net assets via derivatives
- Total gross exposure: max 100% of NAV
- Risk bands: 1 (Low) to 5 (High), reviewed monthly
- Redemption notice: up to 15 working days
- Fund types: Open-ended, Close-ended, Interval
- SIF requires separate branding from parent MF
- Tax (equity SIF): STCG 20% (<12m), LTCG 12.5% (>12m, above Rs 1.25L exempt)
- Tax (debt SIF): Slab rate regardless of holding period
