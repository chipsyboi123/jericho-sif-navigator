import { motion } from "framer-motion";
import { Search, LayoutGrid, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Search,
    title: "Independent Research",
    description:
      "We don't just compare funds. We analyze strategies, track fund manager performance, and form views on what works in Indian markets.",
  },
  {
    icon: LayoutGrid,
    title: "All Funds, One Place",
    description:
      "Every SIF scheme across every AMC, organized and comparable. Filter by strategy, risk band, returns, and more — all in a single dashboard.",
  },
  {
    icon: Sparkles,
    title: "Made For New-Age Investors",
    description:
      "Clean design, transparent data, no jargon walls. Built for investors who want clarity, not complexity.",
  },
];

const WhyJericho = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Why SIF Insider
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A disciplined approach to navigating India's newest asset class.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl glass p-8 border border-white/20 shadow-card hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-3 text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJericho;
