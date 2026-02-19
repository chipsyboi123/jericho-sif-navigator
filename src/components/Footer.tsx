import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-accent border-t border-accent-foreground/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-xl font-bold text-gradient-gold">Jericho</span>
              <span className="font-sans text-sm font-semibold tracking-widest text-accent-foreground/80 uppercase ml-2">SIF</span>
            </Link>
            <p className="text-sm text-accent-foreground/60 leading-relaxed">
              Navigate India's newest SEBI-regulated asset class with confidence. Research-led insights, transparent analysis, and guided investing.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-accent-foreground mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "What is SIF?", path: "/sif-101" },
                { label: "Fund Explorer", path: "/funds" },
                { label: "SIF Tracker", path: "/tracker" },
                { label: "Compare Funds", path: "/compare" },
                
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-accent-foreground/60 hover:text-gold-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-accent-foreground mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Knowledge Hub", path: "/knowledge" },
                { label: "Why Jericho", path: "/why-jericho" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-accent-foreground/60 hover:text-gold-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-accent-foreground mb-4">Legal</h4>
            <p className="text-xs text-accent-foreground/50 leading-relaxed">
              All SIF investments are subject to market risks.
              Read all scheme-related documents carefully before investing. Minimum investment Rs 10 Lakh. Jericho Ventures is an AMFI-registered SIF distributor.
            </p>
            <p className="text-xs text-accent-foreground/50 mt-4">
              © {new Date().getFullYear()} Jericho Ventures. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
