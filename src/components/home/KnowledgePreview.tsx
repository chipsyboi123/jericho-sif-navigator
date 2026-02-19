import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const articles = [
  { title: "SIF 101: The Complete Beginner's Guide", tag: "Guide", color: "bg-primary/10 text-primary" },
  { title: "Which SIF Strategy Matches Your Risk Profile?", tag: "Advisory", color: "bg-emerald-500/10 text-emerald-400" },
  { title: "How SIF Taxation Works: Equity, Debt, and Hybrid", tag: "Tax", color: "bg-orange-500/10 text-orange-400" },
  { title: "The MFD's Guide to Distributing SIF", tag: "Distributor", color: "bg-blue-500/10 text-blue-400" },
];

const KnowledgePreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Learn Before You <span className="text-gradient-gold">Invest</span>
          </h2>
          <p className="text-muted-foreground">Deep-dive articles on SIF strategies, taxation, and more.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to="/knowledge"
                className="block bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors group"
              >
                <span className={`text-xs font-semibold px-2 py-1 rounded ${article.color}`}>
                  {article.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground mt-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/knowledge" className="text-sm font-semibold text-primary hover:underline">
            Visit Knowledge Hub →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KnowledgePreview;
