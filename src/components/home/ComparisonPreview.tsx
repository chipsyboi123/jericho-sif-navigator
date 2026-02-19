import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const comparisonData = [
  { feature: "Min Investment", mf: "Rs 100", sif: "Rs 10 Lakh", pms: "Rs 50 Lakh", aif: "Rs 1 Crore" },
  { feature: "Short Selling", mf: "No", sif: "Up to 25%", pms: "Yes", aif: "Yes" },
  { feature: "Tax Efficiency", mf: "Scheme-level", sif: "Scheme-level", pms: "Transaction-level", aif: "Category-dependent" },
  { feature: "Strategy Flexibility", mf: "Limited", sif: "High", pms: "Full customization", aif: "Wide range" },
  { feature: "Liquidity", mf: "High (daily)", sif: "Moderate", pms: "Low (lock-in)", aif: "Low (5-10 yrs)" },
  { feature: "Best For", mf: "Retail investors", sif: "HNIs seeking alpha", pms: "Ultra-HNIs", aif: "Institutions" },
];

const ComparisonPreview = () => {
  return (
    <section className="py-24 bg-[#F8F6F1]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-foreground">
            How Does SIF Stack Up?
          </h2>
          <p className="text-muted-foreground text-lg">A quick comparison across investment vehicles.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto bg-white border border-[#E5E2DB] shadow-card"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E5E2DB]">
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Feature</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Mutual Fund</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gold">SIF</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">PMS</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">AIF</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E2DB]/50 hover:bg-[#F8F6F1] transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{row.feature}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{row.mf}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gold bg-[#FDF8EC]/50">{row.sif}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{row.pms}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{row.aif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            to="/compare"
            className="px-7 py-3.5 border border-foreground/20 text-foreground font-semibold hover:border-gold hover:text-gold transition-colors inline-block"
          >
            See Detailed Comparison
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonPreview;
