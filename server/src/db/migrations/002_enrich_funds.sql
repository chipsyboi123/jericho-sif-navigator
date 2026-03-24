-- Phase 2: Enrich sif_funds with detailed presentation data

ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS investment_approach TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS subscription_frequency TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS plans_and_options TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS min_sip_amount TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS sip_options JSONB DEFAULT '{}';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS features TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS exchange_listing TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS notice_period TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS taxation JSONB DEFAULT '{}';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS why_invest JSONB DEFAULT '[]';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS derivative_strategies JSONB DEFAULT '[]';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS alpha_strategies JSONB DEFAULT '[]';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS risk_management TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS fund_manager_details JSONB DEFAULT '[]';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS benchmark_risk_band INTEGER;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS allotment_date DATE;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS back_tested_performance JSONB DEFAULT '{}';
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS research_team_size TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS aum_info TEXT;
ALTER TABLE sif_funds ADD COLUMN IF NOT EXISTS portfolio_strategy_detail JSONB DEFAULT '{}';
