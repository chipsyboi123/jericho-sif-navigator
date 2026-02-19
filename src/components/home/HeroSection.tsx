import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-sif.jpg";

const HeroSection = () => {
  const tickerItems = [
    "10 SIF Schemes Launched",
    "7 AMCs Active",
    "₹10L Minimum Investment",
    "Up to 25% Short Exposure",
    "SEBI Regulated",
    "Scheme-Level Taxation",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-accent">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="City skyline at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/10" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-accent-foreground">
            Navigate SIF with{" "}
            <span className="text-gradient-gold">Confidence</span>
          </h1>
           <p className="text-lg md:text-xl text-accent-foreground/70 leading-relaxed mb-8 max-w-xl">
             India's newest SEBI-regulated asset class, explained and accessible. Compare strategies, track performance, and invest through Jericho.
           </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              to="/funds"
              className="px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-center"
            >
              Explore SIF Funds
            </Link>
            <Link
              to="/sif-101"
              className="px-6 py-3 border border-gold/30 text-accent-foreground font-semibold rounded-md hover:bg-gold/10 transition-colors text-center"
            >
              New to SIF? Start Here
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-accent/80 backdrop-blur-sm border-t border-accent-foreground/10 py-3 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap gap-8">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm text-accent-foreground/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
