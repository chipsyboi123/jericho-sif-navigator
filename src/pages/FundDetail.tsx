import { useParams, Link } from "react-router-dom";
import { getRiskColor, getRiskLabel, type FundManagerDetail } from "@/data/sifFunds";
import { useFundBySlug } from "@/hooks/useFunds";
import PerformanceChart from "@/components/PerformanceChart";
import SEOHead from "@/components/SEOHead";

const FundDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: fund, isLoading } = useFundBySlug(slug);

  if (isLoading) {
    return (
      <div className="py-20 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="py-20 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Fund Not Found</h1>
          <p className="text-muted-foreground mb-8">The fund you are looking for does not exist or may have been removed.</p>
          <Link to="/funds" className="px-6 py-3 bg-gradient-gold text-white font-semibold rounded-xl hover:shadow-gold-glow hover:opacity-90 transition-all">
            Back to Fund Explorer
          </Link>
        </div>
      </div>
    );
  }

  const riskBarWidth = (fund.riskBand / 5) * 100;

  return (
    <div className="py-20 bg-cream">
      <div className="container mx-auto px-4 max-w-4xl">
        <SEOHead
          title={fund.sifBrand}
          description={`${fund.sifBrand} by ${fund.amcName}. ${fund.objective.substring(0, 150)}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            name: fund.sifBrand,
            provider: { "@type": "Organization", name: fund.amcName },
            description: fund.objective,
            category: "Specialized Investment Fund",
          }}
        />
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/funds" className="hover:text-gold transition-colors">Fund Explorer</Link>
          <span>/</span>
          <span className="text-foreground">{fund.sifBrand}</span>
        </div>

        <div className="animate-fadeIn">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">{fund.amcName}</p>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground">{fund.sifBrand}</h1>
            {fund.tagline && (
              <p className="text-lg text-muted-foreground italic mb-3">{fund.tagline}</p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm bg-secondary px-3 py-1 text-muted-foreground rounded-full">{fund.strategyType}</span>
              <span className="text-sm bg-secondary px-3 py-1 text-muted-foreground rounded-full">{fund.category}</span>
              <span className={`text-sm font-bold px-3 py-1 bg-secondary rounded-full ${getRiskColor(fund.riskBand)}`}>
                Risk: {getRiskLabel(fund.riskBand)} ({fund.riskBand}/5)
              </span>
              {fund.status === "NFO" && (
                <span className="text-sm font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">NFO Open</span>
              )}
            </div>
          </div>

          {/* Objective */}
          <Section title="Investment Objective">
            <p className="text-foreground/80 leading-relaxed">{fund.objective}</p>
          </Section>

          {/* Why Invest */}
          {fund.whyInvest && fund.whyInvest.length > 0 && (
            <Section title="Why Invest?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fund.whyInvest.map((reason, i) => {
                  const [title, ...descParts] = reason.split(" - ");
                  const desc = descParts.join(" - ");
                  return (
                    <div key={i} className="glass-gold rounded-2xl p-4 border border-border">
                      <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                      {desc && <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>}
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-border shadow-card p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">Fund Details</h3>
              <div className="space-y-3">
                <DetailRow label="AMC" value={fund.amcName} />
                <DetailRow label="Benchmark" value={fund.benchmark} />
                <DetailRow label="Min Investment" value={fund.minInvestment} />
                <DetailRow label="Launch Date" value={fund.launchDate} />
                <DetailRow label="NAV" value={fund.nav} />
                <DetailRow label="Fund Managers" value={fund.fundManagers.join(", ")} />
                {fund.subscriptionFrequency && <DetailRow label="Subscription" value={fund.subscriptionFrequency} />}
                {fund.plansAndOptions && <DetailRow label="Plans & Options" value={fund.plansAndOptions} />}
                {fund.features && <DetailRow label="Features" value={fund.features} />}
                {fund.exchangeListing && <DetailRow label="Exchange Listing" value={fund.exchangeListing} />}
              </div>
            </div>

            <div className="bg-white border border-border shadow-card p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold mb-4 text-foreground">Terms & Conditions</h3>
              <div className="space-y-3">
                <DetailRow label="Exit Load" value={fund.exitLoad} />
                <DetailRow label="Redemption" value={fund.redemptionTerms} />
                <DetailRow label="Status" value={fund.status} />
                {fund.noticePeriod && <DetailRow label="Notice Period" value={fund.noticePeriod} />}
                {fund.minSipAmount && <DetailRow label="SIP Details" value={fund.minSipAmount} />}
              </div>

              {/* Risk Band Visual */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-2">Fund Risk Band</p>
                <div className="h-3 bg-secondary w-full rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fund.riskBand <= 2 ? "bg-green-500" : fund.riskBand <= 3 ? "bg-yellow-500" : fund.riskBand <= 4 ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${riskBarWidth}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>{getRiskLabel(fund.riskBand)} ({fund.riskBand}/5)</span>
                  <span>High</span>
                </div>
              </div>

              {fund.benchmarkRiskBand && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-2">Benchmark Risk Band</p>
                  <div className="h-3 bg-secondary w-full rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        fund.benchmarkRiskBand <= 2 ? "bg-green-500" : fund.benchmarkRiskBand <= 3 ? "bg-yellow-500" : fund.benchmarkRiskBand <= 4 ? "bg-orange-500" : "bg-red-500"
                      }`}
                      style={{ width: `${(fund.benchmarkRiskBand / 5) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>{getRiskLabel(fund.benchmarkRiskBand)} ({fund.benchmarkRiskBand}/5)</span>
                    <span>High</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Allocation */}
          <Section title="Indicative Allocation">
            <div className="flex h-5 rounded-full overflow-hidden mb-3">
              <div className="bg-primary" style={{ width: `${fund.allocation.equity}%` }} />
              <div className="bg-blue-500" style={{ width: `${fund.allocation.debt}%` }} />
              <div className="bg-orange-500" style={{ width: `${fund.allocation.derivatives}%` }} />
            </div>
            <div className="flex flex-wrap gap-3 md:gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full" /> Equity {fund.allocation.equity}%
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full" /> Debt {fund.allocation.debt}%
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full" /> Derivatives {fund.allocation.derivatives}%
              </span>
            </div>
          </Section>

          {/* Investment Approach */}
          {fund.investmentApproach && (
            <Section title="Investment Approach">
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{fund.investmentApproach}</p>
            </Section>
          )}

          {/* Derivative Strategies */}
          {fund.derivativeStrategies && fund.derivativeStrategies.length > 0 && (
            <Section title="Derivative Strategies">
              <div className="flex flex-wrap gap-2">
                {fund.derivativeStrategies.map((strategy, i) => (
                  <span key={i} className="text-sm bg-secondary border border-border px-3 py-1.5 rounded-full text-foreground">
                    {strategy}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Alpha Strategies */}
          {fund.alphaStrategies && fund.alphaStrategies.length > 0 && (
            <Section title="Alpha Generation Strategies">
              <div className="space-y-3">
                {fund.alphaStrategies.map((strategy, i) => {
                  const [title, ...descParts] = strategy.split(" - ");
                  const desc = descParts.join(" - ");
                  return (
                    <div key={i} className="flex gap-3">
                      <span className="text-gold font-bold mt-0.5 shrink-0">{i + 1}.</span>
                      <div>
                        <span className="text-sm font-medium text-foreground">{title}</span>
                        {desc && <span className="text-sm text-muted-foreground"> - {desc}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Risk Management */}
          {fund.riskManagement && (
            <Section title="Risk Management">
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{fund.riskManagement}</p>
            </Section>
          )}

          {/* Taxation */}
          {fund.taxation && (
            <Section title="Taxation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-gold rounded-2xl border border-border p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Short-Term Capital Gains (STCG)</p>
                  <p className="text-sm text-foreground">{fund.taxation.stcg}</p>
                </div>
                <div className="glass-gold rounded-2xl border border-border p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Long-Term Capital Gains (LTCG)</p>
                  <p className="text-sm text-foreground">{fund.taxation.ltcg}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Please consult your tax advisor for details. Tax rates are exclusive of applicable cess and surcharge.</p>
            </Section>
          )}

          {/* Performance Chart */}
          <div className="mb-10">
            <PerformanceChart fundId={fund.dbId} fundName={fund.sifBrand} />
          </div>

          {/* Back-tested Performance */}
          {fund.backTestedPerformance?.summary && (
            <Section title="Back-Tested Performance">
              <p className="text-foreground/80 leading-relaxed mb-4">{fund.backTestedPerformance.summary}</p>
              {fund.backTestedPerformance.annual && (
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">Year</th>
                        <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Strategy Return</th>
                        <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Benchmark Return</th>
                        {fund.backTestedPerformance.annual[0]?.equity_level && (
                          <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Equity Level</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {fund.backTestedPerformance.annual.map((row: any, i: number) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 text-foreground font-medium">{row.year}</td>
                          <td className={`py-2 px-3 text-right font-mono ${row.return?.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}>{row.return}</td>
                          <td className={`py-2 px-3 text-right font-mono ${row.benchmark?.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}>{row.benchmark}</td>
                          {row.equity_level && <td className="py-2 px-3 text-right text-muted-foreground">{row.equity_level}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {fund.backTestedPerformance.rolling_returns && (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <p className="text-sm font-semibold text-foreground px-3 pt-3 mb-2">Rolling Returns</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground">Period</th>
                        <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Min</th>
                        <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Max</th>
                        <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground">Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fund.backTestedPerformance.rolling_returns.map((row: any, i: number) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 px-3 text-foreground font-medium">{row.period}</td>
                          <td className={`py-2 px-3 text-right font-mono ${row.min?.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}>{row.min}</td>
                          <td className="py-2 px-3 text-right font-mono text-emerald-600">{row.max}</td>
                          <td className="py-2 px-3 text-right font-mono text-foreground font-semibold">{row.avg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">Past performance may or may not be sustained in future. Back-tested performance is hypothetical and does not represent actual returns.</p>
            </Section>
          )}

          {/* Fund Manager Profiles */}
          {fund.fundManagerDetails && fund.fundManagerDetails.length > 0 && (
            <Section title="Fund Management Team">
              {fund.researchTeamSize && (
                <p className="text-sm text-muted-foreground mb-4">{fund.researchTeamSize}</p>
              )}
              {fund.aumInfo && (
                <p className="text-sm text-muted-foreground mb-4">{fund.aumInfo}</p>
              )}
              <div className="space-y-4">
                {fund.fundManagerDetails.map((manager: FundManagerDetail, i: number) => (
                  <div key={i} className="glass-card rounded-2xl border border-border p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h4 className="font-heading text-base font-bold text-foreground">{manager.name}</h4>
                      <span className="text-xs text-gold font-medium">{manager.designation}</span>
                    </div>
                    {manager.experience && (
                      <p className="text-xs text-muted-foreground mb-2">{manager.experience}</p>
                    )}
                    <p className="text-sm text-foreground/80 leading-relaxed">{manager.bio}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Links */}
          {fund.websiteUrl && (
            <Section title="Links">
              <div className="flex flex-wrap gap-3">
                <a
                  href={fund.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:underline font-medium"
                >
                  Fund Website &rarr;
                </a>
              </div>
            </Section>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to={`/contact?fund=${encodeURIComponent(fund.sifBrand)}`}
              className="px-7 py-3.5 bg-gradient-gold text-white font-semibold rounded-xl hover:shadow-gold-glow hover:opacity-90 transition-all text-center"
            >
              Express Interest &rarr;
            </Link>
            <Link
              to="/compare"
              className="px-7 py-3.5 border border-foreground/20 text-foreground font-semibold rounded-xl hover:border-gold hover:text-gold transition-all text-center"
            >
              Compare This Fund
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-border shadow-card p-6 mb-6 rounded-2xl">
    <h2 className="font-heading text-lg font-bold mb-4 text-foreground">{title}</h2>
    {children}
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-foreground font-medium text-right">{value}</span>
  </div>
);

export default FundDetail;
