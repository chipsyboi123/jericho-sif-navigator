import { Link } from "react-router-dom";
import { getSebiRiskLabel, getRiskColor } from "@/data/sifFunds";
import { useFunds } from "@/hooks/useFunds";

const FundCarousel = () => {
  const { data: funds } = useFunds();
  const displayFunds = funds?.filter((f) => f.status === "Launched" || f.status === "NFO") || [];

  return (
    <section className="py-24 bg-mesh-warm">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">Live Funds</p>
            <h2 className="font-editorial text-3xl md:text-5xl text-jericho">
              Explore the strategies.
            </h2>
          </div>
          <Link
            to="/funds"
            className="hidden md:block text-sm text-jericho/50 hover:text-gold transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-5 px-[max(1rem,calc((100vw-1200px)/2+2rem))]">
          {displayFunds.map((fund, i) => {
            const riskLabel = fund.sebiRiskLabel || getSebiRiskLabel(fund.riskBand);
            return (
              <div
                key={fund.id}
                className="shrink-0 w-[340px] md:w-[400px] animate-fadeIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Link
                  to={`/funds/${fund.id}`}
                  className="group block bg-jericho p-7 h-full rounded-3xl shadow-apple-lg card-hover-dark relative overflow-hidden"
                >
                  {/* Corner gradient accent (Apple-style) */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[80px] bg-gradient-to-bl from-gold/[0.08] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-[60px] bg-gradient-to-tr from-jericho-accent/20 to-transparent" />

                  <div className="relative">
                    {/* Top row: AMC + badges */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-white/25 text-[10px] tracking-[0.15em] uppercase">{fund.amcName}</span>
                      <div className="flex items-center gap-2">
                        {fund.planType && (
                          <span className="text-[9px] font-medium text-gold/60 border border-gold/15 px-2 py-0.5 rounded-lg">
                            {fund.planType}
                          </span>
                        )}
                        {fund.status === "NFO" && (
                          <span className="text-[9px] font-bold text-jericho bg-gradient-gold px-2.5 py-0.5 rounded-lg">NFO</span>
                        )}
                      </div>
                    </div>

                    {/* Fund name + strategy */}
                    <h3 className="font-editorial text-[22px] text-white mb-1 group-hover:text-gold transition-colors duration-300 leading-tight">
                      {fund.sifBrand}
                    </h3>
                    <p className="text-white/20 text-xs mb-6">{fund.strategyType} &middot; {fund.category}</p>

                    {/* NAV + Inception */}
                    <div className="flex items-baseline justify-between mb-6 pb-5 border-b border-white/[0.06]">
                      <div>
                        <p className="text-[9px] text-white/20 uppercase tracking-wider mb-1">Current NAV</p>
                        <p className="font-mono-data text-lg text-gold">
                          {fund.nav !== "Placeholder" ? fund.nav : "—"}
                        </p>
                        {fund.navDate && fund.navDate !== "Placeholder" && (
                          <p className="text-[9px] text-white/15 mt-0.5">as of {fund.navDate}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-white/20 uppercase tracking-wider mb-1">Since</p>
                        <p className="text-sm text-white/60">{fund.inceptionDate || fund.launchDate}</p>
                      </div>
                    </div>

                    {/* Returns row */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[
                        { label: "3M", val: fund.returns?.threeMonth },
                        { label: "6M", val: fund.returns?.sixMonth },
                        { label: "1Y", val: fund.returns?.oneYear },
                        { label: "SI", val: fund.returns?.sinceInception },
                      ].map((r, j) => (
                        <div key={j} className="glass-dark rounded-xl px-2 py-2 text-center">
                          <p className="text-[8px] text-white/20 uppercase tracking-wider mb-0.5">{r.label}</p>
                          <p className={`font-mono-data text-sm ${
                            r.val && !r.val.startsWith("-") ? "text-emerald-400" :
                            r.val && r.val.startsWith("-") ? "text-red-400" : "text-white/25"
                          }`}>
                            {r.val || "—"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Allocation bar — rounded */}
                    <div className="flex h-[4px] rounded-full overflow-hidden mb-5">
                      <div className="bg-gradient-gold rounded-l-full" style={{ width: `${fund.allocation.equity}%` }} />
                      <div className="bg-white/20" style={{ width: `${fund.allocation.debt}%` }} />
                      <div className="bg-white/10 rounded-r-full" style={{ width: `${fund.allocation.derivatives}%` }} />
                    </div>

                    {/* Bottom metrics */}
                    <div className="flex gap-5 text-xs">
                      <div>
                        <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">Risk</p>
                        <p className={`text-xs font-medium ${getRiskColor(fund.riskBand)}`}>{riskLabel}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">Min</p>
                        <p className="text-white/70">{fund.minInvestment}</p>
                      </div>
                      {fund.expenseRatio && (
                        <div>
                          <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">Expense</p>
                          <p className="text-white/70">{fund.expenseRatio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FundCarousel;
