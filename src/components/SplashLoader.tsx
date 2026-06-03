"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

export const SplashLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Simulate loader progress filling
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    // 2. Hide preloader after progress finishes
    const hideTimeout = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(15px)",
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#05070c] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 3D Space Scene constraints */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="flex flex-col items-center gap-8 relative z-10 [perspective:1000px]">
            {/* 3D Gold Rotating Compass Shield */}
            <motion.div
              initial={{ rotateY: 0, rotateX: 12, scale: 0.85, opacity: 0 }}
              animate={{
                rotateY: [0, 360],
                rotateX: [12, -12, 12],
                scale: 1,
                opacity: 1,
              }}
              transition={{
                rotateY: { duration: 3.5, ease: "linear", repeat: Infinity },
                rotateX: { duration: 4, ease: "easeInOut", repeat: Infinity },
                scale: { duration: 1.2, ease: "easeOut" },
                opacity: { duration: 0.8 }
              }}
              className="relative w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-accent to-[#d97706] text-primary shadow-[0_0_50px_rgba(234,179,8,0.3)] [transform-style:preserve-3d]"
            >
              {/* Backside gold plating decoration */}
              <div className="absolute inset-0 rounded-full border-2 border-white/25 [transform:translateZ(2px)] pointer-events-none" />
              
              <Compass className="w-12 h-12 text-primary font-bold [transform:translateZ(10px)]" />

              {/* Pulsing halo ring */}
              <div className="absolute -inset-4 rounded-full border border-accent/20 animate-ping opacity-30" />
            </motion.div>

            {/* Letter-By-Letter Brand Entrance */}
            <div className="flex flex-col items-center text-center gap-1.5 mt-4">
              <motion.span
                initial={{ letterSpacing: "0.4em", opacity: 0, filter: "blur(5px)" }}
                animate={{ letterSpacing: "0.25em", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-serif text-lg md:text-2xl font-bold text-white tracking-widest leading-none"
              >
                HORIZON LUXE
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-[9px] uppercase tracking-widest text-secondary font-bold font-sans"
              >
                Immersive Bespoke Escapes
              </motion.span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-6 relative border border-white/5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <span className="text-[8px] font-mono tracking-widest font-bold text-slate-500 uppercase -mt-2">
              {progress}% Authorized
            </span>
          </div>

          {/* Lower Escrow Shield Indicator */}
          <div className="absolute bottom-10 flex items-center gap-2 text-[9px] text-slate-500 tracking-wider font-sans opacity-70">
            <span>Horizon Escrow Bridge Secured</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
