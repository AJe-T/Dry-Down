"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function StarterPackPage() {
  const sp = products.find((p) => p.id === "starter");
  const collectionProducts = products.filter((p) => p.id !== "starter");

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const videoRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const gridRef = useRef<HTMLElement>(null);
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(gridProgress, [0, 1], [0, -200]);
  const y2 = useTransform(gridProgress, [0, 1], [0, 200]);

  if (!sp) return null;

  return (
    <div className="bg-brand-base w-full overflow-x-hidden">
      <section className="min-h-screen pt-24 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-7xl mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[10px] font-sans font-bold tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="mr-3 h-4 w-4" /> Back to Collection
          </Link>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-grow">
          {/* Left: Visual 3D Box */}
          <div
            className="relative h-[400px] md:h-[600px] w-full bg-gray-200 overflow-hidden card-3d-container rounded-sm shadow-2xl border-4 border-white"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="card-3d absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-100 ease-linear"
              style={{
                background: sp.imgGradient,
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${rotateX || rotateY ? 1.05 : 1})`,
              }}
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6 p-8 md:p-12 mix-blend-overlay">
                <div className="w-20 md:w-28 h-28 md:h-40 bg-white/10 border-2 border-white/30 backdrop-blur-sm rounded-t-lg shadow-xl shadow-black/20"></div>
                <div className="w-20 md:w-28 h-28 md:h-40 bg-white/10 border-2 border-white/30 backdrop-blur-sm rounded-t-lg shadow-xl shadow-black/20"></div>
                <div className="w-20 md:w-28 h-28 md:h-40 bg-white/10 border-2 border-white/30 backdrop-blur-sm rounded-t-lg shadow-xl shadow-black/20"></div>
                <div className="w-20 md:w-28 h-28 md:h-40 bg-white/10 border-2 border-white/30 backdrop-blur-sm rounded-t-lg shadow-xl shadow-black/20"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center ring-4 md:ring-8 ring-white/10 m-6 md:m-12 pointer-events-none">
                <h2 className="text-white/60 font-serif text-3xl md:text-5xl font-bold tracking-[0.3em] md:tracking-[0.5em] rotate-[-90deg] uppercase mix-blend-overlay whitespace-nowrap">
                  Discovery
                </h2>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-brand-accent text-brand-dark font-sans font-bold text-[10px] md:text-xs px-3 py-1 md:px-4 md:py-2 uppercase tracking-widest animate-bounce shadow-md">
              Best Seller
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center fade-in mt-10 lg:mt-0">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-brand-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Bundle
              </span>
              <span className="text-brand-dark font-sans font-bold text-xs opacity-60 tracking-widest">
                {sp.size}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl mb-4 text-brand-dark leading-none">
              {sp.name}
            </h1>
            <p className="font-sans text-lg mb-8 font-light italic text-brand-accent tracking-wide">
              {sp.shortDesc}
            </p>

            <p className="font-sans text-brand-dark opacity-80 leading-relaxed mb-10 text-lg">
              {sp.description}
            </p>

            <div className="bg-white p-6 md:p-8 mb-10 border border-gray-200 shadow-sm">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-3 text-brand-accent">
                Includes
              </h4>
              <ul className="font-serif text-lg md:text-xl space-y-4">
                {collectionProducts.map((p) => (
                  <li key={p.id} className="flex items-center gap-4">
                    <span
                      style={{ color: p.colorHex }}
                      className="text-2xl drop-shadow-sm"
                    >
                      &#10022;
                    </span>
                    <span className="font-bold">{p.name}</span>
                    <span className="text-[10px] md:text-xs font-sans opacity-50 uppercase tracking-widest">
                      ({p.colorName})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-brand-dark/10 pt-10">
              <div className="font-serif text-5xl">{sp.price}</div>
              <button className="w-full sm:w-auto flex-1 bg-brand-dark text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-brand-dark transition-all shadow-xl hover:shadow-2xl">
                Buy in Amazon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX VIDEO SECTION */}
      <section
        ref={videoRef}
        className="relative h-[80vh] w-full overflow-hidden border-y border-brand-dark/10"
      >
        <motion.div className="absolute inset-0 w-full h-[140%]" style={{ y }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          >
            <source src="/hero2.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-brand-dark/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl fade-in text-white">
            <h2 className="font-serif text-5xl md:text-8xl mb-6 tracking-tighter shadow-black/50 drop-shadow-xl">
              Experience the Spectrum.
            </h2>
            <p className="font-sans text-lg md:text-xl opacity-90 max-w-xl mx-auto drop-shadow-md">
              The Discovery Set is your gateway to our entire fragrance
              wardrobe. Find your signature scent before committing to a full
              vessel.
            </p>
          </div>
        </div>
      </section>
      {/* PARALLAX GRID DETAILS SECTION */}
      <section
        ref={gridRef}
        className="py-24 bg-brand-base overflow-hidden border-t border-brand-dark/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-brand-accent">
              What&apos;s Inside
            </p>
            <h2 className="font-serif text-5xl md:text-7xl text-brand-dark mb-6">
              The Complete Wardrobe.
            </h2>
            <p className="font-sans text-brand-dark opacity-70 max-w-2xl mx-auto text-lg leading-relaxed">
              Four 100ml vessels. Four distinct narratives. The ultimate
              olfactory journey designed to transform your textile care ritual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative">
            {/* Left Column - Moves UP */}
            <motion.div
              style={{ y: y1 }}
              className="flex flex-col gap-16 md:gap-32 w-full max-w-md mx-auto lg:ml-auto"
            >
              {/* Item 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-dark/5">
                <div className="w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center transform transition duration-700 hover:scale-105">
                  <img
                    src="/img1.png"
                    alt="Burnt Sugar"
                    className="w-full h-full object-cover mix-blend-multiply filter brightness-[0.8] contrast-125 saturate-50"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#8b5a2b]"></span>
                  <h3 className="font-serif text-3xl text-brand-dark">
                    Burnt Sugar
                  </h3>
                </div>
                <p className="font-sans text-brand-dark opacity-70 leading-relaxed mb-6">
                  Deep, moody woods intertwined with caramelized resins. An
                  intoxicating signature for heavier fabrics, denim, and evening
                  wear.
                </p>
              </div>

              {/* Item 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-dark/5">
                <div className="w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center transform transition duration-700 hover:scale-105">
                  <img
                    src="/img3.png"
                    alt="Pale Ash"
                    className="w-full h-full object-cover mix-blend-multiply filter brightness-[0.8] contrast-125 saturate-50"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#a9a9a9]"></span>
                  <h3 className="font-serif text-3xl text-brand-dark">
                    Pale Ash
                  </h3>
                </div>
                <p className="font-sans text-brand-dark opacity-70 leading-relaxed mb-6">
                  Austere, mineral, and undeniably clean. A minimalist
                  composition of white musk and slate. Perfect for crisp
                  shirting and pure linens.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Moves DOWN */}
            <motion.div
              style={{ y: y2 }}
              className="flex flex-col gap-16 md:gap-32 w-full max-w-md mx-auto lg:mr-auto lg:mt-40"
            >
              {/* Item 2 */}
              <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl border border-white/10">
                <div className="w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-2xl bg-white/5 flex items-center justify-center transform transition duration-700 hover:scale-105">
                  <img
                    src="/img2.png"
                    alt="Acid Bloom"
                    className="w-full h-full object-cover mix-blend-screen filter saturate-50 contrast-150"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#e63946]"></span>
                  <h3 className="font-serif text-3xl">Acid Bloom</h3>
                </div>
                <p className="font-sans text-white/70 leading-relaxed mb-6">
                  Electric florals clash with vibrant citrus zest. A
                  high-energy, euphoric wash cycle designed to breathe life into
                  everyday cottons.
                </p>
              </div>

              {/* Item 4 */}
              <div className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl border border-white/10">
                <div className="w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-2xl bg-white/5 flex items-center justify-center transform transition duration-700 hover:scale-105">
                  <img
                    src="/img4.png"
                    alt="Butter Petal"
                    className="w-full h-full object-cover mix-blend-screen filter saturate-50 contrast-150"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#f4a261]"></span>
                  <h3 className="font-serif text-3xl">Butter Petal</h3>
                </div>
                <p className="font-sans text-white/70 leading-relaxed mb-6">
                  Intimate, cashmeran comfort. Creamy lactones and soft yellow
                  florals wrap your most delicate knits in a gentle, lingering
                  embrace.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
