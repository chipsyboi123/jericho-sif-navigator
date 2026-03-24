-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AMCs
CREATE TABLE IF NOT EXISTS amcs (
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
CREATE TABLE IF NOT EXISTS sif_funds (
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
  scheme_code INTEGER,
  amfi_sif_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NAV History
CREATE TABLE IF NOT EXISTS nav_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id UUID REFERENCES sif_funds(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  nav DECIMAL(10,4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, date)
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
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
CREATE TABLE IF NOT EXISTS leads (
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
CREATE INDEX IF NOT EXISTS idx_sif_funds_slug ON sif_funds(slug);
CREATE INDEX IF NOT EXISTS idx_sif_funds_category ON sif_funds(category);
CREATE INDEX IF NOT EXISTS idx_sif_funds_status ON sif_funds(status);
CREATE INDEX IF NOT EXISTS idx_sif_funds_scheme_code ON sif_funds(scheme_code);
CREATE INDEX IF NOT EXISTS idx_sif_funds_amfi_sif_id ON sif_funds(amfi_sif_id);
CREATE INDEX IF NOT EXISTS idx_nav_history_fund_date ON nav_history(fund_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_amcs ON amcs;
CREATE TRIGGER trg_amcs BEFORE UPDATE ON amcs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_funds ON sif_funds;
CREATE TRIGGER trg_funds BEFORE UPDATE ON sif_funds FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_blogs ON blog_posts;
CREATE TRIGGER trg_blogs BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
