"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Star, Coffee, Home, CheckCircle2, ChevronDown, Sparkles, Navigation, UserCheck } from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { useBookingEngine } from "@/hooks/useBookingEngine";

interface PageProps {
  params: React.Usable<{ slug: string }>;
}

export default function DestinationDetail({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { selectTrip, toggleExcursion, selectedExcursions, totalPrice } = useBookingEngine();

  const destination = destinationsData.find((d) => d.slug === slug);

  // States
  const [activeTab, setActiveTab] = useState<"itinerary" | "excursions" | "gallery">("itinerary");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState<string>("");

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28 px-4 text-center">
        <Sparkles className="w-12 h-12 text-accent/40 mb-4 animate-ping" />
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-2">Expedition Not Found</h1>
        <p className="text-xs text-slate-655 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
          The requested luxury escape route is not in our active catalog. Please explore our other curated journeys.
        </p>
        <button
          onClick={() => router.push("/destinations")}
          className="px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          View Destinations
        </button>
      </div>
    );
  }

  // Pre-set active image if not set
  if (!activeImage) {
    setActiveImage(destination.featuredImage);
  }

  const handleStartBooking = () => {
    // Select trip in context
    selectTrip(destination);
    // Redirect to checkout
    router.push("/checkout");
  };

  const isExcursionSelected = (exId: string) => {
    return selectedExcursions.some((e) => e.id === exId);
  };

  return (
    <div className="relative min-h-screen pb-24 bg-background-luxe text-foreground-luxe">
      
      {/* 1. CINEMATIC HERO COVER */}
      <section className="relative h-[65vh] w-full flex items-end justify-start px-4 md:px-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 z-0">
          <Image
            src={destination.featuredImage}
            alt={destination.title}
            fill
            priority
            quality={90}
            className="object-cover object-center scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-luxe via-background-luxe/30 to-transparent z-10" />
          <div className="absolute inset-0 cinematic-vignette z-10" />
        </div>

        <div className="relative max-w-4xl z-20 mt-32 flex flex-col items-start gap-4">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-widest text-slate-100 bg-secondary rounded-lg">
              {destination.region}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-[10px] font-bold">{destination.rating} ({destination.reviewCount} Reviews)</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-650 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{destination.durationDays} Days / {destination.durationDays - 1} Nights</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            {destination.title}
          </h1>

          <p className="font-serif text-sm md:text-lg text-accent max-w-2xl leading-relaxed italic">
            &ldquo;{destination.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* 2. PAGE CONTENT GRID (Timeline vs Pricing Card) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN: Itinerary/Timeline/Excursions Tabs */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-white/10 gap-6">
            {[
              { id: "itinerary", name: "Day-by-Day Timeline" },
              { id: "excursions", name: "Premium Excursions" },
              { id: "gallery", name: "Media Gallery" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "itinerary" | "excursions" | "gallery")}
                className={`pb-4 text-sm uppercase tracking-wider font-bold transition-all relative cursor-pointer ${
                  activeTab === tab.id ? "text-secondary font-extrabold" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Timeline */}
          {activeTab === "itinerary" && (
            <div className="flex flex-col gap-6">
              <p className="text-sm font-sans text-slate-650 dark:text-slate-300 leading-relaxed">
                {destination.longDescription}
              </p>

              {/* Day-by-Day Accordion Timeline */}
              <div className="flex flex-col relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-white/5 mt-4">
                {destination.itinerary.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="relative pl-12 pb-8 last:pb-0"
                    >
                      {/* Timeline Dot Indicator */}
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                        className={`absolute left-0 w-10 h-10 rounded-full border flex items-center justify-center z-10 transition-all duration-300 focus:outline-none cursor-pointer ${
                          isExpanded
                            ? "bg-secondary text-white border-secondary scale-110 shadow-lg shadow-secondary/20"
                            : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xs font-bold font-serif">{day.day}</span>
                      </button>

                      {/* Timeline Card Body */}
                      <div className="glass-panel p-5 rounded-2xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10">
                        <div
                          onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <h3 className="font-serif text-base font-bold text-slate-800 dark:text-white group-hover:text-secondary transition-colors">
                            Day {day.day}: {day.title}
                          </h3>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-secondary" : ""
                            }`}
                          />
                        </div>

                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 flex flex-col gap-4 border-t border-slate-150 dark:border-white/5 pt-4 text-xs font-sans text-slate-550 dark:text-slate-400 leading-relaxed"
                          >
                            <p>{day.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-slate-150 dark:border-white/5 pt-3">
                              <div className="flex items-center gap-2">
                                <Home className="w-4 h-4 text-secondary flex-shrink-0" />
                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Accommodation</span>
                                  <span className="text-slate-800 dark:text-white font-medium">{day.accommodation}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Coffee className="w-4 h-4 text-secondary flex-shrink-0" />
                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Catering</span>
                                  <span className="text-slate-800 dark:text-white font-medium">{day.meals}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content 2: Premium Excursions */}
          {activeTab === "excursions" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-1.5">Tailor Your Adventure</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enhance your luxury vacation package by choosing exclusive concierge excursions. Excursion pricing is computed per guest on checkout finalization.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {destination.excursions.map((ex) => {
                  const isSel = isExcursionSelected(ex.id);
                  return (
                    <div
                      key={ex.id}
                      onClick={() => toggleExcursion(ex)}
                      className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSel
                          ? "bg-secondary/5 border-secondary/50 shadow-md shadow-secondary/5"
                          : "bg-white/40 dark:bg-slate-950/20 border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`mt-2.5 rounded-full p-0.5 ${isSel ? "text-secondary" : "text-slate-400 dark:text-slate-600"} flex-shrink-0`}>
                          <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-[#090d16]" />
                        </div>
                        
                        {/* Excursion Image Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 flex-shrink-0 bg-slate-900">
                          <Image
                            src={ex.image}
                            alt={ex.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap leading-none">
                            <span className="font-serif text-sm font-bold text-slate-800 dark:text-white leading-none">{ex.name}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-250 dark:border-white/5">
                              {ex.duration}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mt-1.5 max-w-lg">
                            {ex.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-150 dark:border-white/5">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Additional Fare</span>
                        <span className="text-sm font-bold text-accent">${ex.price.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/ guest</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content 3: Media Gallery */}
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-6">
              {/* Highlight Viewer */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                <Image
                  src={activeImage}
                  alt="Curated Gallery Focus"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[destination.featuredImage, ...destination.galleryImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                      activeImage === img ? "border-secondary scale-98" : "border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery thumbnail ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Pricing & Reservation Card */}
        <aside className="sticky top-28 glass-panel p-6 rounded-2xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 flex flex-col gap-6">
          <div className="border-b border-slate-150 dark:border-white/5 pb-4">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold block mb-1">
              Escapes Quoting Engine
            </span>
            <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">Private Villa Package</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 dark:text-slate-400">Base Expedition Fare</span>
              <span className="font-bold text-slate-800 dark:text-white">${destination.basePrice.toLocaleString()} / guest</span>
            </div>

            {selectedExcursions.length > 0 && (
              <div className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200 dark:border-white/5">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Added Excursions</span>
                {selectedExcursions.map((ex) => (
                  <div key={ex.id} className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{ex.name}</span>
                    <span className="text-slate-655 dark:text-slate-400 font-bold">${ex.price} / guest</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center border-t border-slate-150 dark:border-white/5 pt-4 mt-2">
              <div className="flex flex-col">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Total Estimated Quota</span>
                <span className="text-xl font-bold text-accent">
                  ${totalPrice > 0 ? totalPrice.toLocaleString() : (destination.basePrice * 2).toLocaleString()}
                </span>
                <span className="text-[9px] text-slate-500 leading-none">Calculated for 2 travelers</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 pt-2">
            <button
              onClick={handleStartBooking}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-white font-sans font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-[0_4px_25px_rgba(13,148,136,0.4)] transition-all duration-300 cursor-pointer shadow-md"
            >
              <UserCheck className="w-4 h-4" />
              <span>Reserve Itinerary</span>
            </button>

            <button
              onClick={() => router.push("/destinations")}
              className="w-full py-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
            >
              <span>Back to Catalog</span>
            </button>
          </div>

          {/* Secure escrow badge */}
          <div className="flex items-center justify-center gap-2 border-t border-slate-150 dark:border-white/5 pt-4 text-[10px] text-slate-500 font-medium">
            <Navigation className="w-3.5 h-3.5 text-secondary" />
            <span>Escrow checkout secured by Stripe</span>
          </div>
        </aside>

      </section>
    </div>
  );
}
