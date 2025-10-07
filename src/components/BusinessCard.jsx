import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardLink from "./CardLink";
import nfcReaderIcon from "../assets/nfc.svg";

export default function BusinessCard({ card, showActions = false }) {
  if (!card) return null;

  return (
    <motion.div
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
    >
      {/* Top strip like a modern NFC card */}
      <div className="h-2 bg-neutral-800 rounded-t-xl mb-4"></div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{card.name}</h2>
          <p className="text-gray-600">{card.email}</p>
          {card.company && (
            <p className="text-gray-600">
              {card.company} — {card.designation}
            </p>
          )}

          {/* Public Link */}
          {card.handle && <CardLink card={card} />}
        </div>

        {/* Avatar Circle */}
        <div className="hidden md:block">
          <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 font-bold text-xl shadow-inner ">
            {card.name?.[0] || "U"}
          </div>
        </div>
      </div>

      {/* Optional Actions */}
      {showActions && (
        <div className="mt-6 flex gap-3 justify-end">
          <Link
            to="/edit-card"
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Edit Card
          </Link>
          <Link
            to="/payment"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-800 transition"
          >
            Accept Payment
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export function CreditStyleCard({ card }) {
  if (!card) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white p-6"
    >
      {/* Background design */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
      {/* Top Section */}
      <div className="relative flex justify-between items-start">
        <h2 className="text-lg font-semibold tracking-wide">DigiCard</h2>
        <span className="text-sm opacity-80">NFC Enabled</span>
      </div>
      {/* Middle Content */}
      <div className="flex justify-between mt-8">
        <div className="relative">
          <h1 className="text-2xl font-semibold capitalize tracking-wider">
            {card.title}
          </h1>
          <p className="text-sm opacity-90">
            {card.designation}
            {card.company && ` • ${card.company}`}
          </p>
        </div>
        <img src={nfcReaderIcon} className="text-white mt-2 opacity-80" />
      </div>
      {/* Contact Info styled like card number */}
      <div className="relative mt-10 font-mono tracking-widest">
        {card.phone && <p className="text-base">📞 {card.phone}</p>}
        {card.email && <p className="text-base">✉️ {card.email}</p>}
      </div>
      {/* Bottom Section */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        <div className="text-sm">
          <p className="uppercase opacity-80">Handle</p>
          <p className="font-bold">/{card.handle}</p>
        </div>
        <div className="h-10 w-16 rounded bg-white/20 backdrop-blur-md flex items-center justify-center text-lg font-bold">
          DIGI
        </div>
      </div>
    </motion.div>
  );
}
