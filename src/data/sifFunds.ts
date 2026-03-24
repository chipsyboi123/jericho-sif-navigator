// Static SIF fund data — corrected per JERICHO-SIF-HANDOVER-V2.md
export interface FundManagerDetail {
  name: string;
  designation: string;
  experience: string;
  bio: string;
}

export interface SIFFund {
  dbId?: string;
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
  // Enriched fields from presentations
  tagline?: string;
  investmentApproach?: string;
  subscriptionFrequency?: string;
  plansAndOptions?: string;
  minSipAmount?: string;
  sipOptions?: Record<string, string>;
  features?: string;
  exchangeListing?: string;
  noticePeriod?: string;
  taxation?: { stcg: string; ltcg: string };
  whyInvest?: string[];
  derivativeStrategies?: string[];
  alphaStrategies?: string[];
  riskManagement?: string;
  fundManagerDetails?: FundManagerDetail[];
  benchmarkRiskBand?: number;
  websiteUrl?: string;
  backTestedPerformance?: any;
  researchTeamSize?: string;
  aumInfo?: string;
  portfolioStrategyDetail?: any;
}

export const sifFunds: SIFFund[] = [
  {
    id: "sbi-magnum",
    amcName: "SBI Mutual Fund",
    sifBrand: "Magnum Hybrid Long-Short Fund",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "Placeholder",
    navDate: "Placeholder",
    riskBand: 1,
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50 Index TRI",
    fundManagers: ["Gaurav Mehta"],
    minInvestment: "\u20B910,00,000",
    exitLoad: "0.50% up to 15 days, 0.25% 16 days to 1 month, NIL after",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Generate regular income through derivatives strategies and long-term capital appreciation through unhedged equity exposure.",
    redemptionTerms: "Twice a week (Monday and Thursday)",
    allocation: { equity: 55, debt: 30, derivatives: 15 },
  },
  {
    id: "quant-qsif-equity",
    amcName: "Quant Mutual Fund",
    sifBrand: "qSIF Equity Long-Short Fund",
    strategyType: "Equity Long-Short",
    category: "Equity",
    nav: "Placeholder",
    navDate: "Placeholder",
    riskBand: 5,
    benchmark: "NIFTY 500 Total Return Index (TRI)",
    fundManagers: ["Sandeep Tandon", "Lokesh Garg", "Ankit Pande", "Sameer Kate", "Sanjeev Sharma"],
    minInvestment: "\u20B910,00,000",
    exitLoad: "1% if redeemed within 15 days",
    launchDate: "Oct 2025",
    status: "Launched",
    objective: "Long-term capital appreciation via diversified equity portfolio with limited short exposure through derivatives.",
    redemptionTerms: "Every Tuesday and Wednesday",
    allocation: { equity: 75, debt: 5, derivatives: 20 },
  },
  {
    id: "edelweiss-altiva",
    amcName: "Edelweiss Mutual Fund",
    sifBrand: "Altiva Hybrid Long-Short Fund",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "Placeholder",
    navDate: "Placeholder",
    riskBand: 1,
    benchmark: "NIFTY 50 Hybrid Composite Debt 50:50 Index",
    fundManagers: ["Bhavesh Jain", "Bharat Lahoti", "Dhawal Dalal", "Pranavi Kulkarni", "Amit Vora"],
    minInvestment: "\u20B910,00,000",
    exitLoad: "0.50% within 90 days, NIL after",
    launchDate: "Apr 2025",
    status: "Launched",
    objective: "Capital appreciation through equity instruments and income through arbitrage, derivatives, special situations and fixed income.",
    redemptionTerms: "Twice a week (Monday and Wednesday)",
    allocation: { equity: 50, debt: 35, derivatives: 15 },
  },
  {
    id: "icici-isif-hybrid",
    amcName: "ICICI Prudential Mutual Fund",
    sifBrand: "iSIF Hybrid Long-Short Fund",
    strategyType: "Hybrid Long-Short",
    category: "Hybrid",
    nav: "Placeholder",
    navDate: "Placeholder",
    riskBand: 3,
    benchmark: "CRISIL Hybrid 50+50 Moderate Index",
    fundManagers: ["Rajat Chandak", "Ayush Shah", "Manish Banthia", "Akhil Kakkar"],
    minInvestment: "\u20B910,00,000",
    exitLoad: "1% within 12 months, NIL after",
    launchDate: "Jan 2026",
    status: "NFO",
    objective: "Predominantly invest in equity and debt securities with derivative strategies for capital appreciation and regular income.",
    redemptionTerms: "Twice a week (Monday and Wednesday)",
    allocation: { equity: 70, debt: 30, derivatives: 0 },
  },
];

export const getRiskColor = (band: number): string => {
  switch (band) {
    case 1: return "text-green-600";
    case 2: return "text-emerald-600";
    case 3: return "text-yellow-600";
    case 4: return "text-orange-600";
    case 5: return "text-red-600";
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
