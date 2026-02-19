import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { sifFunds as fallbackFunds, type SIFFund } from "@/data/sifFunds";

// Map Supabase DB row to the SIFFund interface used by components
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
    amcName: row.amcs?.name || "",
    sifBrand: row.name,
    strategyType: row.category
      ? row.category.split("_").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "TBD",
    category: categoryMap[row.category] || "Hybrid",
    nav: row.current_nav ? `Rs ${row.current_nav}` : "Placeholder",
    navDate: row.nav_date || "Placeholder",
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
  };
}

async function fetchFunds(): Promise<SIFFund[]> {
  const { data, error } = await supabase
    .from("sif_funds")
    .select("*, amcs(name)")
    .order("name");

  if (error || !data || data.length === 0) {
    console.warn("Falling back to hardcoded fund data:", error?.message);
    return fallbackFunds;
  }

  return data.map(mapDbFund);
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
