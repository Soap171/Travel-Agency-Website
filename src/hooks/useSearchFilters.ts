"use client";

import { useBooking } from "@/context/BookingContext";
import { destinationsData, Destination } from "@/data/destinations";

export const useSearchFilters = () => {
  const { filters, setFilters, resetFilters } = useBooking();

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleRegionChange = (region: string) => {
    setFilters((prev) => ({ ...prev, selectedRegion: region }));
  };

  const handleStyleChange = (style: string) => {
    setFilters((prev) => ({ ...prev, selectedStyle: style }));
  };

  const handleBudgetChange = (budget: number) => {
    setFilters((prev) => ({ ...prev, maxBudget: budget }));
  };

  const handleDurationChange = (duration: number) => {
    setFilters((prev) => ({ ...prev, maxDuration: duration }));
  };

  const handleGuestsChange = (guests: number) => {
    setFilters((prev) => ({ ...prev, guests }));
  };

  const handleDateChange = (date: string) => {
    setFilters((prev) => ({ ...prev, startDate: date }));
  };

  // Perform filtering
  const filteredDestinations: Destination[] = destinationsData.filter((dest) => {
    // 1. Search Query (matches Title, Tagline, Region, Style)
    if (filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = dest.title.toLowerCase().includes(q);
      const matchTagline = dest.tagline.toLowerCase().includes(q);
      const matchRegion = dest.region.toLowerCase().includes(q);
      const matchStyle = dest.style.toLowerCase().includes(q);
      if (!matchTitle && !matchTagline && !matchRegion && !matchStyle) {
        return false;
      }
    }

    // 2. Region Filter
    if (filters.selectedRegion !== "All" && dest.region !== filters.selectedRegion) {
      return false;
    }

    // 3. Style Filter
    if (filters.selectedStyle !== "All" && dest.style !== filters.selectedStyle) {
      return false;
    }

    // 4. Budget Filter
    if (dest.basePrice > filters.maxBudget) {
      return false;
    }

    // 5. Duration Filter
    if (dest.durationDays > filters.maxDuration) {
      return false;
    }

    return true;
  });

  return {
    filters,
    filteredDestinations,
    handleSearchChange,
    handleRegionChange,
    handleStyleChange,
    handleBudgetChange,
    handleDurationChange,
    handleGuestsChange,
    handleDateChange,
    resetFilters,
  };
};
