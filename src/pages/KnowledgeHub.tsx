import { motion } from "framer-motion";

const articles = [
  { title: "SIF 101: Everything You Need to Know About India's Newest Asset Class", category: "Guide", date: "Jan 2025" },
  { title: "SIF vs PMS: A Detailed Comparison for Indian HNIs", category: "Comparison", date: "Feb 2025" },
  { title: "How Long-Short Equity Strategies Work (With Indian Market Examples)", category: "Strategy", date: "Feb 2025" },
  { title: "SIF Taxation Explained: Equity, Debt, and Hybrid Schemes", category: "Tax", date: "Jan 2025" },
  { title: "The MFD's Complete Guide to Becoming a SIF Distributor", category: "Distributor", date: "Mar 2025" },
  { title: "All 13 SIF AMCs: Who's Launched, Who's Approved, Who's Coming", category: "Updates", date: "Feb 2025" },
  { title: "Comparing All Hybrid Long-Short SIFs: Magnum vs qSIF vs Altiva", category: "Comparison", date: "Mar 2025" },
  { title: "Is SIF Right for You? A Self-Assessment Framework", category: "Advisory", date: "Feb 2025" },
];

const categoryColors: Record<string, string> = {
  Guide: "bg-primary/10 text-primary",
  Comparison: "bg-blue-500/10 text-blue-400",
  Strategy: "bg-emerald-500/10 text-emerald-400",
  Tax: "bg-orange-500/10 text-orange-400",
  Distributor: "bg-purple-500/10 text-purple-400",
  Updates: "bg-cyan-500/10 text-cyan-400",
  Advisory: "bg-yellow-500/10 text-yellow-400",
};

const KnowledgeHub = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Knowledge <span className="text-gradient-gold">Hub</span>
          </h1>
          <p className="text-muted-foreground mb-12">Deep-dive articles on SIF strategies, taxation, and market updates.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${categoryColors[article.category] || "bg-secondary text-muted-foreground"}`}>
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Coming soon — article in preparation.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
