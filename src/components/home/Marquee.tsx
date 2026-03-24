const items = [
  "SEBI REGULATED",
  "EQUITY TAXATION",
  "LONG–SHORT STRATEGIES",
  "₹10 LAKH MINIMUM",
  "DERIVATIVE HEDGING",
  "4 LIVE FUNDS",
];

const Marquee = () => {
  return (
    <section className="py-10 bg-[#050505] overflow-hidden border-y border-white/[0.04]">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-editorial text-outline-white text-[clamp(2rem,5vw,4.5rem)] mx-8 select-none"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
