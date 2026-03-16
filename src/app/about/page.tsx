"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Instagram, Youtube } from "lucide-react";
import React, { useRef } from "react";

type ProfileStory = {
  name: string;
  inspiration: string;
  notes: string[];
  image: string;
  overlay: string;
};

const profileStories: ProfileStory[] = [
  {
    name: "Burnt Sugar",
    inspiration:
      "Inspired by late-evening warmth: toasted sweetness, amber shadows, and plush knit textures after a long day.",
    notes: ["Toasted macadamia", "Caramelized sugar", "Vanilla musk"],
    image: "/img3.png",
    overlay: "linear-gradient(180deg, rgba(111,42,51,0.08) 0%, rgba(111,42,51,0.8) 100%)",
  },
  {
    name: "Acid Bloom",
    inspiration:
      "Inspired by daylight energy: crisp greens, dewy petals, and the sharp freshness of just-dried cotton.",
    notes: ["Green leaves", "Dewy peony", "White woods"],
    image: "/img4.png",
    overlay: "linear-gradient(180deg, rgba(76,124,66,0.08) 0%, rgba(41,71,35,0.82) 100%)",
  },
  {
    name: "Pale Ash",
    inspiration:
      "Inspired by quiet interiors: airy lavender, soft powder, and light woods that sit close to the skin.",
    notes: ["Bergamot", "French lavender", "Ash wood"],
    image: "/img6.png",
    overlay: "linear-gradient(180deg, rgba(109,95,131,0.08) 0%, rgba(62,54,76,0.84) 100%)",
  },
];

