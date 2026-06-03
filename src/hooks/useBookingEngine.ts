"use client";

import { useBooking } from "@/context/BookingContext";
import { Destination } from "@/data/destinations";

export const useBookingEngine = () => {
  const {
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
    bookingConfirmedId,
    completeCheckout,
    confirmedBookings
  } = useBooking();

  const selectTrip = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const cancelTripSelection = () => {
    setSelectedDestination(null);
  };

  const nextStep = () => {
    if (checkoutStep < 4) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  const prevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  return {
    destination: selectedDestination,
    selectTrip,
    cancelTripSelection,
    currentStep: checkoutStep,
    nextStep,
    prevStep,
    setStep: setCheckoutStep,
    passengerDetails,
    updatePassengerDetails: setPassengerDetails,
    selectedExcursions,
    toggleExcursion,
    clearExcursions,
    totalPrice,
    paymentInfo,
    updatePaymentInfo: setPaymentInfo,
    isProcessing: isProcessingPayment,
    confirmedId: bookingConfirmedId,
    submitBooking: completeCheckout,
    confirmedBookings
  };
};
