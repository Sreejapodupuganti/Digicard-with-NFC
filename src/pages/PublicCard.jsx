import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as cards from "../api/cards";
import Loader from "../components/Loader";
import { NavBar } from "../components/GlobalHeader";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function PublicCard() {
  const { handle } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cards
      .getPublicCard(handle)
      .then(({ data }) => setCard(data))
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) return <Loader label="Fetching card..." />;

  if (!card) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Card not found</h2>
          <p className="text-gray-600">
            Invalid or inactive handle:{" "}
            <span className="font-mono">{handle}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar user={user} />

      {/* Page Heading */}
      <div className="text-center py-10 bg-gray-50">
        <h1 className="text-4xl font-semibold text-gray-900">
          Digital Visiting Card
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          A modern way to connect and make payments securely. This page is a
          digital identity card powered by NFC and Cashfree payments.
        </p>
      </div>

      {/* Background */}
      <div className="bg-gradient-to-br via-gray-100 to-gray-200 flex items-center justify-center p-6">
        {/* Visiting Card */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border bg-white"
        >
          {/* Accent Strip */}
          <div className="h-3 bg-gray-600"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-8">
            {/* Profile Circle */}
            <div className="flex-shrink-0">
              <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-3xl shadow-inner">
                {card.name?.[0] || "U"}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
              <p className="mt-1 text-gray-600 text-lg">
                {card.designation}
                {card.company && ` • ${card.company}`}
              </p>

              {card.bio && (
                <p className="mt-4 text-gray-700 italic text-sm sm:text-base">
                  “{card.bio}”
                </p>
              )}

              {/* Contact Info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {card.phone && (
                  <a
                    href={`tel:${card.phone}`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border hover:border-gray-500 hover:bg-gray-50 transition"
                  >
                    📞 <span>{card.phone}</span>
                  </a>
                )}
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border hover:border-gray-500 hover:bg-gray-50 transition"
                  >
                    ✉️ <span>{card.email}</span>
                  </a>
                )}
                {card.website && (
                  <a
                    href={card.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border hover:border-gray-500 hover:bg-gray-50 transition"
                  >
                    🌐 <span>{card.website}</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              {card.links && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {card.links.twitter && (
                    <a
                      href={card.links.twitter}
                      target="_blank"
                      className="px-4 py-1.5 rounded-full border text-gray-700 hover:bg-gray-100 transition text-sm"
                    >
                      Twitter
                    </a>
                  )}
                  {card.links.linkedin && (
                    <a
                      href={card.links.linkedin}
                      target="_blank"
                      className="px-4 py-1.5 rounded-full border text-gray-700 hover:bg-gray-100 transition text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                  {card.links.instagram && (
                    <a
                      href={card.links.instagram}
                      target="_blank"
                      className="px-4 py-1.5 rounded-full border text-gray-700 hover:bg-gray-100 transition text-sm"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* Payment CTA */}
              <Link
                to="/payment"
                className="w-full inline-flex items-center justify-center rounded-xl px-6 bg-neutral-800 text-white py-3 font-semibold shadow hover:bg-neutral-800 transition"
              >
                💳 Pay with Cashfree
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <hr />
      {/* Terms / About Section */}
      {/* About / Terms Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
            alt="Digital Card Illustration"
            className="w-80 mx-auto md:mx-0"
          />

          {/* Content */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              About This Digital Card
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              This digital visiting card provides a seamless way to share your
              professional identity and accept secure payments. With NFC
              technology and integrated Cashfree checkout, it’s built for modern
              networking.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="text-gray-600 text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Instant Sharing
                </h3>
                <p className="text-sm text-gray-600">
                  Share your details with just one tap using NFC.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="text-neutral-800 text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Secure Payments
                </h3>
                <p className="text-sm text-gray-600">
                  Powered by Cashfree with industry-grade security.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="text-green-600 text-3xl mb-3">🌱</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Eco-Friendly
                </h3>
                <p className="text-sm text-gray-600">
                  No paper waste — a sustainable choice for the future.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="text-purple-600 text-3xl mb-3">🔄</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Always Up-to-Date
                </h3>
                <p className="text-sm text-gray-600">
                  Edit your card anytime — stay relevant, always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
