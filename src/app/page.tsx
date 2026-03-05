"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import Link from "next/link";
import React, { useRef, useState } from "react";

// Helper component for the 3D Tilt Effect
function TiltCard({ product, index }: { product: any; index: number }) {
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

    // Max 10deg rotation
    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block cursor-pointer"
    >
      <div
        ref={cardRef}
        className="relative h-[400px] w-full bg-gray-200 overflow-hidden mb-6 card-3d-container shadow-sm border border-brand-dark/5"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="card-3d absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-100 ease-linear"
          style={{
            background: product.imgGradient,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: rotateX || rotateY ? 1.05 : 1,
          }}
        >
          {/* Abstract background number */}
          <div className="absolute top-4 left-4 text-white text-8xl font-serif opacity-20 group-hover:opacity-40 transition-opacity">
            0{index}
          </div>

          {/* Image Representation */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Abstract Bottle Shape representing the product */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
            <div className="w-32 h-48 border-2 border-white/40 rounded-t-full backdrop-blur-md bg-white/10 shadow-lg flex items-center justify-center relative overflow-hidden">
              <span className="text-white font-serif tracking-widest text-lg opacity-80 rotate-[-90deg] whitespace-nowrap drop-shadow-md">
                {product.name}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hover label */}
        <div className="absolute top-4 right-4 bg-white/90 text-brand-dark font-sans text-xs font-bold px-3 py-1 uppercase rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
          View Details
        </div>
      </div>
      <h3 className="font-serif text-2xl mb-1 group-hover:text-brand-accent transition-colors">
        {product.name}
      </h3>
      <p className="font-sans text-[10px] font-bold uppercase opacity-50 tracking-widest">
        {product.colorName}
      </p>
    </Link>
  );
}

