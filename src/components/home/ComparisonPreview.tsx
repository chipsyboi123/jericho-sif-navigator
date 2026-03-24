import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Min. Investment", mf: "\u20B9500", sif: "\u20B910 Lakh", pms: "\u20B950 Lakh", aif: "\u20B91 Crore" },
  { feature: "Short Selling", mf: false, sif: true, pms: true, aif: true },
  { feature: "Derivative Hedging", mf: "limited", sif: true, pms: true, aif: true },
  { feature: "SEBI Regulated", mf: true, sif: true, pms: true, aif: true },
  { feature: "Equity Taxation", mf: true, sif: true, pms: false, aif: false },
  { feature: "Fund-Level Tax", mf: false, sif: false, pms: false, aif: true },
  { feature: "Leverage", mf: false, sif: false, pms: false, aif: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-emerald-400 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-white/20 mx-auto" />;
  if (value === "limited") return <Minus className="w-4 h-4 text-white/30 mx-auto" />;
  return <span className="text-sm text-white/70">{value}</span>;
}

const ComparisonPreview = () => {
  return (
    <section className="py-28 bg-[#0a0e1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,12,0.03),transparent_70%)]" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#C9960C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">The Comparison</p>
          <h2 className="font-serif-display text-3xl md:text-4xl text-white mb-4">
            SIF sits in a sweet spot.
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            More flexibility than mutual funds. Better taxation than PMS. Lower ticket than AIF.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-5 text-xs font-medium text-white/30 uppercase tracking-wider w-[30%]">Feature</th>
                  <th className="py-4 px-4 text-xs font-medium text-white/30 uppercase tracking-wider text-center">MF</th>
                  <th className="py-4 px-4 text-xs font-medium text-[#C9960C] uppercase tracking-wider text-center bg-[#C9960C]/5 border-x border-[#C9960C]/10">SIF</th>
                  <th className="py-4 px-4 text-xs font-medium text-white/30 uppercase tracking-wider text-center">PMS</th>
                  <th className="py-4 px-4 text-xs font-medium text-white/30 uppercase tracking-wider text-center">AIF</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3.5 px-5 text-sm text-white/60">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.mf} /></td>
                    <td className="py-3.5 px-4 text-center bg-[#C9960C]/5 border-x border-[#C9960C]/10 font-medium">
                      <Cell value={row.sif} />
                    </td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.pms} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.aif} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link to="/learn" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            Deep dive into SIF vs alternatives &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonPreview;
