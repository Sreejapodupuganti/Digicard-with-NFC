import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Reusable Container
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
);

// Navbar
export const NavBar = ({ user }) => (
  <header className="py-4 bg-white shadow-md border-b border-gray-200">
    <Container className="flex justify-between items-center">
      <Link to="/" >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          DigiCard
        </motion.div>
      </Link>
      {user ? (
        <nav className="space-x-6 font-medium">
          <Link to="/dashboard" className="hover:text-gray-700 transition">
            Dashboard
          </Link>
        </nav>
      ) : (
        <nav className="space-x-6 font-medium">
          <Link to="/login" className="hover:text-gray-700 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-700 transition">
            Register
          </Link>
        </nav>
      )}
    </Container>
  </header>
);
