"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight, Globe, Share2, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    expeditions: [
      { name: "Amilla Fushi, Maldives", href: "/destinations/maldives-water-villas" },
      { name: "Zermatt Peak Chalet, Swiss", href: "/destinations/swiss-alps-chalet" },
      { name: "Patagonia Glacier Domes", href: "/destinations/patagonia-glacier-domes" },
      { name: "Heritage Sanctuary, Kyoto", href: "/destinations/kyoto-heritage-ryokan" },
    ],
    agency: [
      { name: "Bespoke Curation", href: "/destinations" },
      { name: "Private Air Charters", href: "/" },
      { name: "The Luxe Journal", href: "/" },
      { name: "VIP Escort Services", href: "/" },
    ],
    legal: [
      { name: "Terms of Curation", href: "/" },
      { name: "Privacy Protocol", href: "/" },
      { name: "Stripe Secure Escrow", href: "/" },
    ],
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-[#090d16] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 px-4 overflow-hidden z-10">
      {/* Light glow behind footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Description Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-widest font-bold text-slate-900 dark:text-white">
                HORIZON LUXE
              </span>
              <span className="text-[9px] tracking-widest text-accent font-medium uppercase -mt-1 font-sans">
                Journeys
              </span>
            </div>
          </Link>
          
          <p className="text-sm font-sans leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
            We curate immersive, ultra-luxury travel experiences around the world. Each custom journey is crafted for the discerning explorer seeking unparalleled comfort, bespoke itineraries, and absolute seclusion.
          </p>

          <div className="flex items-center gap-4 text-slate-550 dark:text-slate-400">
            <a href="#" className="hover:text-secondary dark:hover:text-secondary transition-colors duration-300" aria-label="Explore Global Network">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-secondary dark:hover:text-secondary transition-colors duration-300" aria-label="Share Experiences">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-secondary dark:hover:text-secondary transition-colors duration-300" aria-label="Explore Discoveries">
              <Compass className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Column 1: Expeditions */}
        <div className="flex flex-col gap-5">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-white">
            Signature Safaris
          </span>
          <ul className="flex flex-col gap-3.5">
            {footerLinks.expeditions.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs font-sans text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2: Agency Services */}
        <div className="flex flex-col gap-5">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-white">
            Curated Services
          </span>
          <ul className="flex flex-col gap-3.5">
            {footerLinks.agency.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs font-sans text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3: Newsletter Column */}
        <div className="flex flex-col gap-5">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-white">
            The Horizon Journal
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Receive exclusive early access to newly commissioned villa retreats and remote expeditions.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-3 pr-10 py-2.5 text-xs rounded-lg glass-input"
              />
              <button
                type="submit"
                className="absolute right-1 p-1.5 rounded-md text-white bg-secondary hover:bg-secondary-light transition-colors duration-300 cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-secondary font-medium animate-fade-in flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Subscription authenticated. Welcome.</span>
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-[10px] font-sans text-slate-500 tracking-wider">
          &copy; {new Date().getFullYear()} Horizon Luxe Journeys. All rights reserved.
        </span>

        <div className="flex items-center gap-6">
          {footerLinks.legal.map((link) => (
            <Link key={link.name} href={link.href} className="text-[10px] font-sans text-slate-500 hover:text-slate-800 dark:hover:text-slate-350 transition-colors duration-300 tracking-wider">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

