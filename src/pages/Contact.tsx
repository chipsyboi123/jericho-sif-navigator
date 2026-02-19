import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [investorType, setInvestorType] = useState<"investor" | "distributor">("investor");

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Get <span className="text-gradient-gold">Started</span>
          </h1>
          <p className="text-muted-foreground mb-10">Tell us about yourself and we'll guide you to the right SIF strategy.</p>
        </motion.div>

        <div className="bg-card border border-border rounded-lg p-8">
          {/* Type toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setInvestorType("investor")}
              className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
                investorType === "investor"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm an Investor
            </button>
            <button
              onClick={() => setInvestorType("distributor")}
              className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
                investorType === "distributor"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm a Distributor
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">First Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Last Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input type="email" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
              <input type="tel" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {investorType === "investor" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Investable Amount</label>
                  <select className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>₹10L - ₹25L</option>
                    <option>₹25L - ₹50L</option>
                    <option>₹50L - ₹1 Cr</option>
                    <option>₹1 Cr+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Investment Horizon</label>
                  <select className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
              </>
            )}

            {investorType === "distributor" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">ARN Number</label>
                <input type="text" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message (Optional)</label>
              <textarea rows={3} className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
