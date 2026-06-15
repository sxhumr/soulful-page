"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BookingPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "morning",
    message: "",
  });

  // Status UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // iOS-Hardened Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    // Defensive Check: Ensure the date string exists and matches YYYY-MM-DD
    if (!formData.date) {
      setSubmitStatus("error");
      setErrorMessage("Please select a valid date for your session.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong processing your request.");
      }

      setSubmitStatus("success");
      // Clear form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "morning",
        message: "",
      });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "Failed to reach booking servers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col justify-between">
      
      {/* Mini Header / Navigation */}
      <header className="bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 h-20 flex items-center">
        <div className="max-w-4xl mx-auto w-full px-6 flex items-center justify-between">
          <Link href="/" className="font-serif tracking-wide text-lg text-stone-900 hover:text-emerald-800 transition-colors">
            ← Soulful Healing
          </Link>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">Secure Booking Engine</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-12 md:py-20 px-6 max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-stone-950 mb-3 text-center tracking-tight">
            Schedule Your Realignment
          </h1>
          <p className="text-stone-600 text-sm text-center max-w-sm mx-auto mb-10 leading-relaxed">
            Fill out your baseline requirements below. All sessions are structured to target foundational energetic and somatic blocks.
          </p>

          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm"
              >
                <span className="text-3xl block mb-3">✨</span>
                <h3 className="font-serif text-xl text-emerald-900 mb-2">Booking Intention Received</h3>
                <p className="text-emerald-800 text-sm leading-relaxed mb-4">
                  Your profile timeline has been calibrated securely. Check your inbox shortly for an automated confirmation details string and calendar lock.
                </p>
                <Link
                  href="/"
                  className="inline-block text-xs uppercase tracking-wider font-semibold text-white bg-emerald-800 px-5 py-2.5 rounded-xl hover:bg-emerald-900 transition-colors"
                >
                  Return To Homepage
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
                
                {/* Error Banner Container */}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl p-4 leading-relaxed">
                    <span className="font-bold">Transmission Halted:</span> {errorMessage}
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name and surname"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.co.za"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Phone Number (SA Format preferred)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +27821234567"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
                  />
                </div>

                {/* Date & Time Grid Wrapper */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Date Picker Component */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Target Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-stone-800"
                    />
                  </div>

                  {/* Time Window Dropdown Selector */}
                  <div>
                    <label htmlFor="timeSlot" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Preferred Time Block
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-stone-800 h-[46px] appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                    >
                      <option value="morning">Morning (09:00 SAST)</option>
                      <option value="afternoon">Afternoon (13:00 SAST)</option>
                      <option value="late-afternoon">Late Afternoon (16:00 SAST)</option>
                    </select>
                  </div>
                </div>

                {/* Core Intent Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Somatic Intention or Symptoms (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any chronic fatigue, mental blockages, or targets you wish to clear..."
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-base sm:text-sm bg-stone-50/50 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Form Submission Button Trigger */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative z-10 w-full bg-stone-950 text-white font-medium text-sm py-4 rounded-xl hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Aligning Timelines...
                      </span>
                    ) : (
                      "Request Session Lock"
                    )}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Basic Mini Footer */}
      <footer className="bg-stone-50 text-stone-400 py-6 text-xs text-center border-t border-stone-200/40">
        <p>© {new Date().getFullYear()} Soulful Healing. Protected data orchestration layer.</p>
      </footer>

    </div>
  );
}