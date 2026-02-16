// // import React, { useEffect } from 'react'
// "use client"
// import React, { useEffect, useState } from 'react';

// const SpinnerLoad = () => {
     
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     let c = 0;
//     const interval = setInterval(() => {
//       setCounter(c);
//       c++;
//       if (c > 100) {
//         clearInterval(interval);
//       }
//     }, 70);

//     return () => clearInterval(interval);
//   }, []);

//   return (
    
//        <div className="loading-page flex  justify-center w-screen h-screen bg-black ">
//        <div className="counter text-center relative max-w-screen-md mt-64 flex flex-col gap-6">
//          <p className="text-pink-500 text-4xl font-thin">Generating Your Roadmap Please wait a moment</p>
//          <h1 className="text-white  text-6xl mt-[-10px]">{counter}%</h1>
//          <hr className="w-full h-1 bg-pink-500 border-none mt-4" style={{ width: `${counter}%` }} />
//        </div>
//       </div>
        

//   )
// }

// export default SpinnerLoad
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const LOADING_PHASES = [
  "Aligning Neural Networks...",
  "Calibrating Strategy Models...",
  "Synthesizing Market Data...",
  "Architecting Your Roadmap...",
  "Optimizing for Success...",
  "Final Polish..."
];

const SpinnerLoad = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  // Cycle through text phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % LOADING_PHASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center overflow-hidden font-sans text-white">
      
      {/* 1. Background: Moving Digital Grid (Blueprint Effect) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none perspective-1000">
        <motion.div
          className="absolute inset-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]"
          animate={{ 
            transform: ["translateY(0px) rotateX(45deg)", "translateY(64px) rotateX(45deg)"] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/80 to-slate-950" />
      </div>

      {/* 2. The Main Animation: Gyroscopic Neural Core */}
      <div className="relative z-10 w-64 h-64 flex items-center justify-center mb-12">
        
        {/* Core Glow (Behind) */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-sky-500/30 blur-[60px] rounded-full"
        />

        {/* Ring 1: Outer Slow (Cyan) */}
        <motion.div
          className="absolute w-full h-full border-[1px] border-sky-500/30 rounded-full"
          style={{ borderTopColor: "transparent", borderBottomColor: "transparent" }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
        >
          {/* Orbiting Particle */}
          <div className="absolute top-1/2 left-full w-2 h-2 bg-sky-400 rounded-full blur-[1px] shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Ring 2: Middle Medium (Purple) - Tilted */}
        <motion.div
          className="absolute w-48 h-48 border-[1px] border-purple-500/40 rounded-full"
          style={{ borderLeftColor: "transparent", borderRightColor: "transparent" }}
          animate={{ rotate: -360, rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
             <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full blur-[1px] shadow-[0_0_10px_#a855f7]" />
        </motion.div>

        {/* Ring 3: Inner Fast (Lime/White) */}
        <motion.div
          className="absolute w-32 h-32 border-2 border-dashed border-lime-500/50 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* The Central Brain/Core */}
        <div className="relative flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 0.8, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]"
            />
            <motion.div 
                animate={{ scale: [1, 2], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 w-4 h-4 bg-sky-400 rounded-full"
            />
        </div>
      </div>

      {/* 3. The Typography: Cinematic Blur Reveal */}
      <div className="relative z-10 h-16 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phaseIndex}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-200 uppercase">
              {LOADING_PHASES[phaseIndex]}
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Bottom Footer: Subtle Pulsing Text */}
      <motion.p 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-xs text-slate-500 tracking-widest uppercase"
      >
        Processing Request
      </motion.p>

    </div>
  );
};

export default SpinnerLoad;