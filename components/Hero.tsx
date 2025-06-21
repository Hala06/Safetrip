"use client";
import { motion } from "framer-motion"; 
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
      >
        SafeTrip.AI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 max-w-lg text-gray-300"
      >
        Your personalized travel assistant that helps first-time and values-based
        travelers explore unfamiliar cities safely and comfortably
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link
          href="#features"
          className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
        >
          Start Your Safe Journey
        </Link>
      </motion.div>
    </section>
  );
}
