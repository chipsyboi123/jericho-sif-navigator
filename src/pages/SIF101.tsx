import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

interface Module {
  id: number;
  title: string;
  content: string[];
  isQuestionnaire?: boolean;
}

const modules: Module[] = [
  {
    id: 1,
    title: "What Are SIFs and Why They Exist",
    content: [
      "Specialized Investment Funds (SIFs) are a new SEBI-regulated investment category introduced to bridge the gap between mutual funds and Portfolio Management Services (PMS).",
      "Before SIF, investors had limited options: mutual funds (min Rs 100, limited strategies) or PMS (min Rs 50 lakh, full customization). There was no middle ground for investors with Rs 10-50 lakh who wanted advanced strategies within a regulated framework.",
      "SEBI proposed the SIF framework in July 2024, finalized regulations in December 2024, published the operational framework in February 2025, and the first SIF schemes went live in April 2025.",
      "SIFs allow AMCs to deploy advanced strategies like long-short equity, sector rotation, and tactical allocation, previously only available through PMS and AIF, within the familiar mutual fund structure.",
    ],
  },
  {
    id: 2,
    title: "How SIF Works",
    content: [
      "SIFs operate within the mutual fund framework but with expanded investment capabilities. They can be structured as open-ended, interval, or close-ended funds.",
      "The key differentiator is the ability to take short positions. SIFs can maintain up to 25% unhedged short exposure through derivatives, with a total gross exposure cap of 100% of NAV.",
      "For example, a fund with Rs 100 crore NAV can hold Rs 80 crore in long equity positions and Rs 20 crore in short futures/options positions, creating a net market exposure that can be dynamically adjusted.",
      "This enables strategies like long-short equity (profiting from both rising and falling stocks), sector rotation (dynamically shifting between sectors), and active asset allocation (tactical shifts between equity, debt, and derivatives).",
    ],
  },
  {
    id: 3,
    title: "Types of SIF Strategies",
    content: [
      "Equity Long-Short: Takes long positions in stocks expected to rise and short positions in stocks expected to fall. Examples: qSIF (Quant), iSIF (ICICI Prudential).",
      "Hybrid Long-Short: Combines equity and debt with selective hedging. More conservative than pure equity long-short. Examples: Magnum (SBI), Altiva (Edelweiss), Titanium (Tata).",
      "Equity Ex-Top 100 Long-Short: Focuses on mid and small cap stocks outside the top 100, with short hedging. Higher risk-reward profile. Examples: qSIF Ex-Top 100 (Quant), iSIF Ex-100 (ICICI).",
      "Sector Rotation Long-Short: Dynamically shifts between sectors based on macro outlook, using shorts to hedge sector bets. Coming soon from multiple AMCs.",
    ],
  },
  {
    id: 4,
    title: "Taxation Deep Dive",
    content: [
      "SIFs are taxed at the scheme level, identical to mutual funds. This is a major advantage over PMS (transaction-level taxation) and certain AIF categories.",
      "Equity-oriented SIF (>65% in equity): STCG at 20% for holdings under 12 months. LTCG at 12.5% for holdings over 12 months, with gains up to Rs 1.25 lakh exempt.",
      "Debt-oriented SIF: Gains taxed at the investor's income tax slab rate regardless of holding period. No indexation benefit.",
      "Worked example: Rs 10 lakh invested at 15% annual return for 2 years. Total value: Rs 13.22 lakh. Gain: Rs 3.22 lakh. SIF LTCG tax: Rs 24,687. PMS equivalent tax (with churning): approximately Rs 35,000+. AIF Cat III: approximately Rs 96,750.",
    ],
  },
  {
    id: 5,
    title: "How to Invest in SIF",
    content: [
      "Through AMC platforms: Visit the mutual fund website (e.g., SBI MF, Quant MF) and look for SIF schemes under their product offerings.",
      "Through RTAs: Use CAMS or KFintech platforms to subscribe to SIF schemes through your existing folio or a new one.",
      "Through AMFI-registered SIF distributors: Work with a registered distributor (like Jericho) who can guide you on scheme selection and handle the paperwork.",
      "SIP/SWP/STP options are available but must meet the Rs 10 lakh minimum threshold. You can start a SIP of Rs 25,000/month if you commit to the Rs 10 lakh minimum over the SIP tenure.",
    ],
  },
  {
    id: 6,
    title: "Risks and What to Watch",
    content: [
      "Market risk: Like all equity-linked products, SIFs are subject to market volatility. The short positions may partially hedge this but do not eliminate it.",
      "Strategy execution risk: The fund manager's ability to execute long-short strategies effectively. A poorly timed short can amplify losses.",
      "Liquidity risk: Some SIF schemes have redemption restrictions, notice periods, or interval-based redemption windows. Check the scheme's terms.",
      "Credit risk (for debt SIFs): Exposure to corporate bonds carries default risk. Risk bands (1-5) indicate the overall risk profile. Always check before investing.",
    ],
  },
  {
    id: 7,
    title: "Is SIF Right for You?",
    content: [],
    isQuestionnaire: true,
  },
];

