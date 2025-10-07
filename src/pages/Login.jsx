import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as auth from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { NavBar } from "../components/GlobalHeader";
import digiCard from "../assets/login-illustration.svg";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { user, handleLogin } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await handleLogin(form.email, form.password, (data) => {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
      });
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col">
      {/* Global header */}
      <NavBar user={user} />

      {/* Full screen layout */}
      <div className="flex flex-1">
        {/* Left branding panel */}
        <div className="hidden md:flex w-1/2 bg-gray-600 text-white flex-col justify-center items-center px-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold leading-tight">
              Welcome to DigiCard
            </h1>
            <p className="mt-4 text-lg text-gray-100">
              Manage your digital business identity and payments seamlessly.
            </p>
            <img
              src={digiCard}
              alt="Illustration"
              className="mt-10 w-full max-w-sm"
            />
          </motion.div>
        </div>

        {/* Right login form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
          <motion.form
            onSubmit={submit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold text-center mb-6">
              Welcome back
            </h2>

            {err && (
              <div className="mb-3 p-3 rounded bg-red-50 text-red-700 text-sm">
                {err}
              </div>
            )}

            <div className="space-y-4">
              <input
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                className="w-full rounded-lg bg-gray-600 text-white py-3 hover:bg-gray-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Login"}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              No account?{" "}
              <Link to="/register" className="text-gray-600 hover:underline">
                Register
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
