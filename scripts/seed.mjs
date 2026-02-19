import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "YOUR_SUPABASE_URL";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "YOUR_SERVICE_ROLE_KEY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// --- AMC Data ---
const amcs = [
  { name: "SBI Mutual Fund", sif_brand: "Magnum SIF", status: "active" },
  { name: "Quant Mutual Fund", sif_brand: "qSIF", status: "active" },
  { name: "Edelweiss Mutual Fund", sif_brand: "Altiva SIF", status: "active" },
  { name: "Tata Mutual Fund", sif_brand: "Titanium SIF", status: "active" },
  { name: "Bandhan Mutual Fund", sif_brand: "Arudha SIF", status: "active" },
  { name: "ICICI Prudential Mutual Fund", sif_brand: "iSIF", status: "active" },
  { name: "ITI Mutual Fund", sif_brand: "Diviniti SIF", status: "approved" },
  { name: "360 ONE Mutual Fund", sif_brand: "Dyna SIF", status: "approved" },
  { name: "DSP Mutual Fund", sif_brand: "DSP SIF", status: "approved" },
  { name: "HDFC Mutual Fund", sif_brand: "HDFC SIF", status: "approved" },
  { name: "Kotak Mutual Fund", sif_brand: "Kotak SIF", status: "approved" },
  { name: "Mirae Asset Mutual Fund", sif_brand: "Platinum SIF", status: "approved" },
  { name: "Union Mutual Fund", sif_brand: "Union SIF", status: "approved" },
];

async function seed() {
  // Clear existing data first (safe for initial seed)
  console.log("Clearing existing data...");
  await supabase.from("sif_funds").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("amcs").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Seeding AMCs...");
  const { data: amcData, error: amcError } = await supabase
    .from("amcs")
    .insert(amcs)
    .select();

  if (amcError) {
    console.error("AMC seed failed:", amcError.message);
    return;
  }
  console.log(`Inserted ${amcData.length} AMCs`);

  // Build AMC ID lookup
  const amcMap = {};
  for (const amc of amcData) {
    amcMap[amc.name] = amc.id;
  }

  // --- Fund Data ---
  const funds = [
    {
      amc_id: amcMap["SBI Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Quant Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Quant Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Quant Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Edelweiss Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Tata Mutual Fund"],
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
    },
    {
      amc_id: amcMap["Bandhan Mutual Fund"],
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
    },
    {
      amc_id: amcMap["ICICI Prudential Mutual Fund"],
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
    },
    {
      amc_id: amcMap["ICICI Prudential Mutual Fund"],
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
    },
    {
      amc_id: amcMap["ITI Mutual Fund"],
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
    },
  ];

  console.log("Seeding funds...");
  const { data: fundData, error: fundError } = await supabase
    .from("sif_funds")
    .insert(funds)
    .select();

  if (fundError) {
    console.error("Fund seed failed:", fundError.message);
    return;
  }
  console.log(`Inserted ${fundData.length} funds`);
  console.log("Seed complete!");
}

seed().catch(console.error);
