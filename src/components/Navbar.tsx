"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close popup with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPopupOpen(false);
    };
    if (isPopupOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPopupOpen]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Success! 🎉\n\nNote: Since this is a frontend-only project without a database, we cannot actually store this email right now. In a production scenario, you would connect this form to a backend service like Formspree, Mailchimp, or Resend API to handle submissions.",
    );
    setIsPopupOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 py-4 px-4 md:px-6 top-0 flex justify-between items-center transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "bg-brand-dark/25 backdrop-blur-md text-white shadow-lg"
            : "bg-transparent mix-blend-difference text-white"
        }`}
      >
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl font-bold tracking-tighter hover:text-brand-accent transition-colors"
        >
          DRY DOWN.
        </Link>
        <div className="hidden md:flex gap-6 md:gap-8 font-sans font-bold tracking-widest text-[10px] md:text-xs uppercase items-center">
          <Link
            href="/#collection"
            className="hover:text-brand-accent transition-colors"
          >
            Collection
          </Link>
          {/*
          <Link
            href="/starter"
            className="hover:text-brand-accent transition-colors"
          >
            Starter Set
          </Link>
          */}
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-white text-black font-sans text-[10px] md:text-xs font-bold uppercase px-4 md:px-6 py-2 rounded-full hover:bg-brand-accent transition-colors"
        >
          Get Sample
        </button>
      </nav>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-lg bg-brand-base border border-brand-dark/10 shadow-2xl overflow-hidden shadow-black/50"
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-dark/10">
                <h3 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-tighter">
                  Request Sample
                </h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-brand-dark opacity-50 hover:opacity-100 transition-opacity text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 md:p-8 text-center text-brand-dark">
                <p className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-4 text-brand-accent">
                  Complimentary
                </p>
                <p className="font-sans opacity-80 mb-8 leading-relaxed">
                  Enter your email address below to receive an exclusive
                  complimentary starter pack directly to your door.
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-6 py-4 bg-transparent border-2 border-brand-dark/20 focus:border-brand-dark outline-none font-sans text-brand-dark"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-dark text-white px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-lg"
                  >
                    Send Me The Sample Box
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
