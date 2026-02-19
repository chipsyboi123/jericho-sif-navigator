import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "What is SIF?", path: "/sif-101" },
  { label: "Fund Explorer", path: "/funds" },
  { label: "SIF Tracker", path: "/tracker" },
  { label: "Compare", path: "/compare" },
  { label: "Knowledge Hub", path: "/knowledge" },
  { label: "Why Jericho", path: "/why-jericho" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E2DB]">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-serif text-2xl italic text-gold">JV</span>
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-foreground/50 uppercase">Jericho SIF</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2 text-sm font-semibold border border-foreground/20 text-foreground hover:border-gold hover:text-gold transition-colors"
          >
            Talk to Us &rarr;
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground/80"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#E5E2DB] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-2.5 text-sm font-semibold border border-foreground/20 text-foreground text-center hover:border-gold hover:text-gold transition-colors"
              >
                Talk to Us &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
