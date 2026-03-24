import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const vehicles = [
  {
    name: "Mutual Fund",
    min: "₹500",
    shortSelling: false,
    derivatives: "Hedging only",
    taxation: "Equity: 12.5% LTCG",
    highlight: false,
  },
  {
    name: "SIF",
    min: "₹10 Lakh",
    shortSelling: true,
    derivatives: "Hedging + 25% unhedged",
    taxation: "Equity: 12.5% LTCG",
    highlight: true,
  },
  {
    name: "PMS",
    min: "₹50 Lakh",
    shortSelling: true,
    derivatives: "Hedging + rebalancing",
    taxation: "Taxed per transaction",
    highlight: false,
  },
  {
    name: "AIF Cat III",
    min: "₹1 Crore",
    shortSelling: true,
    derivatives: "Full leverage (200%)",
    taxation: "42.7% at fund level",
    highlight: false,
  },
];

const ComparisonPreview = () => {
  return (
    <section className="py-32 bg-[#050505] relative noise">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">The Landscape</p>
          <h2 className="font-editorial text-4xl md:text-5xl text-white">
            where SIF fits in.
          </h2>
        </motion.div>

        {/* Visual columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {vehicles.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 md:p-8 border text-center ${
                v.highlight
                  ? "border-gold/30 bg-gold/[0.03]"
                  : "border-white/[0.04] bg-white/[0.01]"
              }`}
            >
              {/* Name */}
              <p className={`text-[11px] tracking-[0.2em] uppercase mb-6 ${
                v.highlight ? "text-gold" : "text-white/30"
              }`}>
                {v.name}
              </p>

              {/* Big number */}
              <p className={`font-editorial text-3xl md:text-4xl mb-8 ${
                v.highlight ? "text-gold" : "text-white"
              }`}>
                {v.min}
              </p>

              {/* Features */}
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Short Selling</p>
                  <p className={`text-sm ${v.shortSelling ? "text-white/70" : "text-white/20"}`}>
                    {v.shortSelling ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Derivatives</p>
                  <p className="text-sm text-white/50">{v.derivatives}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Taxation</p>
                  <p className={`text-sm ${v.highlight ? "text-gold/80" : "text-white/50"}`}>{v.taxation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/compare" className="text-sm text-white/30 hover:text-white/60 transition-colors border-b border-white/10 pb-1">
            Full comparison &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonPreview;
