const items = [
  "SEBI REGULATED",
  "EQUITY TAXATION",
  "LONG–SHORT STRATEGIES",
  "₹10 LAKH MINIMUM",
  "DERIVATIVE HEDGING",
  "LIVE FUNDS",
];

const Marquee = () => {
  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center mx-6">
            <span className="w-1.5 h-1.5 bg-gold/30 rounded-full mr-6" />
            <span className="font-editorial text-[clamp(1.5rem,3.5vw,3rem)] text-jericho/[0.06] select-none">
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
