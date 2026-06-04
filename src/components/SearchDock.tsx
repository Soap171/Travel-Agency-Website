"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, X } from "lucide-react";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { useTheme } from "@/context/ThemeContext";
import { ShinyText } from "@/components/ShinyText";

interface SearchDockProps {
  variant?: "inline" | "floating";
}

export const SearchDock: React.FC<SearchDockProps> = ({ variant = "inline" }) => {
  const router = useRouter();
  const { filters, handleSearchChange, handleDateChange, handleGuestsChange } = useSearchFilters();
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [localGuests, setLocalGuests] = useState(filters.guests || 2);
  const [localDate, setLocalDate] = useState(filters.startDate || "");
  const { theme } = useTheme();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchChange(localSearch);
    handleDateChange(localDate);
    handleGuestsChange(localGuests);
    
    // Smooth redirect to destinations catalog with values pre-populated
    router.push("/destinations");
  };

  const handleIncrementGuests = () => {
    if (localGuests < 12) setLocalGuests((g) => g + 1);
  };

  const handleDecrementGuests = () => {
    if (localGuests > 1) setLocalGuests((g) => g - 1);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={`w-full ${
        variant === "floating"
          ? "glass-panel max-w-4xl p-3 rounded-3xl lg:rounded-full shadow-2xl border-white/10"
          : "glass-panel p-4 md:p-6 rounded-3xl shadow-xl border-white/10"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center gap-4 lg:gap-1.5 w-full">
        {/* Field 1: Destination Search */}
        <div className="flex items-center gap-3.5 px-4 py-3 bg-white/95 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-2xl lg:rounded-l-2xl lg:rounded-r-none flex-1 w-full transition-all duration-300 hover:border-slate-300 dark:hover:border-white/15 shadow-sm">
          <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
          <div className="flex-1 flex flex-col items-start leading-none min-w-0">
            <label htmlFor="destInput" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
              Destination
            </label>
            <input
              id="destInput"
              type="text"
              placeholder="Where to? (e.g. Maldives, Alps)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="bg-transparent border-none text-sm text-slate-800 dark:text-white focus:outline-none w-full p-0 font-medium placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Separator for desktop */}
        <div className="hidden lg:block w-px h-10 bg-slate-200 dark:bg-white/10" />

        {/* Field 2: Dates Selector */}
        <div className="flex items-center gap-3.5 px-4 py-3 bg-white/95 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-2xl lg:rounded-none flex-1 w-full transition-all duration-300 hover:border-slate-300 dark:hover:border-white/15 shadow-sm">
          <Calendar className="w-5 h-5 text-secondary flex-shrink-0" />
          <div className="flex-1 flex flex-col items-start leading-none w-full">
            <label htmlFor="dateInput" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
              Departure Date
            </label>
            <input
              id="dateInput"
              type="date"
              value={localDate}
              onChange={(e) => setLocalDate(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-800 dark:text-white focus:outline-none w-full p-0 font-medium placeholder-slate-400 dark:placeholder-slate-500"
              style={{ colorScheme: theme }}
            />
          </div>
        </div>

        {/* Separator for desktop */}
        <div className="hidden lg:block w-px h-10 bg-slate-200 dark:bg-white/10" />

        {/* Field 3: Guest Selector */}
        <div className="flex items-center gap-3.5 px-4 py-3 bg-white/95 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none flex-1 w-full transition-all duration-300 hover:border-slate-300 dark:hover:border-white/15 justify-between shadow-sm">
          <div className="flex items-center gap-3.5">
            <Users className="w-5 h-5 text-secondary flex-shrink-0" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                Travelers
              </span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">{localGuests} Guest{localGuests > 1 ? "s" : ""}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDecrementGuests}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white text-sm font-bold hover:bg-slate-300/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              -
            </button>
            <button
              type="button"
              onClick={handleIncrementGuests}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white text-sm font-bold hover:bg-slate-300/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Search Submit Action Button */}
        <button
          type="submit"
          className="w-full lg:w-auto px-8 py-4 lg:py-4.5 rounded-2xl bg-gradient-to-r from-secondary to-secondary-light text-white font-sans font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(13,148,136,0.4)] transition-all duration-300 shadow-md group cursor-pointer"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <ShinyText text="Curate Expedition" speed={5} className="text-white font-bold tracking-widest" />
        </button>
      </div>
    </form>
  );
};
