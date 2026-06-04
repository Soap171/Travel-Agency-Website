"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { SearchDock } from "@/components/SearchDock";
import { destinationsData } from "@/data/destinations";
import { SplashCursor } from "@/components/SplashCursor";
import { BlurText } from "@/components/BlurText";

const travelStyles = [
  {
    name: "Island Retreats",
    desc: "Private coral lagoons and overwater sanctuaries.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Alpine Peaks",
    desc: "Ski-in ski-out lodges facing direct Matterhorn peaks.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Heritage Hideaways",
    desc: "Ancient shrines and zen gardens in private estates.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="relative min-h-screen pb-16 flex flex-col bg-background-luxe text-foreground-luxe">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] lg:h-screen w-full flex items-center justify-center px-4 py-12 sm:py-16 lg:py-0 overflow-hidden">
        {/* Background panoramic image with deep overlay */}
        <div className="absolute inset-0 bg-background-luxe z-0 transition-colors duration-500">
          <Image
            src="https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&q=80&w=1920"
            alt="Cinematic Alpine Peak Panoramic Background"
            fill
            priority
            quality={90}
            className="object-cover object-center scale-105 animate-pulse-slow opacity-20 dark:opacity-40 transition-opacity duration-500"
          />
          {/* Theme-aware tint overlay */}
          <div className="absolute inset-0 bg-white/5 dark:bg-slate-950/30 z-10" />
          {/* Theme-aware vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(var(--primary),0.3)_100%)] dark:bg-[radial-gradient(circle,transparent_15%,rgba(9,13,22,0.8)_100%)] z-10" />
          {/* Center-focused backdrop radial shield to eliminate map visual noise under text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--background)_20%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(9,13,22,0.6)_15%,transparent_80%)] z-10 opacity-75 pointer-events-none" />
          {/* Bottom gradient transition to page background (only covering bottom quarter to prevent washing out the image) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background-luxe to-transparent z-10" />
        </div>

        <SplashCursor isAbsolute />

        {/* Hero Content */}
        <div className="relative w-full max-w-5xl mx-auto text-center z-20 flex flex-col items-center mt-12 sm:mt-16 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 backdrop-blur-md mb-4 sm:mb-6"
          >
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary dark:text-accent dark:fill-accent" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-secondary dark:text-accent">
              Introducing Curated Luxe Safaris
            </span>
          </motion.div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 max-w-4xl leading-tight">
            <BlurText
              text="The Ultimate Journey"
              delay={0.2}
              className="text-slate-900 dark:text-white block"
            />
            <BlurText
              text="Begins in Solitude"
              delay={0.6}
              className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light via-accent to-secondary block"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 font-sans leading-relaxed max-w-2xl mb-8 sm:mb-12"
          >
            Escape the ordinary. Immerse yourself in hand-curated luxury travel experiences, bespoke international holiday packages, and seamless itinerary booking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl"
          >
            <SearchDock />
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 z-20 pointer-events-none hidden lg:flex">
          <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Scroll to Discover</span>
          <div className="w-1.5 h-6 rounded-full border border-slate-400 flex justify-center p-0.5">
            <div className="w-0.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 border-b border-slate-200 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "100%", label: "Curated Seclusion" },
            { value: "4.98 / 5", label: "Client Satisfaction" },
            { value: "24/7", label: "Dedicated Concierge" },
            { value: "Elite", label: "Stripe Secured Portal" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest font-bold mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Hand-Selected Expeditions
            </h2>
          </div>
          <Link
            href="/destinations"
            className="group flex items-center gap-2 text-sm tracking-wider uppercase font-bold text-accent hover:text-white transition-colors duration-300"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Catalog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinationsData.slice(0, 3).map((dest) => (
            <motion.article
              key={dest.id}
              variants={itemVariants}
              className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 shadow-xl transition-all duration-500 hover:border-secondary/20 hover:shadow-secondary/5"
            >
              {/* Card Image Container with Hover Scale */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={dest.featuredImage}
                  alt={dest.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                
                {/* Rating badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-[10px] text-white font-bold">{dest.rating}</span>
                </div>

                {/* Region Tag */}
                <span className="absolute bottom-4 left-4 px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-widest text-slate-100 bg-secondary rounded-lg">
                  {dest.region}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest font-bold mb-2">
                  {dest.style} &bull; {dest.durationDays} Days
                </span>
                
                <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-light transition-colors mb-2.5 leading-snug">
                  {dest.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-6 flex-grow line-clamp-3">
                  {dest.shortDescription}
                </p>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between border-t border-slate-150 dark:border-white/5 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">
                      Bespoke Package
                    </span>
                    <span className="text-base font-sans font-bold text-accent">
                      from ${dest.basePrice.toLocaleString()} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">/ guest</span>
                    </span>
                  </div>
                  
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="p-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label={`View Itinerary for ${dest.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* 4. CHRONICLES OF SECLUSION (TRAVEL STYLE SHOWCASE) */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-950/20 border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/1 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">
              Expedition Formats
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Aesthetics of Exploration
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              Our experiences are categorized by their aesthetic philosophy, providing the exact standard of wilderness and service you seek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelStyles.map((style, idx) => (
              <div
                key={idx}
                className="group relative h-[380px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-end p-5 sm:p-6 border border-slate-200 dark:border-white/5"
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                <div className="relative z-20 flex flex-col">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1.5">
                    Format 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-2 leading-none">
                    {style.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                    {style.desc}
                  </p>
                  
                  <Link
                    href="/destinations"
                    className="w-fit flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Explore Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MOCK TESTIMONIALS */}
      <section className="py-24 px-4 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 block">
          Client Endorsements
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-12">
          Echoes of Discovery
        </h2>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-slate-200 dark:border-white/5 relative">
          <Star className="w-8 h-8 text-accent/20 absolute top-6 left-6" />
          
          <blockquote className="font-serif text-lg md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
            &ldquo;The Overwater Villa experience in Baa Atoll was absolutely transcendental. Every minor detail was aligned to perfection by our private hosts, and direct snorkeling with whale sharks was a memory our family will cherish forever.&rdquo;
          </blockquote>
          
          <cite className="not-italic flex flex-col items-center">
            <span className="font-sans text-sm font-bold text-slate-900 dark:text-white">Lord Montgomery Stirling</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">London, United Kingdom</span>
          </cite>
        </div>
      </section>
    </div>
  );
}
