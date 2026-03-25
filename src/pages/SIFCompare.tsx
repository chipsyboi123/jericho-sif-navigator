import { useState, useEffect } from "react";
import { useLaunchedFunds } from "@/hooks/useFunds";
import SEOHead from "@/components/SEOHead";

const SIFCompare = () => {
  const { data: launched, isLoading } = useLaunchedFunds();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (launched.length >= 2 && selected.length === 0) {
      setSelected([launched[0].id, launched[1].id]);
    }
  }, [launched]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 2) setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const selectedFunds = selected.map((id) => launched.find((f) => f.id === id)!).filter(Boolean);

  const fields: { label: string; key: string }[] = [
    { label: "AMC", key: "amcName" },
    { label: "Strategy", key: "strategyType" },
    { label: "Category", key: "category" },
    { label: "NAV", key: "nav" },
    { label: "Risk Band", key: "riskBand" },
    { label: "Benchmark", key: "benchmark" },
    { label: "Min Investment", key: "minInvestment" },
    { label: "Exit Load", key: "exitLoad" },
    { label: "Redemption", key: "redemptionTerms" },
    { label: "Fund Managers", key: "fundManagers" },
  ];

  return (
    <div className="py-20">
      <SEOHead title="Compare SIF Funds" description="Side-by-side comparison of SIF strategies. Compare risk bands, benchmarks, fund managers, and allocation across schemes." />
      <div className="container mx-auto px-4">
        <div className="animate-fadeIn">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Compare SIF Funds
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Select 2-3 funds for side-by-side comparison.</p>
        </div>

        {/* Fund selector */}
        <div className="flex flex-wrap gap-2 mb-10 animate-fadeIn-delay-2">
          {launched.map((fund) => (
            <button
              key={fund.id}
              onClick={() => toggle(fund.id)}
              className={`px-5 py-2.5 text-sm transition-all rounded-full ${
                selected.includes(fund.id)
                  ? "bg-gradient-to-r from-[#C9960C] to-[#E2B93B] text-white font-semibold shadow-md"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-gold/25 hover:bg-secondary"
              }`}
            >
              {fund.sifBrand}
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-white/70 backdrop-blur-sm shadow-card overflow-hidden animate-fadeIn-delay-3">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3.5 px-5 text-sm font-semibold text-muted-foreground min-w-[150px] font-heading">Field</th>
                {selectedFunds.map((fund) => (
                  <th key={fund.id} className="text-left py-3.5 px-5 text-sm font-semibold text-gold min-w-[200px] font-heading">
                    {fund.sifBrand}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <tr
                  key={field.key}
                  className="border-b border-border/50 hover:bg-secondary/40 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <td className="py-3.5 px-5 text-sm font-medium text-foreground font-heading">{field.label}</td>
                  {selectedFunds.map((fund) => {
                    const val = (fund as any)[field.key];
                    const display = Array.isArray(val) ? val.join(", ") : String(val);
                    return (
                      <td key={fund.id} className="py-3.5 px-5 text-sm text-muted-foreground">{display}</td>
                    );
                  })}
                </tr>
              ))}
              {/* Allocation row */}
              <tr className="border-b border-border/50 hover:bg-secondary/40 transition-colors">
                <td className="py-3.5 px-5 text-sm font-medium text-foreground font-heading">Allocation</td>
                {selectedFunds.map((fund) => (
                  <td key={fund.id} className="py-3.5 px-5 text-sm text-muted-foreground">
                    Eq {fund.allocation.equity}% | Debt {fund.allocation.debt}% | Der {fund.allocation.derivatives}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SIFCompare;
