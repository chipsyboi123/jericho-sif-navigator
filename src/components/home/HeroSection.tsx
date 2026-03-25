import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animated counter hook
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const HeroSection = () => {
  const aum = useCountUp(9700, 2500);

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden bg-jericho">
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(42, 58, 143, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(5, 10, 48, 0.8) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(201, 150, 12, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 60% 20%, rgba(26, 37, 112, 0.3) 0%, transparent 40%)
        `,
      }} />

      {/* Subtle floating orbs */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full bg-gold/[0.03] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[10%] w-48 h-48 rounded-full bg-jericho-accent/20 blur-3xl"
      />

      {/* Top gold accent line */}
      <div className="absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="relative container mx-auto px-4 text-center pt-14">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-10"
        >
          <span className="text-gold/60 text-[10px] tracking-[0.3em] uppercase bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] px-5 py-2 rounded-full">
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

        {/* Glassmorphic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/funds"
            className="group px-8 py-3.5 bg-gold/90 backdrop-blur-sm text-jericho text-sm font-bold tracking-wide rounded-full hover:bg-gold hover:shadow-[0_0_25px_rgba(201,150,12,0.3)] transition-all inline-flex items-center justify-center gap-2"
          >
            Explore Funds
            <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
          <Link
            to="/learn"
            className="px-8 py-3.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white/70 text-sm font-medium tracking-wide rounded-full hover:bg-white/[0.1] hover:border-gold/20 hover:text-white transition-all"
          >
            What is SIF?
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex justify-center gap-10 md:gap-16 mt-16 pt-10 border-t border-white/[0.06]"
          ref={aum.ref}
        >
          <div className="text-center">
            <p className="font-mono-data text-2xl md:text-3xl text-gold font-medium">
              ₹{aum.count.toLocaleString("en-IN")}Cr+
            </p>
            <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase mt-1">Total SIF AUM</p>
          </div>
          <div className="text-center">
            <p className="font-mono-data text-2xl md:text-3xl text-gold font-medium">₹10L</p>
            <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase mt-1">Min Investment</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 bg-gold/[0.08] border border-gold/15 px-4 py-2 rounded-full font-semibold">
              SEBI Regulated
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
