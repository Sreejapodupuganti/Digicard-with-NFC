import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as auth from "../api/auth";
import { motion } from "framer-motion";
import characterDrawingSvg from "../assets/character-drawing.svg";
import { NavBar } from "../components/GlobalHeader";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.register(form);
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      navigate("/dashboard");
    } catch (err) {
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Global Navbar */}
      <NavBar />

      <div className="flex flex-1">
        {/* Left Branding Panel */}
        <div className="hidden md:flex w-1/2 bg-gray-600 text-white flex-col justify-center items-center px-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold leading-tight">
              Create Your DigiCard Account
            </h1>
            <p className="mt-4 text-lg text-gray-100">
              Join the future of networking and payments. Register now and get
              started in minutes.
            </p>
            <img
              src={characterDrawingSvg}
              alt="Register Illustration"
              className="mt-10 w-full max-w-sm"
            />
          </motion.div>
        </div>

        {/* Right Register Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
              Register
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
              <button
                className="w-full rounded-lg bg-gray-600 text-white py-3 hover:bg-gray-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creating Account…" : "Register"}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-600 hover:underline">
                Login
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