const socialCards = [
  {
    image: "/img5.png",
    caption: "A soft cloud of fragrance moving through linen and light.",
    tag: "#SensoryLaundry",
  },
  {
    image: "/img7.png",
    caption: "Ingredient-led worlds inspired by citrus, florals, and vanilla warmth.",
    tag: "#DryDownRitual",
  },
  {
    image: "/img2.png",
    caption: "Cinematic wash moments that feel quiet, fresh, and tactile.",
    tag: "#FragranceFirst",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: Youtube,
  },
  {
    label: "View Collection",
    href: "/#collection",
    icon: ExternalLink,
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const ritualVideoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <div
      className="bg-brand-base text-brand-dark w-full overflow-x-hidden"
      ref={containerRef}
    >
      <section className="relative min-h-[92vh] border-b border-brand-dark/10 overflow-hidden flex items-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero2.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/65 via-brand-dark/55 to-brand-dark/80" />

        <motion.div
          style={{ y: fogY }}
          className="absolute -left-20 top-20 w-[340px] h-[340px] rounded-full bg-brand-accent/20 blur-[90px]"
        />
        <motion.div
          style={{ y: fogY }}
          className="absolute right-[-100px] bottom-[-80px] w-[360px] h-[360px] rounded-full bg-white/15 blur-[110px]"
        />

        <div className="relative z-10 px-6 max-w-6xl mx-auto py-24 text-white">
          <Link
            href="/"
            className="inline-flex items-center text-[10px] font-sans font-bold tracking-[0.34em] uppercase text-white/80 hover:text-brand-accent transition-colors mb-10"
          >
            <ArrowLeft className="mr-3 h-4 w-4" /> Back Home
          </Link>

          <p className="font-sans font-bold text-xs uppercase tracking-[0.38em] text-brand-accent mb-6">
            About Dry Down
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
            Fragrance-first fabric care, told as a living story.
          </h1>
          <p className="font-sans text-base md:text-xl text-white/85 max-w-3xl mt-8 leading-relaxed">
            Dry Down began with one belief: laundry deserves the emotional depth
            of fine fragrance. We build every formula around scent character,
            then engineer textile care around it.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
            {[
              "Flowing fabrics and fragrance particles as visual language",
              "Ingredient-inspired scenes with citrus, floral, and vanilla tones",
              "Cinematic softness, freshness, and warmth in every frame",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-5 text-sm font-sans leading-relaxed"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-brand-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-5">
              The Idea Behind Dry Down
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
              We flipped the formula:
              <br />
              scent identity first, wash performance always.
            </h2>
            <p className="font-sans text-brand-dark/80 text-lg leading-relaxed mb-6 max-w-3xl">
              Most laundry products begin with cleaning chemistry and treat
              fragrance as an afterthought. Dry Down starts at the opposite end.
              We sketch each scent profile like a perfume house, then pair it
              with plant-led conditioning technology that protects fiber life.
            </p>
            <p className="font-sans text-brand-dark/70 text-base leading-relaxed max-w-3xl">
              The result is a new category experience: garments that feel soft,
              smell layered, and carry a quiet signature from wash to wear.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-white border border-brand-dark/10 p-8 md:p-10 shadow-xl"
          >
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
              Brand Principle
            </p>
            <p className="font-serif text-3xl md:text-4xl leading-snug mb-8">
              Laundry can be a sensory ritual, not a repetitive task.
            </p>
            <div className="space-y-4">
              {[
                "Fragrance architecture inspired by fine perfumery",
                "Softness and fiber care built into every formulation",
                "A premium ritual designed for daily life",
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="font-sans text-sm text-brand-dark/75 border-l-2 border-brand-accent pl-4 py-1"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-brand-dark text-brand-base border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.34em] text-brand-accent mb-4">
              Fragrance Profile Inspiration
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Three scent worlds.
              <br />
              Three emotional atmospheres.
            </h2>
            <p className="font-sans text-brand-base/75 text-lg leading-relaxed">
              Every profile is developed as an atmosphere first, then translated
              into fabric care performance. Notes are chosen to evoke memory,
              mood, and texture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {profileStories.map((story, idx) => (
              <motion.article
                key={story.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative min-h-[520px] overflow-hidden border border-white/20"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: story.overlay }} />

                <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-3">
                    {story.name}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-white/90 mb-5">
                    {story.inspiration}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {story.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] uppercase tracking-[0.24em] font-sans font-bold px-3 py-2 border border-white/30 bg-black/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 border-b border-brand-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            style={{ y: ritualVideoY }}
            className="lg:col-span-6 h-[460px] md:h-[620px] rounded-t-[120px] rounded-b-[120px] overflow-hidden shadow-2xl border border-brand-dark/10"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero3.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="lg:col-span-6">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-brand-accent mb-4">
              Laundry as Sensory Ritual
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
              We choreograph how care should feel, not only how it should clean.
            </h2>
            <p className="font-sans text-brand-dark/75 text-lg leading-relaxed mb-10">
              Our storytelling uses AI-generated visuals and cinematic motion to
              translate invisible scent into visible emotion. Flowing fabrics,
              suspended fragrance particles, and note-inspired environments make
              each wash cycle feel intentional.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Softness",
                  text: "Cloud-like movement and warm gradients for comfort-forward notes.",
                },
                {
                  title: "Freshness",
                  text: "Crisp light, airy texture, and green accents inspired by citrus and leaves.",
                },
                {
                  title: "Warmth",
                  text: "Amber and vanilla atmospheres that suggest depth, calm, and intimacy.",
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="bg-white border border-brand-dark/10 px-5 py-4 shadow-sm"
                >
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accent mb-2">
                    {block.title}
                  </p>
                  <p className="font-sans text-sm text-brand-dark/75 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-brand-dark text-brand-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.36em] text-brand-accent mb-4">
                Social Feed
              </p>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Follow the ritual in motion.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-brand-accent text-brand-accent px-5 py-3 text-[11px] uppercase tracking-[0.24em] font-sans font-bold hover:bg-brand-accent hover:text-brand-dark transition-colors"
            >
              Open Instagram <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {socialCards.map((card, idx) => (
              <motion.a
                key={card.caption}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group border border-white/20 overflow-hidden bg-white/5"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.tag}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-accent font-bold mb-3">
                    {card.tag}
                  </p>
                  <p className="font-sans text-sm text-white/85 leading-relaxed">
                    {card.caption}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");

              if (isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-[11px] uppercase tracking-[0.24em] font-sans font-bold hover:border-brand-accent hover:text-brand-accent transition-colors"
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-[11px] uppercase tracking-[0.24em] font-sans font-bold hover:border-brand-accent hover:text-brand-accent transition-colors"
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
