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
    detail: "Your Jericho advisor works with you to understand your full financial picture, not just your SIF allocation. We recommend only what fits.",
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
      <SEOHead title="Why Jericho" description="Jericho is not an aggregator. We are your SIF advisor. Research-led conviction, full transparency, and guided investing for HNIs." />
      {/* Hero */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Why Jericho</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-accent-foreground">
              Not an aggregator.{" "}
              <span className="text-gradient-gold">Your SIF advisor.</span>
            </h1>
            <p className="text-lg text-accent-foreground/70 leading-relaxed max-w-2xl">
              SIF is new territory for most investors. You need more than a comparison table. You need someone who understands these strategies, tracks fund manager performance, and helps you build the right allocation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              What Sets Us <span className="text-gradient-gold">Apart</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border p-8 hover:border-primary/30 transition-colors"
              >
                <pillar.icon className="w-10 h-10 text-primary mb-5" />
                <h3 className="font-serif text-xl font-bold mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pillar.description}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{pillar.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Our <span className="text-gradient-gold">Process</span>
            </h2>
            <p className="text-muted-foreground">From first conversation to ongoing portfolio monitoring.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary/30 font-serif">{step.step}</span>
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Is SIF Right for You? */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Is SIF Right for <span className="text-gradient-gold">You?</span>
            </h2>
            <p className="text-muted-foreground">A quick self-check before you explore further.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeIn} transition={{ duration: 0.4 }} className="bg-card border border-border p-8">
              <h3 className="font-serif text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Consider SIF if you...
              </h3>
              <ul className="space-y-3">
                {suitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 bg-green-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }} className="bg-card border border-border p-8">
              <h3 className="font-serif text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                SIF may not be right if you...
              </h3>
              <ul className="space-y-3">
                {notSuitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 bg-red-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn} transition={{ duration: 0.6 }}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-accent-foreground">
              Ready to explore <span className="text-gradient-gold">SIF?</span>
            </h2>
            <p className="text-accent-foreground/60 mb-8 max-w-xl mx-auto">
              Talk to our team. We will assess your profile, recommend the right strategies, and handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Schedule a Consultation
              </Link>
              <Link
                to="/sif-101"
                className="px-8 py-3 border border-gold/30 text-accent-foreground font-semibold hover:bg-gold/10 transition-colors"
              >
                Take the Risk Profiler
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyJerichoPage;
