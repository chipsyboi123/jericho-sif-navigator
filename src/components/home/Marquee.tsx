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
    <section className="py-8 bg-white overflow-hidden border-b border-border">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-editorial text-outline-blue text-[clamp(2rem,4.5vw,4rem)] mx-8 select-none"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
