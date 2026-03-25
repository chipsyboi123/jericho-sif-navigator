import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { sifFunds as fallbackFunds, type SIFFund } from "@/data/sifFunds";

// Map API row to the SIFFund interface used by components
function mapDbFund(row: any): SIFFund {
  const categoryMap: Record<string, "Equity" | "Hybrid" | "Debt"> = {
    equity_long_short: "Equity",
    equity_ex_top_100: "Equity",
    sector_rotation: "Equity",
    hybrid_long_short: "Hybrid",
    multi_asset: "Hybrid",
    active_asset_allocator: "Hybrid",
    debt_long_short: "Debt",
    sectoral_debt: "Debt",
  };

  const statusMap: Record<string, "Launched" | "NFO" | "Coming Soon"> = {
    launched: "Launched",
    nfo_open: "NFO",
    coming_soon: "Coming Soon",
    closed: "Coming Soon",
  };

  const allocation = row.indicative_allocation || { equity: 50, debt: 35, derivatives: 15 };

  return {
    dbId: row.id,
    id: row.slug,
    amcName: row.amc_name || "",
    sifBrand: row.name,
    strategyType: row.category
      ? row.category.split("_").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "TBD",
    category: categoryMap[row.category] || "Hybrid",
    nav: row.current_nav ? `Rs ${row.current_nav}` : "Placeholder",
    navDate: row.nav_date
      ? new Date(row.nav_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "Placeholder",
    riskBand: (row.risk_band || 3) as 1 | 2 | 3 | 4 | 5,
    benchmark: row.benchmark || "TBD",
    fundManagers: Array.isArray(row.fund_managers) ? row.fund_managers : ["TBD"],
    minInvestment: `\u20B9${(row.min_investment || 1000000).toLocaleString("en-IN")}`,
    exitLoad: row.exit_load || "TBD",
    launchDate: row.launch_date
      ? new Date(row.launch_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
      : "TBD",
    status: statusMap[row.status] || "Coming Soon",
    objective: row.objective || "Strategy details awaited.",
    redemptionTerms: row.redemption_terms || "TBD",
    allocation: {
      equity: allocation.equity || 0,
      debt: allocation.debt || 0,
      derivatives: allocation.derivatives || 0,
    },
    // Computed returns from API
    returns: row.returns ? {
      threeMonth: row.returns.threeMonth || undefined,
      sixMonth: row.returns.sixMonth || undefined,
      oneYear: row.returns.oneYear || undefined,
      sinceInception: row.returns.sinceInception || undefined,
    } : undefined,
    inceptionDate: row.inception_date
      ? new Date(row.inception_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : undefined,
    // Enriched fields
    tagline: row.tagline || undefined,
    investmentApproach: row.investment_approach || undefined,
    subscriptionFrequency: row.subscription_frequency || undefined,
    plansAndOptions: row.plans_and_options || undefined,
    minSipAmount: row.min_sip_amount || undefined,
    sipOptions: row.sip_options || undefined,
    features: row.features || undefined,
    exchangeListing: row.exchange_listing || undefined,
    noticePeriod: row.notice_period || undefined,
    taxation: row.taxation || undefined,
    whyInvest: Array.isArray(row.why_invest) ? row.why_invest : undefined,
    derivativeStrategies: Array.isArray(row.derivative_strategies) ? row.derivative_strategies : undefined,
    alphaStrategies: Array.isArray(row.alpha_strategies) ? row.alpha_strategies : undefined,
    riskManagement: row.risk_management || undefined,
    fundManagerDetails: Array.isArray(row.fund_manager_details) ? row.fund_manager_details : undefined,
    benchmarkRiskBand: row.benchmark_risk_band || undefined,
    websiteUrl: row.website_url || undefined,
    backTestedPerformance: row.back_tested_performance || undefined,
    researchTeamSize: row.research_team_size || undefined,
    aumInfo: row.aum_info || undefined,
    portfolioStrategyDetail: row.portfolio_strategy_detail || undefined,
  };
}

async function fetchFunds(): Promise<SIFFund[]> {
  try {
    const data = await apiFetch<any[]>("/api/funds");
    if (!data || data.length === 0) {
      console.warn("No funds from API, falling back to hardcoded data");
      return fallbackFunds;
    }
    return data.map(mapDbFund);
  } catch (err: any) {
    console.warn("Falling back to hardcoded fund data:", err.message);
    return fallbackFunds;
  }
}

export function useFunds() {
  return useQuery({
    queryKey: ["sif-funds"],
    queryFn: fetchFunds,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: fallbackFunds,
  });
}

export function useLaunchedFunds() {
  const query = useFunds();
  return {
    ...query,
    data: query.data?.filter((f) => f.status === "Launched") || [],
  };
}

export function useComingSoonFunds() {
  const query = useFunds();
  return {
    ...query,
    data: query.data?.filter((f) => f.status === "Coming Soon") || [],
  };
}

export function useFundBySlug(slug: string | undefined) {
  const query = useFunds();
  return {
    ...query,
    data: query.data?.find((f) => f.id === slug),
  };
}
