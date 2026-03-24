import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useLaunchedFunds } from "@/hooks/useFunds";
import SEOHead from "@/components/SEOHead";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const FundExplorer = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: launched, isLoading } = useLaunchedFunds();
  const categories = ["All", "Equity", "Hybrid", "Debt"];

  const filtered = filter === "All" ? launched : launched.filter((f) => f.category === filter);

  return (
    <div className="py-20 bg-cream">
      <SEOHead
        title="SIF Fund Explorer"
        description="Explore all SEBI-registered Specialized Investment Funds. Filter by category, compare strategies, and find the right SIF for your portfolio."
      />
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3 text-foreground">
            Fund Explorer
          </h1>
          <p className="text-muted-foreground text-lg mb-8">All launched SIF schemes across AMCs.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                filter === cat
                  ? "bg-gradient-gold text-white shadow-gold-glow"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fund cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fund, i) => (
            <Link to={`/funds/${fund.id}`} key={fund.id}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                className="bg-white border border-border rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 p-6 transition-all duration-300 h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider">{fund.amcName}</p>
                    <h3 className="font-heading text-xl font-bold text-foreground mt-1">{fund.sifBrand}</h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-secondary ${getRiskColor(fund.riskBand)}`}>
                    {getRiskLabel(fund.riskBand)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{fund.objective}</p>

                {/* Strategy / Category pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gold/10 text-gold">
                    {fund.strategyType}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {fund.category}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NAV</span>
                    <span className="text-foreground font-medium">{fund.nav}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Investment</span>
                    <span className="text-foreground font-medium">{fund.minInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exit Load</span>
                    <span className="text-foreground font-medium">{fund.exitLoad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fund Managers</span>
                    <span className="text-foreground font-medium text-right">{fund.fundManagers.join(", ")}</span>
                  </div>
                </div>

                {/* Allocation bar */}
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Allocation</p>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-primary" style={{ width: `${fund.allocation.equity}%` }} />
                    <div className="bg-blue-500" style={{ width: `${fund.allocation.debt}%` }} />
                    <div className="bg-orange-500" style={{ width: `${fund.allocation.derivatives}%` }} />
                  </div>
                  <div className="flex gap-4 mt-1.5 text-xs text-muted-foreground">
                    <span>Equity {fund.allocation.equity}%</span>
                    <span>Debt {fund.allocation.debt}%</span>
                    <span>Derivatives {fund.allocation.derivatives}%</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundExplorer;
