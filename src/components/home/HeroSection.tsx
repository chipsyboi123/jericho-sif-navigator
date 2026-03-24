import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] noise">
      {/* Subtle gold vein accent — CSS only, no image needed */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(201,150,12,0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(201,150,12,0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative container mx-auto px-4 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gold text-[11px] tracking-[0.35em] uppercase mb-10"
        >
          India's SIF Intelligence Platform
        </motion.p>

        {/* THE headline — massive Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-editorial text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] text-white mb-10 tracking-[-0.02em]"
        >
          the smart money
          <br />
          has a <em className="text-gradient-gold">new address.</em>
        </motion.h1>

        {/* Subtitle — restrained, not salesy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/35 text-base md:text-lg max-w-md mx-auto mb-14 leading-relaxed"
        >
          Specialized Investment Funds — decoded, compared,
          and made accessible. No jargon. No 85-page PDFs.
        </motion.p>

        {/* CTAs — minimal, pill-shaped */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/funds"
            className="px-8 py-3.5 bg-gold text-[#050505] text-sm font-semibold tracking-wide hover:bg-gold-light transition-colors"
          >
            Explore Funds
          </Link>
          <Link
            to="/learn"
            className="px-8 py-3.5 border border-white/10 text-white/50 text-sm font-medium tracking-wide hover:border-white/25 hover:text-white/80 transition-all"
          >
            What is SIF?
          </Link>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
