import { pool } from "../config/db.js";
import "../config/env.js";

interface AmcSeed {
  name: string;
  sif_brand: string | null;
  status: string;
}

interface FundSeed {
  amcKey: string;
  name: string;
  slug: string;
  category: string;
  fund_type: string;
  benchmark: string;
  objective: string;
  fund_managers: string[];
  redemption_terms: string;
  exit_load: string;
  risk_band: number;
  min_investment: number;
  indicative_allocation: { equity: number; debt: number; derivatives: number };
  status: string;
  launch_date: string | null;
  amfi_sif_id: number | null;
}

const amcs: Record<string, AmcSeed> = {
  sbi: { name: "SBI Mutual Fund", sif_brand: "Magnum SIF", status: "active" },
  quant: { name: "Quant Mutual Fund", sif_brand: "qSIF", status: "active" },
  edelweiss: { name: "Edelweiss Mutual Fund", sif_brand: "Altiva SIF", status: "active" },
  tata: { name: "Tata Mutual Fund", sif_brand: "Titanium SIF", status: "active" },
  bandhan: { name: "Bandhan Mutual Fund", sif_brand: "Arudha SIF", status: "active" },
  icici: { name: "ICICI Prudential Mutual Fund", sif_brand: "iSIF", status: "active" },
  iti: { name: "ITI Mutual Fund", sif_brand: "Diviniti SIF", status: "approved" },
  "360one": { name: "360 ONE Mutual Fund", sif_brand: "Dyna SIF", status: "approved" },
  dsp: { name: "DSP Mutual Fund", sif_brand: "DSP SIF", status: "approved" },
  hdfc: { name: "HDFC Mutual Fund", sif_brand: "HDFC SIF", status: "approved" },
  kotak: { name: "Kotak Mutual Fund", sif_brand: "Kotak SIF", status: "approved" },
  mirae: { name: "Mirae Asset Mutual Fund", sif_brand: "Platinum SIF", status: "approved" },
  union: { name: "Union Mutual Fund", sif_brand: "Union SIF", status: "approved" },
};

