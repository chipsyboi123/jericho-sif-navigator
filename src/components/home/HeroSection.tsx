import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-sif.jpg";

const HeroSection = () => {
  const tickerItems = [
    "9 SIF Schemes Launched",
    "6 AMCs Active",
    "Rs 10L Minimum Investment",
    "Up to 25% Short Exposure",
    "SEBI Regulated",
    "Scheme-Level Taxation",
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="City skyline at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" />
      </div>

      <div className="relative container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold italic leading-[1.1] mb-8 text-white">
            Navigate SIF with Confidence.
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-xl font-light">
            India's newest SEBI-regulated asset class, explained and accessible. Compare strategies, track performance, and invest through Jericho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/funds"
              className="px-7 py-3.5 bg-navy/70 border border-white/15 text-white font-semibold hover:bg-navy/90 hover:border-gold/30 transition-all text-center backdrop-blur-sm"
            >
              Explore SIF Funds &rarr;
            </Link>
            <Link
              to="/sif-101"
              className="px-7 py-3.5 border border-white/15 text-white/80 font-medium hover:text-white hover:border-white/30 transition-all text-center backdrop-blur-sm"
            >
              New to SIF? Start Here
            </Link>
          </div>
          <p className="text-xs text-white/40 tracking-wider uppercase">
            AMFI Registered &bull; SEBI Regulated &bull; Institutional Grade
          </p>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy/80 backdrop-blur-sm border-t border-white/5 py-3 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap gap-8">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm text-white/45 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
