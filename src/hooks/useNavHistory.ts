import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface NavDataPoint {
  date: string;
  nav: number;
  dateFormatted: string;
}

async function fetchNavHistory(fundId: string): Promise<NavDataPoint[]> {
  try {
    const data = await apiFetch<any[]>(`/api/nav/${fundId}`);
    if (!data) return [];

    return data.map((row) => ({
      date: row.date,
      nav: parseFloat(row.nav),
      dateFormatted: new Date(row.date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
    }));
  } catch {
    return [];
  }
}

export function useNavHistory(fundId: string | undefined) {
  return useQuery({
    queryKey: ["nav-history", fundId],
    queryFn: () => fetchNavHistory(fundId!),
    enabled: !!fundId,
    staleTime: 30 * 60 * 1000,
  });
}
