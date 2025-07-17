"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";


function FreakModel() {
  const model = useGLTF("/src/Assets/3DModels/circus_baby_-_fnaf_ar_-_special_delivery.glb");
  return (
    <Canvas style={{ height: "300px" }}>
      <ambientLight intensity={0.5} />
      <primitive object={model.scene} scale={2} />
      <OrbitControls />
    </Canvas>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });

    navigate("/");
  };

  return (
    <section className="relative text-white bg-gradient-to-r from-red-600 to-yellow-400 py-20 px-6 text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md"
      >
        Welcome to FreakVille!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl mb-8"
      >
        Discover, book, and enjoy spectacular events.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mb-8"
      >
        <FreakModel />
      </motion.div>

      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-red-600 font-bold py-3 px-6 rounded-xl text-lg shadow-lg"
      >
        🎟️ Get Tickets
      </motion.button>
    </section>
  );
}
