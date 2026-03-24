import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Shield } from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    number: "01",
    title: "What even is a SIF?",
    desc: "A new SEBI category that gives you hedge fund strategies with mutual fund taxation. Yes, really.",
    link: "/learn",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "Long-short, explained simply.",
    desc: "Make money when markets go up AND down. We explain the mechanics without the Wall Street jargon.",
    link: "/learn",
  },
  {
    icon: Shield,
    number: "03",
    title: "Better tax than PMS.",
    desc: "12.5% LTCG after 12 months. No fund-level tax. Same pass-through as your regular mutual fund.",
    link: "/learn",
  },
];

const EducationTabs = () => {
  return (
    <section className="py-28 bg-[#FAF9F6]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#C9960C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Learn</p>
          <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">
            SIF, decoded.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={card.link}
                className="group flex items-center gap-6 md:gap-10 p-6 md:p-8 bg-white rounded-2xl border border-border hover:border-[#C9960C]/20 hover:shadow-lg transition-all"
              >
                {/* Number */}
                <span className="hidden md:block text-5xl font-bold text-border font-heading shrink-0 w-16 group-hover:text-[#C9960C]/20 transition-colors">
                  {card.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#C9960C]/8 flex items-center justify-center shrink-0 group-hover:bg-[#C9960C]/15 transition-colors">
                  <card.icon className="w-5 h-5 text-[#C9960C]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-[#C9960C] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>

                {/* Arrow */}
                <span className="text-muted-foreground group-hover:text-[#C9960C] group-hover:translate-x-1 transition-all shrink-0 text-lg">
                  &rarr;
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
