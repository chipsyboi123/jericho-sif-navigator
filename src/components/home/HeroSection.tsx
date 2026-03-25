import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-jericho">
      {/* Subtle gold radial accent */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 80%, rgba(201,150,12,0.5) 0%, transparent 55%)`,
        }}
      />

      {/* Top gold accent line */}
      <div className="absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="relative container mx-auto px-4 text-center pt-14">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-10"
        >
          <span className="text-gold/70 text-[11px] tracking-[0.3em] uppercase border border-gold/15 px-4 py-1.5">
            Powered by Jericho Ventures
          </span>
        </motion.div>

        {/* THE headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-editorial text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] text-white mb-8 tracking-[-0.01em] max-w-4xl mx-auto"
        >
          Your gateway to India's
          <br />
          <em className="text-gradient-gold">fastest growing</em> asset class.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/35 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Specialized Investment Funds — decoded, compared,
          and made accessible. Your first step starts here.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/funds"
            className="group px-8 py-3.5 bg-gold text-jericho text-sm font-bold tracking-wide hover:bg-gold-light transition-all inline-flex items-center justify-center gap-2"
          >
            Explore Funds
            <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
          <Link
            to="/learn"
            className="px-8 py-3.5 border border-white/15 text-white/60 text-sm font-medium tracking-wide hover:border-gold/30 hover:text-gold transition-all"
          >
            What is SIF?
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex justify-center gap-10 md:gap-16 mt-16 pt-10 border-t border-white/[0.06]"
        >
          {[
            { label: "Live Funds", value: "4" },
            { label: "Min Investment", value: "₹10L" },
            { label: "SEBI Regulated", value: "Yes" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-mono-data text-2xl md:text-3xl text-gold font-medium">{stat.value}</p>
              <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
