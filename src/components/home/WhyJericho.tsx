import { motion } from "framer-motion";

const pillars = [
  {
    title: "We'll help you decide.",
    desc: "We'll get on a call with you to understand your exact requirements and ensure you get invested into the right product with all the information you need to make a confident decision.",
  },
  {
    title: "Clarity.",
    desc: "We write for investors, not fund managers. No jargon. No caveats wrapped in caveats. If a fund is risky, we say it's risky. If the exit load stings, we'll tell you.",
  },
  {
    title: "Curated.",
    desc: "We deeply analyze every product before onboarding it. All investments carry risks — but we present you the cream of the crop, so you start from a position of strength.",
  },
];

const WhyJericho = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          {/* Left — big statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">Why SIF Insider</p>
            <h2 className="font-editorial text-3xl md:text-5xl text-jericho leading-tight mb-6">
              we built what
              <br />
              we wished existed.
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              When SIFs launched in 2025, there was no single place to understand, compare, and invest in them.
              No plain-English breakdowns. No independent analysis. So we made one.
            </p>
          </motion.div>

          {/* Right — three pillars */}
          <div className="md:col-span-7 space-y-0">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="py-8 border-b border-border first:border-t"
              >
                <h3 className="text-lg font-semibold text-jericho mb-2 tracking-tight">{pillar.title}</h3>
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