const funds: FundSeed[] = [
  {
    amcKey: "sbi",
    name: "Magnum SIF",
    slug: "sbi-magnum",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50 Index TRI",
    objective: "Generate long-term capital appreciation using equity long-short and debt allocation strategies.",
    fund_managers: ["Gaurav Mehta"],
    redemption_terms: "Monday and Wednesday (twice a week)",
    exit_load: "0.50% within 15 days, 0.25% within 1 month, Nil after",
    risk_band: 1,
    min_investment: 1000000,
    indicative_allocation: { equity: 55, debt: 30, derivatives: 15 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: 22,
  },
  {
    amcKey: "quant",
    name: "qSIF Equity Long-Short",
    slug: "quant-qsif-equity",
    category: "equity_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 TRI",
    objective: "Alpha generation through long-short equity positioning across market caps.",
    fund_managers: ["Sandeep Tandon", "Lokesh Garg", "Ankit Pande", "Sameer Kate", "Sanjeev Sharma"],
    redemption_terms: "Every Tuesday and Wednesday",
    exit_load: "1% if redeemed within 6 months",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 75, debt: 5, derivatives: 20 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: 3,
  },
  {
    amcKey: "quant",
    name: "qSIF Hybrid Long-Short",
    slug: "quant-qsif-hybrid",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 TRI",
    objective: "Balanced growth through dynamic equity-debt allocation with selective long-short positioning.",
    fund_managers: ["Sandeep Tandon", "Lokesh Garg", "Ankit Pande", "Sameer Kate", "Sanjeev Sharma"],
    redemption_terms: "Every Tuesday and Wednesday",
    exit_load: "1% if redeemed within 6 months",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 30, derivatives: 20 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: 13,
  },
  {
    amcKey: "quant",
    name: "qSIF Equity Ex-100 Long-Short",
    slug: "quant-qsif-ex100",
    category: "equity_ex_top_100",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 TRI",
    objective: "Alpha generation in mid and small cap space outside the top 100, with selective short hedging.",
    fund_managers: ["Sandeep Tandon", "Lokesh Garg", "Ankit Pande", "Sameer Kate", "Sanjeev Sharma"],
    redemption_terms: "Every Tuesday and Wednesday",
    exit_load: "1% if redeemed within 6 months",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 80, debt: 0, derivatives: 20 },
    status: "launched",
    launch_date: "2025-05-01",
    amfi_sif_id: null,
  },
  {
    amcKey: "edelweiss",
    name: "Altiva SIF",
    slug: "edelweiss-altiva",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50 Index",
    objective: "Balanced growth through dynamic equity-debt allocation with selective hedging.",
    fund_managers: ["Bhavesh Jain", "Bharat Lahoti", "Dhawal Dalal", "Pranavi Kulkarni", "Amit Vora"],
    redemption_terms: "T+3 settlement, subject to exit load",
    exit_load: "0.50% within 90 days, Nil after",
    risk_band: 1,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: 47,
  },
  {
    amcKey: "tata",
    name: "Titanium SIF",
    slug: "tata-titanium",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50",
    objective: "Stable wealth creation through tactical allocation between equity, debt, and hedged positions.",
    fund_managers: ["TBD"],
    redemption_terms: "T+3 settlement",
    exit_load: "1% if redeemed within 1 year",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "launched",
    launch_date: "2025-05-01",
    amfi_sif_id: 25,
  },
  {
    amcKey: "bandhan",
    name: "Arudha SIF",
    slug: "bandhan-arudha",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "CRISIL Hybrid 35+65 Aggressive",
    objective: "Intelligent allocation across equity and debt with selective derivative hedging.",
    fund_managers: ["Manish Gunwani"],
    redemption_terms: "T+3 settlement",
    exit_load: "0.5% if redeemed within 6 months",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 55, debt: 30, derivatives: 15 },
    status: "launched",
    launch_date: "2025-05-01",
    amfi_sif_id: 48,
  },
  {
    amcKey: "icici",
    name: "iSIF Hybrid Long-Short",
    slug: "icici-isif-hybrid",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50 Index",
    objective: "Risk-adjusted returns through active hybrid long-short strategies.",
    fund_managers: ["S. Naren", "Mittul Kalawadia"],
    redemption_terms: "T+3 settlement",
    exit_load: "1% if redeemed within 1 year",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 55, debt: 25, derivatives: 20 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: 20,
  },
  {
    amcKey: "icici",
    name: "iSIF Equity Ex-100 Long-Short",
    slug: "icici-isif-ex100",
    category: "equity_ex_top_100",
    fund_type: "open_ended",
    benchmark: "NIFTY Midcap 150",
    objective: "Alpha generation in mid and small cap equities outside the top 100, with derivative hedging.",
    fund_managers: ["S. Naren", "Mittul Kalawadia"],
    redemption_terms: "T+3 settlement",
    exit_load: "1% if redeemed within 1 year",
    risk_band: 4,
    min_investment: 1000000,
    indicative_allocation: { equity: 70, debt: 10, derivatives: 20 },
    status: "launched",
    launch_date: "2025-04-01",
    amfi_sif_id: null,
  },
  // Coming Soon funds
  {
    amcKey: "iti",
    name: "Diviniti SIF",
    slug: "iti-diviniti",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Strategy details awaited. ITI MF's SIF offering under the Diviniti brand.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: 70,
  },
  {
    amcKey: "360one",
    name: "Dyna SIF",
    slug: "360one-dyna",
    category: "equity_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 70, debt: 15, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: 62,
  },
  {
    amcKey: "dsp",
    name: "DSP SIF",
    slug: "dsp-sif",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: null,
  },
  {
    amcKey: "hdfc",
    name: "HDFC SIF",
    slug: "hdfc-sif",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: null,
  },
  {
    amcKey: "kotak",
    name: "Kotak SIF",
    slug: "kotak-sif",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: null,
  },
  {
    amcKey: "mirae",
    name: "Platinum SIF",
    slug: "mirae-platinum",
    category: "equity_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 65, debt: 20, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: null,
  },
  {
    amcKey: "union",
    name: "Union SIF",
    slug: "union-sif",
    category: "hybrid_long_short",
    fund_type: "open_ended",
    benchmark: "TBD",
    objective: "Approved by SEBI. Strategy details awaited.",
    fund_managers: ["TBD"],
    redemption_terms: "TBD",
    exit_load: "TBD",
    risk_band: 3,
    min_investment: 1000000,
    indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
    status: "coming_soon",
    launch_date: null,
    amfi_sif_id: null,
  },
];

