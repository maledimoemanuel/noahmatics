import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogIn, Menu, X } from 'lucide-react';
import img from "../../assets/bot-hero.jpg";
import interactive from "../../assets/interactive.jpg";
import voice from "../../assets/voice.jpg";
import explanation from "../../assets/explanation.jpg";

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-6">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <BrainCircuit size={28} className="text-purple-400" />
          <h1 className="text-xl font-bold tracking-tight font-heading">Noahmatics</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#how-to" className="text-gray-300 hover:text-white transition-colors">How to Use</a>
          <Link to="/signup" className="text-indigo-300 hover:text-white transition-colors">New Account</Link>
          <Link
            to="/signin"
            className="flex items-center gap-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl transition-all"
          >
            <LogIn size={16} /> Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md bg-purple-600"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1c1733]/90 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4 py-6">
            <a href="#features" className="text-white text-lg">Features</a>
            <a href="#pricing" className="text-white text-lg">Pricing</a>
            <a href="#how-to" className="text-white text-lg">How to Use</a>
            <a href="#sign-up" className="text-white text-lg">New Account</a>
            <a
              href="#signin"
              className="flex items-center gap-2 text-white bg-purple-600 px-6 py-2 rounded-xl"
            >
              <LogIn size={16} /> Sign In
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20 pt-8 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left max-w-full md:max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Explore the Future of Math Learning with <span className="text-purple-400">AI</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
            Say goodbye to passive learning. Dive into engaging interactive lessons, connect with real-time voice teaching, and get deeper understanding with AI-powered explanations crafted for your individual learning style. Learn actively, learn effectively.
          </p>
          <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-semibold text-white text-base sm:text-lg shadow-lg transition-all" onClick={handleSignup}>
            Get Started
          </button>
        </motion.div>

        {/* Bot Visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 md:mb-0 md:ml-16 w-full max-w-xs sm:max-w-sm"
        >
          <div className="backdrop-blur-md bg-white/10 border border-purple-500/40 rounded-3xl p-4 shadow-2xl">
            <img src={img} alt="AI Bot" className="rounded-2xl w-full h-auto" />
            <p className="text-center text-purple-300 mt-4 font-body">AI is generating...</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 md:px-20 py-16 bg-[#1c1733]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <img src={interactive} alt="Interactive Lessons" className="rounded-xl mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Lessons</h3>
              <p className="text-gray-300">
                Engage with dynamic, interactive lessons designed for a hands-on learning experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <img src={voice} alt="Real-Time Voice Teaching" className="rounded-xl mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-semibold text-white mb-4">Real-Time Voice Teaching</h3>
              <p className="text-gray-300">
                Receive personalized real-time voice teaching that adapts to your pace and needs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <img src={explanation} alt="AI-Powered Explanations" className="rounded-xl mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Explanations</h3>
              <p className="text-gray-300">
                Get deeper insights into concepts with AI-driven explanations tailored to your learning style.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="px-4 md:px-20 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Basic</h3>
              <p className="text-gray-300">R250/month</p>
              <p className="text-gray-300">Access to core lessons and AI-powered explanations.</p>
            </div>
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Standard</h3>
              <p className="text-gray-300">R500/month</p>
              <p className="text-gray-300">Everything in Basic plus real-time voice teaching.</p>
            </div>
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Premium</h3>
              <p className="text-gray-300">R1000/month</p>
              <p className="text-gray-300">All features, including priority support and additional content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to" className="px-4 md:px-20 py-16 bg-[#1c1733]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">How to Use</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 1: Sign Up</h3>
              <p className="text-gray-300">Create a new account to get started with the platform.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 2: Choose a Plan</h3>
              <p className="text-gray-300">Select the plan that best fits your learning needs and goals.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Step 3: Start Learning</h3>
              <p className="text-gray-300">Dive into interactive lessons, AI-powered content, and more!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
