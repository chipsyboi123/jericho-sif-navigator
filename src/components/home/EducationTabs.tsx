import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  {
    id: "what",
    title: "What is SIF?",
    content:
      "SIF is a new SEBI-regulated investment category launched in April 2025. It bridges the gap between mutual funds and PMS by allowing AMCs to offer advanced strategies like long-short equity, sector rotation, and tactical allocation. Minimum investment is \u20B910 lakh.",
    cta: { label: "Read the Full Guide", path: "/sif-101" },
  },
  {
    id: "tax",
    title: "How SIF Taxation Works",
    content:
      "SIFs are taxed at the scheme level, like mutual funds. For equity-oriented SIFs held over 12 months, LTCG is taxed at 12.5% on gains above \u20B91.25 lakh. For debt-oriented SIFs, gains are taxed at slab rates. This makes SIFs significantly more tax-efficient than most AIF categories.",
    cta: { label: "Use Tax Calculator", path: "/calculator" },
  },
  {
    id: "vs",
    title: "SIF vs PMS",
    content:
      "PMS requires \u20B950 lakh minimum and charges tax at the transaction level. SIF requires \u20B910 lakh and benefits from scheme-level taxation (same as mutual funds). PMS offers full customization but SIF provides advanced strategies within SEBI's mutual fund framework.",
    cta: { label: "Compare in Detail", path: "/compare" },
  },
];

const EducationTabs = () => {
  const [active, setActive] = useState("what");

  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card border border-border overflow-hidden">
            {/* Tab headers */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors ${
                    active === tab.id
                      ? "text-gold border-b-2 border-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-8 md:p-10">
              <p className="text-foreground/75 leading-relaxed mb-6 max-w-2xl text-base">
                {activeTab.content}
              </p>
              <Link
                to={activeTab.cta.path}
                className="text-sm font-semibold text-gold hover:text-gold-light transition-colors"
              >
                {activeTab.cta.label} &rarr;
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationTabs;
