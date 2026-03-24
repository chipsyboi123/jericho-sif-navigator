import { motion } from "framer-motion";

const pillars = [
  {
    title: "Independent.",
    desc: "We don't sell funds. We don't earn commissions on what you pick. We analyze every SIF scheme so you don't have to read 85-page ISIDs.",
  },
  {
    title: "Complete.",
    desc: "Every live SIF in India, on one platform. Compare allocations, risk bands, exit loads, and fund managers across AMCs in seconds.",
  },
  {
    title: "Clear.",
    desc: "We write for investors, not fund managers. No jargon. No caveats wrapped in caveats. If a fund is risky, we say it's risky.",
  },
];

const WhyJericho = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Left — big statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">Why Us</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-foreground leading-tight mb-6">
              we built what
              <br />
              we wished existed.
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              When SIFs launched in 2025, there was no single place to compare them.
              No plain-English breakdowns. No independent analysis. So we made one.
            </p>
          </motion.div>

          {/* Right — three pillars */}
          <div className="md:col-span-7 space-y-0">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-8 border-b border-border first:border-t"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">{pillar.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJericho;
