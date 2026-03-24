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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home page: transparent at top, glass on scroll. Other pages: always glass.
  const navBg = !isHome || scrolled
    ? "bg-white/90 backdrop-blur-xl border-b border-border/50"
    : "bg-transparent border-b border-transparent";

  const textColor = !isHome || scrolled ? "text-foreground" : "text-white";
  const mutedColor = !isHome || scrolled ? "text-muted-foreground" : "text-white/50";
  const logoColor = !isHome || scrolled ? "text-foreground" : "text-white";
  const goldColor = "text-[#C9960C]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <span className={`font-heading text-lg font-bold tracking-tight ${logoColor}`}>
            SIF
          </span>
          <span className={`font-heading text-lg font-bold tracking-tight ${goldColor}`}>
            Insider
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors rounded-lg ${
                location.pathname === item.path
                  ? goldColor
                  : `${mutedColor} hover:${textColor}`
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9960C] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/contact"
            className="px-5 py-2 text-[13px] font-semibold bg-[#C9960C] text-[#0a0e1a] rounded-full hover:bg-[#d4a41a] transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg ${mutedColor}`}
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
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    location.pathname === item.path
                      ? "text-[#C9960C] bg-[#C9960C]/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-sm font-semibold bg-[#C9960C] text-[#0a0e1a] text-center rounded-full"
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
