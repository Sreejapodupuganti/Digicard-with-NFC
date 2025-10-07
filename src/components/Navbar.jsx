import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    handleLogout();
    navigate("/login", { replace: true });
  };

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/edit-card", label: "Edit Card" },
    { path: "/payment", label: "Payment" },
    { path: "/admin", label: "Admin" },
  ];

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-neutral-800 font-semibold"
      : "text-slate-700 hover:text-neutral-800";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/80 backdrop-blur-lg border-b shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-neutral-800 text-2xl tracking-tight">
          DigiCard
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className={isActive(link.path)}>
              {link.label}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white font-semibold shadow hover:bg-neutral-800 transition"
          >
            Logout
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="md:hidden bg-white border-t shadow-sm"
        >
          <div className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={isActive(link.path)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-white font-semibold shadow hover:bg-neutral-800 transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
