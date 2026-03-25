import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useLaunchedFunds, useComingSoonFunds } from "@/hooks/useFunds";
import SEOHead from "@/components/SEOHead";

const SIFTracker = () => {
  const { data: launched, isLoading: loadingLaunched } = useLaunchedFunds();
  const { data: comingSoon, isLoading: loadingComingSoon } = useComingSoonFunds();

  return (
    <div className="py-20">
      <SEOHead title="SIF Tracker" description="Track all launched SIF funds and upcoming AMC launches in real time. NAV data, launch dates, and fund status." />
      <div className="container mx-auto px-4">
        <div className="animate-fadeIn">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
            SIF Tracker
          </h1>
          <p className="text-muted-foreground text-lg mb-12">Track all SIF schemes: launched, NFOs, and upcoming.</p>
        </div>

        {/* Launched */}
        <div className="mb-16 animate-fadeIn-delay-2">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            Launched Funds
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white/70 backdrop-blur-sm shadow-card overflow-hidden">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">Fund</th>
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">AMC</th>
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">Strategy</th>
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">NAV</th>
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">Risk</th>
                  <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-heading">Launch</th>
                </tr>
              </thead>
              <tbody>
                {launched.map((fund, i) => (
                  <tr
                    key={fund.id}
                    className="border-b border-border/50 hover:bg-secondary/40 transition-colors animate-fadeIn"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="py-3.5 px-5 text-sm font-medium text-foreground">{fund.sifBrand}</td>
                    <td className="py-3.5 px-5 text-sm text-muted-foreground">{fund.amcName}</td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gold/10 text-gold">
                        {fund.strategyType}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-sm font-medium text-foreground">{fund.nav}</td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${getRiskColor(fund.riskBand)}`}>
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        {fund.riskBand}/5
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-sm text-muted-foreground">{fund.launchDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="animate-fadeIn-delay-3">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gold rounded-full" />
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comingSoon.map((fund, i) => (
              <div
                key={fund.id}
                className="bg-white/60 backdrop-blur-sm border border-border rounded-2xl shadow-card hover:shadow-card-hover p-5 transition-all animate-fadeIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="text-xs font-semibold text-gold uppercase tracking-wider font-heading">{fund.amcName}</p>
                <h3 className="font-heading text-lg font-bold text-foreground mt-1">{fund.sifBrand}</h3>
                <p className="text-sm text-muted-foreground mt-2">{fund.strategyType}</p>
                <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-gold/10 text-gold">
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