const blogPosts = [
  {
    title: "What Are Specialized Investment Funds (SIFs)?",
    slug: "what-are-sifs",
    category: "education",
    content: "Specialized Investment Funds (SIFs) are a new category of mutual fund schemes introduced by SEBI in 2025. They allow fund managers to use advanced strategies like long-short positioning, derivatives hedging, and tactical asset allocation — tools previously available only to hedge funds and PMS providers.\n\nSIFs bridge the gap between traditional mutual funds and alternative investments, offering sophisticated strategies with the regulatory oversight and transparency of mutual funds.\n\n## Key Features\n\n- **Minimum Investment**: Rs 10 lakh\n- **Strategies**: Long-short equity, hybrid allocation, sector rotation\n- **Regulation**: SEBI-regulated under mutual fund framework\n- **Transparency**: Regular NAV disclosure, portfolio reporting\n- **Liquidity**: Weekly or bi-weekly redemption windows",
    excerpt: "Understanding the new SEBI category that brings hedge fund strategies to mutual fund investors.",
    author: "Jericho SIF Team",
    published: true,
  },
  {
    title: "SIF vs PMS vs AIF: Which Is Right for You?",
    slug: "sif-vs-pms-vs-aif",
    category: "strategy",
    content: "With the introduction of SIFs, investors now have three distinct avenues for sophisticated investing. Here's how they compare.\n\n## Portfolio Management Services (PMS)\n- Minimum: Rs 50 lakh\n- Direct stock ownership\n- Customized portfolios\n- Higher fees (2-3% management + 20% profit share typical)\n\n## Alternative Investment Funds (AIF)\n- Minimum: Rs 1 crore\n- Private placement\n- Lock-in periods of 3+ years\n- Limited liquidity\n\n## Specialized Investment Funds (SIF)\n- Minimum: Rs 10 lakh\n- Mutual fund structure\n- SEBI oversight\n- Better liquidity (weekly/bi-weekly)\n- Lower cost structure\n\nFor most investors looking for sophisticated strategies without the high minimums and lock-ins of PMS and AIF, SIFs offer the best balance of access, transparency, and cost efficiency.",
    excerpt: "Comparing the three sophisticated investment vehicles available to Indian investors.",
    author: "Jericho SIF Team",
    published: true,
  },
  {
    title: "Understanding Long-Short Strategies in SIFs",
    slug: "long-short-strategies",
    category: "education",
    content: "Long-short strategies are the cornerstone of most SIF offerings. But what exactly does it mean to go long and short simultaneously?\n\n## Going Long\nBuying stocks expected to appreciate. This is traditional investing — buy low, sell high.\n\n## Going Short\nBorrowing and selling stocks expected to decline, then buying them back cheaper. Profits from falling prices.\n\n## The Combined Strategy\nBy holding both long and short positions, fund managers can:\n- Reduce market risk (beta-neutral positioning)\n- Generate alpha from both rising and falling stocks\n- Maintain returns in sideways or bearish markets\n- Hedge against sector or market-wide downturns\n\n## How SIFs Implement This\nSIF fund managers use equity derivatives (futures and options) to create short positions while holding physical stocks for long positions. SEBI regulations limit the gross exposure to ensure risk management.",
    excerpt: "A deep dive into how SIF fund managers generate returns using both long and short positions.",
    author: "Jericho SIF Team",
    published: true,
  },
];

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Clear existing data
    console.log("Clearing existing data...");
    await client.query("DELETE FROM nav_history");
    await client.query("DELETE FROM sif_funds");
    await client.query("DELETE FROM amcs");
    await client.query("DELETE FROM blog_posts");

    // Insert AMCs
    console.log("Inserting AMCs...");
    const amcIds: Record<string, string> = {};
    for (const [key, amc] of Object.entries(amcs)) {
      const result = await client.query(
        `INSERT INTO amcs (name, sif_brand, status)
         VALUES ($1, $2, $3) RETURNING id`,
        [amc.name, amc.sif_brand, amc.status]
      );
      amcIds[key] = result.rows[0].id;
    }
    console.log(`  -> ${Object.keys(amcIds).length} AMCs inserted`);

    // Insert Funds
    console.log("Inserting funds...");
    for (const fund of funds) {
      await client.query(
        `INSERT INTO sif_funds (
          amc_id, name, slug, category, fund_type, benchmark, objective,
          fund_managers, redemption_terms, exit_load, risk_band, min_investment,
          indicative_allocation, status, launch_date, amfi_sif_id
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
        [
          amcIds[fund.amcKey],
          fund.name,
          fund.slug,
          fund.category,
          fund.fund_type,
          fund.benchmark,
          fund.objective,
          JSON.stringify(fund.fund_managers),
          fund.redemption_terms,
          fund.exit_load,
          fund.risk_band,
          fund.min_investment,
          JSON.stringify(fund.indicative_allocation),
          fund.status,
          fund.launch_date,
          fund.amfi_sif_id,
        ]
      );
    }
    console.log(`  -> ${funds.length} funds inserted`);

    // Insert Blog Posts
    console.log("Inserting blog posts...");
    for (const post of blogPosts) {
      await client.query(
        `INSERT INTO blog_posts (title, slug, category, content, excerpt, author, published, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          post.title, post.slug, post.category, post.content,
          post.excerpt, post.author, post.published,
          post.published ? new Date().toISOString() : null,
        ]
      );
    }
    console.log(`  -> ${blogPosts.length} blog posts inserted`);

    await client.query("COMMIT");
    console.log("Seed complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
