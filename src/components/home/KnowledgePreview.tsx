import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const articles = [
  { title: "SIF 101: The Complete Beginner's Guide", tag: "Guide" },
  { title: "Which SIF Strategy Matches Your Risk Profile?", tag: "Advisory" },
  { title: "How SIF Taxation Works: Equity, Debt, and Hybrid", tag: "Tax" },
  { title: "Is SIF Right for You? A Self-Assessment", tag: "Investor" },
];

const KnowledgePreview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Learn Before You Invest
          </h2>
          <p className="text-muted-foreground text-lg">Deep-dive articles on SIF strategies, taxation, and more.</p>
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
                className="block bg-white border border-[#E5E2DB] shadow-card hover:shadow-card-hover p-7 hover:border-gold/30 transition-all group"
              >
                <span className="text-xs font-semibold px-2.5 py-1 bg-gold/10 text-gold uppercase tracking-wider">
                  {article.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground mt-4 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/knowledge" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
            Visit Knowledge Hub &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KnowledgePreview;
