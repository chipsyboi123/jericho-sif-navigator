import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { Search, Shield, Eye, ClipboardCheck, Target, FileText, BarChart3, CheckCircle2, XCircle } from "lucide-react";

const pillars = [
  {
    icon: Search,
    title: "Research-Led Conviction",
    description:
      "We analyze every SIF strategy, benchmark its approach, and track fund manager performance across market cycles. Our recommendations are backed by data, not sales targets.",
    detail: "We study scheme documents, track portfolio disclosures, and compare strategies against their benchmarks to form independent views on what works.",
  },
  {
    icon: Shield,
    title: "Advisor-First Approach",
    description:
      "Not every SIF is right for every investor. We assess your goals, risk appetite, and existing portfolio before recommending anything.",
    detail: "Your SIF Insider advisor works with you to understand your full financial picture, not just your SIF allocation. We recommend only what fits.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description:
      "Risk bands, exit loads, redemption terms, tax implications. We lay it all out so you can make informed decisions with zero surprises.",
    detail: "No hidden fees, no confusing jargon. Every fund on our platform shows its complete terms, and we explain what they mean for your investment.",
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Assess",
    description: "Understand your goals, risk appetite, and existing portfolio. We identify where SIF fits in your overall allocation.",
  },
  {
    icon: Target,
    step: "02",
    title: "Recommend",
    description: "Shortlist SIF strategies that match your profile. We explain why each one works for you and what to expect.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Execute",
    description: "Handle the paperwork, allocation, and subscription process. We make investing in SIF as smooth as mutual funds.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Monitor",
    description: "Ongoing review and rebalancing guidance. We track your SIF holdings and alert you when action is needed.",
  },
];

const suitableFor = [
  "Investable surplus above Rs 10 lakh",
  "Can stay invested for 3+ years",
  "Want advanced strategies in a regulated wrapper",
  "Comfortable with moderate liquidity constraints",
];

const notSuitableFor = [
  "Need daily liquidity for your investment",
  "Investable surplus under Rs 10 lakh",
  "Very conservative risk appetite",
  "Unfamiliar with equity markets",
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const WhyJerichoPage = () => {
  return (
    <div>
      <SEOHead title="About SIF Insider" description="SIF Insider is not an aggregator. We are your SIF advisor. Research-led conviction, full transparency, and guided investing for HNIs. Powered by Jericho Ventures." />
      {/* Hero */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-4 font-heading">About SIF Insider</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold italic mb-6 text-foreground leading-tight">
              Not an aggregator. Your SIF advisor.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              SIF is new territory for most investors. You need more than a comparison table. You need someone who understands these strategies, tracks fund manager performance, and helps you build the right allocation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:shadow-card-hover hover:border-gold/30 transition-all"
              >
                <pillar.icon className="w-8 h-8 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pillar.description}</p>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Our Process
            </h2>
            <p className="text-muted-foreground text-lg">From first conversation to ongoing portfolio monitoring.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-sm border border-border rounded-2xl shadow-card p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9960C] to-[#E2B93B] text-white text-sm font-bold font-heading shadow-md">
                    {step.step}
                  </span>
                  <step.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Is SIF Right for You? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Is SIF Right for You?
            </h2>
            <p className="text-muted-foreground text-lg">A quick self-check before you explore further.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="glass-card rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Consider SIF if you...
              </h3>
              <ul className="space-y-3">
                {suitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }} className="glass-card rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                SIF may not be right if you...
              </h3>
              <ul className="space-y-3">
                {notSuitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Dark section */}
      <section className="py-24 bg-[#0F1629]">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }}>
            <div className="glass-dark rounded-2xl p-12 md:p-16 max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-semibold italic mb-4 text-white leading-tight">
                Ready to explore SIF?
              </h2>
              <p className="text-white/45 mb-10 max-w-xl mx-auto text-lg">
                Talk to our team. We will assess your profile, recommend the right strategies, and handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity rounded-xl"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  to="/sif-101"
                  className="px-8 py-3.5 border border-white/15 text-white/80 font-medium hover:text-white hover:border-white/30 transition-colors rounded-xl"
                >
                  Take the Risk Profiler
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Powered by Jericho Ventures */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
            <p className="text-sm text-muted-foreground mb-2 font-heading uppercase tracking-wider">Powered by</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Jericho Ventures</h3>
            <p className="text-muted-foreground text-base max-w-lg mx-auto">
              SIF Insider is built and operated by Jericho Ventures, an AMFI-registered SIF distributor committed to research-led, transparent advisory for Indian HNIs.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyJerichoPage;
