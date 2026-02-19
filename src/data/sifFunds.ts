// Static SIF fund data for V0
export interface SIFFund {
  id: string;
  amcName: string;
  sifBrand: string;
  strategyType: string;
  category: "Equity" | "Hybrid" | "Debt";
  nav: string;
  navDate: string;
  riskBand: 1 | 2 | 3 | 4 | 5;
  benchmark: string;
  fundManagers: string[];
  minInvestment: string;
  exitLoad: string;
  launchDate: string;
  status: "Launched" | "NFO" | "Coming Soon";
  objective: string;
  redemptionTerms: string;
  allocation: { equity: number; debt: number; derivatives: number };
}

export const sifFunds: SIFFund[] = [
  {
    id: "sbi-magnum",
    amcName: "SBI Mutual Fund",
    sifBrand: "Magnum SIF",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "₹10.23",
    navDate: "Feb 18, 2025",
    riskBand: 4,
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50",
    fundManagers: ["R. Srinivasan", "Dinesh Balachandran"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 1 year",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Generate long-term capital appreciation using equity long-short and debt allocation strategies.",
    redemptionTerms: "T+3 settlement, subject to exit load",
    allocation: { equity: 55, debt: 30, derivatives: 15 },
  },
  {
    id: "quant-qsif",
    amcName: "Quant Mutual Fund",
    sifBrand: "qSIF",
    strategyType: "Equity Long-Short",
    category: "Equity",
    nav: "₹10.87",
    navDate: "Feb 18, 2025",
    riskBand: 5,
    benchmark: "NIFTY 500",
    fundManagers: ["Sandeep Tandon", "Ankit Pande"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 6 months",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Aggressive alpha generation through long-short equity positioning across market caps.",
    redemptionTerms: "T+3 settlement",
    allocation: { equity: 75, debt: 5, derivatives: 20 },
  },
  {
    id: "edelweiss-altiva",
    amcName: "Edelweiss Mutual Fund",
    sifBrand: "Altiva SIF",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "₹10.15",
    navDate: "Feb 18, 2025",
    riskBand: 3,
    benchmark: "CRISIL Hybrid 35+65 Aggressive",
    fundManagers: ["Trideep Bhattacharya"],
    minInvestment: "₹10,00,000",
    exitLoad: "0.5% if redeemed within 1 year",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Balanced growth through dynamic equity-debt allocation with selective hedging.",
    redemptionTerms: "T+3 settlement, subject to exit load",
    allocation: { equity: 50, debt: 35, derivatives: 15 },
  },
  {
    id: "tata-titanium",
    amcName: "Tata Mutual Fund",
    sifBrand: "Titanium SIF",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "₹10.05",
    navDate: "Feb 18, 2025",
    riskBand: 3,
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50",
    fundManagers: ["Rahul Singh"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 1 year",
    launchDate: "May 2025",
    status: "Launched",
    objective: "Stable wealth creation through tactical allocation between equity, debt, and hedged positions.",
    redemptionTerms: "T+3 settlement",
    allocation: { equity: 50, debt: 35, derivatives: 15 },
  },
  {
    id: "iti-arudha",
    amcName: "ITI Mutual Fund",
    sifBrand: "Arudha SIF",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "₹9.98",
    navDate: "Feb 18, 2025",
    riskBand: 4,
    benchmark: "NIFTY 50",
    fundManagers: ["George Joseph"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 1 year",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Long-term capital appreciation through concentrated equity bets with downside hedging.",
    redemptionTerms: "T+4 settlement",
    allocation: { equity: 60, debt: 20, derivatives: 20 },
  },
  {
    id: "bandhan-isif",
    amcName: "Bandhan Mutual Fund",
    sifBrand: "iSIF",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "₹10.11",
    navDate: "Feb 18, 2025",
    riskBand: 3,
    benchmark: "CRISIL Hybrid 35+65 Aggressive",
    fundManagers: ["Manish Gunwani"],
    minInvestment: "₹10,00,000",
    exitLoad: "0.5% if redeemed within 6 months",
    launchDate: "May 2025",
    status: "Launched",
    objective: "Intelligent allocation across equity and debt with selective derivative hedging.",
    redemptionTerms: "T+3 settlement",
    allocation: { equity: 55, debt: 30, derivatives: 15 },
  },
  {
    id: "icici-diviniti",
    amcName: "ICICI Prudential",
    sifBrand: "Diviniti SIF",
    strategyType: "Equity Long-Short",
    category: "Equity",
    nav: "₹10.42",
    navDate: "Feb 18, 2025",
    riskBand: 5,
    benchmark: "NIFTY 500",
    fundManagers: ["S. Naren", "Mittul Kalawadia"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 1 year",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Superior risk-adjusted returns through active long-short equity strategies.",
    redemptionTerms: "T+3 settlement",
    allocation: { equity: 70, debt: 10, derivatives: 20 },
  },
  {
    id: "quant-qsif-ex100",
    amcName: "Quant Mutual Fund",
    sifBrand: "qSIF Ex-Top 100",
    strategyType: "Equity Long-Short Ex-Top 100",
    category: "Equity",
    nav: "₹10.65",
    navDate: "Feb 18, 2025",
    riskBand: 5,
    benchmark: "NIFTY Midcap 150",
    fundManagers: ["Sandeep Tandon"],
    minInvestment: "₹10,00,000",
    exitLoad: "1% if redeemed within 6 months",
    launchDate: "May 2025",
    status: "Launched",
    objective: "Alpha generation in mid and small cap space with selective short hedging.",
    redemptionTerms: "T+3 settlement",
    allocation: { equity: 80, debt: 0, derivatives: 20 },
  },
  // Coming Soon
  {
    id: "360one-dyna",
    amcName: "360 ONE",
    sifBrand: "Dyna SIF",
    strategyType: "Equity Long-Short",
    category: "Equity",
    nav: "—",
    navDate: "",
    riskBand: 4,
    benchmark: "TBD",
    fundManagers: ["TBD"],
    minInvestment: "₹10,00,000",
    exitLoad: "TBD",
    launchDate: "TBD",
    status: "Coming Soon",
    objective: "Dynamic equity allocation with long-short exposure.",
    redemptionTerms: "TBD",
    allocation: { equity: 70, debt: 15, derivatives: 15 },
  },
  {
    id: "dsp-sif",
    amcName: "DSP Mutual Fund",
    sifBrand: "DSP SIF",
    strategyType: "TBD",
    category: "Hybrid",
    nav: "—",
    navDate: "",
    riskBand: 3,
    benchmark: "TBD",
    fundManagers: ["TBD"],
    minInvestment: "₹10,00,000",
    exitLoad: "TBD",
    launchDate: "TBD",
    status: "Coming Soon",
    objective: "Strategy details awaited.",
    redemptionTerms: "TBD",
    allocation: { equity: 50, debt: 35, derivatives: 15 },
  },
  {
    id: "hdfc-sif",
    amcName: "HDFC Mutual Fund",
    sifBrand: "HDFC SIF",
    strategyType: "TBD",
    category: "Hybrid",
    nav: "—",
    navDate: "",
    riskBand: 3,
    benchmark: "TBD",
    fundManagers: ["TBD"],
    minInvestment: "₹10,00,000",
    exitLoad: "TBD",
    launchDate: "TBD",
    status: "Coming Soon",
    objective: "Strategy details awaited.",
    redemptionTerms: "TBD",
    allocation: { equity: 50, debt: 35, derivatives: 15 },
  },
  {
    id: "mirae-platinum",
    amcName: "Mirae Asset",
    sifBrand: "Platinum SIF",
    strategyType: "TBD",
    category: "Equity",
    nav: "—",
    navDate: "",
    riskBand: 4,
    benchmark: "TBD",
    fundManagers: ["TBD"],
    minInvestment: "₹10,00,000",
    exitLoad: "TBD",
    launchDate: "TBD",
    status: "Coming Soon",
    objective: "Strategy details awaited.",
    redemptionTerms: "TBD",
    allocation: { equity: 65, debt: 20, derivatives: 15 },
  },
];

export const getRiskColor = (band: number): string => {
  switch (band) {
    case 1: return "text-green-400";
    case 2: return "text-emerald-400";
    case 3: return "text-yellow-400";
    case 4: return "text-orange-400";
    case 5: return "text-red-400";
    default: return "text-muted-foreground";
  }
};

export const getRiskLabel = (band: number): string => {
  switch (band) {
    case 1: return "Very Low";
    case 2: return "Low";
    case 3: return "Moderate";
    case 4: return "High";
    case 5: return "Very High";
    default: return "Unknown";
  }
};
