"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, Calendar, User, Compass as CompassIcon, ChevronRight, Sun, Moon } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useTheme } from "@/context/ThemeContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedDestination } = useBooking();
  const { theme, toggleTheme } = useTheme();
  
  const isHeroActive = pathname === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Discover", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Planner Portal", href: "/dashboard" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 transition-all duration-300">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={`w-full max-w-7xl flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-panel bg-white/75 dark:bg-primary/75 py-2.5 shadow-2xl border-slate-200/50 dark:border-white/10 max-w-5xl"
              : `bg-transparent border ${isHeroActive ? "border-white/10" : "border-slate-200/50 dark:border-white/10"}`
          }`}
        >
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-white shadow-[0_0_15px_rgba(13,148,136,0.5)] group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -inset-1 rounded-full border border-secondary/20 animate-ping opacity-30" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-base tracking-widest font-bold group-hover:text-secondary transition-colors duration-300 ${
                isHeroActive ? "text-white" : "text-slate-800 dark:text-white"
              }`}>
                HORIZON LUXE
              </span>
              <span className="text-[9px] tracking-widest text-accent font-medium uppercase -mt-1 font-sans">
                Journeys
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm tracking-wider font-sans font-medium transition-colors duration-300 ${
                    isHeroActive
                      ? "text-slate-200 hover:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA / Quick Access Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Luxury Theme Toggler */}
            <button
              onClick={toggleTheme}
              className={`p-2 hover:text-accent dark:hover:text-accent transition-all duration-300 relative cursor-pointer focus:outline-none ${
                isHeroActive ? "text-slate-200" : "text-slate-600 dark:text-slate-300"
              }`}
              aria-label={`Toggle theme to ${theme === "dark" ? "light" : "dark"}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className={`w-5 h-5 ${isHeroActive ? "text-white" : "text-slate-700"}`} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <Link
              href="/dashboard"
              className={`p-2 hover:text-accent dark:hover:text-accent transition-colors duration-300 relative ${
                isHeroActive ? "text-slate-200" : "text-slate-600 dark:text-slate-300"
              }`}
              aria-label="Trip Planner Portal"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href={selectedDestination ? "/checkout" : "/destinations"}
              className="magnetic-btn relative flex items-center gap-2 px-5 py-2.5 text-xs font-sans tracking-widest font-bold uppercase rounded-full bg-gradient-to-r from-secondary to-secondary-light text-white shadow-[0_4px_20px_rgba(13,148,136,0.3)] hover:shadow-[0_4px_25px_rgba(13,148,136,0.5)] transition-all duration-300"
            >
              <span>{selectedDestination ? "Complete Booking" : "Book Journey"}</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              {selectedDestination && (
                <span className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 flex items-center justify-center text-[10px] bg-accent text-primary font-extrabold rounded-full border-2 border-white dark:border-[#090d16] animate-bounce">
                  1
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme toggle for mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 hover:text-accent dark:hover:text-accent transition-colors duration-300 relative cursor-pointer focus:outline-none ${
                isHeroActive ? "text-slate-200" : "text-slate-600 dark:text-slate-300"
              }`}
              aria-label={`Toggle theme to ${theme === "dark" ? "light" : "dark"}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className={`w-5 h-5 ${isHeroActive ? "text-white" : "text-slate-700"}`} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {selectedDestination && (
              <Link
                href="/checkout"
                className="relative p-2 text-accent"
                aria-label="Active Booking pending"
              >
                <Calendar className="w-5 h-5 animate-pulse" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full" />
              </Link>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${
                isHeroActive
                  ? "text-slate-200 hover:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-primary/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-20"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-serif tracking-widest ${
                        isActive
                          ? "text-secondary font-bold"
                          : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-xs h-px bg-slate-200 dark:bg-white/10 my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 w-full max-w-xs"
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm uppercase tracking-widest"
                >
                  <User className="w-4 h-4" />
                  <span>My Portal</span>
                </Link>

                <Link
                  href={selectedDestination ? "/checkout" : "/destinations"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary-light text-white text-sm font-bold uppercase tracking-widest shadow-lg"
                >
                  <CompassIcon className="w-4 h-4" />
                  <span>{selectedDestination ? "Checkout Trip" : "Explore Trips"}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
