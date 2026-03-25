import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-jericho">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-5">
              <span className="text-[15px] font-bold text-white tracking-tight">SIF</span>
              <span className="text-[15px] font-bold text-gold tracking-tight">Insider</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Your gateway to India's Specialized Investment Funds — understand, compare, and invest with confidence.
            </p>
            <p className="text-gold text-xs font-semibold tracking-wide">
              Powered by Jericho Ventures
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gold tracking-[0.2em] uppercase mb-5 font-bold">Explore</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Learn about SIF", path: "/learn" },
                { label: "Browse Funds", path: "/funds" },
                { label: "Compare", path: "/compare" },
                { label: "Tracker", path: "/tracker" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/50 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gold tracking-[0.2em] uppercase mb-5 font-bold">Resources</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Knowledge Hub", path: "/knowledge" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/50 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gold tracking-[0.2em] uppercase mb-5 font-bold">Regulatory</p>
            <p className="text-xs text-white/40 leading-relaxed">
              All SIF investments are subject to market risks.
              Read all scheme-related documents carefully. Minimum investment ₹10 Lakh.
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-3">
          <p className="text-[11px] text-white/30">&copy; {new Date().getFullYear()} SIF Insider. A Jericho Ventures initiative.</p>
          <p className="text-[11px] text-white/30">ARN: 166913 &middot; AMFI Registered</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
