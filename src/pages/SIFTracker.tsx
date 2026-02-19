import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useLaunchedFunds, useComingSoonFunds } from "@/hooks/useFunds";

const SIFTracker = () => {
  const { data: launched, isLoading: loadingLaunched } = useLaunchedFunds();
  const { data: comingSoon, isLoading: loadingComingSoon } = useComingSoonFunds();

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            SIF <span className="text-gradient-gold">Tracker</span>
          </h1>
          <p className="text-muted-foreground mb-12">Track all SIF schemes: launched, NFOs, and upcoming.</p>
        </motion.div>

        {/* Launched */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-400" />
            Launched Funds
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Fund</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">AMC</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Strategy</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">NAV</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Risk</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Launch</th>
                </tr>
              </thead>
              <tbody>
                {launched.map((fund) => (
                  <tr key={fund.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{fund.sifBrand}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{fund.amcName}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{fund.strategyType}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{fund.nav}</td>
                    <td className={`py-3 px-4 text-sm font-bold ${getRiskColor(fund.riskBand)}`}>
                      {fund.riskBand}/5
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{fund.launchDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-primary" />
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comingSoon.map((fund) => (
              <div key={fund.id} className="bg-card border border-border p-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">{fund.amcName}</p>
                <h3 className="font-serif text-lg font-bold text-foreground mt-1">{fund.sifBrand}</h3>
                <p className="text-sm text-muted-foreground mt-2">{fund.strategyType}</p>
                <span className="inline-block mt-3 text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">
                  Approved, Awaiting Launch
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIFTracker;
