"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Instagram, Twitter, Facebook } from "lucide-react";
import { products } from "@/lib/products";

const POPUP_STORAGE_KEY = "drydown.sample-popup-seen";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    if (!isPopupOpen && !isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPopupOpen, isSidebarOpen]);

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
            onClick={() => setIsSidebarOpen(true)}
            className={`md:hidden ${scrolled ? "text-brand-dark" : "text-white mix-blend-difference"}`}
            aria-label="Open Menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[101] w-[85vw] max-w-sm bg-[#F5F2EB] flex flex-col pt-12 pb-12 px-8 overflow-y-auto md:hidden shadow-2xl"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-6 text-[#1C2321] p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close Menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <div className="flex flex-col gap-10 flex-grow mt-4">
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-6">
                    The Archive
                  </h4>
                  <div className="flex flex-col gap-5">
                    {products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="group flex flex-col border-l-2 border-transparent hover:border-[#D4AF37] pl-4 transition-all"
                      >
                        <span className="font-serif text-2xl text-[#1C2321] group-hover:text-[#D4AF37] transition-colors leading-tight">
                          {p.name}
                        </span>
                        <span className="font-sans text-xs text-[#1C2321]/50 mt-1 uppercase tracking-widest font-semibold">
                          {p.colorName}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-6 mt-2">
                    Directory
                  </h4>
                  <div className="flex flex-col gap-5 font-serif text-3xl text-[#1C2321]">
                    <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#D4AF37] transition-colors">
                      About Us
                    </Link>
                    <Link href="/#faq" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#D4AF37] transition-colors">
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-6">
                <div className="h-[1px] w-full bg-[#1C2321]/10" />
                <div className="flex items-center gap-6 text-[#1C2321]">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
                    <Twitter size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">
                    <Facebook size={20} strokeWidth={1.5} />
                  </a>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#1C2321]/40 pt-2">
                  © 2026 DRY DOWN. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-full md:h-auto md:min-h-[600px] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={closePopup}
                className="absolute right-6 top-6 z-50 text-black/40 hover:text-black transition-colors md:mix-blend-difference md:text-white"
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={1.2} />
              </button>

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
