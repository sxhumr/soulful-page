// src/app/book/page.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", timeSlot: "morning", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", date: "", timeSlot: "morning", message: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "Failed to reach booking servers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans p-6 flex flex-col justify-between">
      <header className="max-w-xl mx-auto w-full py-6 flex justify-between items-center border-b border-stone-200">
        <Link href="/" className="font-serif text-stone-900 hover:text-emerald-800">← Soulful Healing</Link>
        <span className="text-xs uppercase tracking-widest text-stone-400">Booking Engine</span>
      </header>

      <main className="flex-1 py-12 max-w-xl mx-auto w-full">
        <h1 className="font-serif text-3xl text-stone-950 mb-8 text-center">Schedule Your Realignment</h1>
        
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <h3 className="font-serif text-xl text-emerald-900 mb-2">Booking Intention Received</h3>
              <p className="text-emerald-800 text-sm mb-4">Check your inbox shortly for automated validation details.</p>
              <Link href="/" className="bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold">Return Home</Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl p-4">{errorMessage}</div>
              )}
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+27..." className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Date</label>
                  <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Time Block</label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50 h-[42px]">
                    <option value="morning">Morning (09:00)</option>
                    <option value="afternoon">Afternoon (13:00)</option>
                    <option value="late-afternoon">Late Afternoon (16:00)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Somatic Intentions (Optional)</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-base sm:text-sm bg-stone-50 resize-none" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-stone-950 text-white font-medium text-sm py-3.5 rounded-xl hover:bg-emerald-800 disabled:bg-stone-300 transition-all">
                {isSubmitting ? "Aligning Timelines..." : "Request Session Lock"}
              </button>
            </form>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center text-stone-400 text-xs py-4 border-t border-stone-100">
        © {new Date().getFullYear()} Soulful Healing.
      </footer>
    </div>
  );
}