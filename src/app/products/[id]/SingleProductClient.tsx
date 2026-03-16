"use client";

import { motion } from "framer-motion";
import { ProductProps } from "@/lib/products";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Droplet, Wind, Leaf, Sparkles } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export default function SingleProductClient({
  product,
}: {
  product: ProductProps;
}) {
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

  const parseNoteList = (value: string | undefined, fallback: string) =>
    (value || fallback)
      .split(",")
      .map((note) => note.trim())
      .filter(Boolean);

  const topNotes = parseNoteList(product.topNotes, "Bergamot, Clary Sage");
  const heartNotes = parseNoteList(product.heartNotes, "French Lavender, Orris Root");
  const baseNotes = parseNoteList(product.baseNotes, "Ash Wood, Tonka Bean");

  const featuredNotes = Array.from(
    new Set([...topNotes, ...heartNotes, ...baseNotes]),
  ).slice(0, 6);

  const scentPyramid: {
    title: string;
    notes: string[];
    widthClass: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: "Top Notes",
      notes: topNotes,
      widthClass: "w-[68%]",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      title: "Heart Notes",
      notes: heartNotes,
      widthClass: "w-[84%]",
      icon: <Wind className="w-4 h-4" />,
    },
    {
      title: "Base Notes",
      notes: baseNotes,
      widthClass: "w-full",
      icon: <Leaf className="w-4 h-4" />,
    },
  ];

  const getNoteInitials = (note: string) =>
    note
      .split(" ")
      .map((part) => part[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const chartData = {
    labels: ["Woody", "Floral", "Fresh", "Sweet", "Spicy"],
    datasets: [
      {
        label: "Scent Notes",
        data: product.notes,
        backgroundColor: `${product.colorHex}40`, // 40% opacity hex
        borderColor: product.colorHex,
        borderWidth: 2,
        pointBackgroundColor: product.bgColor
          .replace("bg-[", "")
          .replace("]", ""), // Hacky way to get the solid color if needed, but colorHex is better
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: product.colorHex,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(0,0,0,0.1)" },
        grid: { color: "rgba(0,0,0,0.05)" },
        pointLabels: {
          font: {
            family: "var(--font-syne)",
            size: 11,
            weight: 700 as const, // Type assertion since weight expects number or 'bold' but next.js types might complain
          },
          color: "#1C2321",
        },
        ticks: { display: false, max: 100 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1C2321",
        titleFont: { family: "var(--font-playfair)" },
        bodyFont: { family: "var(--font-syne)" },
      },
    },
  };

  return (
    <section className="min-h-screen pt-24 pb-24 px-6 bg-brand-base">
      {/* Nav Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-10 font-sans text-xs font-bold uppercase tracking-[0.2em] opacity-60">
        <Link href="/" className="hover:text-brand-accent transition-colors">
          Home
        </Link>{" "}
        / <span className="text-brand-dark">Collection</span> / {product.name}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Col 1: Visual (5 cols) */}
        <div className="lg:col-span-5 h-[600px] lg:h-auto">
          <div
            className="relative h-full w-full overflow-hidden card-3d-container shadow-2xl rounded-sm border border-brand-dark/10"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="card-3d absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-100 ease-linear"
              style={{
                background: product.imgGradient,
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${rotateX || rotateY ? 1.05 : 1})`,
              }}
            >
              {/* Actual Bottle Image */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Details (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center fade-in delay-100 py-8">
          <h1
            className="font-serif font-bold text-5xl md:text-7xl mb-4 text-brand-dark leading-none"
            style={{ color: product.colorHex }}
          >
            {product.name}
          </h1>
          <p
            className="font-sans text-xs font-bold uppercase tracking-[0.3em] mb-8 opacity-60 border-l-2 pl-4"
            style={{ borderColor: product.colorHex }}
          >
            {product.colorName}
          </p>

          <div className="mb-10 border border-brand-dark/10 bg-white/80 p-5 md:p-6 shadow-sm">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#c87a55] mb-3">
              The Scent Story
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-6">
              Fragrance Pyramid
            </h3>

            <div className="space-y-3">
              {scentPyramid.map((tier) => (
                <div key={tier.title} className={`${tier.widthClass} mx-auto`}>
                  <div
                    className="border border-brand-dark/10 bg-brand-base px-4 py-3 md:px-5 md:py-4 shadow-sm"
                    style={{
                      boxShadow: `0 10px 20px -18px ${product.colorHex}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2 text-brand-dark">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white"
                        style={{ backgroundColor: product.colorHex }}
                      >
                        {tier.icon}
                      </span>
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em]">
                        {tier.title}
                      </p>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-brand-dark/80 leading-relaxed">
                      {tier.notes.join(" / ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="font-sans text-brand-dark opacity-80 leading-relaxed mb-10 text-lg border-b border-gray-200 pb-10">
            {product.description}
          </p>

          {/* Pros/Cons */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-green-800">
                The Good
              </h4>
              <ul className="text-xs space-y-2 font-sans opacity-80">
                {product.pros.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span>+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-red-900">
                The Note
              </h4>
              <ul className="text-xs space-y-2 font-sans opacity-80">
                {product.cons.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span>-</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-brand-dark/10 pt-8 mt-auto">
            <div className="font-serif text-4xl text-brand-dark">
              {product.price}
            </div>
            <button
              className="w-full sm:w-auto flex-1 bg-brand-dark text-white px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: product.colorHex }}
            >
              Buy in Amazon
            </button>
          </div>
        </div>

        {/* Col 3: Data Analysis (3 cols) */}
        <div
          className="lg:col-span-3 flex flex-col justify-center bg-white p-8 shadow-xl border-t-8 h-full min-h-[500px]"
          style={{ borderColor: product.colorHex }}
        >
          <div>
            <h3 className="font-serif font-bold text-3xl mb-2 text-center text-brand-dark">
              Olfactory Profile
            </h3>
            <p className="font-sans text-xs text-center opacity-50 mb-10 uppercase tracking-widest font-bold">
              Scent Intensity Analysis
            </p>
          </div>

          {/* CHART CONTAINER */}
          <div className="chart-container flex-1 min-h-[300px] w-full relative">
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className="mt-8">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-center text-brand-dark/60">
              Featured Notes
            </p>
            <div className="grid grid-cols-1 gap-3">
              {featuredNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-center gap-3 border border-brand-dark/10 bg-brand-base px-3 py-2"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-sans font-bold tracking-wider text-white shadow-md"
                    style={{ backgroundColor: product.colorHex }}
                  >
                    {getNoteInitials(note)}
                  </div>
                  <p className="font-sans text-xs uppercase tracking-[0.16em] text-brand-dark/80">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center border-t border-gray-100 pt-6">
            <p className="font-sans text-[10px] italic opacity-60 uppercase tracking-widest leading-relaxed">
              &quot;Analyzed via gas chromatography for note dominance.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* ENGINEERING SECTION */}
      <div className="max-w-7xl mx-auto mt-32">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[#c87a55]">
          The Engineering
        </p>
        <h2 className="font-serif font-bold text-5xl md:text-6xl text-brand-dark mb-6">
          Beyond Conditioning
        </h2>
        <p className="font-sans text-brand-dark opacity-70 max-w-2xl text-sm leading-relaxed mb-16">
          We&apos;ve re-imagined the molecular structure of fabric care to
          provide a sensorial experience that lasts long after the wash.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-brand-dark/5">
            <div className="w-12 h-12 rounded-full bg-[#f8f0ec] text-[#c87a55] flex items-center justify-center mb-6">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-lg text-brand-dark mb-4 drop-shadow-sm">
              Bio-Soft Technology
            </h3>
            <p className="font-sans text-xs text-brand-dark opacity-60 leading-relaxed">
              Plant-based surfactants that bond to natural fibers, creating a
              microscopic layer of velvet-like softness.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-brand-dark/5">
            <div className="w-12 h-12 rounded-full bg-[#f8f0ec] text-[#c87a55] flex items-center justify-center mb-6">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-lg text-brand-dark mb-4 drop-shadow-sm">
              Breathable Scent
            </h3>
            <p className="font-sans text-xs text-brand-dark opacity-60 leading-relaxed">
              Our micro-capsules are oxygen-activated, releasing warm notes of{" "}
              {product.name.toLowerCase()} with every movement.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-brand-dark/5">
            <div className="w-12 h-12 rounded-full bg-[#f8f0ec] text-[#c87a55] flex items-center justify-center mb-6">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-lg text-brand-dark mb-4 drop-shadow-sm">
              Earth Conscious
            </h3>
            <p className="font-sans text-xs text-brand-dark opacity-60 leading-relaxed">
              Biodegradable, non-toxic, and packaged in our signature recycled
              glass-inspired polymer.
            </p>
          </div>
        </div>
      </div>

      {/* CRAFTED IN GRASSE */}
      <div className="w-full mt-32 relative h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/handImg.jpg"
            alt="Crafted in Grasse"
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-white text-6xl md:text-8xl flex flex-col md:flex-row flex-wrap md:gap-6 leading-none select-none">
            <span className="font-sans font-bold">CRAFTED IN</span>
            <span
              className="font-serif italic drop-shadow-lg"
              style={{ color: product.colorHex }}
            >
              GRASSE
            </span>
          </h2>
          <p className="mt-8 text-white/80 max-w-md font-sans text-sm leading-relaxed">
            Every bottle is infused with perfume-grade essential oils, developed
            in the fragrance capital of the world.
          </p>
        </div>
      </div>

      {/* OLFACTORY JOURNEY */}
      <div className="max-w-7xl mx-auto mt-32 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[#c87a55]">
              The Olfactory Journey
            </p>
            <h2 className="font-serif font-bold text-5xl md:text-6xl text-brand-dark mb-16">
              {product.name} Profile
            </h2>

            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                    Top Notes
                  </h4>
                  <span className="font-sans text-[10px] italic opacity-60 text-right max-w-[60%]">
                    {topNotes.join(", ")}
                  </span>
                </div>
                <div
                  className="w-full h-[1px]"
                  style={{ backgroundColor: product.colorHex }}
                />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                    Heart Notes
                  </h4>
                  <span className="font-sans text-[10px] italic opacity-60 text-right max-w-[60%]">
                    {heartNotes.join(", ")}
                  </span>
                </div>
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: product.colorHex }}
                />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                    Base Notes
                  </h4>
                  <span className="font-sans text-[10px] italic opacity-60 text-right max-w-[60%]">
                    {baseNotes.join(", ")}
                  </span>
                </div>
                <div
                  className="w-full h-[3px]"
                  style={{ backgroundColor: product.colorHex }}
                />
              </div>
            </div>
          </div>

          {/* Right side circle visual */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            {/* Outer Circle Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-dashed border-[#c87a55]/30"
            ></motion.div>

            {/* Optional Inner Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full border border-[#c87a55]/20 shadow-inner"
            ></motion.div>

            {/* Center text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl text-brand-dark flex items-center gap-3 relative z-10 p-6 bg-brand-base rounded-full shadow-2xl"
            >
              Pure
              <span
                className="w-4 h-4 rounded-full shadow-md"
                style={{ backgroundColor: product.colorHex }}
              ></span>
              Fragrance
            </motion.div>

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Wind (Top Right) */}
              <div className="absolute top-[8%] right-[25%] text-[#c87a55] drop-shadow-lg">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Wind className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Sparkles (Right) */}
              <div className="absolute top-[50%] right-0 -translate-y-1/2 text-[#c87a55] drop-shadow-lg">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Leaf (Bottom Left) */}
              <div className="absolute bottom-[8%] left-[25%] text-[#c87a55] drop-shadow-lg">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  >
                    <Leaf className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Droplet (Left) */}
              <div className="absolute top-[50%] left-0 -translate-y-1/2 text-[#c87a55] drop-shadow-lg">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Droplet className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
