import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with real authentication logic
    if (email && password) {
      console.log("Logging in with:", email, password);
      navigate("/dashboard"); // Or redirect to wherever
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-red-100 to-yellow-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border-2 border-red-300 p-8"
      >
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6 drop-shadow">
          🎟️ Welcome Back! 🎟️
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-red-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-red-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full shadow-lg font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            Log In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-red-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="underline font-semibold hover:text-red-800 transition"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </section>
  );
};

export default LoginPage;

