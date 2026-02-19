import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-24 bg-[#FDF8EC] relative overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0C842]/5 via-transparent to-[#E8D5A3]/10" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-semibold italic mb-4 text-foreground leading-tight">
            Start with a conversation,<br className="hidden md:block" /> not a pitch.
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Explore SIF strategies and find what works for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Talk to Us &rarr;
            </Link>
            <Link
              to="/funds"
              className="px-8 py-3.5 border border-foreground/20 text-foreground font-medium hover:border-gold hover:text-gold transition-colors"
            >
              Explore SIF Funds
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAStrip;
