"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_STORAGE_KEY = "drydown.sample-popup-seen";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [formError, setFormError] = useState("");

  const markPopupSeen = () => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors (private mode / disabled storage)
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormError("");
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    setFormError("");
    markPopupSeen();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let hasSeenPopup = false;
    try {
      hasSeenPopup = window.sessionStorage.getItem(POPUP_STORAGE_KEY) === "true";
    } catch {
      hasSeenPopup = false;
    }

    if (hasSeenPopup) return;

    const timer = window.setTimeout(() => {
      setIsPopupOpen(true);
      markPopupSeen();
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  // Close popup with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };

    if (isPopupOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPopupOpen]);

  // Keep scroll focused on the popup while it is open.
  useEffect(() => {
    if (!isPopupOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPopupOpen]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = contactValue.trim();
    const normalizedValue = value.replace(/\s+/g, "");
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\+?[0-9]{7,15}$/.test(normalizedValue);

    if (!value) {
      setFormError("Please enter an email or phone number.");
      return;
    }

    if (!isEmail && !isPhone) {
      setFormError("Enter a valid email or phone number.");
      return;
    }

    setFormError("");
    alert(
      "Thank you for requesting a Dry Down sample.\n\nThis demo is frontend-only, so contact details are not stored in a backend yet.",
    );
    setContactValue("");
    closePopup();
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
          <Link href="/about" className="hover:text-brand-accent transition-colors">
            About
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
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/about"
            className="md:hidden font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 hover:text-brand-accent transition-colors"
          >
            About
          </Link>
          <button
            onClick={openPopup}
            className="bg-white text-black font-sans text-[10px] md:text-xs font-bold uppercase px-4 md:px-6 py-2 rounded-full hover:bg-brand-accent transition-colors"
          >
            Get Sample
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sample-popup-title"
              className="relative w-full max-w-4xl bg-brand-base border border-brand-dark/10 shadow-2xl overflow-hidden shadow-black/50"
            >
              <button
                onClick={closePopup}
                aria-label="Close sample popup"
                className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-brand-dark/70 text-white text-2xl leading-none hover:bg-brand-dark transition-colors"
              >
                &times;
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-[280px] md:min-h-[540px]">
                  <img
                    src="/img5.png"
                    alt="Dry Down complimentary sample"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-brand-accent">
                      Complimentary Trial
                    </p>
                    <p className="font-serif text-3xl md:text-4xl text-white leading-tight mt-3">
                      Experience Dry Down
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-10 text-brand-dark flex flex-col justify-center">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-brand-accent mb-4">
                    First-Time Visitors
                  </p>
                  <h3
                    id="sample-popup-title"
                    className="font-serif text-3xl md:text-4xl leading-tight mb-4"
                  >
                    Claim your free fragrance sample.
                  </h3>
                  <p className="font-sans text-sm md:text-base opacity-70 leading-relaxed mb-8">
                    Share your email or phone number and we will send your
                    complimentary sample details, plus early access to upcoming
                    Dry Down releases.
                  </p>

                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <input
                      type="text"
                      inputMode="text"
                      autoComplete="email"
                      placeholder="Email or phone number"
                      value={contactValue}
                      onChange={(e) => {
                        setContactValue(e.target.value);
                        if (formError) setFormError("");
                      }}
                      className="w-full px-5 py-4 bg-white border border-brand-dark/15 focus:border-brand-dark/50 outline-none font-sans text-brand-dark"
                    />
                    {formError ? (
                      <p className="text-xs text-red-700 font-sans">{formError}</p>
                    ) : (
                      <p className="font-sans text-[11px] text-brand-dark/55">
                        One complimentary sample per household.
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-brand-dark text-white px-8 py-4 font-sans font-bold text-xs uppercase tracking-[0.25em] hover:bg-brand-accent hover:text-brand-dark transition-colors shadow-lg mt-1"
                    >
                      Enter Now
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
