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
      {/* Jericho navy + gold floating pill */}
      <div className={`container mx-auto transition-all duration-500 rounded-2xl border ${
        scrolled
          ? "bg-jericho/95 backdrop-blur-xl border-gold/10 shadow-apple-lg"
          : "bg-jericho/80 backdrop-blur-xl border-white/[0.06]"
      }`}>
        <div className="flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              <span className="text-[15px] font-bold tracking-tight text-white">SIF</span>
              <span className="text-[15px] font-bold tracking-tight text-gold">Insider</span>
            </div>
            <span className="hidden sm:block text-[9px] text-white/25 tracking-wide border-l border-white/10 pl-3">
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
                      ? "text-gold font-medium bg-gold/[0.1]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.05]"
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
            className="lg:hidden text-white/60"
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
            className="lg:hidden mt-2 mx-auto container bg-jericho/95 backdrop-blur-xl shadow-apple-lg rounded-2xl border border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 text-sm rounded-xl transition-colors ${
                    location.pathname === item.path
                      ? "text-gold font-medium bg-gold/[0.08]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.05]"
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
