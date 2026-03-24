import { motion } from "framer-motion";
import { Search, LayoutGrid, Zap } from "lucide-react";

const pillars = [
  {
    icon: Search,
    title: "Independent research.",
    desc: "We don't sell funds. We analyze them. Every fund on SIF Insider comes with a breakdown you can actually understand.",
  },
  {
    icon: LayoutGrid,
    title: "Every SIF, one place.",
    desc: "All 4 live SIF strategies, compared side-by-side. No switching between 6 AMC websites.",
  },
  {
    icon: Zap,
    title: "Built for new-age investors.",
    desc: "If you understand Nifty but not derivatives, this is for you. We translate 85-page PDFs into 2-minute reads.",
  },
];

const WhyJericho = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#C9960C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Us</p>
          <h2 className="font-serif-display text-3xl md:text-4xl text-foreground mb-4">
            Why SIF Insider?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Because understanding your investment shouldn't require a finance degree.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0a0e1a] flex items-center justify-center mx-auto mb-5">
                <pillar.icon className="w-6 h-6 text-[#C9960C]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJericho;
