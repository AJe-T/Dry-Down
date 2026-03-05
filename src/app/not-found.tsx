"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-base flex flex-col lg:flex-row overflow-hidden absolute inset-0 z-[100]">
      {/* Left Text */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10 lg:p-20 relative z-10">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent">
              Error 404
            </p>
            <h1 className="font-serif text-7xl md:text-9xl font-bold mb-6 text-white leading-none">
              Lost In <br />
              <span className="italic !text-brand-accent opacity-90 drop-shadow-md">
                The Wash.
              </span>
            </h1>
            <p className="font-sans text-lg opacity-70 leading-relaxed mb-10">
              The scent or page you are looking for has evaporated. This happens
              when the destination is moved, renamed, or never existed in our
              formulation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-brand-base text-brand-dark px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl"
            >
              <ArrowLeft className="mr-3 h-4 w-4" /> Return to Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Visual Image */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-full">
        <div className="absolute inset-0 bg-brand-dark/20 z-10 mix-blend-multiply"></div>
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/img5.png"
          alt="Page not found visual"
          className="w-full h-full object-cover object-center filter contrast-[1.1] grayscale-[0.2]"
        />
      </div>
    </div>
  );
}
