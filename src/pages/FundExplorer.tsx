import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useLaunchedFunds } from "@/hooks/useFunds";

const FundExplorer = () => {
  const [filter, setFilter] = useState<string>("All");
  const { data: launched, isLoading } = useLaunchedFunds();
  const categories = ["All", "Equity", "Hybrid", "Debt"];

  const filtered = filter === "All" ? launched : launched.filter((f) => f.category === filter);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Fund <span className="text-gradient-gold">Explorer</span>
          </h1>
          <p className="text-muted-foreground mb-8">All launched SIF schemes across AMCs.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fund cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((fund, i) => (
            <Link to={`/funds/${fund.id}`} key={fund.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="bg-card border border-border p-6 hover:border-primary/30 transition-colors h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{fund.amcName}</p>
                    <h3 className="font-serif text-xl font-bold text-foreground mt-1">{fund.sifBrand}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 bg-secondary ${getRiskColor(fund.riskBand)}`}>
                    {getRiskLabel(fund.riskBand)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{fund.objective}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Strategy</span>
                    <span className="text-foreground font-medium">{fund.strategyType}</span>
                  </div>
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
                  <div className="flex h-2 overflow-hidden">
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
