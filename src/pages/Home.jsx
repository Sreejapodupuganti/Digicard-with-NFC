import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImage from "../assets/profile.svg";
import cardImage from "../assets/card.svg";
import confirmedImage from "../assets/confirmed.svg";
import paymentCardImage from "../assets/payment_card.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavBar } from "../components/GlobalHeader";
import Footer from "../components/Footer";

// Reusable Container
export const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
);

// Hero Section
const Hero = () => (
  <Container className="py-24 text-center flex flex-col items-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-6xl font-bold leading-tight text-gray-900"
    >
      Your Digital Business Identity
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
    >
      Share your profile, connect instantly, and accept payments with a single
      tap — all from one smart NFC card.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-10 flex gap-4"
    >
      <Link
        to="/register"
        className="px-8 py-4 rounded-xl bg-black text-white font-semibold shadow hover:shadow-lg transition"
      >
        Get Started
      </Link>
      <Link
        to="/login"
        className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        I already have an account
      </Link>
    </motion.div>

    <motion.img
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      src={paymentCardImage}
      alt="Credit Card Mockup"
      className="mt-16 w-full max-w-md"
    />
  </Container>
);

// Step Card
const Step = ({ img, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="relative p-6 rounded-xl bg-white border border-gray-200 shadow-md text-center"
  >
    <img src={img} alt={title} className="w-fit h-24 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

// How It Works
const HowItWorks = () => (
  <Container className="py-20 grid md:grid-cols-3 gap-8">
    <Step
      img={profileImage}
      title="Create Profile"
      desc="Set up your contact details, links, and payment option in minutes."
    />
    <Step
      img={cardImage}
      title="Tap Your Card"
      desc="Simply tap your NFC card on any smartphone to share instantly."
    />
    <Step
      img={confirmedImage}
      title="Share & Get Paid"
      desc="Contacts can save your info or send payments securely in one step."
    />
  </Container>
);

// Feature Card
const FeatureCard = ({ title, desc, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-8 rounded-xl bg-white border border-gray-200 shadow-md text-center"
  >
    <div className="text-4xl mb-4 text-black">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

const Features = () => (
  <Container className="py-20 grid md:grid-cols-3 gap-8">
    <FeatureCard
      title="One Tap Sharing"
      desc="Exchange details faster than any paper card — NFC powered."
      icon="📱"
    />
    <FeatureCard
      title="Integrated Payments"
      desc="Link your UPI or PayPal account to get paid instantly."
      icon="💳"
    />
    <FeatureCard
      title="Eco-Friendly"
      desc="No paper waste — a sustainable and future-ready solution."
      icon="🌱"
    />
  </Container>
);

// Showcase
const Showcase = () => (
  <Container className="py-20 flex flex-col md:flex-row items-center gap-10">
    <img
      src="https://images.pexels.com/photos/164571/pexels-photo-164571.jpeg"
      alt="Credit Card in Hand"
      className="rounded-xl shadow-md w-full md:w-1/2"
    />
    <div className="text-left md:w-1/2 bg-white rounded-xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        Why Choose DigiCard?
      </h2>
      <p className="text-gray-600 mb-6">
        Professionals, freelancers, and students use DigiCard to build stronger
        connections. With instant updates, built-in payments, and zero paper
        waste, it's more than a card — it's your smart identity.
      </p>
      <Link
        to="/register"
        className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:scale-105 transition"
      >
        Get Yours Now
      </Link>
    </div>
  </Container>
);

// Testimonials
const Testimonials = () => (
  <Container className="py-20 text-center">
    <h2 className="text-3xl font-bold mb-12 text-gray-900">What People Say</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-md"
        >
          <img
            src={`https://i.pravatar.cc/100?img=${i}`}
            alt="User"
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 italic mb-2">
            “DigiCard made networking effortless. Everyone I meet loves the tap
            feature.”
          </p>
          <h4 className="font-semibold text-gray-900">User {i}</h4>
        </div>
      ))}
    </div>
  </Container>
);

// Call to Action
const CallToAction = () => (
  <Container className="py-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-10 rounded-xl bg-white shadow-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        Ready to Upgrade Your Networking?
      </h2>
      <p className="mb-6 text-gray-600">
        Create your free DigiCard today and take the first step into the future.
      </p>
      <Link
        to="/register"
        className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
      >
        Get Started for Free
      </Link>
    </motion.div>
  </Container>
);


// Page Composition
export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <NavBar user={user} />
      <Hero />
      <HowItWorks />
      <Features />
      <Showcase />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
