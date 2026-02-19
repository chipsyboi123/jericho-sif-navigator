import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Access India's fastest-growing asset class with ₹10L minimum",
  "Earn competitive trail commissions on SIF AUM",
  "Comprehensive training and sales support from Jericho",
  "Ready-made marketing materials and client presentation decks",
  "Real-time NAV tracking and portfolio reporting tools",
  "NISM certification support and study resources",
];

const Distributors = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Become a SIF <span className="text-gradient-gold">Distributor</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Join Jericho's distribution network and offer your clients access to India's newest SEBI-regulated asset class.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="font-serif text-2xl font-bold mb-6">Why Distribute SIF?</h2>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground/80 text-sm">{b}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <h3 className="font-serif text-lg font-bold mb-2">Requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Valid AMFI registration (ARN)</li>
                <li>• NISM Series V-A or equivalent certification</li>
                <li>• KYC compliance with CAMS/KFintech</li>
              </ul>
            </div>
          </motion.div>

          {/* Form placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="font-serif text-2xl font-bold mb-6">Register Interest</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input type="email" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                <input type="tel" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">ARN Number</label>
                <input type="text" className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Submit Registration
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Distributors;
