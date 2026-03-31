"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { products, type ProductProps } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Wind, Layers, Zap, MoveRight, Shield, Sparkles } from "lucide-react";

const sellingPoints = [
  {
    icon: Wind,
    title: "Extended Sillage",
    desc: "Proprietary encapsulation releases complex olfactory notes over 14 days of wear.",
  },
  {
    icon: Layers,
    title: "Textile Integrity",
    desc: "PH-neutral architecture relaxes fibers to prevent structural damage on delicate knits.",
  },
  {
    icon: Zap,
    title: "Concentrated Yield",
    desc: "Dense 750ml formulations providing up to 25 premium washes per vessel.",
  },
  {
    icon: Shield,
    title: "Color Preservation",
    desc: "Advanced anti-fade technology ensures darks and vibrants retain their saturation after every wash.",
  },
  {
    icon: Sparkles,
    title: "Botanical Softening",
    desc: "Plant-derived conditioning agents leave fabrics incredibly soft without artificial residues.",
  },
];

function useOnScreen(ref: React.RefObject<Element | null>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ProductCard = ({
  product,
  index,
}: {
  product: ProductProps;
  index: number;
}) => {
  return (
    <FadeIn delay={index * 200} className="h-full">
      <Link
        href={`/products/${product.id}`}
        className="group relative cursor-pointer flex flex-col h-full bg-[#f6f5ef] border border-transparent hover:border-[#e2ddce] transition-all duration-500"
      >
        <div className="aspect-square md:aspect-[4/5] w-full relative overflow-hidden bg-[#e8e4d8]/30">
          <div className="absolute inset-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={100}
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="p-6 md:p-8 flex-grow flex flex-col">
          <h3 className="text-3xl font-serif text-[#2a2824] mb-1 group-hover:text-brand-accent transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-serif italic text-[15px] text-[#716a5c] mb-8">
            {product.colorName}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl tracking-wide text-[#2a2824]">
              {product.price}
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#716a5c] flex items-center gap-2 transition-all duration-300 group-hover:gap-3 group-hover:text-[#2a2824]">
              Explore fragrance{" "}
              <MoveRight
                strokeWidth={1.5}
                className="w-4 h-4 opacity-70 group-hover:opacity-100"
              />
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};

const getPreviewNotes = (value?: string) =>
  (value || "")
    .split(",")
    .map((note) => note.trim())
    .filter(Boolean)
    .slice(0, 3);

const ArchivePanelCard = ({
  product,
  index,
}: {
  product: ProductProps;
  index: number;
}) => {
  const notes = [
    ...getPreviewNotes(product.topNotes).slice(0, 2),
    ...getPreviewNotes(product.baseNotes).slice(0, 1),
  ];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-dark/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)]"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ background: product.imgGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/10 px-4 py-2 backdrop-blur-sm">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
            Variant 02
          </span>
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-dark/40">
            {`0${index + 1}`}
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dark/35">
            {product.price}
          </span>
        </div>
        <h4 className="mt-4 font-serif text-3xl font-light tracking-tight text-brand-dark">
          {product.name}
        </h4>
        <p className="mt-3 font-sans text-sm leading-relaxed text-brand-dark/60">
          {product.shortDesc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-brand-dark/10 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dark/55"
            >
              {note}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-brand-dark/10 pt-6">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-dark/40">
            {product.colorName}
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-dark flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
            View Product <MoveRight strokeWidth={1.25} className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ArchiveFramedCard = ({
  product,
  index,
}: {
  product: ProductProps;
  index: number;
}) => {
  const notes = [
    ...getPreviewNotes(product.topNotes).slice(0, 1),
    ...getPreviewNotes(product.heartNotes).slice(0, 1),
    ...getPreviewNotes(product.baseNotes).slice(0, 1),
  ];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-brand-dark p-6 text-brand-base shadow-[0_24px_50px_rgba(0,0,0,0.12)]"
    >
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at top, ${product.colorHex}, transparent 65%)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-accent">
            Variant 03
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
            {`0${index + 1}`}
          </span>
        </div>

        <div
          className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
          style={{ background: product.imgGradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/20" />
          <div className="relative aspect-[3/4]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <h4 className="mt-6 font-serif text-3xl font-light tracking-tight text-white">
          {product.name}
        </h4>
        <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
          {product.shortDesc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {notes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75"
            >
              {note}
            </span>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="font-serif text-2xl font-light text-white">
            {product.price}
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
            Open Detail <MoveRight strokeWidth={1.25} className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes DRY DOWN different from regular fabric conditioner?",
      a: "DRY DOWN is a fine fragrance fabric conditioner. We use plant-based enzymes and organic conditioning agents instead of harsh chemical surfactants. Our scents are developed with perfume-grade essential oils, delivering luxury fragrance that lasts up to two weeks on fabric.",
    },
    {
      q: "Is it safe for silk, wool, and cashmere?",
      a: "Yes. Our formulations are perfectly balanced to treat delicate fabrics without stripping their natural fibres. We recommend a gentle cycle for all intimates and luxury knits.",
    },
    {
      q: "How long does the fragrance last on clothes?",
      a: "Our encapsulated oils lock into the fabric weave rather than evaporating after drying. The scent releases with every movement and can linger for up to two weeks — even in storage.",
    },
    {
      q: "Is DRY DOWN environmentally friendly?",
      a: "100%. Our formulas are fully biodegradable, free of microplastics, parabens, and artificial dyes. We source botanical ingredients sustainably and package in recycled polymer.",
    },
    {
      q: "How do I make my clothes smell amazing after every wash?",
      a: "Add one capful of DRYDOWN to the fabric conditioner compartment along with your regular detergent. The fragrance oils activate during the rinse cycle and infuse into every fibre.",
    },
    {
      q: "Can I use DRYDOWN for hand washing?",
      a: "Absolutely. Add one capful to approximately 5 litres of water, soak garments for 5 minutes, and there's no need for an extra rinse.",
    },
  ];

  const labRef = useRef<HTMLElement>(null);
  const { scrollYProgress: labProgress } = useScroll({
    target: labRef,
    offset: ["start end", "end start"],
  });
  const labImageY = useTransform(labProgress, [0, 1], ["-20%", "20%"]);
  const labImageScale = useTransform(labProgress, [0, 1], [1, 1.15]);

  return (
    <div className="bg-brand-base text-brand-dark w-full overflow-x-hidden">
      <section className="relative h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center overflow-hidden bg-brand-base">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero1.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none text-white">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="z-10 text-center px-4 fade-in">
          <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent drop-shadow-sm">
            Est. 2026 &bull; Global
          </p>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] md:text-[6rem] lg:text-[8rem] xl:text-9xl font-bold text-white mb-6 md:leading-none">
            Clothes that smell like intention.
            <br />
          </h1>
          <p className="font-sans text-white/90 max-w-lg mx-auto mb-10 text-lg leading-relaxed font-medium">
            Haute fragrance. Engineered into every fibre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#collection"
              className="border-2 border-white text-white px-8 py-4 rounded-none font-sans font-bold uppercase tracking-wider hover:bg-white hover:text-brand-dark transition-colors text-xs text-center"
            >
              Explore Scents
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white py-12 md:py-16 overflow-hidden flex flex-col items-center">
        <div className="flex w-full overflow-hidden group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
            {[
              ...sellingPoints,
              ...sellingPoints,
              ...sellingPoints,
              ...sellingPoints,
            ].map((point, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center w-[280px] md:w-[400px] px-4 md:px-8 flex-shrink-0"
              >
                <point.icon
                  strokeWidth={1}
                  className="w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 text-neutral-400 transition-transform duration-500 hover:scale-110 hover:text-brand-dark"
                />
                <h4 className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3 md:mb-4 text-neutral-800 whitespace-normal">
                  {point.title}
                </h4>
                <p className="font-sans text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-[200px] md:max-w-[250px] mx-auto whitespace-normal">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="py-20 md:py-40 px-6 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
              <div className="max-w-2xl">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-neutral-400">
                  Variant 1
                </h3>
                <h2 className="text-[2.5rem] leading-[1.1] md:text-5xl lg:text-6xl font-serif font-light mb-8 tracking-tight">
                  Choose your scent world.
                </h2>
                <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed">
                  Fine fragrance for your laundry. Give your load a concentrated
                  boost of fine fragrance that lasts long after the wash and dry
                  cycle.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {products.map((product, index) => (
              <ProductCard key={product.id} index={index} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={labRef}
        className="py-16 md:py-32 bg-brand-base overflow-hidden border-t border-brand-dark/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 text-brand-accent">
                The Laboratory
              </p>
              <h2 className="font-serif font-bold text-[3rem] leading-[1.1] md:text-6xl lg:text-7xl text-brand-dark mb-8 md:leading-tight">
                Modern Alchemy.
              </h2>
              <div className="font-sans text-brand-dark opacity-80 leading-relaxed mb-12 text-base md:text-lg max-w-lg space-y-3">
                <p>
                  <b>
                    We built Dry Down on a simple idea: your clothes should
                    carry scent, not lose it.
                  </b>
                </p>
                <p>
                  Clothing holds fragrance longer, deeper, and closer than skin
                  ever can.
                </p>
                <p>
                  Yet for decades, it was treated as an afterthought. Reduced to
                  synthetic freshness that fades within hours.
                </p>
                <p>
                  <b>We changed that.</b>
                </p>
                <p>Dry Down brings fine fragrance into fabric.</p>
                <p>
                  Each formula is built like perfume. Layered, evolving, and
                  designed to stay.
                </p>
                <p>
                  Encapsulated scent bonds to fibre and releases with movement,
                  long after the wash is done.
                </p>
                <p>
                  Beneath it, a plant-based conditioning base softens without
                  residue, preserving the integrity of every garment.
                </p>
                <p>
                  <b>
                    The result is clothing that doesn&apos;t just look
                    considered. It smells it.
                  </b>
                </p>
              </div>
              <div className="relative block lg:hidden w-full h-[400px] shadow-2xl rounded-tr-3xl rounded-bl-3xl overflow-hidden border border-brand-dark/10">
                <Image
                  src="/img6.png"
                  className="w-full  h-full object-cover filter brightness-90"
                  alt="Laboratory Details"
                  fill
                  sizes="(max-width: 768px) 75vw, 384px"
                />
              </div>
            </div>

            <div className="relative hidden lg:block h-[400px] md:h-[700px] w-full rounded-t-[100px] rounded-b-[100px] md:rounded-t-full md:rounded-b-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-brand-dark/5">
              <motion.div
                className="absolute inset-0 w-full h-[140%]"
                style={{ y: labImageY, scale: labImageScale }}
              >
                <Image
                  src="/img7.png"
                  className="w-full h-full object-cover filter contrast-[1.1]"
                  alt="Innovation Process"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

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

      <section className="py-20 md:py-40 bg-brand-dark text-brand-base relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale mix-blend-overlay"
          >
            <source src="/hero2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center drop-shadow-lg">
          <h2 className="font-serif text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl mb-8 italic">
            &quot;We believe the scent of your clothes is your second
            skin.&quot;
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-8"></div>
          <p className="font-sans text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Traditional detergents strip fabrics and leave artificial residues.
            DRY DOWN feeds the fiber using plant-based enzymes and infuses them
            with oils sourced from fine perfumeries.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-accent text-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <h3 className="font-serif text-4xl md:text-5xl">
            Word on the Street
          </h3>
          <div className="text-3xl hidden md:block">&#10022;</div>
        </div>
        <div className="flex overflow-x-auto pb-8 gap-8 px-6 no-scrollbar snap-x">
          {[
            {
              user: "Priya S.",
              text: "The Burnt Sugar is addictive. I do laundry just to smell it.",
            },
            {
              user: "Vikram N.",
              text: "Washing my sheets with Acid Bloom is akin to opening a window in a high-end botanical garden.",
            },
            {
              user: "Ananya R.",
              text: "My cashmere sweaters have never felt or smelled more luxurious. Every wear feels like an occasion.",
            },
            {
              user: "Arjun M.",
              text: "A serene, quiet luxury. It doesn't shout; it gently hums around you all day.",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[400px] bg-white p-10 shadow-lg snap-center flex-shrink-0 border-2 border-brand-dark"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="#C8A84B"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-brand-accent text-5xl mb-4 font-serif leading-none">
                &ldquo;
              </div>
              <p className="font-serif text-xl md:text-2xl mb-8 leading-snug">
                {r.text}
              </p>
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest border-t border-gray-200 pt-6 opacity-60">
                &mdash; {r.user}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="py-16 md:py-32 bg-brand-base border-t border-brand-dark/10"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 flex flex-col items-start">
              <p className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-brand-accent">
                Inquiries
              </p>
              <h2 className="font-serif text-[2.5rem] leading-[1.1] md:text-5xl lg:text-6xl text-brand-dark md:leading-tight sticky top-32">
                Frequently Asked
                <br />
                Questions
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col border-t-2 border-brand-dark">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-brand-dark/20 py-8">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left group focus:outline-none"
                  >
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-dark group-hover:text-brand-accent transition-colors pr-8">
                      {faq.q}
                    </h3>
                    <span
                      className="text-4xl font-light text-brand-dark/50 group-hover:text-brand-accent transition-transform duration-500"
                      style={{
                        transform:
                          openFaq === idx ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === idx ? "auto" : 0,
                      opacity: openFaq === idx ? 1 : 0,
                    }}
                    className="overflow-hidden"
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <p className="font-sans text-brand-dark/70 leading-relaxed text-lg pt-6 max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-base overflow-hidden flex items-center justify-center border-t border-brand-dark/10 mb-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row bg-[#151515] overflow-hidden shadow-2xl relative border border-white/10">
            <div className="w-full md:w-5/12 relative h-[300px] md:h-auto hidden md:block">
              <Image
                src="/img5.png"
                alt="Unlock the Ritual"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-[1.2] grayscale"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-brand-accent mix-blend-multiply opacity-10"></div>
            </div>

            <div className="w-full md:w-7/12 p-10 md:p-24 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>

              <div className="relative z-10">
                <div className="w-12 hidden lg:flex h-12 mb-8 items-center justify-center text-3xl text-brand-accent">
                  &#10022;
                </div>
                <p className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 text-brand-accent">
                  The Inner Circle
                </p>
                <h2 className="font-serif text-[2.5rem] leading-[1.1] md:text-5xl lg:text-6xl text-white mb-6 md:leading-tight drop-shadow-sm">
                  Be the First to Know.
                </h2>
                <p className="font-sans text-white/60 mb-12 text-base md:text-lg leading-relaxed max-w-md font-light">
                  New scents. Limited editions. Members-only drops. Get first
                  access before anyone else.
                </p>

                <form
                  className="relative w-full flex flex-col gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      "Success!\n\nNote: Since this is a frontend-only project without a database, we cannot actually store this email right now.",
                    );
                  }}
                >
                  <div className="relative border-b border-white/20 pb-3 group">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      required
                      className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none font-sans text-lg tracking-wide"
                    />
                    <div className="absolute inset-x-0 bottom-[-1px] h-[1px] bg-brand-accent transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left duration-500"></div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full md:w-auto self-start bg-brand-accent text-brand-dark md:px-12 px-6 py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                  >
                    JOIN WAITLIST
                  </button>
                </form>

                <p className="font-sans text-[10px] text-white/30 mt-10 tracking-widest uppercase">
                  Fine print: No spam — just early access to limited drops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
