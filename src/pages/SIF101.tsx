import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      "Specialized Investment Funds (SIFs) are a SEBI-regulated investment category designed to bridge the gap between traditional Mutual Funds and Portfolio Management Services (PMS). Earlier, investors had limited options: Mutual Funds with low minimum investments but basic strategies, or PMS requiring ₹50 lakh and offering advanced customization.",
      "There was no regulated middle ground for investors with ₹10–50 lakh seeking more sophisticated strategies. To address this, SEBI proposed the SIF framework in July 2024, finalized it in December 2024, issued operational guidelines in February 2025, and launched the first schemes in September 2025.",
      "SIFs enable asset management companies to offer advanced strategies — such as long-short equity, sector rotation, tactical allocation, and derivative-based approaches — within a mutual fund structure.",
      "They were also introduced in response to rising retail participation in F&O, where many investors faced losses due to leverage, complexity, and short-term trading behaviour. By embedding derivatives within professionally managed SEBI-supervised products, SIFs aim to provide structured, risk-managed access to sophisticated strategies while enhancing investor protection. This helps channel speculative retail flows into structured, risk-managed products.",
    ],
  },
  {
    id: 2,
    title: "SIF & Mutual Fund Operations",
    content: [
      "Similarities: SIFs are pooled funds under the MF regulatory umbrella — they disclose strategy documents, publish NAVs, follow MF-style governance, advertising, valuation norms, and can be structured as open-ended, interval, or close-ended vehicles. Close-ended SIFs must list units to provide exit.",
      "Key Difference: SIFs have a minimum investment of ₹10 lakh and permit advanced tools like long/short exposure and derivatives for alpha/hedging, within SEBI-set risk caps. The key differentiator is the ability to take short positions. SIFs can maintain up to 25% unhedged short exposure through derivatives, with a total gross exposure cap of 100% of NAV.",
      "SIP: You can run a SIP only after first meeting the ₹10 lakh minimum with an initial lump-sum. Once that threshold is satisfied, monthly SIPs can be set up. Operationally, it works like a mutual fund SIP, but the ₹10 lakh floor must stay intact.",
      "SWP and Switch: SWPs are allowed but treated as redemptions. If the SWP schedule pushes total SIF holding below ₹10 lakh, an active breach is triggered. Switches are restricted to SIF-to-SIF movements (within the SIF universe); switches from SIFs to MFs are not allowed.",
      "Active Breach: When the aggregate value of SIF holdings falls below ₹10 lakh due to investor-initiated transactions, all units are frozen for debit. A 30 calendar-day notice is given to rebalance back to at least ₹10 lakh. If not rebalanced within 30 days, the frozen units are automatically redeemed by the AMC.",
      "Passive Breach: If SIF holding slips below ₹10 lakh purely due to market movements, you do not have to top it back up. However, while below ₹10 lakh, any redemption must be an all-out exit — partial redemptions are not allowed.",
    ],
  },
  {
    id: 3,
    title: "Types of SIF Strategies",
    content: [
      "Equity Long-Short: The fund takes long positions (buying stocks expected to rise) and short positions (betting some will fall) in equities and equity derivatives. Examples: qSIF (Quant), iSIF (ICICI Prudential).",
      "Equity Ex-Top 100 Long-Short: Same long-short logic, but only in stocks outside the top 100 by market cap, targeting the mid/small cap space. Examples: qSIF Ex-Top 100 (Quant), iSIF Ex-100 (ICICI).",
      "Sector Rotation Long-Short: The fund focuses bets on certain sectors (industry groups), going long on sectors expected to outperform and shorting those expected to lag.",
      "Hybrid Long-Short: The fund holds both equity and debt, and applies long and short strategies within both. Examples: Magnum (SBI), Altiva (Edelweiss), Titanium (Tata).",
      "Restrictions: Each AMC can offer only one SIF strategy per category (equity, debt, or hybrid) — multiple variants within the same category are not allowed. Accredited investors may be exempt from the ₹10 lakh minimum investment requirement.",
    ],
  },
  {
    id: 4,
    title: "SIF vs MF: When Does Each Shine?",
    content: [
      "Raging Bull Markets: Equity MFs outperform because a long-only fund rides the full upside. SIFs may underperform because hedges, collars, and covered calls cap upside or create drag.",
      "Bull Markets: MFs benefit from beta >1. SIFs show moderate performance — keeping some protection and selective shorts reduces participation.",
      "Correction & Consolidation: Equity MFs struggle as sideways and down-blips hurt long-only strategies. SIFs outperform — protective puts, collars, short index futures, and options spreads clip drawdowns and reduce beta.",
      "Rangebound Markets: Long-only MFs struggle to create excess returns when prices churn. SIFs outperform by harvesting option premium and mean-reverting using option income and market-neutral pairs.",
      "Bear Markets: MFs draw down with the market. SIFs outperform — short/low beta stance and put spreads reduce net exposure and volatility.",
      "Volatile Markets: Long-only portfolios get whipsawed due to vol spikes. SIFs outperform — exposure can be adapted using dynamic hedging. In summary, SIFs are designed for more predictable returns across market cycles, not just bull runs.",
    ],
  },
  {
    id: 5,
    title: "Taxation Deep Dive",
    content: [
      "SIFs are taxed at the scheme level, identical to mutual funds. This is a major advantage over PMS' transaction-level taxation and AIF Category III's taxation at fund-level (Maximum Marginal Tax Rate: ~43%).",
      "Equity-oriented SIF (>65% in equity): STCG at 20% for holdings under 12 months. LTCG at 12.5% for holdings over 12 months, with gains up to ₹1.25 lakh being exempted.",
      "Debt-oriented SIF: Gains taxed at the investor's income tax slab rate regardless of holding period, with no indexation benefit.",
      "Hybrid-oriented SIF: LTCG at 12.5%.",
      "Worked example: ₹10 lakh invested at 15% annual return for 2 years. Total value: ₹13.22 lakh. Gain: ₹3.22 lakh. SIF LTCG tax: ~₹24,687. PMS equivalent tax (with churning): ~₹35,000+. AIF Cat III: ~₹96,750.",
    ],
  },
  {
    id: 6,
    title: "How to Invest in SIF",
    content: [
      "Through AMC platforms: Visit the mutual fund website (e.g., SBI MF, Quant MF) and look for SIF schemes under their product offerings.",
      "Through RTAs: Use CAMS or KFintech platforms to subscribe to SIF schemes through your existing folio or a new one.",
      "Through AMFI-registered SIF distributors: Work with a registered distributor (like Jericho Ventures) who can guide you on scheme selection and handle the paperwork.",
      "Once invested, SIPs, SWPs, STPs, and switches are available — but all subject to the ₹10 lakh minimum threshold being maintained at all times.",
    ],
  },
  {
    id: 7,
    title: "Risks and What to Watch",
    content: [
      "Market risk: Like all equity-linked products, SIFs are subject to market volatility. The short positions may partially hedge this but do not eliminate it.",
      "Strategy execution risk: The fund manager's ability to execute long-short strategies effectively. A poorly timed short can amplify losses.",
      "Liquidity risk: Some SIF schemes have redemption restrictions, notice periods, or interval-based redemption windows. Always check the scheme's terms before investing.",
      "Credit risk (for debt SIFs): Exposure to corporate bonds carries default risk. Risk bands on the SEBI Riskometer indicate the overall risk profile — always check before investing.",
    ],
  },
  {
    id: 8,
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
      color: "text-yellow-600",
    };
  }
  if (score <= 9) {
    return {
      title: "SIF Could Complement Your Portfolio",
      message: "A hybrid long-short fund would be a good starting point for lower volatility. Let us discuss which one fits best.",
      color: "text-emerald-600",
    };
  }
  if (score <= 13) {
    return {
      title: "SIF Aligns Well With Your Profile",
      message: "You could explore both equity and hybrid strategies depending on your market view. Schedule a call to discuss allocation.",
      color: "text-green-600",
    };
  }
  return {
    title: "Well-Positioned for SIF",
    message: "Consider allocating across multiple strategy types for diversification. Let us build a plan.",
    color: "text-gold",
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
      <div className="animate-fadeIn">
        <div className="glass-gold rounded-2xl p-8 mb-6">
          <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2 font-heading">Your Score: {totalScore}/16</p>
          <h3 className={`font-heading text-2xl font-bold mb-3 ${result.color}`}>{result.title}</h3>
          <p className="text-foreground/80 leading-relaxed mb-6">{result.message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity text-center rounded-xl"
            >
              Talk to Our Team
            </Link>
            <button
              onClick={() => { setAnswers(new Array(questions.length).fill(null)); setShowResult(false); }}
              className="px-6 py-3 border border-border text-muted-foreground font-semibold hover:text-foreground transition-colors text-center rounded-xl"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div
          key={qi}
          className="bg-white/60 backdrop-blur-sm border border-border rounded-2xl shadow-card p-6 animate-fadeIn"
          style={{ animationDelay: `${qi * 50}ms` }}
        >
          <p className="text-sm font-semibold text-foreground mb-4 font-heading">
            {qi + 1}. {q.question}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => selectAnswer(qi, opt.points)}
                className={`text-left px-4 py-3 text-sm border transition-all rounded-xl ${
                  answers[qi] === opt.points
                    ? "border-gold bg-gradient-to-r from-[#C9960C] to-[#E2B93B] text-white font-semibold shadow-md"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-gold/25 hover:bg-secondary"
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
        className={`w-full px-6 py-3 font-semibold transition-all rounded-xl ${
          allAnswered
            ? "bg-gradient-gold text-white hover:opacity-90 shadow-md"
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
        <div className="animate-fadeIn">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
            SIF 101
          </h1>
          <p className="text-muted-foreground text-lg mb-12">Your complete learning path to understanding Specialized Investment Funds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-2xl p-3 space-y-1 animate-fadeIn-delay-2">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-all rounded-xl ${
                    activeModule === m.id
                      ? "bg-gradient-to-r from-[#C9960C] to-[#E2B93B] text-white font-semibold shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="font-heading">Module {m.id}:</span> {m.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {modules
                .filter((m) => m.id === activeModule)
                .map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-foreground">
                      Module {m.id}: {m.title}
                    </h2>

                    {m.isQuestionnaire ? (
                      <RiskProfiler />
                    ) : (
                      <>
                        <div className="space-y-4 rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-6 md:p-8">
                          {m.content.map((para, i) => (
                            <p
                              key={i}
                              className="text-foreground/80 leading-relaxed animate-fadeIn"
                              style={{ animationDelay: `${i * 80}ms` }}
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                        <div className="mt-8 flex gap-3">
                          {m.id > 1 && (
                            <button
                              onClick={() => setActiveModule(m.id - 1)}
                              className="px-4 py-2 text-sm border border-border text-muted-foreground hover:text-foreground transition-colors rounded-xl"
                            >
                              Previous
                            </button>
                          )}
                          {m.id < modules.length && (
                            <button
                              onClick={() => setActiveModule(m.id + 1)}
                              className="px-4 py-2 text-sm bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity rounded-xl"
                            >
                              Next Module
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIF101;
