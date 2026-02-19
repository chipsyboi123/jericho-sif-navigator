-- Seed blog_posts with placeholder articles
-- Run this in Supabase SQL Editor after migration

INSERT INTO blog_posts (title, slug, category, excerpt, content, published, published_at, author)
VALUES
  (
    'SIF 101: Everything You Need to Know About India''s Newest Asset Class',
    'sif-101-everything-you-need-to-know',
    'education',
    'A comprehensive guide to Specialized Investment Funds: what they are, who they are for, minimum investment, strategies, and how to get started.',
    '## What is a Specialized Investment Fund?

Specialized Investment Funds (SIFs) are a new SEBI-regulated investment vehicle that sits between mutual funds and PMS/AIFs. Launched in April 2025, SIFs allow AMCs to offer long-short strategies, derivatives-based hedging, and concentrated portfolios to investors with a minimum of Rs 10 lakh.

## Who Are SIFs For?

SIFs are designed for High Net-Worth Individuals (HNIs) and sophisticated investors who want access to advanced strategies without the Rs 50 lakh minimum of PMS or Rs 1 crore minimum of AIFs.

## Key Features

- **Minimum investment**: Rs 10 lakh
- **Regulation**: SEBI-regulated, managed by AMCs
- **Strategies**: Long-short equity, hybrid, sector rotation, debt strategies
- **Transparency**: NAV-based, daily/weekly disclosure
- **Liquidity**: Redemption windows vary by scheme

## How to Invest

1. Assess your risk profile and investment horizon
2. Compare available SIF strategies across AMCs
3. Work with an AMFI-registered distributor like Jericho
4. Complete KYC and invest through the AMC platform

Contact our team to get personalized guidance on SIF allocation.',
    true,
    NOW(),
    'Jericho SIF Team'
  ),
  (
    'SIF vs PMS: A Detailed Comparison for Indian HNIs',
    'sif-vs-pms-detailed-comparison',
    'strategy',
    'SIF and PMS both target high-net-worth investors, but differ significantly in structure, regulation, minimum investment, and strategy flexibility.',
    '## SIF vs PMS: Key Differences

Both SIFs and PMS target HNI investors seeking advanced strategies beyond traditional mutual funds. Here is how they compare.

## Minimum Investment

- **SIF**: Rs 10 lakh
- **PMS**: Rs 50 lakh

This is the most significant difference. SIFs bring sophisticated strategies to a wider investor base.

## Regulation and Structure

- **SIF**: SEBI-regulated, NAV-based, pooled structure (like mutual funds)
- **PMS**: SEBI-regulated, individual portfolio per client, direct stock ownership

## Strategy Flexibility

- **SIF**: Can deploy long-short, derivatives hedging, multi-asset allocation
- **PMS**: Primarily long-only equity with concentrated positions

## Transparency

- **SIF**: Regular NAV disclosure, scheme documents publicly available
- **PMS**: Monthly/quarterly reporting, portfolio-level transparency

## Which Should You Choose?

If you have Rs 10-50 lakh and want hedged strategies, SIF is the clear choice. If you have Rs 50 lakh+ and want direct stock ownership with a dedicated portfolio, PMS may suit better. Many investors allocate to both.

Speak with our advisory team to determine the right mix for your portfolio.',
    true,
    NOW(),
    'Jericho SIF Team'
  ),
  (
    'SIF Taxation Explained: Equity, Debt, and Hybrid Schemes',
    'sif-taxation-explained',
    'tax',
    'Understanding the tax treatment of SIF investments across equity, debt, and hybrid categories. STCG, LTCG, and slab-rate scenarios explained.',
    '## How Are SIFs Taxed?

SIF taxation follows the same rules as mutual funds, based on the equity-debt allocation of the scheme.

## Equity-Oriented SIFs (65%+ equity)

- **STCG** (held less than 1 year): 20%
- **LTCG** (held more than 1 year): 12.5% above Rs 1.25 lakh

## Debt-Oriented SIFs (less than 65% equity)

- Gains taxed at your income tax slab rate, regardless of holding period

## Hybrid SIFs

- If equity allocation is 65% or more: taxed as equity
- If equity allocation is below 65%: taxed as debt
- Check the scheme''s indicative allocation to determine which category applies

## Important Notes

- Exit loads may apply depending on the scheme and holding period
- Dividend income is taxed at your slab rate
- TDS provisions apply as per mutual fund rules

This is general guidance. Consult your tax advisor for advice specific to your situation.',
    true,
    NOW(),
    'Jericho SIF Team'
  );
