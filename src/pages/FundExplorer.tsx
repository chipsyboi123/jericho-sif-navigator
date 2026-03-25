import { useState } from "react";
import { Link } from "react-router-dom";
import { getRiskColor, getSebiRiskLabel } from "@/data/sifFunds";
import { useFunds } from "@/hooks/useFunds";
import SEOHead from "@/components/SEOHead";

const FundExplorer = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: allFunds, isLoading } = useFunds();
  const categories = ["All", "Equity", "Hybrid", "Debt"];

  const launched = allFunds?.filter((f) => f.status === "Launched" || f.status === "NFO") || [];
  const filtered = filter === "All" ? launched : launched.filter((f) => f.category === filter);

  return (
    <div className="pt-24 pb-16 bg-mesh-warm min-h-screen">
      <SEOHead
        title="SIF Fund Explorer — Browse All Specialized Investment Funds"
        description="Explore all SEBI-registered Specialized Investment Funds. Filter by category, compare strategies, and find the right SIF for your portfolio."
      />
      <div className="container mx-auto px-4">
        <div className="animate-fadeIn">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">Browse</p>
          <h1 className="font-editorial text-3xl md:text-5xl text-jericho mb-3">
            Fund Explorer
          </h1>
          <p className="text-muted-foreground text-base mb-10">All launched SIF schemes across AMCs.</p>
        </div>

        {/* Filters — Apple-style pill toggles */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                filter === cat
                  ? "bg-jericho text-gold shadow-apple"
                  : "bg-white text-muted-foreground hover:text-foreground shadow-apple hover:shadow-apple-lg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fund cards */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading funds...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No funds in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((fund, i) => {
              const riskLabel = fund.sebiRiskLabel || getSebiRiskLabel(fund.riskBand);
              return (
                <Link to={`/funds/${fund.id}`} key={fund.id}>
                  <div
                    className="bg-white rounded-2xl shadow-apple card-hover p-7 h-full animate-fadeIn"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {/* Header: AMC + Risk badge */}
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-semibold text-gold uppercase tracking-[0.15em]">{fund.amcName}</p>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full bg-secondary ${getRiskColor(fund.riskBand)}`}>
                        {riskLabel}
                      </span>
                    </div>

                    {/* Fund name */}
                    <h3 className="font-editorial text-xl text-jericho mb-2 leading-tight">{fund.sifBrand}</h3>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{fund.objective}</p>

                    {/* Strategy pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-gold/[0.06] text-gold">
                        {fund.strategyType}
                      </span>
                      <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                        {fund.category}
                      </span>
                      {fund.planType && (
                        <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-jericho/[0.04] text-jericho/60">
                          {fund.planType}
                        </span>
                      )}
                    </div>

                    {/* Key metrics grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-secondary/50 rounded-xl px-4 py-3">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">NAV</p>
                        <p className="text-sm font-semibold text-jericho font-mono-data">
                          {fund.nav !== "Placeholder" ? fund.nav : "—"}
                        </p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl px-4 py-3">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">Min Investment</p>
                        <p className="text-sm font-semibold text-jericho">{fund.minInvestment}</p>
                      </div>
                      {fund.expenseRatio && (
                        <div className="bg-secondary/50 rounded-xl px-4 py-3">
                          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">Expense Ratio</p>
                          <p className="text-sm font-semibold text-jericho">{fund.expenseRatio}</p>
                        </div>
                      )}
                      <div className="bg-secondary/50 rounded-xl px-4 py-3">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">Launch</p>
                        <p className="text-sm font-semibold text-jericho">{fund.launchDate}</p>
                      </div>
                    </div>

                    {/* Fund Managers */}
                    <div className="mb-4">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Fund Managers</p>
                      <p className="text-xs text-foreground/70 line-clamp-1">{fund.fundManagers.join(", ")}</p>
                    </div>

                    {/* Allocation bar */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex h-[4px] rounded-full overflow-hidden mb-2">
                        <div className="bg-gradient-gold" style={{ width: `${fund.allocation.equity}%` }} />
                        <div className="bg-jericho/20" style={{ width: `${fund.allocation.debt}%` }} />
                        <div className="bg-jericho/10" style={{ width: `${fund.allocation.derivatives}%` }} />
                      </div>
                      <div className="flex gap-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-gold" /> Equity {fund.allocation.equity}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-jericho/20" /> Debt {fund.allocation.debt}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-jericho/10" /> Deriv {fund.allocation.derivatives}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundExplorer;
