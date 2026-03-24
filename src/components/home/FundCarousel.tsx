import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskLabel } from "@/data/sifFunds";
import { useFunds } from "@/hooks/useFunds";

const FundCarousel = () => {
  const { data: funds } = useFunds();
  const displayFunds = funds?.filter((f) => f.status === "Launched" || f.status === "NFO") || [];

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[#C9960C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Live Now</p>
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">
              The funds. The strategies.
            </h2>
          </div>
          <Link
            to="/funds"
            className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayFunds.map((fund, i) => (
            <motion.div
              key={fund.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/funds/${fund.id}`}
                className="group block relative bg-[#0a0e1a] rounded-2xl p-7 overflow-hidden hover:ring-1 hover:ring-[#C9960C]/20 transition-all"
              >
                {/* Subtle gold gradient in corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9960C] opacity-[0.03] blur-[60px] rounded-full" />

                <div className="relative">
                  {/* Top row: AMC + badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/40 text-xs font-medium tracking-wider uppercase">{fund.amcName}</span>
                    <div className="flex gap-2">
                      {fund.status === "NFO" && (
                        <span className="text-[10px] font-bold text-[#0a0e1a] bg-[#C9960C] px-2.5 py-0.5 rounded-full">NFO</span>
                      )}
                      <span className="text-[10px] font-medium text-white/50 border border-white/10 px-2.5 py-0.5 rounded-full">
                        {fund.category}
                      </span>
                    </div>
                  </div>

                  {/* Fund name — big and bold */}
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#C9960C] transition-colors">
                    {fund.sifBrand}
                  </h3>

                  <p className="text-white/35 text-sm mb-6">{fund.strategyType}</p>

                  {/* Allocation bar */}
                  <div className="flex h-1.5 rounded-full overflow-hidden mb-6 bg-white/5">
                    <div className="bg-[#C9960C]" style={{ width: `${fund.allocation.equity}%` }} />
                    <div className="bg-blue-400/60" style={{ width: `${fund.allocation.debt}%` }} />
                    <div className="bg-orange-400/60" style={{ width: `${fund.allocation.derivatives}%` }} />
                  </div>

                  {/* Bottom row: metrics */}
                  <div className="flex items-end justify-between pt-5 border-t border-white/5">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">NAV</p>
                        <p className="text-sm font-semibold text-white font-mono-data">{fund.nav}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Risk</p>
                        <p className="text-sm font-semibold text-white">{getRiskLabel(fund.riskBand)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Min</p>
                        <p className="text-sm font-semibold text-white">{fund.minInvestment}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#C9960C] opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/funds" className="text-sm text-muted-foreground hover:text-foreground">
            View all funds &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FundCarousel;
