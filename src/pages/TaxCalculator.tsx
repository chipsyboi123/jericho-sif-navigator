import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const TaxCalculator = () => {
  const [amount, setAmount] = useState(1000000);
  const [returnRate, setReturnRate] = useState(15);
  const [years, setYears] = useState(3);
  const [sifType, setSifType] = useState<"equity" | "debt" | "hybrid">("equity");

  const results = useMemo(() => {
    const grossReturn = amount * Math.pow(1 + returnRate / 100, years) - amount;
    const totalValue = amount + grossReturn;

    // SIF tax
    let sifTax = 0;
    if (sifType === "equity" || sifType === "hybrid") {
      if (years >= 1) {
        const taxableGain = Math.max(0, grossReturn - 125000);
        sifTax = taxableGain * 0.125;
      } else {
        sifTax = grossReturn * 0.2;
      }
    } else {
      sifTax = grossReturn * 0.3; // slab rate approx
    }

    // PMS tax (transaction level, similar rates but less efficient)
    const pmsTax = sifType === "equity" 
      ? (years >= 1 ? Math.max(0, grossReturn - 125000) * 0.125 : grossReturn * 0.2) * 1.15  // higher due to frequent churning
      : grossReturn * 0.3;

    // AIF Cat III
    const aifTax = grossReturn * 0.3; // taxed at slab always for Cat III

    // MF tax (same as SIF for similar holding)
    let mfTax = 0;
    if (sifType === "equity") {
      if (years >= 1) {
        mfTax = Math.max(0, grossReturn - 125000) * 0.125;
      } else {
        mfTax = grossReturn * 0.2;
      }
    } else {
      mfTax = grossReturn * 0.3;
    }

    return {
      grossReturn,
      totalValue,
      sif: { tax: sifTax, net: totalValue - sifTax },
      pms: { tax: pmsTax, net: totalValue - pmsTax },
      aif: { tax: aifTax, net: totalValue - aifTax },
      mf: { tax: mfTax, net: totalValue - mfTax },
    };
  }, [amount, returnRate, years, sifType]);

  const formatCurrency = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  const maxNet = Math.max(results.sif.net, results.pms.net, results.aif.net, results.mf.net);

  const vehicles = [
    { label: "SIF", ...results.sif, highlight: true },
    { label: "Mutual Fund", ...results.mf, highlight: false },
    { label: "PMS", ...results.pms, highlight: false },
    { label: "AIF (Cat III)", ...results.aif, highlight: false },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            SIF Tax <span className="text-gradient-gold">Calculator</span>
          </h1>
          <p className="text-muted-foreground mb-10">Compare post-tax returns across investment vehicles.</p>
        </motion.div>

        {/* Inputs */}
        <div className="bg-card border border-border rounded-lg p-6 mb-10 space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Investment Amount: {formatCurrency(amount)}
            </label>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Expected Annual Return: {returnRate}%
            </label>
            <input
              type="range"
              min={8}
              max={25}
              step={1}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Holding Period: {years} {years === 1 ? "year" : "years"}
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">SIF Type</label>
            <div className="flex gap-2">
              {(["equity", "debt", "hybrid"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSifType(t)}
                  className={`px-4 py-2 text-sm rounded-md capitalize transition-colors ${
                    sifType === t
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-serif text-xl font-bold mb-2">Results</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Gross Returns: {formatCurrency(results.grossReturn)} | Total Value: {formatCurrency(results.totalValue)}
          </p>

          <div className="space-y-4">
            {vehicles.map((v) => (
              <div key={v.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={v.highlight ? "font-semibold text-primary" : "text-foreground"}>{v.label}</span>
                  <span className="text-muted-foreground">
                    Tax: {formatCurrency(v.tax)} | <span className="text-foreground font-medium">Net: {formatCurrency(v.net)}</span>
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${v.highlight ? "bg-gradient-gold" : "bg-muted-foreground/30"}`}
                    style={{ width: `${(v.net / maxNet) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
