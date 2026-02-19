import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import SEOHead from "@/components/SEOHead";

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

    const { error: dbError } = await supabase.from("leads").insert({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: phone || null,
      investment_range: investableAmount || null,
      investment_horizon: horizon || null,
      source: howHeard || null,
      message: message || null,
      source_page: "/contact",
    });

    if (dbError) {
      console.error("Lead submission failed:", dbError);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold italic mb-4 text-foreground">
              Thank You
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              We have received your inquiry. Our advisory team will reach out within 24 hours to discuss your SIF investment goals.
            </p>
            <a
              href="/"
              className="inline-block px-7 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-[#F8F6F1] border border-[#E5E2DB] text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/30 transition-colors";

  return (
    <div className="py-24">
      <SEOHead title="Contact Us" description="Schedule a consultation with Jericho's SIF advisory team. Get personalized guidance on Specialized Investment Fund allocation." noIndex={true} />
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold italic mb-3 text-foreground">
            Start a Conversation
          </h1>
          <p className="text-muted-foreground text-lg mb-10">Tell us about yourself and we will guide you to the right SIF strategy.</p>
        </motion.div>

        <div className="bg-white border border-[#E5E2DB] shadow-card p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Investable Amount</label>
              <select value={investableAmount} onChange={(e) => setInvestableAmount(e.target.value)} className={inputClasses}>
                <option value="">Select range</option>
                <option>Rs 10L - Rs 25L</option>
                <option>Rs 25L - Rs 50L</option>
                <option>Rs 50L - Rs 1 Cr</option>
                <option>Rs 1 Cr+</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Investment Horizon</label>
              <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className={inputClasses}>
                <option value="">Select horizon</option>
                <option>1-3 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">How did you hear about SIF?</label>
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
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message (Optional)</label>
              <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClasses} resize-none`} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-6 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Submitting..." : "Schedule a Consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
