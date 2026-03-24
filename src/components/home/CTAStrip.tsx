import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTAStrip = () => {
  return (
    <section className="py-24 bg-[#0F1629] relative overflow-hidden">
      {/* Gold gradient orb decorations */}
      <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9960C]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9960C]/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#C9960C]/5 blur-[80px] pointer-events-none animate-gold-pulse" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto rounded-2xl glass-dark border border-white/10 px-8 py-14 md:px-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Start with a conversation,
            <br className="hidden md:block" />
            <span className="text-gradient-gold"> not a pitch.</span>
          </h2>

          <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
            Explore SIF strategies and find what works for your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-gold text-white font-heading font-semibold hover:shadow-gold-glow hover:opacity-90 transition-all duration-300"
            >
              Talk to Us &rarr;
            </Link>
            <Link
              to="/learn"
              className="px-8 py-3.5 rounded-xl border border-white/20 text-white/80 font-heading font-medium hover:border-gold hover:text-gold transition-all duration-300"
            >
              Explore SIF Guides
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAStrip;
