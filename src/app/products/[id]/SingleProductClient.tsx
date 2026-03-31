"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { products, type ProductProps } from "@/lib/products";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import {
  Droplet,
  Wind,
  Leaf,
  Sparkles,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const FadeIn = ({
  children,
  delay = 0,
  className = "",
  duration = 1.2,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({
  children,
  className = "",
  delayChildren = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealLine = ({
  delay = 0,
  color = "bg-brand-dark/20",
  className = "",
}: {
  delay?: number;
  color?: string;
  className?: string;
}) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`h-[1px] w-full origin-left ${color} ${className}`}
  />
);

export default function SingleProductClient({
  product,
}: {
  product: ProductProps;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const cardScale = useMotionValue(1);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const rotateXSpring = useSpring(rotateX, {
    stiffness: 240,
    damping: 26,
    mass: 0.5,
  });
  const rotateYSpring = useSpring(rotateY, {
    stiffness: 240,
    damping: 26,
    mass: 0.5,
  });
  const cardScaleSpring = useSpring(cardScale, {
    stiffness: 260,
    damping: 24,
    mass: 0.45,
  });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 58%)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.18]);

  const productGallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image, product.imageUrl];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(((y - centerY) / centerY) * -6);
    rotateY.set(((x - centerX) / centerX) * 6);
    cardScale.set(1.02);
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
    glareX.set(50);
    glareY.set(50);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? productGallery.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productGallery.length);
  };

  const parseNoteList = (value: string | undefined, fallback: string) =>
    (value || fallback)
      .split(",")
      .map((note) => note.trim())
      .filter(Boolean);

  const topNotes = parseNoteList(product.topNotes, "Bergamot, Clary Sage");
  const heartNotes = parseNoteList(
    product.heartNotes,
    "French Lavender, Orris Root",
  );
  const baseNotes = parseNoteList(product.baseNotes, "Ash Wood, Tonka Bean");
  const otherProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
  const otherProductsGridClass =
    otherProducts.length === 1
      ? "grid-cols-1"
      : otherProducts.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  useEffect(() => {
    setCurrentSlide(0);
  }, [product.id]);

  useEffect(() => {
    if (productGallery.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productGallery.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [productGallery.length]);

  const chartData = {
    labels: ["Woody", "Floral", "Fresh", "Sweet", "Spicy"],
    datasets: [
      {
        label: "Scent Notes",
        data: product.notes,
        backgroundColor: `${product.colorHex}25`,
        borderColor: product.colorHex,
        borderWidth: 1.5,
        pointBackgroundColor: product.bgColor
          .replace("bg-[", "")
          .replace("]", ""),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: product.colorHex,
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(0,0,0,0.04)" },
        grid: { color: "rgba(0,0,0,0.04)" },
        pointLabels: {
          font: {
            family: "var(--font-syne)",
            size: 11,
            weight: 500 as const,
            letterSpacing: "0.1em",
          },
          color: "rgba(28, 35, 33, 0.7)",
        },
        ticks: { display: false, max: 100 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(28, 35, 33, 0.95)",
        titleFont: { family: "var(--font-playfair)", size: 14, weight: 600 },
        bodyFont: {
          family: "var(--font-syne)",
          size: 12,
          letterSpacing: "0.05em",
        },
        padding: 16,
        cornerRadius: 4,
        displayColors: false,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="bg-brand-base overflow-x-clip selection:bg-brand-dark selection:text-white"
    >
      <section className="relative min-h-screen pt-6 pb-20 px-6 flex flex-col justify-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60 flex flex-wrap items-center text-brand-dark"
          >
            <Link
              href="/"
              className="hover:text-brand-accent transition-colors duration-300"
            >
              Home
            </Link>
            <span className="mx-4 w-4 h-[1px] bg-brand-dark/30"></span>
            <Link
              href="/#collection"
              className="hover:text-brand-accent transition-colors duration-300"
            >
              Collection
            </Link>
            <span className="mx-4 w-4 h-[1px] bg-brand-dark/30"></span>
            <span className="text-brand-dark font-bold">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 w-full">
              <div className="h-[50vh] min-h-[350px] lg:min-h-[500px] lg:h-[75vh] [perspective:1200px] w-full relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group [transform-style:preserve-3d]"
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                    style={{
                      background: product.imgGradient,
                      rotateX: rotateXSpring,
                      rotateY: rotateYSpring,
                      scale: cardScaleSpring,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_48%)] opacity-70" />
                    <motion.div
                      className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
                      style={{ background: glareBackground }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />

                    <div className="relative z-20 h-full w-full [transform:translateZ(24px)]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={productGallery[currentSlide]}
                          initial={{ opacity: 0, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative h-full w-full"
                        >
                          <Image
                            src={productGallery[currentSlide]}
                            alt={`${product.name} view ${currentSlide + 1}`}
                            fill
                            quality={100}
                            unoptimized
                            priority={currentSlide === 0}
                            sizes="(max-width: 1024px) 100vw, 42vw"
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {productGallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label={`Previous ${product.name} image`}
                          onClick={handlePrevSlide}
                          className="absolute inset-y-0 left-0 z-30 flex w-1/2 items-center justify-start bg-gradient-to-r from-black/28 via-black/12 to-transparent px-5 md:px-7 text-white/90 opacity-0 transition-all duration-300 hover:from-black/40 hover:via-black/18 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
                        >
                          <span className="flex h-12 w-12 -translate-x-2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0 hover:scale-105">
                            <ChevronLeft
                              className="h-5 w-5"
                              strokeWidth={1.5}
                            />
                          </span>
                        </button>

                        <button
                          type="button"
                          aria-label={`Next ${product.name} image`}
                          onClick={handleNextSlide}
                          className="absolute inset-y-0 right-0 z-30 flex w-1/2 items-center justify-end bg-gradient-to-l from-black/28 via-black/12 to-transparent px-5 md:px-7 text-white/90 opacity-0 transition-all duration-300 hover:from-black/40 hover:via-black/18 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
                        >
                          <span className="flex h-12 w-12 translate-x-2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0 hover:scale-105">
                            <ChevronRight
                              className="h-5 w-5"
                              strokeWidth={1.5}
                            />
                          </span>
                        </button>
                      </>
                    )}

                    <div className="absolute inset-x-0 bottom-0 z-30 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                      <div className="rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md hidden sm:block">
                        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-white/90">
                          Auto Gallery
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {productGallery.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            aria-label={`View ${product.name} image ${index + 1}`}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                              currentSlide === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/40 hover:bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {productGallery.length > 1 && (
                <FadeIn delay={0.4}>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                    {productGallery.map((image, index) => (
                      <button
                        key={image}
                        onClick={() => setCurrentSlide(index)}
                        className={`relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                          currentSlide === index
                            ? "border-brand-accent/50 opacity-100 shadow-md transform scale-[1.02]"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        style={{ background: product.imgGradient }}
                        aria-label={`View ${product.name} image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 15vw"
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </button>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center py-8">
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-4 mb-8">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-[1px]"
                    style={{ backgroundColor: product.colorHex }}
                  />
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/60">
                    {product.colorName}
                  </p>
                </div>
                <h1
                  className="font-serif font-light text-5xl sm:text-[3.5rem] leading-[0.9] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] mb-6 md:mb-8 lg:mb-12 text-brand-dark tracking-tighter"
                  style={{ color: product.colorHex }}
                >
                  {product.name}
                </h1>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="font-sans font-light text-brand-dark/70 leading-relaxed mb-8 lg:mb-12 text-base md:text-xl relative max-w-2xl">
                  {product.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 border-t border-brand-dark/10 pt-8 mt-4">
                  <div className="group">
                    <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-brand-dark/50 flex items-center gap-3">
                      <Wind className="w-3 h-3" />
                      Longevity
                    </h4>
                    <p className="text-sm font-sans opacity-80 font-light leading-relaxed group-hover:text-brand-dark transition-colors duration-500">
                      Micro-encapsulated essential oils offer a slow release,
                      ensuring garments maintain a soft scent footprint over 14
                      days of wear.
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-brand-dark/50 flex items-center gap-3">
                      <Droplet className="w-3 h-3" />
                      Application
                    </h4>
                    <p className="text-sm font-sans opacity-80 font-light leading-relaxed group-hover:text-brand-dark transition-colors duration-500">
                      High-efficiency (HE) compatible. Formulated perfectly for
                      delicate textiles such as silks, wools, and cashmere
                      knits.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn
                delay={0.8}
                className="flex flex-col sm:flex-row items-center sm:justify-between py-6 gap-6 sm:gap-10 mt-auto border-t border-brand-dark/10"
              >
                <div className="font-serif font-light text-[2.5rem] md:text-4xl text-brand-dark tracking-tight">
                  {product.price}
                </div>
                <button
                  className="group relative overflow-hidden text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-widest md:tracking-[0.25em] transition-all duration-700 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 w-[85%] sm:w-auto flex-1 "
                  style={{ backgroundColor: product.colorHex }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
                  <span className="relative flex items-center justify-center gap-4">
                    Acquire via Amazon{" "}
                    <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
              </FadeIn>

              <FadeIn delay={1.0}>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 pt-5">
                  {(product.tags && product.tags.length > 0
                    ? product.tags
                    : [
                        "25 Premium Washes",
                        "750ml",
                        product.size,
                        "HE Compatible",
                      ]
                  ).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center justify-center text-center border border-brand-dark/15 bg-white/60 backdrop-blur-sm px-3 py-2.5 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-dark/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative py-16 lg:py-32 bg-white/80 backdrop-blur-sm rounded-3xl md:rounded-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.02)] border-t border-brand-dark/5 mx-2 sm:mx-4 md:mx-10 my-10 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-brand-accent flex items-center gap-3">
                  <Sparkles className="w-3 h-3" /> Olfactory Composition
                </p>
                <h2 className="font-serif font-light text-[2.5rem] leading-[1.1] md:text-[4rem] lg:text-[5rem] text-brand-dark tracking-tighter">
                  The Scent Architecture
                </h2>
              </div>
              <p className="font-sans text-sm font-light text-brand-dark/60 max-w-sm leading-relaxed">
                A meticulous breakdown of the volatile compounds that define the
                chronological experience of {product.name}.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
            <div className="lg:col-span-6 space-y-12">
              {[
                {
                  title: "Top Notes",
                  notes: topNotes,
                  color: "text-brand-dark/80",
                  delay: 0.2,
                },
                {
                  title: "Heart Notes",
                  notes: heartNotes,
                  color: "text-brand-dark/90",
                  delay: 0.4,
                },
                {
                  title: "Base Notes",
                  notes: baseNotes,
                  color: "text-brand-dark",
                  delay: 0.6,
                },
              ].map((tier, idx) => (
                <FadeIn key={idx} delay={tier.delay} className="group relative">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/40 transition-colors group-hover:text-brand-dark">
                      {tier.title}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {tier.notes.map((note, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`font-serif text-2xl md:text-3xl tracking-tight ${tier.color} transition-all duration-300 group-hover:drop-shadow-sm cursor-default`}
                        >
                          {note}
                          {i < tier.notes.length - 1 && (
                            <span className="opacity-30 mx-2 font-sans font-light">
                              /
                            </span>
                          )}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8">
                    <RevealLine delay={tier.delay + 0.2} />
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="lg:col-span-6">
              <FadeIn
                delay={0.6}
                className="bg-brand-base/50 p-6 sm:p-10 md:p-14 rounded-[2rem] border border-brand-dark/5 relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-10 transition-opacity duration-1000 group-hover:opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, ${product.colorHex}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-serif font-light text-2xl text-brand-dark">
                      Intensity Analysis
                    </h3>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-brand-dark/40 border border-brand-dark/10 px-3 py-1 rounded-full">
                      Gas Chromatography
                    </span>
                  </div>

                  <div className="w-full h-[300px] relative">
                    <Radar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[90rem] mx-auto py-16 lg:py-32 px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-12 md:mb-24 flex flex-col items-center">
            <p className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-brand-accent flex items-center gap-4">
              <span className="w-12 h-[2px] bg-brand-accent/40"></span>
              The Engineering
              <span className="w-12 h-[2px] bg-brand-accent/40"></span>
            </p>
            <h2 className="font-serif font-bold text-[2.5rem] leading-[1.1] md:text-[4.5rem] lg:text-[5.5rem] text-brand-dark mb-10 tracking-tight">
              Beyond Conditioning
            </h2>
            <p className="font-sans text-brand-dark/70 font-light max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
              We&apos;ve re-imagined the molecular structure of fabric care to
              provide a sensorial experience that lasts long after the wash,
              preserving both fiber and memory.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {(product.techFeatures && product.techFeatures.length > 0
            ? product.techFeatures.map((tf, idx) => ({
                icon:
                  idx === 0 ? (
                    <Droplet className="w-8 h-8 stroke-[1.5]" />
                  ) : idx === 1 ? (
                    <Wind className="w-8 h-8 stroke-[1.5]" />
                  ) : (
                    <Leaf className="w-8 h-8 stroke-[1.5]" />
                  ),
                title: tf.title,
                desc: tf.desc,
              }))
            : [
                {
                  icon: <Droplet className="w-8 h-8 stroke-[1.5]" />,
                  title: "Haute Fragrance",
                  desc: "Perfume-grade essential oils built around a proper top, heart, base pyramid. Not a synthetic freshness — a considered scent that evolves on fabric over time.",
                },
                {
                  icon: <Wind className="w-8 h-8 stroke-[1.5]" />,
                  title: "Bio-Soft Technology",
                  desc: "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Breathable, true to hand, wash after wash.",
                },
                {
                  icon: <Leaf className="w-8 h-8 stroke-[1.5]" />,
                  title: "Fragrance Lock Technology",
                  desc: "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
                },
              ]
          ).map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_15px_40px_rgb(0,0,0,0.04)] border border-brand-dark/5 transition-transform duration-700 group-hover:-translate-y-3"></div>
                <div className="relative p-8 sm:p-12 lg:p-14 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-base text-brand-accent flex items-center justify-center mb-8 md:mb-10 relative">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-brand-accent/30 scale-110"
                      whileHover={{ scale: 1.25, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    {feature.icon}
                  </div>
                  <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-brand-dark mb-6">
                    {feature.title}
                  </h3>
                  <RevealLine delay={0.5 + idx * 0.1} />
                  <p className="font-sans font-medium text-base text-brand-dark opacity-70 leading-relaxed mt-8">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="w-full hidden relative h-[60vh] min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden rounded-[2rem] md:rounded-[3rem] max-w-[90rem] mx-2 md:mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.15)] mb-16 md:mb-32"
      >
        <div className="absolute inset-0 z-0 bg-brand-dark">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 25, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src="/handImg.jpg"
              alt="Crafted in Grasse"
              fill
              quality={100}
              unoptimized
              sizes="100vw"
              className="object-cover opacity-60 mix-blend-luminosity"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full text-center md:text-left mt-16 md:mt-0">
          <FadeIn>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-6 md:mb-8">
              Origin Story
            </p>
            <h2 className="text-white text-[3.5rem] leading-[0.9] sm:text-6xl md:text-7xl lg:text-[8rem] flex flex-col select-none tracking-tight font-serif font-bold mb-8 md:mb-12">
              <span className="opacity-95">THE </span>
              <span
                className="italic mt-2 md:mt-4 drop-shadow-2xl"
                style={{ color: product.colorHex }}
              >
                FORMULA
              </span>
            </h2>
            <RevealLine
              color="bg-white/40"
              className="max-w-[8rem] md:max-w-[10rem] mb-8 md:mb-12 mx-auto md:mx-0"
            />
            <p className="text-white/90 max-w-lg font-sans font-medium text-base md:text-lg leading-relaxed mx-auto md:mx-0 px-2 md:px-0">
              Each Drydown formulation is built around perfume-grade fragrance
              compounds — the same quality of raw materials used by fine
              fragrance houses. Designed in India. Made for the way you live.
            </p>
          </FadeIn>
        </div>
      </motion.section>

      <section className="border-y border-brand-dark/10 bg-white py-5 overflow-hidden">
        <div className="flex w-full overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 px-3">
            {[
              "Plant Based",
              "Biodegradable",
              "No Microplastics",
              "Residue Free",
              "HE Compatible",
              "Safe on Delicates",
              "Vegan",
              "Cruelty Free",
              "Plant Based",
              "Biodegradable",
              "No Microplastics",
              "Residue Free",
              "HE Compatible",
              "Safe on Delicates",
              "Vegan",
              "Cruelty Free",
            ].map((claim, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 border border-brand-dark/15 bg-brand-base/60 px-5 py-2.5 rounded-full font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark/70 whitespace-nowrap flex-shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: product.colorHex }}
                />
                {claim}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[90rem] mx-auto py-16 md:py-28 px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4 text-brand-accent flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-brand-accent/50" />
                The Ritual
              </p>
              <h2 className="font-serif font-light text-[2.5rem] leading-[1.05] md:text-[4rem] lg:text-[5rem] text-brand-dark tracking-tighter">
                How to Use
              </h2>
            </div>
            <p className="font-sans text-sm font-light text-brand-dark/55 max-w-sm leading-relaxed">
              Three simple steps. One lasting impression.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px border border-brand-dark/10 bg-brand-dark/10">
          {(product.howToUse && product.howToUse.length > 0
            ? product.howToUse
            : [
                {
                  step: "01",
                  heading: "Load & Wash",
                  body: "Load your wash and add your regular detergent as normal. No changes to your usual routine required.",
                },
                {
                  step: "02",
                  heading: `Add ${product.name}`,
                  body: `Pour one cap (30ml) of ${product.name} into the fabric softener compartment. Do not mix directly with detergent.`,
                },
                {
                  step: "03",
                  heading: "Wear the Scent",
                  body: "Wash, dry, and wear. Fragrance releases with every movement — all day, every wear.",
                },
              ]
          ).map((item, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="group relative bg-brand-base p-8 md:p-12 lg:p-16 flex flex-col h-full border-b md:border-b-0 border-brand-dark/10 hover:bg-white transition-colors duration-500">
                <span
                  className="font-serif text-[5rem] md:text-[6rem] leading-none font-light mb-6 select-none transition-colors duration-500"
                  style={{ color: `${product.colorHex}30` }}
                >
                  {item.step}
                </span>
                <div
                  className="w-8 h-[2px] mb-8 transition-all duration-500 group-hover:w-16"
                  style={{ backgroundColor: product.colorHex }}
                />
                <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-5 tracking-tight">
                  {item.heading}
                </h3>
                <p className="font-sans text-sm md:text-base text-brand-dark/60 font-light leading-relaxed flex-grow">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 border border-brand-dark/10 bg-white/50 backdrop-blur-sm px-6 py-5">
            <span
              className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap"
              style={{ color: product.colorHex }}
            >
              Pro Tip
            </span>
            <span className="font-sans text-xs md:text-sm text-brand-dark/65 font-light leading-relaxed">
              For intensified fragrance, use 1.5 caps. Compatible with
              front-load, top-load and hand wash.
            </span>
          </div>
        </FadeIn>
      </section>
      <section className="bg-white text-brand-dark py-20 px-6 overflow-hidden relative">
        <FadeIn className="max-w-[90rem] mx-auto text-center mb-16 pt-8">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4 text-brand-accent">
            Customer Reviews
          </p>
          <h3 className="font-serif font-light text-4xl md:text-5xl text-brand-dark tracking-tight mb-8">
            Word on the Street
          </h3>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="#C8A84B"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {(product.reviews && product.reviews.length > 0
            ? product.reviews
            : [
                {
                  author: product.review.author,
                  location: "India",
                  rating: 5,
                  date: "2026",
                  text: product.review.text,
                },
              ]
          ).map((review, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="flex flex-col h-full p-8 rounded-[1rem] transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden"
                style={{
                  backgroundColor: `${product.colorHex}08`,
                  border: `1px solid ${product.colorHex}20`,
                }}
              >
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <svg
                      key={s}
                      className="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="#C8A84B"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif text-lg text-brand-dark/80 leading-snug flex-grow mb-8 relative z-10 font-medium">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-4 flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">
                      {review.author}
                    </p>
                    {"location" in review && (
                      <p className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/40 mt-0.5">
                        {(review as { location: string }).location}
                      </p>
                    )}
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/40">
                    {review.date}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {otherProducts.length > 0 && (
        <section className="relative py-16 md:py-28 border-t border-brand-dark/10 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_70%)] pointer-events-none" />
          <div className="max-w-[90rem] mx-auto px-6">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-14">
                <div className="max-w-2xl">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.34em] text-brand-accent mb-4">
                    Other Products
                  </p>
                  <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-dark leading-[0.95] tracking-tight">
                    Not your scent? The collection has two more.
                  </h2>
                </div>
                <p className="font-sans text-brand-dark/65 text-sm md:text-base leading-relaxed max-w-xl">
                  Explore the rest of the collection through adjacent scent
                  worlds, each composed with its own mood, texture, and fabric
                  ritual.
                </p>
              </div>
            </FadeIn>

            <div className={`grid gap-8 ${otherProductsGridClass}`}>
              {otherProducts.map((item, index) => {
                const itemNotes = [
                  ...parseNoteList(item.topNotes, "Bergamot, Clary Sage").slice(
                    0,
                    1,
                  ),
                  ...parseNoteList(
                    item.heartNotes,
                    "French Lavender, Orris Root",
                  ).slice(0, 1),
                  ...parseNoteList(
                    item.baseNotes,
                    "Ash Wood, Tonka Bean",
                  ).slice(0, 1),
                ];

                return (
                  <FadeIn key={item.id} delay={index * 0.12}>
                    <Link
                      href={`/products/${item.id}`}
                      className="group grid h-full min-h-[260px] overflow-hidden rounded-[2rem] border border-brand-dark/10 bg-white/80 backdrop-blur-sm shadow-[0_24px_60px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] md:grid-cols-[220px_1fr]"
                    >
                      <div
                        className="relative min-h-[180px] sm:min-h-[220px] overflow-hidden md:min-h-full"
                        style={{ background: item.imgGradient }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/15" />
                        <div className="absolute left-5 top-5 z-10 rounded-full border border-white/20 bg-black/10 px-4 py-2 backdrop-blur-sm">
                          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
                            {item.colorName}
                          </span>
                        </div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
                          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.26em] text-brand-dark/40">
                            Archive Selection
                          </span>
                          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark/35 whitespace-nowrap">
                            {item.size}
                          </span>
                        </div>

                        <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-brand-dark">
                          {item.name}
                        </h3>
                        <p className="mt-3 line-clamp-2 font-sans text-sm leading-relaxed text-brand-dark/65">
                          {item.shortDesc}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {itemNotes.map((note) => (
                            <span
                              key={note}
                              className="rounded-full border border-brand-dark/10 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dark/55"
                            >
                              {note}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-brand-dark/10 pt-5">
                          <span className="font-serif text-2xl font-light text-brand-dark">
                            {item.price}
                          </span>
                          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-brand-dark flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
                            View Product{" "}
                            <MoveRight className="w-4 h-4" strokeWidth={1.25} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
