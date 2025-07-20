
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const HeroLanding = () => {
  return (
    <section className="bg-gradient-to-b from-yellow-50 to-red-100 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text-red-700 drop-shadow-lg"
      >
        🎪 Step Right Up to the Ultimate Funfair!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-red-900"
      >
        Experience the thrill, the mystery, and the magic of live events all in one place. Grab your tickets before they vanish like smoke!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-10 flex justify-center"
      >
        <Link to="/eventspage">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full shadow-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Browse Events
        </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroLanding;
