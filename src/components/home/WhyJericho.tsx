import { motion } from "framer-motion";
import { Search, Shield, Eye } from "lucide-react";

const cards = [
  {
    icon: Search,
    title: "Research-Led Conviction",
    description:
      "We don't just compare funds. We analyze strategies, track fund manager performance, and form views on what works in Indian markets.",
  },
  {
    icon: Shield,
    title: "Advisor-First Approach",
    description:
      "Whether you're an investor or distributor, we guide you toward the right SIF strategy for your goals. Not every SIF is right for everyone.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description:
      "Risk bands, exit loads, redemption terms, tax implications. We lay it all out so you can make informed decisions with zero surprises.",
  },
];

const WhyJericho = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Why Choose <span className="text-gradient-gold">Jericho</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
            >
              <card.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2 text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJericho;
