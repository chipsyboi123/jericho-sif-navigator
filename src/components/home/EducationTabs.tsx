import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const questions = [
  {
    num: "01",
    q: "What is a Specialized Investment Fund?",
    a: "A new SEBI category that gives you hedge fund-level strategies — long-short, derivatives, tactical allocation — with the same pass-through taxation as your regular mutual fund. Entry at ₹10 lakh.",
  },
  {
    num: "02",
    q: "Why should you care?",
    a: "Because your FD returns 7%. Nifty swings 20% a year. SIFs aim to make money in both directions — up and down — with lower volatility than pure equity. It's the asset class between MFs and PMS that didn't exist until 2025.",
  },
  {
    num: "03",
    q: "How is it taxed?",
    a: "Exactly like equity mutual funds. 12.5% LTCG after 12 months. 20% STCG before that. No fund-level taxation. That's what makes SIF dramatically better than a Cat III AIF, which gets taxed at 42.7%.",
  },
];

const EducationTabs = () => {
  return (
    <section className="py-32 bg-[#f5f5f0]">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-[11px] tracking-[0.35em] uppercase mb-16"
        >
          The Basics
        </motion.p>

        <div className="space-y-0">
          {questions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid grid-cols-12 gap-6 md:gap-10 py-12 border-b border-black/[0.06] first:border-t"
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-editorial text-4xl md:text-5xl text-gold/30">{item.num}</span>
              </div>

              {/* Question */}
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-editorial text-2xl md:text-3xl text-foreground leading-snug">
                  {item.q}
                </h3>
              </div>

              {/* Answer */}
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            to="/learn"
            className="text-sm text-foreground font-medium border-b border-foreground/20 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            Read the full SIF guide &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationTabs;
