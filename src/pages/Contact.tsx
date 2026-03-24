import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [searchParams] = useSearchParams();
  const prefillFund = searchParams.get("fund") || "";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investableAmount, setInvestableAmount] = useState("");
  const [horizon, setHorizon] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [message, setMessage] = useState(prefillFund ? `Interested in ${prefillFund}` : "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await apiFetch("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone: phone || null,
          investment_range: investableAmount || null,
          investment_horizon: horizon || null,
          source: howHeard || null,
          message: message || null,
          source_page: "/contact",
        }),
      });
    } catch (dbError: any) {
      console.error("Lead submission failed:", dbError);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 bg-cream min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="glass-gold rounded-2xl p-10 md:p-14">
              <h1 className="font-display text-4xl md:text-5xl font-semibold italic mb-4 text-foreground">
                Thank You
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                We have received your inquiry. Our advisory team will reach out within 24 hours to discuss your SIF investment goals.
              </p>
              <a
                href="/"
                className="inline-block px-7 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity rounded-xl"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-white/80 border border-border text-foreground text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all";

  return (
    <div className="py-24 bg-cream min-h-screen">
      <SEOHead title="Contact Us" description="Schedule a consultation with SIF Insider's advisory team. Get personalized guidance on Specialized Investment Fund allocation." noIndex={true} />
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl md:text-5xl font-semibold italic mb-3 text-foreground">
            Start a Conversation
          </h1>
          <p className="text-muted-foreground text-lg mb-10">Tell us about yourself and we will guide you to the right SIF strategy.</p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card rounded-2xl p-8 md:p-10"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">First Name</label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Last Name</label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Investable Amount</label>
              <select value={investableAmount} onChange={(e) => setInvestableAmount(e.target.value)} className={inputClasses}>
                <option value="">Select range</option>
                <option>Rs 10L - Rs 25L</option>
                <option>Rs 25L - Rs 50L</option>
                <option>Rs 50L - Rs 1 Cr</option>
                <option>Rs 1 Cr+</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Investment Horizon</label>
              <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className={inputClasses}>
                <option value="">Select horizon</option>
                <option>1-3 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">How did you hear about SIF?</label>
              <select value={howHeard} onChange={(e) => setHowHeard(e.target.value)} className={inputClasses}>
                <option value="">Select one</option>
                <option>Advisor recommendation</option>
                <option>Online research</option>
                <option>Social media</option>
                <option>Friend or family</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block font-heading">Message (Optional)</label>
              <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClasses} resize-none`} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-6 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all rounded-xl shadow-md ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Submitting..." : "Schedule a Consultation"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