export default function Home() {
  const collectionProducts = products.filter((p) => p.id !== "starter");

  const campaignRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: campaignRef,
    offset: ["start end", "end start"],
  });
  const leftMove = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const rightMove = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const labRef = useRef<HTMLElement>(null);
  const { scrollYProgress: labProgress } = useScroll({
    target: labRef,
    offset: ["start end", "end start"],
  });
  const labImageY = useTransform(labProgress, [0, 1], ["-20%", "20%"]);
  const labImageScale = useTransform(labProgress, [0, 1], [1, 1.15]);



  return (
    <div className="bg-brand-base text-brand-dark w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-brand-base">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-multiply">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source
              src="https://videos.pexels.com/video-files/5005825/5005825-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="z-10 text-center px-4 fade-in">
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent drop-shadow-sm">
            Est. 2026 &bull; Global
          </p>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] md:text-9xl font-bold text-brand-dark mb-6 md:leading-none">
            LAUNDRY,
            <br />
            <span className="italic font-light opacity-90">ELEVATED.</span>
          </h1>
          <p className="font-sans text-brand-dark opacity-80 max-w-lg mx-auto mb-10 text-lg leading-relaxed font-medium">
            Stop washing. Start caring. High-performance chemistry meets haute
            couture fragrance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/starter"
              className="bg-brand-dark text-white px-8 py-4 rounded-none font-sans font-bold uppercase tracking-wider hover:bg-brand-accent transition-colors shadow-xl text-xs"
            >
              Shop Starter Pack
            </Link>
            <Link
              href="#collection"
              className="border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-none font-sans font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-white transition-colors text-xs text-center"
            >
              Explore Scents
            </Link>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden bg-brand-dark text-brand-base py-3 transform -rotate-1 shadow-2xl">
          <div className="animate-marquee whitespace-nowrap flex font-sans font-black text-2xl uppercase tracking-widest">
            <span className="mx-4">
              DEEP CARE &bull; 25 PREMIUM WASHES &bull; LUXURY FRAGRANCE &bull;
              CLEAN WEAR &bull; LASTING SCENT &bull;
            </span>
            <span className="mx-4">
              DEEP CARE &bull; 25 PREMIUM WASHES &bull; LUXURY FRAGRANCE &bull;
              CLEAN WEAR &bull; LASTING SCENT &bull;
            </span>
            <span className="mx-4">
              DEEP CARE &bull; 25 PREMIUM WASHES &bull; LUXURY FRAGRANCE &bull;
              CLEAN WEAR &bull; LASTING SCENT &bull;
            </span>
          </div>
        </div>
      </section>

      {/* PRODUCTS OVERVIEW GRID */}
      <section
        id="collection"
        className="py-32 px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="mb-16 text-center">
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent">
            The Collection
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-brand-dark">
            Curated Wash Cycles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collectionProducts.map((p, index) => (
            <TiltCard key={p.id} product={p} index={index + 1} />
          ))}
        </div>
      </section>

      {/* STARTER PACK TEASER SECTION */}
      <section className="relative py-32 bg-brand-dark text-white overflow-hidden border-t border-brand-dark/10">
        <div className="absolute inset-0 z-0 opacity-40">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.2]"
          >
            <source
              src="https://videos.pexels.com/video-files/5867946/5867946-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-brand-dark/50 mix-blend-multiply z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent drop-shadow-sm">
            The Complete Experience
          </p>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8 shadow-black/50 drop-shadow-xl">
            The Discovery Set.
          </h2>
          <p className="font-sans text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 drop-shadow-md leading-relaxed">
            Experience our entire fragrance wardrobe before committing to a full vessel. 
            Four signature wash cycles, elegantly packaged for the discerning individual.
          </p>
          <Link
            href="/starter"
            className="inline-block bg-brand-accent text-brand-dark px-8 py-4 font-sans font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-2xl text-xs"
          >
            Unlock the Collection
          </Link>
        </div>
      </section>

      {/* THE LABORATORY SECTION (img6, img7) */}
      <section
        ref={labRef}
        className="py-32 bg-brand-base overflow-hidden border-t border-brand-dark/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left side text and small image */}
            <div>
              <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent">
                The Laboratory
              </p>
              <h2 className="font-serif font-bold text-5xl md:text-7xl text-brand-dark mb-8 leading-tight">
                Modern Alchemy.
              </h2>
              <p className="font-sans text-brand-dark opacity-80 leading-relaxed mb-12 text-lg max-w-lg">
                We discarded the conventional chemical detergents that degrade
                your most delicate fabrics. In their place, we utilized organic
                chemistry and plant-based surfactants to craft fine fragrance
                formulations that deeply nourish every weave.
              </p>
              <div className="relative w-3/4 max-w-sm h-[400px] shadow-2xl rounded-tr-3xl rounded-bl-3xl overflow-hidden border border-brand-dark/10">
                <img
                  src="/img6.png"
                  className="w-full  h-full object-cover filter brightness-90"
                  alt="Laboratory Details"
                />
              </div>
            </div>

            {/* Right side Parallax image */}
            <div className="relative h-[400px] md:h-[700px] w-full rounded-t-[100px] rounded-b-[100px] md:rounded-t-full md:rounded-b-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-brand-dark/5">
              <motion.div
                className="absolute inset-0 w-full h-[140%]"
                style={{ y: labImageY, scale: labImageScale }}
              >
                <img
                  src="/img7.png"
                  className="w-full h-full object-cover filter contrast-[1.1]"
                  alt="Innovation Process"
                />
                {/* Dark Overlay gradient for a luxury feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
              </motion.div>
              <div className="absolute bottom-12 md:bottom-16 left-0 right-0 text-center z-10">
                <p className="font-serif italic text-white text-2xl md:text-3xl opacity-90 drop-shadow-md">
                  Distilled in Grasse
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ETHOS / VIDEO SIMULATION */}
      <section className="py-40 bg-brand-dark text-brand-base relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale mix-blend-overlay"
          >
            <source
              src="https://videos.pexels.com/video-files/8741348/8741348-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center drop-shadow-lg">
          <h2 className="font-serif text-4xl md:text-7xl mb-8 leading-tight italic">
            &quot;We believe the scent of your clothes is your second
            skin.&quot;
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-8"></div>
          <p className="font-sans text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Traditional detergents strip fabrics and leave artificial residues.
            DRY DOWN feeds the fiber using plant-based enzymes and infuses them
            with oils sourced from fine perfumeries.
          </p>
        </div>
      </section>

      {/* PARALLAX RITUAL SECTION */}
      <section
        ref={campaignRef}
        id="campaign-section"
        className="relative w-full py-20 px-6 md:px-0 md:py-0 md:min-h-[150vh] bg-brand-base flex flex-col md:flex-row items-center justify-center overflow-hidden border-y border-brand-dark/10"
      >
        {/* Left Floating Element (Moves UP on scroll - Desktop Only) */}
        <motion.div
          style={{ y: leftMove }}
          className="hidden md:block absolute left-[-10%] md:left-[5%] top-[10%] w-64 md:w-[400px] z-20 will-change-transform"
        >
          <div className="w-full h-[600px] bg-brand-dark/5 border border-brand-dark/10 backdrop-blur-md rounded-t-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/10 to-transparent z-10 pointer-events-none"></div>
            <img
              src="/handImg.jpg"
              alt="Ritual Left"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Left Image (Mobile Only) */}
        <div className="md:hidden w-full max-w-sm mx-auto mb-12 z-20">
          <div className="w-full h-[400px] bg-brand-dark/5 border border-brand-dark/10 backdrop-blur-md rounded-t-[100px] flex items-center justify-center shadow-2xl relative overflow-hidden">
            <img
              src="/handImg.jpg"
              alt="Ritual Left Mobile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center Typography */}
        <div className="relative z-10 text-center max-w-3xl px-0 md:px-6">
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 md:mb-6 text-brand-accent">
            The Ritual
          </p>
          <h2 className="font-serif text-[3.5rem] leading-[1.1] md:text-8xl text-brand-dark mb-6 md:mb-8 md:leading-none">
            Hold luxury in your hands.
          </h2>
          <p className="font-sans text-lg md:text-xl text-brand-dark opacity-70 leading-relaxed mx-auto max-w-xl">
            A tactile experience from the moment you lift the vessel. Designed
            to be displayed, formulated to perform.
          </p>
        </div>

        {/* Right Floating Element (Moves DOWN on scroll - Desktop Only) */}
        <motion.div
          style={{ y: rightMove }}
          className="hidden md:block absolute right-[-10%] md:right-[5%] bottom-[10%] w-64 md:w-[400px] z-20 will-change-transform"
        >
          <div className="w-full h-[600px] bg-brand-accent/10 border border-brand-accent/20 backdrop-blur-md rounded-b-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/20 to-transparent z-10 pointer-events-none"></div>
            <img
              src="detergent.jpg"
              alt="Ritual Right"
              className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.2]"
            />
          </div>
        </motion.div>

        {/* Right Image (Mobile Only) */}
        <div className="md:hidden w-full max-w-sm mx-auto mt-12 z-20">
          <div className="w-full h-[400px] bg-brand-accent/10 border border-brand-accent/20 backdrop-blur-md rounded-b-[100px] flex items-center justify-center shadow-2xl relative overflow-hidden">
            <img
              src="detergent.jpg"
              alt="Ritual Right Mobile"
              className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.2]"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS TICKER */}
      <section className="py-24 bg-brand-accent text-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <h3 className="font-serif text-4xl md:text-5xl">
            Word on the Street
          </h3>
          <div className="text-3xl hidden md:block">&#10022;</div>
        </div>
        <div className="flex overflow-x-auto pb-8 gap-8 px-6 no-scrollbar snap-x">
          {[
            {
              user: "Sarah J.",
              text: "The Burnt Sugar is addictive. I do laundry just to smell it.",
            },
            {
              user: "Alexander V.",
              text: "Washing my sheets with Acid Bloom is akin to opening a window in a high-end botanical garden.",
            },
            {
              user: "Juliet R.",
              text: "My cashmere sweaters have never felt or smelled more luxurious. Every wear feels like an occasion.",
            },
            {
              user: "M. Chen",
              text: "A serene, quiet luxury. It doesn't shout; it gently hums around you all day.",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[400px] bg-white p-10 shadow-lg snap-center flex-shrink-0 border-2 border-brand-dark"
            >
              <div className="text-brand-accent text-5xl mb-4 font-serif leading-none">
                “
              </div>
              <p className="font-serif text-xl md:text-2xl mb-8 leading-snug">
                {r.text}
              </p>
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest border-t border-gray-200 pt-6 opacity-60">
                — {r.user}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL SUBSCRIPTION SECTION */}
      <section className="relative py-40 bg-brand-dark overflow-hidden border-t border-white/10 flex items-center justify-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-8 rounded-full bg-brand-accent text-brand-dark flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              &#10022;
            </div>

            <p className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-brand-accent">
              The Inner Circle
            </p>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
              Unlock the Ritual.
            </h2>
            <p className="font-sans text-white/70 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
              We invite you to join our private society. Provide your
              correspondence details below to receive a{" "}
              <span className="text-brand-accent italic">
                complimentary discovery set
              </span>
              , curated directly from our ateliers in Grasse, before it releases
              to the public.
            </p>

            <form
              className="relative w-full max-w-lg mx-auto flex flex-col md:flex-row gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Success! 🎉\n\nNote: Since this is a frontend-only project without a database, we cannot actually store this email right now. In a production scenario, you would connect this form to a backend service like Formspree, Mailchimp, or Resend API to handle submissions.",
                );
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="w-full px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:border-brand-accent focus:bg-white/15 outline-none font-sans transition-all rounded-none shadow-inner"
              />
              <button
                type="submit"
                className="w-full md:w-auto bg-brand-accent text-brand-dark px-10 py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Request Sample
              </button>
            </form>

            <p className="font-sans text-[10px] text-white/40 mt-8 tracking-widest uppercase">
              Limited availability. One per household.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
