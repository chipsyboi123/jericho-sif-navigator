import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Receipt } from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title: "What is SIF?",
    description:
      "SEBI's newest investment category bridges mutual funds and PMS with advanced strategies like long-short equity. Starting at just Rs 10 lakh.",
    link: "/learn",
  },
  {
    icon: TrendingUp,
    title: "How Long-Short Works",
    description:
      "SIFs can short up to 25% of AUM, enabling hedged strategies that aim to generate alpha in both rising and falling markets.",
    link: "/learn",
  },
  {
    icon: Receipt,
    title: "Tax Advantage",
    description:
      "Scheme-level taxation like mutual funds. Equity SIFs held 12+ months get LTCG at 12.5% on gains above Rs 1.25 lakh — far better than PMS.",
    link: "/learn",
  },
];

const EducationTabs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Understand SIF in Minutes
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before investing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <Link
                to={card.link}
                className="group block rounded-2xl glass-card p-8 border border-white/20 hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <card.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {card.description}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all duration-300">
                  Learn more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationTabs;
