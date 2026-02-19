import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRiskColor, getRiskLabel } from "@/data/sifFunds";
import { useFundBySlug } from "@/hooks/useFunds";
import PerformanceChart from "@/components/PerformanceChart";
import SEOHead from "@/components/SEOHead";

const FundDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: fund, isLoading } = useFundBySlug(slug);

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Fund Not Found</h1>
          <p className="text-muted-foreground mb-8">The fund you are looking for does not exist or may have been removed.</p>
          <Link to="/funds" className="px-6 py-3 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity">
            Back to Fund Explorer
          </Link>
        </div>
      </div>
    );
  }

  const riskBarWidth = (fund.riskBand / 5) * 100;

  return (
    <div className="py-20">
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">{fund.amcName}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 text-foreground">{fund.sifBrand}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm bg-[#F8F6F1] px-3 py-1 text-muted-foreground">{fund.strategyType}</span>
              <span className="text-sm bg-[#F8F6F1] px-3 py-1 text-muted-foreground">{fund.category}</span>
              <span className={`text-sm font-bold px-3 py-1 bg-[#F8F6F1] ${getRiskColor(fund.riskBand)}`}>
                Risk: {getRiskLabel(fund.riskBand)} ({fund.riskBand}/5)
              </span>
            </div>
          </div>

          {/* Objective */}
          <div className="bg-white border border-[#E5E2DB] shadow-card p-6 mb-6">
            <h2 className="font-serif text-lg font-bold mb-2 text-foreground">Objective</h2>
            <p className="text-foreground/80 leading-relaxed">{fund.objective}</p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-[#E5E2DB] shadow-card p-6">
              <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Fund Details</h3>
              <div className="space-y-3">
                <DetailRow label="AMC" value={fund.amcName} />
                <DetailRow label="Benchmark" value={fund.benchmark} />
                <DetailRow label="Min Investment" value={fund.minInvestment} />
                <DetailRow label="Launch Date" value={fund.launchDate} />
                <DetailRow label="NAV" value={fund.nav} />
                <DetailRow label="Fund Managers" value={fund.fundManagers.join(", ")} />
              </div>
            </div>

            <div className="bg-white border border-[#E5E2DB] shadow-card p-6">
              <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Terms</h3>
              <div className="space-y-3">
                <DetailRow label="Exit Load" value={fund.exitLoad} />
                <DetailRow label="Redemption" value={fund.redemptionTerms} />
                <DetailRow label="Status" value={fund.status} />
              </div>

              {/* Risk Band Visual */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-2">Risk Band</p>
                <div className="h-3 bg-[#F0EDE6] w-full">
                  <div
                    className={`h-full transition-all ${
                      fund.riskBand <= 2 ? "bg-green-500" : fund.riskBand <= 3 ? "bg-yellow-500" : fund.riskBand <= 4 ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${riskBarWidth}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation */}
          <div className="bg-white border border-[#E5E2DB] shadow-card p-6 mb-6">
            <h3 className="font-serif text-lg font-bold mb-4 text-foreground">Indicative Allocation</h3>
            <div className="flex h-4 overflow-hidden mb-3">
              <div className="bg-primary" style={{ width: `${fund.allocation.equity}%` }} />
              <div className="bg-blue-500" style={{ width: `${fund.allocation.debt}%` }} />
              <div className="bg-orange-500" style={{ width: `${fund.allocation.derivatives}%` }} />
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary" />
                Equity {fund.allocation.equity}%
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500" />
                Debt {fund.allocation.debt}%
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500" />
                Derivatives {fund.allocation.derivatives}%
              </span>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mb-10">
            <PerformanceChart fundId={fund.dbId} fundName={fund.sifBrand} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/contact?fund=${encodeURIComponent(fund.sifBrand)}`}
              className="px-7 py-3.5 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Express Interest &rarr;
            </Link>
            <Link
              to="/compare"
              className="px-7 py-3.5 border border-foreground/20 text-foreground font-semibold hover:border-gold hover:text-gold transition-colors text-center"
            >
              Compare This Fund
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-foreground font-medium text-right">{value}</span>
  </div>
);

export default FundDetail;
