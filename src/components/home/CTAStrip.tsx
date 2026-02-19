import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-20 bg-secondary border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
            Ready to Get <span className="text-gradient-gold">Started?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              I Want to Invest in SIF
            </Link>
            <Link
              to="/distributors"
              className="px-8 py-3 border border-primary/30 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors"
            >
              I Want to Distribute SIF
            </Link>
            <Link
              to="/sif-101"
              className="px-8 py-3 border border-border text-muted-foreground font-medium rounded-md hover:border-primary/30 hover:text-foreground transition-colors"
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
