"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, CreditCard, User, Sparkles, Plane, ShieldCheck, HeartPulse, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { useBookingEngine } from "@/hooks/useBookingEngine";

export default function CheckoutWizard() {
  const router = useRouter();
  const {
    destination,
    currentStep,
    nextStep,
    prevStep,
    setStep,
    passengerDetails,
    updatePassengerDetails,
    selectedExcursions,
    toggleExcursion,
    totalPrice,
    paymentInfo,
    updatePaymentInfo,
    isProcessing,
    confirmedId,
    submitBooking
  } = useBookingEngine();

  // Errors state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 1. Validate Step 1 (Passenger details)
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!passengerDetails.firstName.trim()) errors.firstName = "First name required.";
    if (!passengerDetails.lastName.trim()) errors.lastName = "Last name required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(passengerDetails.email)) errors.email = "Valid email required.";
    
    if (!passengerDetails.phone.trim()) errors.phone = "Phone contact required.";
    if (!passengerDetails.passportNumber.trim()) errors.passportNumber = "Passport identity required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 2. Validate Step 3 (Credit Card details)
  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (paymentInfo.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Valid 16-digit card required.";
    
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryRegex.test(paymentInfo.expiryDate)) errors.expiry = "Valid MM/YY required.";
    
    if (paymentInfo.cvc.length < 3) errors.cvc = "Valid CVC required.";
    if (!paymentInfo.cardName.trim()) errors.cardName = "Cardholder name required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) nextStep();
    } else if (currentStep === 2) {
      nextStep();
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      submitBooking();
    }
  };

  // Card formatting masking helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 16);
    const masked = val.replace(/(.{4})/g, "$1 ").trim();
    updatePaymentInfo((prev) => ({ ...prev, cardNumber: masked }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 4);
    let formatted = val;
    if (val.length >= 2) {
      formatted = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    updatePaymentInfo((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 4);
    updatePaymentInfo((prev) => ({ ...prev, cvc: val }));
  };

  // Steps headers list
  const steps = [
    { num: 1, label: "Travelers" },
    { num: 2, label: "Add-ons" },
    { num: 3, label: "Escrow" },
    { num: 4, label: "Voucher" },
  ];

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28 px-4 text-center">
        <Plane className="w-12 h-12 text-secondary/40 mb-4 animate-bounce" />
        <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">No Active Booking In Cart</h1>
        <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
          Please select a custom luxury itinerary package from our catalog first before initiating checkout escrow.
        </p>
        <button
          onClick={() => router.push("/destinations")}
          className="px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest"
        >
          Browse Escapes
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-6 bg-background-luxe text-foreground-luxe">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Wizard Step Progress Tracker */}
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center relative before:absolute before:left-4 before:right-4 before:top-5 before:h-0.5 before:bg-slate-200 dark:before:bg-white/5 before:-z-10 z-10 px-4">
          {steps.map((s) => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center gap-2">
                <button
                  disabled={s.num > currentStep && !isCompleted}
                  onClick={() => s.num < currentStep && setStep(s.num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-xs transition-all duration-300 cursor-pointer ${
                    isCompleted
                      ? "bg-secondary border-secondary text-white scale-95"
                      : isActive
                      ? "bg-gradient-to-r from-secondary to-accent border-transparent text-primary scale-110 shadow-lg shadow-secondary/20 font-extrabold"
                      : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </button>
                <span className={`text-[10px] uppercase font-bold tracking-widest font-sans ${isActive ? "text-slate-800 dark:text-white" : "text-slate-500"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Wizard Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mt-4">
          
          {/* LEFT 2 COLUMNS: Form panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Step 1: Passenger Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 md:p-8 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 flex flex-col gap-6"
              >
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Traveler Records Verification
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Input official passport details for airline ticketing. Standard high-security encryption applies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pFirst" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">First Name</label>
                    <input
                      id="pFirst"
                      type="text"
                      placeholder="e.g. Lord Alexander"
                      value={passengerDetails.firstName}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, firstName: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                    {formErrors.firstName && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.firstName}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pLast" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Last Name</label>
                    <input
                      id="pLast"
                      type="text"
                      placeholder="e.g. Vanderbilt"
                      value={passengerDetails.lastName}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, lastName: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                    {formErrors.lastName && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.lastName}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pEmail" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Secure Email Address</label>
                    <input
                      id="pEmail"
                      type="email"
                      placeholder="e.g. alexander@vanderbilt.com"
                      value={passengerDetails.email}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, email: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                    {formErrors.email && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pPhone" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Encrypted Phone Contact</label>
                    <input
                      id="pPhone"
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      value={passengerDetails.phone}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, phone: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                    {formErrors.phone && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.phone}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="pPassport" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Passport Identification Number</label>
                    <input
                      id="pPassport"
                      type="text"
                      placeholder="e.g. N5839201A"
                      value={passengerDetails.passportNumber}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, passportNumber: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs uppercase"
                    />
                    {formErrors.passportNumber && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.passportNumber}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="pDiet" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Dietary & Concierge Preferences (Optional)</label>
                    <textarea
                      id="pDiet"
                      rows={3}
                      placeholder="e.g. Gluten-free organic dining, champagne preference..."
                      value={passengerDetails.dietaryNotes}
                      onChange={(e) => updatePassengerDetails({ ...passengerDetails, dietaryNotes: e.target.value })}
                      className="px-3.5 py-2.5 rounded-xl glass-input text-xs resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-white/5">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary-light text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Add-ons</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Add-on Excursions */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 md:p-8 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 flex flex-col gap-6"
              >
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    Expedition Add-ons & Travel Cover
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Fine-tune your itinerary with signature excursions and safety assurance schemes.
                  </p>
                </div>

                {/* Excursions Selection list */}
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {destination.excursions.map((ex) => {
                    const isSel = selectedExcursions.some(e => e.id === ex.id);
                    return (
                      <div
                        key={ex.id}
                        onClick={() => toggleExcursion(ex)}
                        className={`flex flex-col md:flex-row md:items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isSel
                            ? "bg-secondary/5 border-secondary/50"
                            : "bg-white/40 dark:bg-slate-950/20 border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-2.5 rounded-full p-0.5 ${isSel ? "text-secondary" : "text-slate-400 dark:text-slate-600"} flex-shrink-0`}>
                            <Check className="w-4 h-4" />
                          </div>
                          
                          {/* Excursion Card Image */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 flex-shrink-0 bg-slate-900">
                            <Image
                              src={ex.image}
                              alt={ex.name}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-serif text-sm font-bold text-slate-800 dark:text-white">{ex.name}</span>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1 leading-relaxed max-w-md">
                              {ex.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-white/5">
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Extra Fare</span>
                          <span className="text-sm font-bold text-accent">${ex.price} <span className="text-[10px] text-slate-500 font-normal">/ guest</span></span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Travel Insurance Card */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4.5 rounded-2xl border bg-white/40 dark:bg-slate-950/20 border-slate-200 dark:border-white/5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 text-secondary">
                        <HeartPulse className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-bold text-slate-800 dark:text-white">Full Seclusion Travel Cover</span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1 leading-relaxed max-w-md">
                          Escrow indemnity covering heli-evacuation, luggage recovery, and Piste cancelation. (Complimentary for Horizon VIPs).
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-white/5">
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Insurance Status</span>
                      <span className="text-xs font-bold text-secondary">COMPLIMENTARY</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5 mt-4">
                  <button
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary-light text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Escrow</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Panel */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                
                {/* Visual Premium Credit Card */}
                <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden glass-panel border-white/10 p-6 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-primary via-slate-900 to-[#090d16]">
                  {/* Glowing background shapes */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-none">Escrow Bond</span>
                      <span className="font-serif text-sm tracking-wider font-extrabold text-white mt-1">Horizon Luxe VIP</span>
                    </div>
                    {/* Chip */}
                    <div className="w-10 h-7 rounded-md bg-gradient-to-r from-accent to-accent-light opacity-80" />
                  </div>

                  <div className="flex flex-col gap-4 relative z-10">
                    <span className="font-mono text-lg md:text-xl tracking-widest font-semibold text-white">
                      {paymentInfo.cardNumber || "•••• •••• •••• ••••"}
                    </span>

                    <div className="flex justify-between items-end">
                      <div className="flex flex-col leading-none">
                        <span className="text-[7px] text-slate-500 uppercase tracking-widest mb-1">Cardholder</span>
                        <span className="text-xs uppercase font-sans tracking-wide text-white truncate max-w-[180px]">
                          {paymentInfo.cardName || "Vanderbilt"}
                        </span>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex flex-col leading-none">
                          <span className="text-[7px] text-slate-500 uppercase tracking-widest mb-1">Expiry</span>
                          <span className="text-xs font-mono text-white">{paymentInfo.expiryDate || "MM/YY"}</span>
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="text-[7px] text-slate-500 uppercase tracking-widest mb-1">CVC</span>
                          <span className="text-xs font-mono text-white">{paymentInfo.cvc || "•••"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Input Panel */}
                <form
                  onSubmit={handlePaymentSubmit}
                  className="glass-panel p-6 md:p-8 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 flex flex-col gap-6"
                >
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-secondary" />
                      Secure Stripe Escrow Bridge
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      We secure funds under a 100% money-back escrow until flight confirmations resolve.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label htmlFor="cardName" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cardholder Name</label>
                      <input
                        id="cardName"
                        type="text"
                        placeholder="e.g. Lord Alexander Vanderbilt"
                        value={paymentInfo.cardName}
                        onChange={(e) => updatePaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className="px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                      {formErrors.cardName && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.cardName}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label htmlFor="cardNumber" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Credit Card Number</label>
                      <div className="relative flex items-center">
                        <input
                          id="cardNumber"
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs pr-10"
                        />
                        <CreditCard className="w-4 h-4 text-slate-500 absolute right-3" />
                      </div>
                      {formErrors.cardNumber && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.cardNumber}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cardExpiry" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Expiry Date</label>
                      <input
                        id="cardExpiry"
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={handleExpiryChange}
                        className="px-3.5 py-2.5 rounded-xl glass-input text-xs text-center"
                      />
                      {formErrors.expiry && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.expiry}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cardCvc" className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Security Code (CVC)</label>
                      <input
                        id="cardCvc"
                        type="text"
                        placeholder="e.g. 123"
                        value={paymentInfo.cvc}
                        onChange={handleCvcChange}
                        className="px-3.5 py-2.5 rounded-xl glass-input text-xs text-center"
                      />
                      {formErrors.cvc && <span className="text-[9px] text-accent font-medium mt-0.5">{formErrors.cvc}</span>}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-white/5 mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Securing Escrow...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Authorize Escrow ${totalPrice.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Success confirmation screen */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-6 md:p-8 rounded-3xl border-secondary/20 bg-white/40 dark:bg-slate-950/15 flex flex-col items-center text-center gap-6"
              >
                <div className="relative w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20 shadow-xl shadow-secondary/5 mb-2">
                  <ShieldCheck className="w-8 h-8 animate-pulse" />
                  <div className="absolute -inset-2 rounded-full border border-secondary/20 animate-ping opacity-25" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">Transaction Confirmed</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Expedition Escrow Secure
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mt-1 leading-relaxed">
                    A first-class seaplane/flight boarding pass and mock booking voucher has been compiled for your trip.
                  </p>
                </div>

                {/* Printable receipt card */}
                <div className="w-full max-w-md bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-left flex flex-col gap-4 font-sans text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-3">
                    <span className="font-serif font-bold text-slate-900 dark:text-white tracking-wider">HORIZON LUXE JOURNEYS</span>
                    <span className="text-[10px] text-slate-500 font-mono">{confirmedId}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Selected Retreat</span>
                    <span className="font-bold text-slate-800 dark:text-white">{destination.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Lead Passenger</span>
                    <span className="font-bold text-slate-800 dark:text-white">{passengerDetails.firstName} {passengerDetails.lastName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Total Travelers</span>
                    <span className="font-bold text-slate-800 dark:text-white">2 Guests</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Itinerary Schedule</span>
                    <span className="font-bold text-slate-800 dark:text-white">{destination.durationDays} Days / {destination.durationDays - 1} Nights</span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 dark:border-white/10 pt-3 flex justify-between items-center text-sm font-bold text-accent">
                    <span>Funds Escrowed</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-xs mt-2">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex-1 py-3 bg-secondary hover:bg-secondary-light text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                  >
                    Planner Portal
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                  >
                    Print Voucher
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Booking Summary Panel */}
          <aside className="glass-panel p-6 rounded-3xl border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/10 flex flex-col gap-6">
            <div className="border-b border-slate-200 dark:border-white/5 pb-4">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold block mb-1">
                Expedition Invoice
              </span>
              <span className="font-serif text-base font-bold text-slate-900 dark:text-white">Selected Route</span>
            </div>

            {/* Destination summary card */}
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5">
              <Image
                src={destination.featuredImage}
                alt={destination.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-3.5 left-3.5 flex flex-col leading-none">
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1">{destination.region}</span>
                <span className="text-xs text-white font-serif font-bold">{destination.title}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 font-sans text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Duration</span>
                <span className="font-bold text-slate-800 dark:text-white">{destination.durationDays} Days</span>
              </div>
              
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Travelers</span>
                <span className="font-bold text-slate-800 dark:text-white">2 Guests</span>
              </div>

              {selectedExcursions.length > 0 && (
                <div className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Selected Add-ons</span>
                  {selectedExcursions.map((ex) => (
                    <div key={ex.id} className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[160px]">{ex.name}</span>
                      <span className="text-slate-600 dark:text-slate-400 font-bold">${ex.price} / guest</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-200 dark:border-white/5 pt-4 mt-2 flex justify-between items-center text-sm font-bold text-accent">
                <div className="flex flex-col leading-none">
                  <span className="text-[7px] text-slate-500 uppercase tracking-widest font-bold mb-1">Escrow quota</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-normal">inc. security escrow</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-200 dark:border-white/5 pt-4 text-[9px] text-slate-500 font-medium leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              <span>Itinerary coordinate pins will activate in your client planner dashboard.</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
