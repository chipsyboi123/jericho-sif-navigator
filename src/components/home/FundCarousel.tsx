import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useLaunchedFunds } from "@/hooks/useFunds";

const FundCarousel = () => {
  const { data: launchedFunds } = useLaunchedFunds();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-foreground">
            SIF Funds at a Glance
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore all launched Specialized Investment Fund schemes across AMCs.
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {launchedFunds.map((fund, i) => (
            <motion.div
              key={fund.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="min-w-[300px] bg-white border border-[#E5E2DB] shadow-card hover:shadow-card-hover p-6 flex flex-col gap-3 hover:border-gold/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">{fund.amcName}</span>
                <span className={`text-xs font-bold ${getRiskColor(fund.riskBand)}`}>
                  Risk: {fund.riskBand}/5
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">{fund.sifBrand}</h3>
              <span className="text-xs text-muted-foreground bg-[#F8F6F1] px-2 py-1 w-fit">{fund.strategyType}</span>
              <div className="flex items-baseline justify-between mt-auto pt-4 border-t border-[#E5E2DB]">
                <div>
                  <p className="text-xs text-muted-foreground">NAV</p>
                  <p className="text-lg font-semibold text-foreground">{fund.nav}</p>
                </div>
                <Link
                  to={`/funds/${fund.id}`}
                  className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/funds" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
            View All Funds in Fund Explorer &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FundCarousel;
