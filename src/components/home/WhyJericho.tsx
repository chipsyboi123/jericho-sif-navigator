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
      "We guide you toward the right SIF strategy for your goals. Not every SIF is right for every investor, and we help you find the fit.",
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
    <section className="py-24 bg-[#F8F6F1]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Why Choose Jericho
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A disciplined approach to navigating India's newest asset class.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-[#E5E2DB] shadow-card hover:shadow-card-hover p-8 hover:border-gold/30 transition-all"
            >
              <card.icon className="w-7 h-7 text-gold mb-5" strokeWidth={1.5} />
              <h3 className="font-serif text-lg font-bold mb-3 text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJericho;
