import { motion } from "framer-motion";
import { BrainCircuit, LogIn } from "lucide-react";
import img from "../../assets/bot-hero.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-3">
          <BrainCircuit size={30} className="text-purple-400" />
          <h1 className="text-xl font-bold tracking-tight font-heading">Noahmatics</h1>
        </div>
        <div className="space-x-6 hidden md:flex">
          <a href="#features" className="text-gray-300 hover:text-white">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
          <a href="#how-to" className="text-gray-300 hover:text-white">How to Use</a>
          <a href="#signin" className="flex items-center gap-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl">
            <LogIn size={16} /> Sign In
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-10 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Explore the Future of Math Learning with <span className="text-purple-400">AI</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Interactive lessons, real-time voice teaching, and AI-powered explanations tailored for every learner.
          </p>
          <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-semibold text-white text-lg shadow-lg">
            Get Started
          </button>
        </motion.div>

        {/* Bot Visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 md:mt-0 md:ml-16"
        >
          <div className="backdrop-blur-md bg-white/10 border border-purple-500/40 rounded-3xl p-4 shadow-2xl">
            <img src={img} alt="AI Bot" className="rounded-2xl w-[320px] h-auto" />
            <p className="text-center text-purple-300 mt-4 font-body">AI is generating...</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
