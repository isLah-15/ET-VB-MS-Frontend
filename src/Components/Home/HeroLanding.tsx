import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from "lucide-react";

const HeroLanding = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-red-200 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-400/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-orange-400/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-red-500/30 rounded-full animate-ping delay-500"></div>

        {/* Gradient orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-red-300/30 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text drop-shadow-2xl leading-tight transform hover:scale-105 transition-transform duration-300">
            <span className="inline-block animate-bounce delay-100">🎪</span>
            <span className="block mt-2">Step Right Up</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 bg-clip-text">
              to the Ultimate
            </span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text">Funfair!</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-red-400/20 blur-lg rounded-lg -z-10"></div>
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl lg:text-3xl text-red-800/90 font-medium leading-relaxed text-center drop-shadow-md">
            <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent font-semibold">
              Experience the thrill, the mystery, and the magic
            </span>
            <span className="block mt-2">
              of live events all in one place.
            </span>
            <span className="block mt-2 text-lg md:text-xl text-red-700/80 italic">
              Grab your tickets before they vanish like smoke! ✨
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative group">
          {/* Button glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-300 animate-pulse"></div>

          <button
            onClick={() => navigate("/eventspage")}
            className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white px-12 py-6 text-xl md:text-2xl font-bold rounded-full shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-4 group border-2 border-red-500/20 hover:border-yellow-400/40"
          >
            {/* Button content */}
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 animate-pulse group-hover:animate-spin transition-all duration-300 text-yellow-300" />
              <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent font-black tracking-wide">
                Browse Events
              </span>
              <Sparkles className="w-7 h-7 animate-pulse group-hover:animate-spin transition-all duration-300 text-yellow-300 delay-100" />
            </div>

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-700 rounded-full"></div>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-60">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="currentColor" opacity="0.1"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroLanding;
