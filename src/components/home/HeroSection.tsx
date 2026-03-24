import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh-dark noise-overlay">
      {/* Decorative gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#C9960C] opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#C9960C] opacity-[0.06] blur-[100px]" />

      {/* Thin gold line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 hr-gold" />

      <div className="relative container mx-auto px-4 py-32 md:py-40">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="inline-block w-8 h-px bg-[#C9960C]" />
          <span className="text-[#C9960C] text-xs font-semibold tracking-[0.25em] uppercase">
            India's first SIF platform
          </span>
        </motion.div>

        {/* Main headline — CRED-style massive serif */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-display text-[3.2rem] md:text-[4.5rem] lg:text-[6rem] leading-[1.05] text-white mb-8 max-w-4xl"
        >
          not your father's
          <br />
          <span className="text-gradient-gold italic">mutual fund.</span>
        </motion.h1>

        {/* Subtitle — conversational, not corporate */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/50 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
        >
          SIFs let you go long <em>and</em> short. Hedge with derivatives.
          Get PMS-level strategies at mutual fund taxation.
          We break it all down — no jargon, no 85-page PDFs.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link
            to="/funds"
            className="group px-8 py-4 bg-[#C9960C] text-[#0a0e1a] font-bold rounded-full hover:bg-[#d4a41a] transition-all text-center text-sm tracking-wide uppercase"
          >
            Explore Funds
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link
            to="/learn"
            className="px-8 py-4 border border-white/15 text-white/70 font-medium rounded-full hover:border-white/30 hover:text-white transition-all text-center text-sm tracking-wide uppercase"
          >
            What is SIF?
          </Link>
        </motion.div>

        {/* Stats bar — separated by thin lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap gap-0 divide-x divide-white/10"
        >
          {[
            { value: 4, suffix: "", label: "Live Funds" },
            { value: 10, suffix: "L+", prefix: "\u20B9", label: "Min. Investment" },
            { value: 25, suffix: "%", label: "Short Exposure" },
          ].map((stat, i) => (
            <div key={i} className="px-6 first:pl-0">
              <p className="text-2xl md:text-3xl font-bold text-white font-mono-data">
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className="text-[11px] text-white/30 mt-1 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
          <div className="px-6">
            <p className="text-2xl md:text-3xl font-bold text-[#C9960C] font-heading">SEBI</p>
            <p className="text-[11px] text-white/30 mt-1 tracking-wider uppercase">Regulated</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
