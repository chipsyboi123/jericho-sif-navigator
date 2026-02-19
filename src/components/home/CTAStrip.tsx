import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-20 bg-accent border-t border-accent-foreground/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-accent-foreground">
            Ready to Get <span className="text-gradient-gold">Started?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              I Want to Invest in SIF
            </Link>
            <Link
              to="/compare"
              className="px-8 py-3 border border-gold/30 text-accent-foreground font-semibold hover:bg-gold/10 transition-colors"
            >
              I Want to Compare SIF Funds
            </Link>
            <Link
              to="/sif-101"
              className="px-8 py-3 border border-accent-foreground/20 text-accent-foreground/70 font-medium hover:border-gold/30 hover:text-accent-foreground transition-colors"
            >
              I Want to Learn About SIF
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAStrip;
