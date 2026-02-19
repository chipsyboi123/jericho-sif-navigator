import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface NavDataPoint {
  date: string;
  nav: number;
  dateFormatted: string;
}

async function fetchNavHistory(fundId: string): Promise<NavDataPoint[]> {
  const { data, error } = await supabase
    .from("nav_history")
    .select("date, nav")
    .eq("fund_id", fundId)
    .order("date", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => ({
    date: row.date,
    nav: parseFloat(row.nav),
    dateFormatted: new Date(row.date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
  }));
}

export function useNavHistory(fundId: string | undefined) {
  return useQuery({
    queryKey: ["nav-history", fundId],
    queryFn: () => fetchNavHistory(fundId!),
    enabled: !!fundId,
    staleTime: 30 * 60 * 1000,
  });
}
