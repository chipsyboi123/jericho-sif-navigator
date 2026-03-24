import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F1629] relative overflow-hidden">
      {/* Gold gradient line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9960C]/40 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <span className="font-display text-xl font-bold text-white">
                SIF<span className="text-[#C9960C]">Insider</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              India's go-to platform for Specialized Investment Funds. Research-led insights, transparent analysis, and informed investing.
            </p>
            <p className="text-xs text-white/25">
              Powered by <span className="text-white/40">Jericho Ventures</span>
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-xs text-white/30">info@jerichoventures.in</span>
              <span className="text-xs text-white/30">+91 98334 62168</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-[#C9960C]/70 tracking-[0.15em] uppercase mb-5">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Learn about SIF", path: "/learn" },
                { label: "Browse Funds", path: "/funds" },
                { label: "Fund Tracker", path: "/tracker" },
                { label: "Compare Funds", path: "/compare" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-[#C9960C]/70 tracking-[0.15em] uppercase mb-5">Resources</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Knowledge Hub", path: "/knowledge" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-[#C9960C]/70 tracking-[0.15em] uppercase mb-5">Regulatory</h4>
            <p className="text-xs text-white/30 leading-relaxed">
              All SIF investments are subject to market risks.
              Read all scheme-related documents carefully before investing. Minimum investment Rs 10 Lakh. Jericho Ventures is an AMFI-registered SIF distributor.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} SIF Insider. A Jericho Ventures initiative. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            ARN: 166913 &middot; AMFI Registered Mutual Fund Distributor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
