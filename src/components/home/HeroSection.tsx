import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#F8F6F1]">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8EC]/60 via-transparent to-[#F0EDE6]/40" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8D5A3]/10 to-transparent" />

      <div className="relative container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold italic leading-[1.1] mb-8 text-foreground">
            Navigate SIF with Confidence.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl font-light">
            India's newest SEBI-regulated asset class, explained and accessible. Compare strategies, track performance, and invest through Jericho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/funds"
              className="px-7 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Explore SIF Funds &rarr;
            </Link>
            <Link
              to="/sif-101"
              className="px-7 py-3.5 border border-foreground/20 text-foreground font-medium hover:border-gold hover:text-gold transition-all text-center"
            >
              New to SIF? Start Here
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/60 tracking-wider uppercase">
            AMFI Registered &bull; SEBI Regulated &bull; Institutional Grade
          </p>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E2DB] py-3 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap gap-8">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm text-muted-foreground flex items-center gap-2">
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