// Risk Profiler Component
const questions = [
  {
    question: "Total investable surplus beyond your emergency fund",
    options: [
      { label: "Under Rs 10 lakh", points: 0 },
      { label: "Rs 10-25 lakh", points: 1 },
      { label: "Rs 25-50 lakh", points: 2 },
      { label: "Rs 50 lakh - Rs 1 crore", points: 3 },
      { label: "Above Rs 1 crore", points: 4 },
    ],
  },
  {
    question: "How long can you stay invested without needing this capital?",
    options: [
      { label: "Less than 1 year", points: 0 },
      { label: "1-3 years", points: 1 },
      { label: "3-5 years", points: 2 },
      { label: "5+ years", points: 3 },
    ],
  },
  {
    question: "If your portfolio dropped 15% in a single quarter, how would you react?",
    options: [
      { label: "Sell immediately to cut losses", points: 0 },
      { label: "Feel anxious but hold", points: 1 },
      { label: "Stay calm, this is normal", points: 2 },
      { label: "Invest more at lower prices", points: 3 },
    ],
  },
  {
    question: "How well do you understand derivatives (futures, options)?",
    options: [
      { label: "Never heard of them", points: 0 },
      { label: "Basic awareness", points: 1 },
      { label: "Good understanding", points: 2 },
      { label: "Actively trade derivatives", points: 3 },
    ],
  },
  {
    question: "What does your current investment portfolio look like?",
    options: [
      { label: "Mostly FDs and savings", points: 0 },
      { label: "Mutual funds only", points: 1 },
      { label: "Mutual funds + direct stocks", points: 2 },
      { label: "Mutual funds + PMS/AIF", points: 3 },
    ],
  },
];

function getResult(score: number) {
  if (score <= 4) {
    return {
      title: "Building Your Foundation",
      message: "SIF may not be suitable right now. Consider building a diversified mutual fund portfolio first, and talk to us when you are ready to explore further.",
      color: "text-yellow-400",
    };
  }
  if (score <= 9) {
    return {
      title: "SIF Could Complement Your Portfolio",
      message: "A hybrid long-short fund would be a good starting point for lower volatility. Let us discuss which one fits best.",
      color: "text-emerald-400",
    };
  }
  if (score <= 13) {
    return {
      title: "SIF Aligns Well With Your Profile",
      message: "You could explore both equity and hybrid strategies depending on your market view. Schedule a call to discuss allocation.",
      color: "text-green-400",
    };
  }
  return {
    title: "Well-Positioned for SIF",
    message: "Consider allocating across multiple strategy types for diversification. Let us build a plan.",
    color: "text-primary",
  };
}

const RiskProfiler = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const totalScore = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
  const result = getResult(totalScore);

  const selectAnswer = (qIndex: number, points: number) => {
    const next = [...answers];
    next[qIndex] = points;
    setAnswers(next);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="bg-card border border-border p-8 mb-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Your Score: {totalScore}/16</p>
          <h3 className={`font-serif text-2xl font-bold mb-3 ${result.color}`}>{result.title}</h3>
          <p className="text-foreground/80 leading-relaxed mb-6">{result.message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Talk to Our Team
            </Link>
            <button
              onClick={() => { setAnswers(new Array(questions.length).fill(null)); setShowResult(false); }}
              className="px-6 py-3 border border-border text-muted-foreground font-semibold hover:text-foreground transition-colors text-center"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={qi} className="bg-card border border-border p-6">
          <p className="text-sm font-semibold text-foreground mb-4">
            {qi + 1}. {q.question}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => selectAnswer(qi, opt.points)}
                className={`text-left px-4 py-3 text-sm border transition-colors ${
                  answers[qi] === opt.points
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => setShowResult(true)}
        disabled={!allAnswered}
        className={`w-full px-6 py-3 font-semibold transition-opacity ${
          allAnswered
            ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
            : "bg-secondary text-muted-foreground cursor-not-allowed"
        }`}
      >
        {allAnswered ? "See My Result" : "Answer all questions to continue"}
      </button>
    </div>
  );
};

const SIF101 = () => {
  const [activeModule, setActiveModule] = useState(1);

  return (
    <div className="py-20">
      <SEOHead title="SIF 101: What is a Specialized Investment Fund?" description="Learn everything about SIFs. Investment minimums, strategies, taxation, risk bands, and how SIFs compare to PMS and AIF." />
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            SIF <span className="text-gradient-gold">101</span>
          </h1>
          <p className="text-muted-foreground mb-12">Your complete learning path to understanding Specialized Investment Funds.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-1">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    activeModule === m.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  Module {m.id}: {m.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {modules
              .filter((m) => m.id === activeModule)
              .map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                    Module {m.id}: {m.title}
                  </h2>

                  {m.isQuestionnaire ? (
                    <RiskProfiler />
                  ) : (
                    <>
                      <div className="space-y-4">
                        {m.content.map((para, i) => (
                          <p key={i} className="text-foreground/80 leading-relaxed">{para}</p>
                        ))}
                      </div>
                      <div className="mt-8 flex gap-3">
                        {m.id > 1 && (
                          <button
                            onClick={() => setActiveModule(m.id - 1)}
                            className="px-4 py-2 text-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Previous
                          </button>
                        )}
                        {m.id < modules.length && (
                          <button
                            onClick={() => setActiveModule(m.id + 1)}
                            className="px-4 py-2 text-sm bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                          >
                            Next Module
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIF101;
