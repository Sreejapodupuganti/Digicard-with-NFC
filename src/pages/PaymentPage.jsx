import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as payments from "../api/payments";
import { NavBar } from "../components/GlobalHeader";
import { load } from "@cashfreepayments/cashfree-js";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  useEffect(() => {
    if (status === "done") {
      navigate("/payment-success", { replace: true });
    }
  }, [status, navigate]);

  const createOrder = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const { data } = await payments.createOrder({
        amount: Number(amount),
        return_url: `${window.location.origin}/payment?status=done`,
      });
      const cashfree = await load({ mode: "sandbox" });
      let checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    } catch (e) {
      console.log(e);
      
      setErr(e?.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar user={user} />
      <div className="max-w-md mx-auto px-4 py-10">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h1 className="text-2xl font-bold mb-4">Accept a Payment</h1>

          {err && (
            <div className="mb-3 p-2 rounded bg-red-50 text-red-700 text-sm">
              {err}
            </div>
          )}

          <form onSubmit={createOrder} className="space-y-3">
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Amount (INR)"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button
              className="w-full rounded-lg bg-neutral-800 text-white py-3 hover:bg-neutral-800 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating order…" : "Proceed to Cashfree"}
            </button>
          </form>

          <p className="mt-3 text-sm text-gray-600">
            You’ll be redirected to Cashfree’s secure checkout. After completing
            payment, you’ll return here.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
