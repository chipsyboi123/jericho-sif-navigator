import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const vehicles = [
  {
    name: "Fixed Deposits",
    returnRange: "5–7%",
    risk: "Low",
    min: "₹1,000",
    taxation: "Slab rate",
    shortSelling: false,
    derivatives: "None",
    liquidity: "Penalty on early exit",
    highlight: false,
  },
  {
    name: "Debt MFs",
    returnRange: "6–8%",
    risk: "Low to Moderate",
    min: "₹500",
    taxation: "Slab rate",
    shortSelling: false,
    derivatives: "None",
    liquidity: "T+1 to T+3",
    highlight: false,
  },
  {
    name: "Arbitrage MFs",
    returnRange: "6–8%",
    risk: "Low",
    min: "₹500",
    taxation: "Equity (12.5% LTCG)",
    shortSelling: false,
    derivatives: "Hedging only",
    liquidity: "T+1",
    highlight: false,
  },
  {
    name: "Hybrid MFs",
    returnRange: "8–12%",
    risk: "Moderate",
    min: "₹500",
    taxation: "Equity (12.5% LTCG)",
    shortSelling: false,
    derivatives: "Hedging only",
    liquidity: "T+1 to T+3",
    highlight: false,
  },
  {
    name: "SIF",
    returnRange: "10–15%+",
    risk: "Moderate",
    min: "₹10 Lakh",
    taxation: "Equity (12.5% LTCG)",
    shortSelling: true,
    derivatives: "Hedging + Unhedged",
    liquidity: "Weekly / Bi-weekly",
    highlight: true,
  },
  {
    name: "Cat III AIF",
    returnRange: "12–20%+",
    risk: "High",
    min: "₹1 Crore",
    taxation: "42.7% at fund level",
    shortSelling: true,
    derivatives: "Full leverage (200%)",
    liquidity: "3+ year lock-in",
    highlight: false,
  },
];

const ComparisonPreview = () => {
  return (
    <section className="py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">The Landscape</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-jericho mb-4">
            Where does SIF fit in?
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            From fixed deposits to hedge funds — here's how SIF compares across the entire spectrum of Indian investment products.
          </p>
        </motion.div>

        {/* Scrollable comparison cards */}
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-4 min-w-max px-2">
            {vehicles.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`w-[200px] md:w-[210px] p-5 border transition-all ${
                  v.highlight
                    ? "bg-jericho border-gold/30 text-white shadow-lg relative"
                    : "bg-white border-border text-foreground"
                }`}
              >
                {v.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[9px] font-bold bg-gold text-jericho px-3 py-1 tracking-wider uppercase">SIF</span>
                  </div>
                )}

                {/* Name */}
                <p className={`text-xs font-semibold tracking-wide uppercase mb-5 ${
                  v.highlight ? "text-gold" : "text-jericho/60"
                }`}>
                  {v.name}
                </p>

                {/* Expected Returns */}
                <div className="mb-4">
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Expected Returns</p>
                  <p className={`font-editorial text-2xl ${v.highlight ? "text-gold" : "text-jericho"}`}>{v.returnRange}</p>
                </div>

                {/* Risk */}
                <div className="mb-4">
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Risk</p>
                  <p className={`text-sm ${v.highlight ? "text-white/80" : "text-foreground/70"}`}>{v.risk}</p>
                </div>

                {/* Min */}
                <div className="mb-4">
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Minimum</p>
                  <p className={`text-sm font-medium ${v.highlight ? "text-white" : "text-foreground"}`}>{v.min}</p>
                </div>

                {/* Taxation */}
                <div className="mb-4">
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Taxation</p>
                  <p className={`text-xs ${v.highlight ? "text-gold/80" : "text-foreground/60"}`}>{v.taxation}</p>
                </div>

                {/* Short Selling */}
                <div className="mb-4">
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Short Selling</p>
                  <p className={`text-sm ${v.shortSelling ? (v.highlight ? "text-emerald-400" : "text-emerald-600") : (v.highlight ? "text-white/20" : "text-foreground/25")}`}>
                    {v.shortSelling ? "Yes" : "No"}
                  </p>
                </div>

                {/* Liquidity */}
                <div>
                  <p className={`text-[9px] uppercase tracking-wider mb-1 ${v.highlight ? "text-white/30" : "text-muted-foreground/60"}`}>Liquidity</p>
                  <p className={`text-xs ${v.highlight ? "text-white/60" : "text-foreground/50"}`}>{v.liquidity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/compare" className="text-sm text-jericho/50 hover:text-jericho transition-colors border-b border-jericho/10 pb-1">
            Full side-by-side comparison &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonPreview;
