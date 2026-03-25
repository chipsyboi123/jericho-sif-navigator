import { Link } from "react-router-dom";
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
            const eased = 1 - Math.pow(1 - progress, 3);
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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-jericho">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        poster=""
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Apple-style gradient mesh overlay */}
      <div className="absolute inset-0 bg-mesh-dark" />

      {/* Bottom gradient fade to white (Apple section transition) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative container mx-auto px-4 text-center pt-14">
        {/* Eyebrow pill badge */}
        <div className="inline-block mb-10 animate-fadeIn-delay-2">
          <span className="glass-dark text-gold/70 text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 rounded-full inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-glow-pulse" />
            Powered by Jericho Ventures
          </span>
        </div>

        {/* THE headline */}
        <h1
          className="font-editorial text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] text-white mb-8 tracking-[-0.01em] max-w-4xl mx-auto animate-fadeIn-delay-4"
        >
          Your gateway to India's
          <br />
          <em className="text-gradient-gold">fastest growing</em> asset class.
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/40 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed animate-fadeIn"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Specialized Investment Funds — decoded, compared,
          and made accessible. Your first step starts here.
        </p>

        {/* Apple-style rounded CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
          style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link
            to="/funds"
            className="group px-8 py-4 bg-gradient-gold text-jericho text-sm font-bold tracking-wide rounded-2xl hover:shadow-gold-glow transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            Explore Funds
            <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </Link>
          <Link
            to="/learn"
            className="px-8 py-4 glass-dark text-white/70 text-sm font-medium tracking-wide rounded-2xl hover:bg-white/[0.08] hover:text-white transition-all duration-300 hover:scale-[1.02]"
          >
            What is SIF?
          </Link>
        </div>

        {/* Stats row — glass cards */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-16 animate-fadeIn"
          style={{ animationDelay: '1.3s', opacity: 0, animationFillMode: 'forwards' }}
          ref={aum.ref}
        >
          {[
            { value: `₹${aum.count.toLocaleString("en-IN")}Cr+`, label: "Total SIF AUM" },
            { value: "₹10L", label: "Min Investment" },
          ].map((stat, i) => (
            <div key={i} className="glass-dark rounded-2xl px-8 py-4 text-center">
              <p className="font-mono-data text-xl md:text-2xl text-gold font-medium">
                {stat.value}
              </p>
              <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase mt-1">{stat.label}</p>
            </div>
          ))}
          <div className="glass-dark rounded-2xl px-8 py-4 flex items-center justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              SEBI Regulated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
