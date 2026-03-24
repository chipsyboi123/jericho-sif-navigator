import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-40 bg-[#050505] relative noise">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-editorial text-4xl md:text-6xl text-white mb-8 leading-tight">
            ready to be an <em className="text-gradient-gold">insider?</em>
          </h2>
          <p className="text-white/30 mb-12 max-w-sm mx-auto text-[15px]">
            Compare funds, understand strategies, take the first step.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-gold text-[#050505] text-sm font-semibold tracking-wide hover:bg-gold-light transition-colors"
          >
            Talk to an Advisor
          </Link>
        </motion.div>

        <p className="text-white/15 text-xs mt-20 tracking-widest uppercase">
          Powered by Jericho Ventures
        </p>
      </div>
    </section>
  );
};

export default CTAStrip;
