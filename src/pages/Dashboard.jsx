import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as cards from "../api/cards";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import BusinessCard, { CreditStyleCard } from "../components/BusinessCard";
import ShareButton from "../components/ShareButton";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [walletCard, setWalletCard] = useState(null);

  useEffect(() => {
    cards
      .getMyCard()
      .then(({ data }) => setCard(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (showCreditCard && !localStorage.getItem("digitalCardData")) {
      cards
        .getPublicWalletUrl({ card })
        .then(({ data }) => {
          localStorage.setItem("digitalCardData", JSON.stringify(data));
          setWalletCard(data);
        });
    } else if (localStorage.getItem("digitalCardData")) {
      setWalletCard(JSON.parse(localStorage.getItem("digitalCardData")));
    }
  }, [showCreditCard]);

  // Dummy analytics data
  const analyticsData = [
    { day: "Mon", views: 30, shares: 5 },
    { day: "Tue", views: 45, shares: 8 },
    { day: "Wed", views: 60, shares: 12 },
    { day: "Thu", views: 50, shares: 7 },
    { day: "Fri", views: 70, shares: 15 },
    { day: "Sat", views: 90, shares: 20 },
    { day: "Sun", views: 100, shares: 25 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-neutral-800 text-white shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Your Dashboard</h1>
            <p className="mt-2 text-neutral-100 text-lg">
              Manage your digital business card, wallet pass, and track engagement.
            </p>
          </div>
          {card && (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
              <ShareButton link={walletCard?.save_url || "#"} />
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto md:px-6 px-2 py-12 space-y-12">
        {loading && <Loader />}

        {!loading && card && (
          <>
            {/* Profile Overview */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl xl:p-8 p-4"
            >
              <h2 className="text-2xl font-semibold mb-6">Your Business Card</h2>
              <BusinessCard card={card} showActions={true} />

              <div className="mt-6 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreditCard(true)}
                  className="px-6 py-3 rounded-xl bg-neutral-800 text-white font-semibold shadow-lg hover:bg-neutral-800 transition"
                >
                  View Credit Card Style
                </motion.button>
                <Link
                  to="/edit-card"
                  className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold shadow hover:bg-slate-200 transition"
                >
                  Edit Card
                </Link>
              </div>
            </motion.section>

            {/* Analytics Graph */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl md:p-8 p-4"
            >
              <h3 className="font-semibold text-xl mb-4">Weekly Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="shares" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2">Wallet Pass</h3>
                <p className="text-sm text-gray-600">
                  Generate and save your DigiCard to Google Wallet or Apple Wallet.
                </p>
                {walletCard?.save_url && (
                  <a
                    href={walletCard.save_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-neutral-800 text-white rounded-lg shadow hover:bg-neutral-800"
                  >
                    Add to Wallet
                  </a>
                )}
              </div>

              <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2">Team</h3>
                <p className="text-sm text-gray-600">
                  Invite teammates and manage multiple cards. (Pro feature)
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2">Settings</h3>
                <p className="text-sm text-gray-600">
                  Manage your account preferences and security settings.
                </p>
              </div>
            </motion.section>
          </>
        )}

        {!loading && !card && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-10 text-center"
          >
            <p className="text-gray-600">You don’t have a digital card yet.</p>
            <Link
              to="/edit-card"
              className="mt-6 inline-block px-6 py-3 rounded-xl bg-neutral-800 text-white font-semibold shadow hover:bg-neutral-800"
            >
              Create Your DigiCard
            </Link>
          </motion.section>
        )}
      </main>

      {/* Credit Card Modal */}
      <AnimatePresence>
        {showCreditCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowCreditCard(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="text-white rounded-2xl p-6 w-full max-w-lg"
            >
              <CreditStyleCard card={card} />
              {walletCard?.save_url && (
                <ShareButton link={walletCard.save_url} />
              )}
              <div className="mt-6 flex justify-center space-x-4">
                {walletCard?.save_url && (
                  <a href={walletCard.save_url} target="_blank">
                    <button className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-800 shadow">
                      Add to Wallet
                    </button>
                  </a>
                )}
                <button
                  onClick={() => setShowCreditCard(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 shadow"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
