import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      setError("Please fill in all fields.");
      return;
    } else if(!/\S+@\S+\.\S+/.test(email)){
      setError("Please enter a valid email address.");
      return;
    } else{
      navigate("/dashboard"); // Placeholder logic
      console.log("Signing in:", { email, password });
    }
    // navigate("/dashboard"); // if successful
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md border border-purple-500/30 p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-semibold text-white">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
