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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      {/* Apple-style floating pill navbar */}
      <div className={`container mx-auto transition-all duration-500 ${
        scrolled
          ? "glass-nav shadow-apple rounded-2xl border border-white/20"
          : "bg-jericho/40 backdrop-blur-xl rounded-2xl border border-white/[0.06]"
      }`}>
        <div className="flex items-center justify-between h-14 px-5">
          {/* Logo + Powered by */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <span className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-jericho" : "text-white"
              }`}>SIF</span>
              <span className="text-[15px] font-bold tracking-tight text-gold">Insider</span>
            </div>
            <span className={`hidden sm:block text-[9px] tracking-wide border-l pl-3 transition-colors duration-300 ${
              scrolled ? "text-muted-foreground/50 border-border" : "text-white/25 border-white/10"
            }`}>
              by Jericho Ventures
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[13px] px-3.5 py-1.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "text-gold font-medium bg-gold/[0.06]"
                        : "text-gold font-medium bg-gold/[0.1]"
                      : scrolled
                        ? "text-foreground/50 hover:text-foreground hover:bg-black/[0.03]"
                        : "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-5 py-2 text-[13px] font-semibold bg-gradient-gold text-jericho rounded-xl hover:shadow-gold-glow transition-all duration-300 hover:scale-[1.03]"
            >
              Schedule a Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden transition-colors ${scrolled ? "text-foreground/60" : "text-white/60"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 mx-auto container glass-nav shadow-apple-lg rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 text-sm rounded-xl transition-colors ${
                    location.pathname === item.path
                      ? "text-gold font-medium bg-gold/[0.06]"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-6 py-3 text-sm font-semibold bg-gradient-gold text-jericho text-center rounded-xl"
              >
                Schedule a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
