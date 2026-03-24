import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-28 bg-[#0a0e1a] relative overflow-hidden">
      {/* Gold gradient accent */}
      <div className="absolute top-0 left-0 right-0 hr-gold" />
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9960C] opacity-[0.03] blur-[150px] rounded-full" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mb-6 max-w-2xl mx-auto leading-tight">
            Ready to explore the
            <br />
            <span className="text-gradient-gold italic">new frontier?</span>
          </h2>
          <p className="text-white/40 mb-10 max-w-md mx-auto">
            Compare funds, understand strategies, and take the first step toward smarter investing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#C9960C] text-[#0a0e1a] font-bold rounded-full hover:bg-[#d4a41a] transition-all text-sm tracking-wide uppercase"
            >
              Talk to an advisor
            </Link>
            <Link
              to="/funds"
              className="px-8 py-4 border border-white/15 text-white/60 font-medium rounded-full hover:border-white/30 hover:text-white transition-all text-sm tracking-wide uppercase"
            >
              Browse funds
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAStrip;
