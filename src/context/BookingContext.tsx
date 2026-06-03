"use client";

import React, { createContext, useContext, useState } from "react";
import { Destination, Excursion, destinationsData } from "@/data/destinations";

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  dietaryNotes: string;
}

export interface ConfirmedBooking {
  id: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  guests: number;
  passengerDetails: PassengerDetails;
  selectedExcursions: Excursion[];
  totalPrice: number;
  bookingDate: string;
  status: "Confirmed" | "In Progress" | "Completed";
  flightDetails?: {
    carrier: string;
    flightNumber: string;
    departureTime: string;
    departureAirport: string;
    arrivalAirport: string;
    status: string;
  };
}

export interface SearchFiltersState {
  searchQuery: string;
  selectedRegion: string;
  selectedStyle: string;
  maxBudget: number;
  maxDuration: number;
  guests: number;
  startDate: string;
}

interface BookingContextType {
  // Search Filters
  filters: SearchFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<SearchFiltersState>>;
  resetFilters: () => void;

  // Active Booking Checkout State
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  passengerDetails: PassengerDetails;
  setPassengerDetails: (details: PassengerDetails) => void;
  selectedExcursions: Excursion[];
  toggleExcursion: (excursion: Excursion) => void;
  clearExcursions: () => void;
  totalPrice: number;
  
  // Payment Details
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardName: string;
  };
  setPaymentInfo: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardName: string;
  }>>;
  isProcessingPayment: boolean;
  setIsProcessingPayment: (val: boolean) => void;
  bookingConfirmedId: string | null;

  // Confirmed Bookings Dashboard Database
  confirmedBookings: ConfirmedBooking[];
  addBooking: (booking: ConfirmedBooking) => void;
  completeCheckout: () => void;
}

const defaultFilters: SearchFiltersState = {
  searchQuery: "",
  selectedRegion: "All",
  selectedStyle: "All",
  maxBudget: 12000,
  maxDuration: 10,
  guests: 2,
  startDate: "",
};

const defaultPassenger: PassengerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  passportNumber: "",
  dietaryNotes: "",
};

const defaultPayment = {
  cardNumber: "",
  expiryDate: "",
  cvc: "",
  cardName: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Search Filters State
  const [filters, setFilters] = useState<SearchFiltersState>(defaultFilters);

  // Active Booking Process State
  const [selectedDestination, setSelectedDestinationState] = useState<Destination | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>(defaultPassenger);
  const [selectedExcursions, setSelectedExcursions] = useState<Excursion[]>([]);
  const [paymentInfo, setPaymentInfo] = useState(defaultPayment);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  // Confirmed Bookings (Pre-populate with a gorgeous active booking so the dashboard is alive from start)
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>(() => {
    const patagonia = destinationsData.find(d => d.slug === "patagonia-glacier-domes");
    if (patagonia) {
      return [
        {
          id: "HLJ-9824-PATA",
          destination: patagonia,
          startDate: "2026-06-15",
          endDate: "2026-06-20",
          guests: 2,
          passengerDetails: {
            firstName: "Alexander",
            lastName: "Vanderbilt",
            email: "a.vanderbilt@horizonluxe.com",
            phone: "+1 (555) 019-2834",
            passportNumber: "N5839201A",
            dietaryNotes: "Gluten-free, preference for organic dining"
          },
          selectedExcursions: [
            patagonia.excursions[0], // Glacier Ice Hike
            patagonia.excursions[2]  // Chilean Wine Feast
          ],
          totalPrice: patagonia.basePrice + patagonia.excursions[0].price + patagonia.excursions[2].price,
          bookingDate: "2026-05-10",
          status: "Confirmed",
          flightDetails: {
            carrier: "LATAM Airlines (First Class)",
            flightNumber: "LA8051",
            departureTime: "2026-06-15T06:15:00Z",
            departureAirport: "SCL (Santiago)",
            arrivalAirport: "PNT (Puerto Natales)",
            status: "Scheduled - On Time"
          }
        }
      ];
    }
    return [];
  });

  const setSelectedDestination = (dest: Destination | null) => {
    setSelectedDestinationState(dest);
    setCheckoutStep(1);
    setPassengerDetails(defaultPassenger);
    setSelectedExcursions([]);
    setPaymentInfo(defaultPayment);
    setBookingConfirmedId(null);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleExcursion = (excursion: Excursion) => {
    setSelectedExcursions((prev) => {
      const exists = prev.find((e) => e.id === excursion.id);
      if (exists) {
        return prev.filter((e) => e.id !== excursion.id);
      } else {
        return [...prev, excursion];
      }
    });
  };

  const clearExcursions = () => {
    setSelectedExcursions([]);
  };

  const addBooking = (booking: ConfirmedBooking) => {
    setConfirmedBookings((prev) => [booking, ...prev]);
  };

  // Live Price Calculation
  const baseCost = selectedDestination ? selectedDestination.basePrice * (filters.guests || 2) : 0;
  const excursionsCost = selectedExcursions.reduce((acc, curr) => acc + curr.price * (filters.guests || 2), 0);
  const totalPrice = baseCost + excursionsCost;

  // Complete checkout process
  const completeCheckout = () => {
    if (!selectedDestination) return;
    
    setIsProcessingPayment(true);
    
    // Simulate high-density secure processing
    setTimeout(() => {
      const generatedId = `HLJ-${Math.floor(1000 + Math.random() * 9000)}-${selectedDestination.slug.slice(0, 4).toUpperCase()}`;
      
      const newTrip: ConfirmedBooking = {
        id: generatedId,
        destination: selectedDestination,
        startDate: filters.startDate || "2026-07-20",
        // calculate end date based on duration
        endDate: new Date(new Date(filters.startDate || "2026-07-20").getTime() + selectedDestination.durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        guests: filters.guests || 2,
        passengerDetails: passengerDetails,
        selectedExcursions: selectedExcursions,
        totalPrice: totalPrice,
        bookingDate: new Date().toISOString().split('T')[0],
        status: "Confirmed",
        flightDetails: {
          carrier: "Emirates (First Class)",
          flightNumber: `EK${Math.floor(100 + Math.random() * 800)}`,
          departureTime: new Date(new Date(filters.startDate || "2026-07-20").getTime() - 4 * 60 * 60 * 1000).toISOString(),
          departureAirport: "JFK (New York)",
          arrivalAirport: selectedDestination.id === "dest-1" ? "MLE (Malé)" : selectedDestination.id === "dest-4" ? "ITM (Kyoto)" : "ZRH (Zurich)",
          status: "Scheduled - Confirmed"
        }
      };

      setConfirmedBookings((prev) => [newTrip, ...prev]);
      setBookingConfirmedId(generatedId);
      setIsProcessingPayment(false);
      setCheckoutStep(4); // Advance to confirmation
    }, 2500);
  };

  return (
    <BookingContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        selectedDestination,
        setSelectedDestination,
        checkoutStep,
        setCheckoutStep,
        passengerDetails,
        setPassengerDetails,
        selectedExcursions,
        toggleExcursion,
        clearExcursions,
        totalPrice,
        paymentInfo,
        setPaymentInfo,
        isProcessingPayment,
        setIsProcessingPayment,
        bookingConfirmedId,
        confirmedBookings,
        addBooking,
        completeCheckout,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
