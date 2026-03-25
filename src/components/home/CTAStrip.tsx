import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-32 bg-jericho relative overflow-hidden">
      {/* Apple-style gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.06] blur-[120px] animate-float" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-jericho-accent/20 blur-[80px]" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-editorial text-3xl md:text-5xl text-white mb-6 leading-tight">
            Ready to explore <em className="text-gradient-gold">SIF?</em>
          </h2>
          <p className="text-white/30 mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
            Compare funds, understand strategies, and take the first step towards India's newest asset class.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group px-9 py-4 bg-gradient-gold text-jericho text-sm font-bold tracking-wide rounded-2xl hover:shadow-gold-glow transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              Schedule a Quick Call
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
            <Link
              to="/funds"
              className="px-9 py-4 glass-dark text-white/60 text-sm font-medium rounded-2xl hover:text-gold hover:bg-white/[0.06] transition-all duration-300"
            >
              Browse Funds
            </Link>
          </div>
        </motion.div>

        <p className="text-white/10 text-xs mt-20 tracking-widest uppercase">
          Powered by Jericho Ventures
        </p>
      </div>
    </section>
  );
};

export default CTAStrip;
