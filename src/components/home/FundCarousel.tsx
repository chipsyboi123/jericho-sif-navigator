import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useFunds } from "@/hooks/useFunds";

const FundCarousel = () => {
  const { data: funds } = useFunds();
  const displayFunds = funds?.filter((f) => f.status === "Launched" || f.status === "NFO") || [];

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Featured Funds
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore Specialized Investment Funds across India's top AMCs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayFunds.map((fund, i) => (
            <motion.div
              key={fund.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/funds/${fund.id}`}
                className="block bg-white border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/30 transition-all group h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">{fund.amcName}</span>
                  {fund.status === "NFO" && (
                    <span className="text-[10px] font-bold text-white bg-gradient-gold px-2 py-0.5 rounded-full">NFO</span>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {fund.sifBrand}
                </h3>

                <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full inline-block mb-4">
                  {fund.strategyType}
                </span>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-secondary ${getRiskColor(fund.riskBand)}`}>
                    {getRiskLabel(fund.riskBand)}
                  </span>
                  <span className="text-xs text-muted-foreground">&middot; {fund.category}</span>
                </div>

                {/* Mini allocation bar */}
                <div className="flex h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-gold" style={{ width: `${fund.allocation.equity}%` }} />
                  <div className="bg-blue-400" style={{ width: `${fund.allocation.debt}%` }} />
                  <div className="bg-orange-400" style={{ width: `${fund.allocation.derivatives}%` }} />
                </div>

                <div className="flex items-baseline justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">NAV</p>
                    <p className="text-base font-semibold font-mono-data text-foreground">{fund.nav}</p>
                  </div>
                  <span className="text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform">
                    View Details &rarr;
                  </span>
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
