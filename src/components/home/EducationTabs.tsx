import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    num: "01",
    q: "What is a Specialized Investment Fund?",
    a: "A new SEBI category that gives you hedge fund-level strategies — long-short, derivatives, tactical allocation — with the same pass-through taxation as your regular mutual fund. Entry at ₹10 lakh.",
    expandable: null,
  },
  {
    num: "02",
    q: "Why should you care?",
    a: "Because your FDs return 4.5% to 6.5% post-tax. Equity markets swing >20% a year. SIFs aim to make money in both directions — up and down — with lower volatility than pure equity. It's the asset class between Debt & Arbitrage MFs and Category III AIFs that didn't exist until 2025.",
    expandable: null,
  },
  {
    num: "03",
    q: "How is it taxed?",
    a: 'Just like mutual funds. Most products have 12.5% LTCG after 12 months, with STCG or Marginal Rate of Taxation if redeemed before 12 months. No fund-level taxation. That\'s what makes SIF dramatically better than a Cat III AIF, where the same strategy would get taxed at 42.7%.',
    expandable: {
      trigger: "No fund-level taxation",
      content: "No tax needs to be paid when your Mutual Fund Managers buy and sell stocks within the fund — tax is paid only when you sell the units of the mutual fund. This is called pass-through taxation.\n\nConversely, in case of Category III AIFs, the fund pays tax on your behalf, which can often lead to a higher tax impact on returns due to portfolio movements within the fund.",
    },
  },
];

const EducationTabs = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-[11px] tracking-[0.3em] uppercase mb-14"
        >
          The Basics
        </motion.p>

        <div className="space-y-0">
          {questions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-6 md:gap-10 py-10 border-b border-border first:border-t"
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-editorial text-3xl md:text-4xl text-gold/25">{item.num}</span>
              </div>

              {/* Question */}
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-editorial text-xl md:text-2xl text-jericho leading-snug">
                  {item.q}
                </h3>
              </div>

              {/* Answer */}
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {item.expandable ? (
                    <>
                      {item.a.split(item.expandable.trigger).map((part, j, arr) => (
                        <span key={j}>
                          {part}
                          {j < arr.length - 1 && (
                            <button
                              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                              className="text-gold font-medium underline decoration-gold/30 underline-offset-2 hover:decoration-gold/60 transition-all cursor-pointer mx-0.5"
                            >
                              {item.expandable!.trigger}
                              <span className="text-[10px] ml-1">{expandedIdx === i ? "▲" : "▼"}</span>
                            </button>
                          )}
                        </span>
                      ))}
                    </>
                  ) : (
                    item.a
                  )}
                </p>

                {/* Expandable panel */}
                <AnimatePresence>
                  {item.expandable && expandedIdx === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-5 bg-gold/[0.04] border border-gold/10">
                        <p className="text-[10px] text-gold tracking-[0.2em] uppercase font-semibold mb-3">
                          What is pass-through taxation?
                        </p>
                        {item.expandable.content.split("\n\n").map((para, k) => (
                          <p key={k} className="text-sm text-foreground/70 leading-relaxed mb-2 last:mb-0">
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <Link
            to="/learn"
            className="text-sm text-jericho font-medium border-b border-jericho/15 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            Read the full SIF guide &rarr;
          </Link>
          <span className="text-xs text-muted-foreground/60">
            Learn everything you need to know in less than 15 minutes.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationTabs;
