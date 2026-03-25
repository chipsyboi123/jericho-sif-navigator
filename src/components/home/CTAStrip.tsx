import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-32 bg-jericho relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Subtle gold radial */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `radial-gradient(ellipse at 50% 100%, rgba(201,150,12,0.5) 0%, transparent 50%)` }}
      />

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
              className="group px-9 py-3.5 bg-gold text-jericho text-sm font-bold tracking-wide hover:bg-gold-light transition-all inline-flex items-center justify-center gap-2"
            >
              Schedule a Quick Call
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
            <Link
              to="/funds"
              className="px-9 py-3.5 border border-white/15 text-white/50 text-sm font-medium hover:border-gold/30 hover:text-gold transition-all"
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
