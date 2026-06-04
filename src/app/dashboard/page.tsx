"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, Plane, ShieldCheck, ArrowRight, Printer, AlertCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export default function ClientDashboard() {
  const { confirmedBookings } = useBooking();
  const [activeTab, setActiveTab] = useState<"trips" | "profile">("trips");
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Pre-select the first trip if not selected
  if (confirmedBookings.length > 0 && !selectedTripId) {
    setSelectedTripId(confirmedBookings[0].id);
  }

  const activeTrip = confirmedBookings.find((b) => b.id === selectedTripId);

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-6 bg-background-luxe text-foreground-luxe">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Profile Welcome Header */}
        <div className="glass-panel bg-slate-50/50 dark:bg-gradient-to-r dark:from-primary dark:via-slate-900 dark:to-[#090d16] p-6 md:p-8 rounded-3xl border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 no-print">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center border border-secondary/20 shadow-xl shadow-secondary/5 font-serif font-bold text-2xl">
              AV
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] text-secondary dark:text-accent uppercase tracking-widest font-bold">Horizon VIP Concierge</span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none mt-1">
                Alexander Vanderbilt
              </h1>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">Status: Lifetime Platinum Explorer</span>
            </div>
          </div>

          {/* Quick tab toggle */}
          <div className="flex bg-slate-200/60 dark:bg-slate-950/60 p-1.5 rounded-full border border-slate-200 dark:border-white/5 gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("trips")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "trips" ? "bg-secondary text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Active Safaris
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "profile" ? "bg-secondary text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Traveler Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        {activeTab === "profile" ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/5 pb-3">Security & Personal Dossier</h2>
              
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">VIP Membership Level</span>
                <span className="text-slate-800 dark:text-white font-medium text-sm">Platinum Horizon Club Escrow Tier</span>
              </div>
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Contact Phone</span>
                <span className="text-slate-800 dark:text-white font-medium text-sm">+1 (555) 019-2834</span>
              </div>
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Secure Email</span>
                <span className="text-slate-800 dark:text-white font-medium text-sm">alexander@vanderbilt.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/5 pb-3">Ticketing Credentials</h2>
              
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Passport Reference</span>
                <span className="text-slate-800 dark:text-white font-mono text-sm uppercase">N5839201A &bull; United States</span>
              </div>
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Dietary Specifications</span>
                <span className="text-slate-800 dark:text-white font-medium text-sm">Gluten-free, preference for organic dining, champagnes.</span>
              </div>
              <div className="flex flex-col gap-1 font-sans text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Default Currency</span>
                <span className="text-slate-800 dark:text-white font-medium text-sm">United States Dollar ($ USD)</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Trips Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: Sidebar listing active bookings */}
            <aside className="flex flex-col gap-4 no-print">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                My Bookings ({confirmedBookings.length})
              </span>

              {confirmedBookings.length === 0 ? (
                <div className="glass-panel p-6 rounded-2xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 text-center">
                  <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">You do not have any active luxury bookings yet.</p>
                  <Link href="/destinations" className="px-5 py-2.5 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-widest inline-block cursor-pointer">
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                confirmedBookings.map((b) => {
                  const isSelected = b.id === selectedTripId;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedTripId(b.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-secondary/5 border-secondary/50 shadow-md"
                          : "bg-white/40 dark:bg-slate-950/20 border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10"
                      }`}
                    >
                      <div className="flex flex-col gap-1.5 leading-none min-w-0">
                        <span className="text-[9px] text-accent font-mono">{b.id}</span>
                        <span className="font-serif text-sm font-bold text-slate-800 dark:text-white truncate max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-[140px] xl:max-w-[190px]">{b.destination.title}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">{b.startDate} to {b.endDate}</span>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-sans uppercase tracking-wider ${
                        b.status === "Confirmed" ? "bg-secondary/10 text-secondary" : "bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-500"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  );
                })
              )}
            </aside>

            {/* RIGHT 2 COLUMNS: Detailed selected booking itinerary, flights, and maps */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeTrip ? (
                  <motion.section
                    key={activeTrip.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    
                    {/* Booking Details Card */}
                    <div className="print-card-luxe glass-panel rounded-3xl border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl bg-white/40 dark:bg-slate-950/10">
                      
                      {/* Banner cover */}
                      <div className="relative aspect-[16/6] w-full">
                        <Image
                          src={activeTrip.destination.featuredImage}
                          alt={activeTrip.destination.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                        <div className="absolute bottom-4 left-6 flex flex-col leading-none">
                          <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1.5">{activeTrip.destination.region} &bull; {activeTrip.destination.style}</span>
                          <h2 className="font-serif text-lg md:text-2xl font-bold text-white tracking-tight">{activeTrip.destination.title}</h2>
                        </div>
                      </div>

                      {/* Summary blocks */}
                      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-200 dark:border-white/5 font-sans">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Confirmation ID</span>
                          <span className="text-sm font-bold text-slate-800 dark:text-white font-mono">{activeTrip.id}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Travel Period</span>
                          <span className="text-sm font-bold text-slate-800 dark:text-white">{activeTrip.destination.durationDays} Days</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Travelers</span>
                          <span className="text-sm font-bold text-slate-800 dark:text-white">{activeTrip.guests} Guests</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Escrow quota</span>
                          <span className="text-sm font-bold text-accent">${activeTrip.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col gap-6">
                        
                        {/* Live Flight updates panel */}
                        {activeTrip.flightDetails && (
                          <div className="bg-slate-100 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-sans">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/15 flex-shrink-0">
                                <Plane className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Flight Status</span>
                                <span className="text-xs font-bold text-slate-800 dark:text-white">{activeTrip.flightDetails.carrier} &bull; {activeTrip.flightDetails.flightNumber}</span>
                                <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{activeTrip.flightDetails.departureAirport} to {activeTrip.flightDetails.arrivalAirport}</span>
                              </div>
                            </div>

                            <div className="flex flex-col md:items-end">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Scheduled Departure</span>
                              <span className="text-xs font-bold text-secondary">{new Date(activeTrip.flightDetails.departureTime).toLocaleDateString()} at {new Date(activeTrip.flightDetails.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-secondary/10 text-secondary font-bold uppercase mt-1 w-fit">{activeTrip.flightDetails.status}</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive map visualization section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                          {/* Map container */}
                          <div className="relative aspect-[4/3] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden bg-slate-100/50 dark:bg-slate-900/60 shadow-inner flex flex-col items-center justify-center text-center p-6 min-h-[220px]">
                            {/* Glowing grids */}
                            <div className="absolute inset-0 bg-[radial-gradient(#00000003_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                            
                            {/* Pulsing Map Pin */}
                            <div className="relative z-10 w-12 h-12 flex items-center justify-center text-secondary rounded-full bg-secondary/10 border border-secondary/20 map-pin-pulse">
                              <MapPin className="w-6 h-6 animate-bounce" />
                            </div>

                            <div className="relative z-10 mt-6 leading-none">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Geographic Coordinates</span>
                              <span className="text-xs font-bold text-slate-800 dark:text-white block">{activeTrip.destination.coordinates.label}</span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1.5 font-mono">{activeTrip.destination.coordinates.lat.toFixed(4)}&deg; N, {activeTrip.destination.coordinates.lng.toFixed(4)}&deg; E</span>
                            </div>
                          </div>

                          {/* Curated Excursions list */}
                          <div className="p-5 bg-slate-100/30 dark:bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col gap-4 font-sans text-xs">
                            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Itinerary Excursions ({activeTrip.selectedExcursions.length})</span>
                            
                            {activeTrip.selectedExcursions.length === 0 ? (
                              <p className="text-xs text-slate-600 dark:text-slate-400">No excursions selected for this journey. You can customize them in the detail pages.</p>
                            ) : (
                              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                                {activeTrip.selectedExcursions.map((ex) => (
                                  <div key={ex.id} className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200 dark:border-white/5 leading-none">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 flex-shrink-0 bg-slate-900">
                                      <Image
                                        src={ex.image}
                                        alt={ex.name}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-serif font-bold text-slate-800 dark:text-white text-xs">{ex.name}</span>
                                      <span className="text-[9px] text-slate-500 dark:text-slate-500 mt-1">{ex.duration} &bull; VIP Host Included</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Downloadable mock travel voucher block */}
                        <div className="border-t border-slate-200 dark:border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-sans text-xs font-medium">
                            <ShieldCheck className="w-4 h-4 text-secondary" />
                            <span>This voucher is fully secured by Stripe Escrow bonding.</span>
                          </div>

                          <div className="flex gap-3 w-full md:w-auto no-print">
                            <button
                              onClick={() => window.print()}
                              className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Printer className="w-4 h-4" />
                              <span>Print Voucher</span>
                            </button>
                            
                            <Link
                              href={`/destinations/${activeTrip.destination.slug}`}
                              className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary-light text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Explore Detail</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.section>
                ) : (
                  <div className="glass-panel p-16 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 text-center">
                    <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-spin" />
                    <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-2">No Safari Selected</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Select one of your curated active travel itineraries from the side menu list to view flight tracking maps and vouchers.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
