"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React, { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-brand-base text-brand-dark w-full" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b border-brand-dark/10">
        <motion.div
          style={{ y: parallaxY1 }}
          className="absolute inset-0 z-0 opacity-20 filter grayscale mix-blend-multiply"
        >
          <img
            src="/img1.png"
            alt="Heritage"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[10px] font-sans font-bold tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="mr-3 h-4 w-4" /> Back Home
          </Link>
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent">
            Our Heritage
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-brand-dark leading-none">
            The Art of Care.
          </h1>
          <p className="font-sans text-lg md:text-xl opacity-80 leading-relaxed font-medium">
            A legacy born from fine perfumery, perfected by modern science.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 relative h-[600px] w-full rounded-tr-[100px] overflow-hidden shadow-2xl">
            <motion.img
              style={{ scale: 1.1, y: parallaxY2 }}
              src="/img2.png"
              alt="Philosophy"
              className="w-full h-full object-cover origin-center"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">
              Elevating the Mundane
            </h2>
            <p className="font-sans text-brand-dark opacity-80 leading-relaxed mb-8 text-lg">
              Laundry was once a chore. We observed how traditional detergents
              stripped natural fibers, substituting true cleanliness with
              artificial residues that degraded garments over time.
            </p>
            <p className="font-sans text-brand-dark opacity-80 leading-relaxed text-lg">
              Through painstaking research directly in Grasse, France—the
              fragrance capital of the world—we discovered that infusing pure
              essential oils alongside powerful, plant-based enzymes could
              preserve textile integrity while delivering an unparalleled
              olfactory signature.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery / Detail Section */}
      <section className="py-24 bg-brand-dark text-brand-base overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-6xl italic font-bold text-brand-accent mb-6">
            The Elements
          </h2>
          <p className="font-sans max-w-2xl mx-auto opacity-70 text-lg">
            Craftsmanship is in the details. From our ethically sourced
            botanicals to our recyclable vessels.
          </p>
        </div>

        {/* Horizontal Staggered Layout */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20">
          <div className="md:col-span-5 relative h-[500px]">
            <img
              src="/img3.png"
              className="w-full h-full object-cover filter brightness-75 contrast-125"
              alt="Botanicals"
            />
            <div className="absolute inset-0 border border-brand-accent/30 pointer-events-none transform translate-x-4 translate-y-4"></div>
          </div>

          <motion.div
            style={{ y: parallaxY3 }}
            className="md:col-span-7 relative h-[600px] -mt-10 md:mt-24"
          >
            <img
              src="/img4.png"
              className="w-full h-full object-cover filter brightness-90 shadow-2xl"
              alt="Lab"
            />
          </motion.div>
        </div>
      </section>

      {/* Manifesto Callout */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-10 leading-snug">
          "When you wear clothing washed in Dry Down, you wear a bespoke
          fragrance. We simply merged haute couture perfume with intelligent
          fabric care."
        </h2>
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-accent">
          — The Founders
        </p>
      </section>
    </div>
  );
}
