import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskLabel } from "@/data/sifFunds";
import { useFunds } from "@/hooks/useFunds";

const FundCarousel = () => {
  const { data: funds } = useFunds();
  const displayFunds = funds?.filter((f) => f.status === "Launched" || f.status === "NFO") || [];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">Live Funds</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-foreground">
              Four strategies. Pick yours.
            </h2>
          </div>
          <Link
            to="/funds"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground/20 pb-1 transition-all"
          >
            View all &rarr;
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto pb-8 scrollbar-hide">
        <div className="flex gap-5 px-[max(1rem,calc((100vw-1200px)/2+2rem))]">
          {displayFunds.map((fund, i) => (
            <motion.div
              key={fund.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="shrink-0 w-[340px] md:w-[380px]"
            >
              <Link
                to={`/funds/${fund.id}`}
                className="group block bg-[#0a0a0a] p-8 h-full border border-white/[0.04] hover:border-gold/20 transition-all relative overflow-hidden"
              >
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/[0.04] to-transparent" />

                <div className="relative">
                  {/* AMC + Category */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white/30 text-[11px] tracking-[0.15em] uppercase">{fund.amcName}</span>
                    {fund.status === "NFO" && (
                      <span className="text-[10px] font-semibold text-[#0a0a0a] bg-gold px-2 py-0.5">NFO</span>
                    )}
                  </div>

                  {/* Fund name */}
                  <h3 className="font-editorial text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                    {fund.sifBrand}
                  </h3>
                  <p className="text-white/25 text-sm mb-8">{fund.strategyType} &middot; {fund.category}</p>

                  {/* Allocation bar — razor thin */}
                  <div className="flex h-[3px] mb-8">
                    <div className="bg-gold" style={{ width: `${fund.allocation.equity}%` }} />
                    <div className="bg-white/20" style={{ width: `${fund.allocation.debt}%` }} />
                    <div className="bg-white/10" style={{ width: `${fund.allocation.derivatives}%` }} />
                  </div>

                  {/* Metrics row */}
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Risk</p>
                      <p className="text-sm font-medium text-white">{getRiskLabel(fund.riskBand)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Min</p>
                      <p className="text-sm font-medium text-white">{fund.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Exit</p>
                      <p className="text-sm font-medium text-white/70 truncate max-w-[100px]">{fund.exitLoad.split(',')[0]}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundCarousel;
