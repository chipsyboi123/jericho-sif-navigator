import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Learn", path: "/learn" },
  { label: "Funds", path: "/funds" },
  { label: "Compare", path: "/compare" },
  { label: "Tracker", path: "/tracker" },
  { label: "Knowledge", path: "/knowledge" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = isHome && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isDark
        ? "bg-transparent"
        : "bg-white/95 backdrop-blur-md border-b border-black/[0.04]"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0">
          <span className={`text-[15px] font-semibold tracking-tight transition-colors ${
            isDark ? "text-white" : "text-foreground"
          }`}>
            SIF
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-gold">
            Insider
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[13px] transition-colors ${
                location.pathname === item.path
                  ? "text-gold"
                  : isDark
                    ? "text-white/40 hover:text-white/80"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="text-[13px] font-medium text-gold hover:text-gold-light transition-colors"
          >
            Get Started &rarr;
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden ${isDark ? "text-white/60" : "text-foreground/60"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 text-sm ${
                    location.pathname === item.path
                      ? "text-gold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-6 py-3 text-sm font-medium bg-gold text-[#050505] text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
