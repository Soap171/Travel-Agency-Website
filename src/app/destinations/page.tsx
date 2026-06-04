"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Star, MapPin, Compass, RefreshCw, X, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";
import { useSearchFilters } from "@/hooks/useSearchFilters";

export default function DestinationsCatalog() {
  const {
    filters,
    filteredDestinations,
    handleSearchChange,
    handleRegionChange,
    handleStyleChange,
    handleBudgetChange,
    handleDurationChange,
    resetFilters,
  } = useSearchFilters();

  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const regions = ["All", "Europe", "Asia", "Americas", "Polar", "Africa"];
  const styles = ["All", "Adventure", "Wellness", "Heritage", "Luxury Cruise", "Island Retreat"];

  // Generate TouristTrip JSON-LD schema
  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": filteredDestinations.length,
    "itemListElement": filteredDestinations.map((dest, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristTrip",
        "name": dest.title,
        "description": dest.shortDescription,
        "image": dest.featuredImage,
        "offers": {
          "@type": "Offer",
          "price": dest.basePrice,
          "priceCurrency": "USD"
        },
        "itinerary": {
          "@type": "ItemList",
          "numberOfItems": dest.itinerary.length,
          "itemListElement": dest.itinerary.map((day) => ({
            "@type": "ListItem",
            "position": day.day,
            "item": {
              "@type": "CreativeWork",
              "name": day.title,
              "description": day.description
            }
          }))
        }
      }
    }))
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 bg-background-luxe text-foreground-luxe">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Page Title & Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-5">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-1 block">
              Curated Escapes
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Bespoke Destinations
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans text-slate-600 dark:text-slate-400">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredDestinations.length}</span> signature expeditions
            </span>
            <button
              onClick={resetFilters}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Reset Search Filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. RESTURCTURED STICKY HORIZONTAL FILTER DOCK CAPSULE */}
        <motion.div
          layout
          className="w-full sticky top-24 z-30 glass-panel p-4 md:p-5 rounded-2xl md:rounded-full border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-950/20 shadow-2xl flex flex-col gap-4 transition-all duration-300"
        >
          {/* Main Controls Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
            
            {/* Input Search Field (Left) */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-full px-4 py-2.5 w-full lg:max-w-xs transition-colors hover:border-slate-300 dark:hover:border-white/10 focus-within:!border-secondary/40">
              <Compass className="w-4 h-4 text-secondary flex-shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search villas, peak lodges..."
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent border-none text-xs text-slate-800 dark:text-white focus:outline-none w-full p-0 font-medium placeholder-slate-400 dark:placeholder-slate-500"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Geographical region selector capsules (Center) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none justify-start lg:justify-center">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mr-1.5 flex-shrink-0 hidden sm:inline">Region</span>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    filters.selectedRegion === region
                      ? "bg-secondary text-white shadow-md shadow-secondary/10"
                      : "bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Expand Advanced Filters toggle trigger (Right) */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 border-slate-200 dark:border-white/5 pt-3 lg:pt-0">
              <button
                onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-750 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold uppercase tracking-widest text-[10px] cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-secondary" />
                <span>Refine Parameters</span>
                {advancedFiltersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Collapsible Advanced Filters Drawer Row */}
          <AnimatePresence>
            {advancedFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden border-t border-slate-200 dark:border-white/5 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start w-full"
              >
                {/* Advanced Group 1: Style selector */}
                <div className="flex flex-col gap-2.5 md:col-span-2 lg:col-span-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Expedition Style
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => handleStyleChange(style)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 cursor-pointer ${
                          filters.selectedStyle === style
                            ? "bg-secondary text-white"
                            : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Group 2: Budget cap slider */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Maximum Escrow Budget
                    </span>
                    <span className="text-xs font-bold text-accent">${filters.maxBudget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="15000"
                    step="500"
                    value={filters.maxBudget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full accent-secondary h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer mt-1"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    <span>$5k</span>
                    <span>$10k</span>
                    <span>$15k</span>
                  </div>
                </div>

                {/* Advanced Group 3: Duration cap slider */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Maximum Expedition Days
                    </span>
                    <span className="text-xs font-bold text-accent">{filters.maxDuration} Days</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="1"
                    value={filters.maxDuration}
                    onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                    className="w-full accent-secondary h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer mt-1"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    <span>4 days</span>
                    <span>7 days</span>
                    <span>10 days</span>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2. RESTRUCTURED SPACIOUS FULL-WIDTH GRID LIST */}
        <section className="flex flex-col gap-8 w-full mt-4">
          
          {/* Empty State */}
          {filteredDestinations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center glass-panel rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10">
              <ShieldAlert className="w-12 h-12 text-accent/40 mb-4 animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-2">No Expeditions Found</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
                We currently do not offer luxury escapes matching these exact constraints. Please expand your price budget, duration, or clear search queries.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary-light text-white text-xs font-sans font-bold uppercase tracking-widest cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Grid List - Expanded to 3 columns on large viewports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <AnimatePresence>
              {filteredDestinations.map((dest) => (
                <motion.article
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/20 shadow-xl transition-all duration-500 hover:border-secondary/20 hover:shadow-secondary/5"
                >
                  {/* Card Media Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={dest.featuredImage}
                      alt={dest.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-750 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
                    
                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/10">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-[10px] text-slate-800 dark:text-white font-bold">{dest.rating}</span>
                    </div>

                    {/* Region Tag */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-widest text-slate-100 bg-secondary rounded-lg">
                      {dest.region}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-sans text-slate-550 uppercase tracking-widest font-bold mb-2">
                      {dest.style} &bull; {dest.durationDays} Days
                    </span>
                    
                    <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-light transition-colors mb-2.5 leading-snug">
                      {dest.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-6 flex-grow line-clamp-3">
                      {dest.shortDescription}
                    </p>

                    {/* Coordinates Marker */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-medium mb-5">
                      <MapPin className="w-3.5 h-3.5 text-accent-light" />
                      <span>{dest.coordinates.label}</span>
                    </div>

                    {/* Pricing and Button */}
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
                        className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold uppercase tracking-widest text-[8px] sm:text-[9px] group-hover:bg-secondary hover:!text-white dark:hover:!text-white transition-all duration-300 cursor-pointer"
                      >
                        <span>Explore Details</span>
                        <Compass className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
