"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Menu } from "lucide-react";

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
      // Ignore storage errors in private/restricted environments
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
      hasSeenPopup =
        window.sessionStorage.getItem(POPUP_STORAGE_KEY) === "true";
    } catch {
      hasSeenPopup = false;
    }
    if (hasSeenPopup) return;

    const timer = window.setTimeout(() => {
      setIsPopupOpen(true);
      markPopupSeen();
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    if (isPopupOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPopupOpen]);

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
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\+?[0-9]{7,15}$/.test(value.replace(/\s+/g, ""));

    if (!value) {
      setFormError("Identity required.");
      return;
    }
    if (!isEmail && !isPhone) {
      setFormError("Invalid email or phone format.");
      return;
    }

    setFormError("");
    setContactValue("");
    closePopup();
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 py-5 px-6 md:px-12 top-0 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/25 backdrop-blur-md text-white shadow-lg"
            : "bg-transparent mix-blend-difference text-white"
        }`}
      >
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl font-bold tracking-tighter hover:text-brand-accent transition-colors"
        >
          DRY<span className="font-light">DOWN</span>
        </Link>
        <div className="hidden md:flex gap-6 md:gap-8 font-sans font-bold tracking-widest text-[10px] md:text-xs uppercase items-center">
          <Link
            href="/#collection"
            className="hover:text-accent transition-colors"
          >
            Collection
          </Link>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={openPopup}
            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
              scrolled
                ? "bg-black text-white border-black hover:bg-neutral-800"
                : "bg-white text-black border-white hover:bg-transparent hover:text-white"
            }`}
          >
            Request Sample
          </button>

          <button
            className={`md:hidden ${scrolled ? "text-black" : "text-white mix-blend-difference"}`}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-10">
            {/* Elegant Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Premium Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-full md:h-auto md:min-h-[600px] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Icon */}
              <button
                onClick={closePopup}
                className="absolute right-6 top-6 z-50 text-black/40 hover:text-black transition-colors md:mix-blend-difference md:text-white"
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={1.2} />
              </button>

              {/* Left Side: Visual/Editorial */}
              <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-neutral-100 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src="/img5.png"
                  alt="Dry Down Sample"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 mb-2 block">
                    Discovery Tier
                  </span>
                  <h2 className="text-white text-4xl md:text-5xl font-serif leading-none tracking-tighter">
                    Scent as <br />
                    An Identity.
                  </h2>
                </div>
              </div>

              {/* Right Side: Interaction */}
              <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-400 mb-6 block">
                    Limited Invitations
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-6 leading-tight">
                    Claim your complimentary <br />
                    trial vial.
                  </h3>
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                    Enter your details to receive our seasonal curation. No
                    commitment, just an invitation to experience our dry down.
                  </p>

                  <form onSubmit={handleSubscribe} className="space-y-8">
                    <div className="group relative">
                      <input
                        type="text"
                        placeholder="Email or phone number"
                        value={contactValue}
                        onChange={(e) => {
                          setContactValue(e.target.value);
                          if (formError) setFormError("");
                        }}
                        className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none font-sans text-sm tracking-wide focus:border-amber-500 transition-all duration-500 placeholder:text-neutral-300 text-neutral-800"
                      />
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-amber-500 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    {formError && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group relative w-full h-14 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500"
                    >
                      <span className="relative z-10">Secure Sample</span>
                      <div className="absolute inset-0 bg-neutral-800 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                    </button>
                  </form>

                  <p className="mt-8 text-[9px] text-neutral-400 uppercase tracking-widest text-center md:text-left">
                    *Ships within 5-7 business days globally.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
