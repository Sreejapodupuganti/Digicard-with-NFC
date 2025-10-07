import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { NavBar } from "../components/GlobalHeader";
import { AuthContext } from "../context/AuthContext";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 4000); // redirect after 4s
      return () => clearTimeout(timer);
    }, [navigate]);

  return (
    <div className=" bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex flex-col">
      <NavBar user={user} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-grow flex items-center justify-center mt-10"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-4xl text-center">
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            Payment Successful 🎉
          </h1>
          <p className="mt-3 text-gray-600">
            Thank you for your payment. You’ll be redirected to your dashboard
            shortly.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
          >
            Go to Dashboard Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
