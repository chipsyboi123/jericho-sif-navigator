import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-5">
              <span className="text-[15px] font-semibold text-white tracking-tight">SIF</span>
              <span className="text-[15px] font-semibold text-gold tracking-tight">Insider</span>
            </Link>
            <p className="text-white/25 text-sm leading-relaxed mb-5">
              India's go-to platform for Specialized Investment Funds.
            </p>
            <p className="text-white/15 text-xs">
              Powered by Jericho Ventures
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gold/60 tracking-[0.2em] uppercase mb-5">Explore</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Learn about SIF", path: "/learn" },
                { label: "Browse Funds", path: "/funds" },
                { label: "Compare", path: "/compare" },
                { label: "Tracker", path: "/tracker" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/25 hover:text-white/50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gold/60 tracking-[0.2em] uppercase mb-5">Resources</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Knowledge Hub", path: "/knowledge" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/25 hover:text-white/50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gold/60 tracking-[0.2em] uppercase mb-5">Regulatory</p>
            <p className="text-xs text-white/20 leading-relaxed">
              All SIF investments are subject to market risks.
              Read all scheme-related documents carefully. Min investment ₹10 Lakh.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between gap-3">
          <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} SIF Insider. A Jericho Ventures initiative.</p>
          <p className="text-[11px] text-white/15">ARN: 166913 &middot; AMFI Registered</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
