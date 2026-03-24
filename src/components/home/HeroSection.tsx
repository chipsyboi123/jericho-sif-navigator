import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span ref={ref} className="font-mono-data">{count}{suffix}</span>;
}

const stats = [
  { value: 4, suffix: "", label: "Funds Live" },
  { value: 10, suffix: "L", label: "Min Investment" },
  { value: 25, suffix: "%", label: "Short Exposure" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0F1629]">
      {/* Gradient orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-[#C9960C] top-[-10%] right-[-5%]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-[#C9960C]/60 bottom-[10%] left-[-8%]" />
      <div className="gradient-orb w-[200px] h-[200px] bg-[#F0C842]/50 top-[40%] right-[30%]" />

      <div className="relative container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm font-semibold text-[#C9960C] tracking-widest uppercase mb-6"
          >
            India's SIF Intelligence Platform
          </motion.p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] mb-8 text-white">
            The Insider's Guide to India's{" "}
            <span className="text-gradient-gold">Newest Asset Class</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
            Specialized Investment Funds, decoded. Compare strategies, understand risks, and make confident investment decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/funds"
              className="px-8 py-4 bg-gradient-gold text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-gold-glow text-center animate-gold-pulse"
            >
              Explore Funds
            </Link>
            <Link
              to="/learn"
              className="px-8 py-4 glass-dark text-white font-medium rounded-xl hover:border-[#C9960C]/30 transition-all text-center"
            >
              What is SIF?
            </Link>
          </div>

          {/* Stat counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#C9960C]">SEBI</p>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Regulated</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
