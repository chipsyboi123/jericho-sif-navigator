import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "What Are SIFs and Why They Exist",
    content: [
      "Specialized Investment Funds (SIFs) are a new SEBI-regulated investment category introduced to bridge the gap between mutual funds and Portfolio Management Services (PMS).",
      "Before SIF, investors had limited options: mutual funds (min ₹100, limited strategies) or PMS (min ₹50 lakh, full customization). There was no middle ground for investors with ₹10-50 lakh who wanted advanced strategies within a regulated framework.",
      "SEBI proposed the SIF framework in July 2024, finalized regulations in December 2024, published the operational framework in February 2025, and the first SIF schemes went live in April 2025.",
      "SIFs allow AMCs to deploy advanced strategies like long-short equity, sector rotation, and tactical allocation — previously only available through PMS and AIF — within the familiar mutual fund structure.",
    ],
  },
  {
    id: 2,
    title: "How SIF Works",
    content: [
      "SIFs operate within the mutual fund framework but with expanded investment capabilities. They can be structured as open-ended, interval, or close-ended funds.",
      "The key differentiator is the ability to take short positions. SIFs can maintain up to 25% unhedged short exposure through derivatives, with a total gross exposure cap of 100% of NAV.",
      "For example, a fund with ₹100 crore NAV can hold ₹80 crore in long equity positions and ₹20 crore in short futures/options positions, creating a net market exposure that can be dynamically adjusted.",
      "This enables strategies like long-short equity (profiting from both rising and falling stocks), sector rotation (dynamically shifting between sectors), and active asset allocation (tactical shifts between equity, debt, and derivatives).",
    ],
  },
  {
    id: 3,
    title: "Types of SIF Strategies",
    content: [
      "Equity Long-Short: Takes long positions in stocks expected to rise and short positions in stocks expected to fall. Examples: qSIF (Quant), Diviniti (ICICI Prudential).",
      "Hybrid Long-Short: Combines equity and debt with selective hedging. More conservative than pure equity long-short. Examples: Magnum (SBI), Altiva (Edelweiss), Titanium (Tata).",
      "Equity Ex-Top 100 Long-Short: Focuses on mid and small cap stocks outside the top 100, with short hedging. Higher risk-reward profile. Examples: qSIF Ex-Top 100 (Quant).",
      "Sector Rotation Long-Short: Dynamically shifts between sectors based on macro outlook, using shorts to hedge sector bets. Coming soon from multiple AMCs.",
    ],
  },
  {
    id: 4,
    title: "Taxation Deep Dive",
    content: [
      "SIFs are taxed at the scheme level, identical to mutual funds. This is a major advantage over PMS (transaction-level taxation) and certain AIF categories.",
      "Equity-oriented SIF (>65% in equity): STCG at 20% for holdings under 12 months. LTCG at 12.5% for holdings over 12 months, with gains up to ₹1.25 lakh exempt.",
      "Debt-oriented SIF: Gains taxed at the investor's income tax slab rate regardless of holding period. No indexation benefit.",
      "Worked example: ₹10 lakh invested at 15% annual return for 2 years → Total value: ₹13.22 lakh → Gain: ₹3.22 lakh → SIF LTCG tax: ₹24,687 → PMS equivalent tax (with churning): ~₹35,000+ → AIF Cat III: ~₹96,750.",
    ],
  },
  {
    id: 5,
    title: "How to Invest in SIF",
    content: [
      "Through AMC platforms: Visit the mutual fund website (e.g., SBI MF, Quant MF) and look for SIF schemes under their product offerings.",
      "Through RTAs: Use CAMS or KFintech platforms to subscribe to SIF schemes through your existing folio or a new one.",
      "Through AMFI-registered SIF distributors: Work with a registered distributor (like Jericho) who can guide you on scheme selection and handle the paperwork.",
      "SIP/SWP/STP options are available but must meet the ₹10 lakh minimum threshold. You can start a SIP of ₹25,000/month if you commit to the ₹10 lakh minimum over the SIP tenure.",
    ],
  },
  {
    id: 6,
    title: "Risks and What to Watch",
    content: [
      "Market risk: Like all equity-linked products, SIFs are subject to market volatility. The short positions may partially hedge this but don't eliminate it.",
      "Strategy execution risk: The fund manager's ability to execute long-short strategies effectively. A poorly timed short can amplify losses.",
      "Liquidity risk: Some SIF schemes have redemption restrictions, notice periods, or interval-based redemption windows. Check the scheme's terms.",
      "Credit risk (for debt SIFs): Exposure to corporate bonds carries default risk. Risk bands (1-5) indicate the overall risk profile — always check before investing.",
    ],
  },
];

const SIF101 = () => {
  const [activeModule, setActiveModule] = useState(1);

  return (
    <div className="py-20">
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
                  className={`w-full text-left px-4 py-3 text-sm rounded-md transition-colors ${
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
                  <div className="space-y-4">
                    {m.content.map((para, i) => (
                      <p key={i} className="text-foreground/80 leading-relaxed">{para}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-3">
                    {m.id > 1 && (
                      <button
                        onClick={() => setActiveModule(m.id - 1)}
                        className="px-4 py-2 text-sm border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← Previous
                      </button>
                    )}
                    {m.id < modules.length && (
                      <button
                        onClick={() => setActiveModule(m.id + 1)}
                        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition-opacity"
                      >
                        Next Module →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Risk Profiler teaser */}
        <div className="mt-20 bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl font-bold mb-3">
            Is SIF Right for <span className="text-gradient-gold">You?</span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Take our quick risk profiling questionnaire to assess whether SIF is suitable for your investment goals.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SIF101;
