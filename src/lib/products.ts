export type ReviewItem = {
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
};

export type TechFeature = {
  title: string;
  desc: string;
};

export type HowToUseStep = {
  step: string;
  heading: string;
  body: string;
};

export type ProductProps = {
  id: string;
  name: string;
  price: string;
  colorHex: string;
  colorName: string;
  description: string;
  shortDesc: string;
  size: string;
  features: string[];
  pros: string[];
  cons: string[];
  review: { text: string; author: string };
  bgColor: string;
  textColor: string;
  imageUrl: string;
  image: string;
  /** Ordered list of images shown in the hero carousel (main first) */
  galleryImages: string[];
  notes: number[];
  imgGradient: string;
  topNotes?: string;
  topNotesDesc?: string;
  heartNotes?: string;
  heartNotesDesc?: string;
  baseNotes?: string;
  baseNotesDesc?: string;
  fact1?: string;
  fact1Desc?: string;
  fact2?: string;
  fact2Desc?: string;
  fact3?: string;
  fact3Desc?: string;
  /** Per-product technology cards shown in the "Beyond Conditioning" section */
  techFeatures: TechFeature[];
  /** Per-product how-to-use steps */
  howToUse: HowToUseStep[];
  /** Per-product reviews shown in the reviews section */
  reviews: ReviewItem[];
  /** Quick-tag pills shown beneath the CTA button */
  tags: string[];
};

export const products: ProductProps[] = [
  {
    id: "burnt-sugar",
    name: "Burnt Sugar",
    price: "₹599.00",
    colorHex: "#6f2a33",
    colorName: "Warm. Gourmand. Intense.",
    shortDesc: "A dark, rich ode to gourmand warmth and toasted vanilla.",
    description:
      "Burnt Sugar is warm, indulgent, and impossible to ignore. Caramel and vanilla melt into soft musk, creating a scent that settles into fabric and unfolds through the day. Built like a gourmand perfume, it wraps your clothes in a softness that feels rich yet balanced, leaving behind a trail that stays with you.",
    size: "NET QTY 750 ML",
    features: ["Deep Care", "Clean Wear", "Lasting Scent", "25 Premium Washes"],
    pros: [
      "Incredibly rich, mood-elevating fragrance",
      "Makes wools and knits feel exceptionally soft",
      "Fine Fragrance quality",
    ],
    cons: [
      "Scent might be too intense for some",
      "Best reserved for colder weather garments",
    ],
    review: {
      text: "My cashmere sweaters have never felt or smelled more luxurious. Every wear feels like an occasion.",
      author: "Priya S.",
    },
    bgColor: "bg-[#6f2a33]",
    textColor: "text-[#F5F2EB]",
    imageUrl: "/img1.png",
    image: "/burnt-sugar-c1.png",
    galleryImages: [
      "/burnt-sugar-c1.png",
      "/burnt-sugar-c2.png",
      "/burnt-sugar-c3.png",
      "/burnt-sugar-c4.png",
      "/burnt-sugar-c5.png",
    ],
    notes: [80, 20, 10, 95, 60],
    imgGradient: "linear-gradient(135deg, #6f2a33 0%, #3a151b 100%)",
    topNotes: "Blood Mandarin · Spun Sugar · Crisp Apple",
    topNotesDesc: "bright, citrus-led, the first impression",
    heartNotes: "Sambac Jasmine · Dark Plum · Creamy Gardenia",
    heartNotesDesc: "dark, velvety, where the warmth begins",
    baseNotes: "Melted Vanilla · Skin Musks · Precious Woods",
    baseNotesDesc: "skin-close, addictive, what people remember",
    fact1: "Haute Fragrance",
    fact1Desc:
      "Perfume-grade essential oils built around a proper top, heart, base pyramid. Not a synthetic freshness — a considered scent that evolves on fabric over time.",
    fact2: "Bio-Soft Technology",
    fact2Desc:
      "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Breathable, true to hand, wash after wash.",
    fact3: "Fragrance Lock Technology",
    fact3Desc:
      "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
    techFeatures: [
      {
        title: "Haute Fragrance",
        desc: "Perfume-grade essential oils built around a proper top, heart, base pyramid. Not a synthetic freshness — a considered scent that evolves on fabric over time.",
      },
      {
        title: "Bio-Soft Technology",
        desc: "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Breathable, true to hand, wash after wash.",
      },
      {
        title: "Fragrance Lock Technology",
        desc: "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
      },
    ],
    howToUse: [
      {
        step: "01",
        heading: "Load & Wash",
        body: "Load your wash and add your regular detergent as normal. No changes to your usual routine required.",
      },
      {
        step: "02",
        heading: "Add Burnt Sugar",
        body: "Pour one cap (30ml) of Burnt Sugar into the fabric softener compartment. Do not mix directly with detergent.",
      },
      {
        step: "03",
        heading: "Wear the Scent",
        body: "Wash, dry, and wear. The dark, gourmand warmth releases with every movement — all day, every wear.",
      },
    ],
    reviews: [
      {
        author: "Priya S.",
        location: "Bangalore",
        rating: 5,
        date: "March 2026",
        text: "My cashmere sweaters have never felt or smelled more luxurious. Every wear feels like an occasion.",
      },
      {
        author: "Arjun M.",
        location: "Mumbai",
        rating: 5,
        date: "February 2026",
        text: "Burnt Sugar is addictive. I do laundry just to smell it. Never going back to regular conditioner.",
      },
      {
        author: "Ananya R.",
        location: "Delhi",
        rating: 5,
        date: "March 2026",
        text: "The vanilla and plum dry-down is extraordinary. My woollens feel transformed — soft, scented, luxurious.",
      },
    ],
    tags: ["25 Premium Washes", "750ml", "Fall / Winter", "HE Compatible"],
  },
  {
    id: "acid-bloom",
    name: "Acid Bloom",
    price: "₹599.00",
    colorHex: "#4c7c42",
    colorName: "Vibrant Green Flora",
    shortDesc:
      "Electric, modern green florals for a revitalizing rush of spring urgency.",
    description:
      "Acid Bloom is fresh, luminous, and quietly energising. Bright citrus opens into green, living notes, settling into a soft floral heart that feels clean without being sharp. Designed to stay light yet present, it gives your clothes a crisp, effortless freshness that lasts through the day.",
    size: "NET QTY 750 ML",
    features: ["Deep Care", "Clean Wear", "Lasting Scent", "25 Premium Washes"],
    pros: [
      "Instantly refreshing on bed sheets",
      "Brightens the mood of any outfit",
      "Fine Fragrance quality",
    ],
    cons: [
      "Not a traditional 'cozy' scent",
      "Can clash with some personal perfumes",
    ],
    review: {
      text: "Washing my sheets with Acid Bloom is akin to opening a window in a high-end botanical garden.",
      author: "Alexander V.",
    },
    bgColor: "bg-[#4c7c42]",
    textColor: "text-[#F5F2EB]",
    imageUrl: "/img2.png",
    image: "/acid-bloom-c1.png",
    galleryImages: [
      "/acid-bloom-c1.png",
      "/acid-bloom-c2.png",
      "/acid-bloom-c3.png",
      "/acid-bloom-c4.png",
      "/acid-bloom-c5.png",
    ],
    notes: [15, 95, 90, 30, 10],
    imgGradient: "linear-gradient(135deg, #4c7c42 0%, #294723 100%)",
    topNotes: "Crisp Apple · Green Leaves · Galbanum",
    topNotesDesc: "sharp, tart-green, electric opening",
    heartNotes: "Dewy Peony · Jasmine · Water Lily",
    heartNotesDesc: "fresh-floral, dewy, just-rained-on",
    baseNotes: "White Woods · Clean Musk · Vetiver",
    baseNotesDesc: "airy, skin-close, modern and clean",
    fact1: "Haute Fragrance",
    fact1Desc:
      "A modern green-floral accord built on perfume-grade raw materials. The tartness is deliberate — designed to bloom and soften as it dries on fabric.",
    fact2: "Bio-Soft Technology",
    fact2Desc:
      "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Breathable, true to hand, wash after wash.",
    fact3: "Fragrance Lock Technology",
    fact3Desc:
      "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
    techFeatures: [
      {
        title: "Haute Fragrance",
        desc: "A modern green-floral accord built on perfume-grade raw materials. The tartness is deliberate — designed to bloom and soften as it dries on fabric.",
      },
      {
        title: "Bio-Soft Technology",
        desc: "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Breathable, true to hand, wash after wash.",
      },
      {
        title: "Fragrance Lock Technology",
        desc: "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
      },
    ],
    howToUse: [
      {
        step: "01",
        heading: "Load & Wash",
        body: "Load your wash and add your regular detergent as normal. No changes to your usual routine required.",
      },
      {
        step: "02",
        heading: "Add Acid Bloom",
        body: "Pour one cap (30ml) of Acid Bloom into the fabric softener compartment. Do not mix directly with detergent.",
      },
      {
        step: "03",
        heading: "Wear the Scent",
        body: "Wash, dry, and wear. The electric green-floral freshness releases with every movement — all day, every wear.",
      },
    ],
    reviews: [
      {
        author: "Vikram N.",
        location: "Pune",
        rating: 5,
        date: "March 2026",
        text: "Washing my sheets with Acid Bloom is like opening a window in a high-end botanical garden. Absolutely refreshing.",
      },
      {
        author: "Priya S.",
        location: "Bangalore",
        rating: 5,
        date: "February 2026",
        text: "My linen shirts smell incredible. The green, fresh quality is unlike anything I've used before in fabric care.",
      },
      {
        author: "Arjun M.",
        location: "Mumbai",
        rating: 5,
        date: "January 2026",
        text: "The name is perfect — it really does bloom on the fabric. Light, energising, and incredibly modern.",
      },
    ],
    tags: ["25 Premium Washes", "750ml", "Spring / Summer", "HE Compatible"],
  },
  {
    id: "pale-ash",
    name: "Pale Ash",
    price: "₹599.00",
    colorHex: "#6d5f83",
    colorName: "Ethereal Lavender Dust",
    shortDesc:
      "A whisper of muted lavender, soft woods, and delicate powdery elegance.",
    description:
      "Pale Ash is soft, airy, and deeply calming. Lavender and iris rest on a smooth woody base, creating a scent that feels light, clean, and composed. It lingers gently on fabric, never overpowering, leaving behind a quiet, comforting trail that stays close.",
    size: "NET QTY 750 ML",
    features: ["Deep Care", "Clean Wear", "Lasting Scent", "25 Premium Washes"],
    pros: [
      "Very gentle, non-overpowering",
      "Ideal for sensitive skin",
      "Fine Fragrance quality",
    ],
    cons: [
      "Scent trail is intentionally subtle",
      "Not recommended for heavily soiled items",
    ],
    review: {
      text: "A serene, quiet luxury. It doesn't shout; it gently hums around you all day.",
      author: "M. Chen",
    },
    bgColor: "bg-[#6d5f83]",
    textColor: "text-[#F5F2EB]",
    imageUrl: "/img3.png",
    image: "/pale-ash-c1.png",
    galleryImages: [
      "/pale-ash-c1.png",
      "/pale-ash-c2.png",
      "/pale-ash-c3.png",
      "/pale-ash-c4.png",
      "/pale-ash-c5.png",
    ],
    notes: [45, 75, 50, 20, 10],
    imgGradient: "linear-gradient(135deg, #6d5f83 0%, #3e364c 100%)",
    topNotes: "Bergamot · Clary Sage · Violet Leaf",
    topNotesDesc: "soft, herbal-citrus, quietly luminous",
    heartNotes: "French Lavender · Orris Root · Iris",
    heartNotesDesc: "powdery, cool-floral, deeply calming",
    baseNotes: "Ash Wood · Tonka Bean · White Musk",
    baseNotesDesc: "dry, earthy-warm, a barely-there trail",
    fact1: "Haute Fragrance",
    fact1Desc:
      "Lavender absolute and orris root accord anchored on a whisper of ash wood and tonka. Designed for restraint — for the person who wears scent like a second skin.",
    fact2: "Bio-Soft Technology",
    fact2Desc:
      "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Especially gentle on silks and delicate intimates.",
    fact3: "Fragrance Lock Technology",
    fact3Desc:
      "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
    techFeatures: [
      {
        title: "Haute Fragrance",
        desc: "Lavender absolute and orris root accord anchored on a whisper of ash wood and tonka. Designed for restraint — for the person who wears scent like a second skin.",
      },
      {
        title: "Bio-Soft Technology",
        desc: "Plant-based cationic surfactants smooth the fibre cuticle, creating softness without silicone residue. Especially gentle on silks and delicate intimates.",
      },
      {
        title: "Fragrance Lock Technology",
        desc: "Polymer microcapsules bond to fabric during the rinse cycle and rupture with movement and heat. Fragrance releases continuously — not just when clothes come out of the dryer.",
      },
    ],
    howToUse: [
      {
        step: "01",
        heading: "Load & Wash",
        body: "Load your wash and add your regular detergent as normal. Pale Ash is safe for all fabric types including delicates.",
      },
      {
        step: "02",
        heading: "Add Pale Ash",
        body: "Pour one cap (30ml) of Pale Ash into the fabric softener compartment. Do not mix directly with detergent.",
      },
      {
        step: "03",
        heading: "Wear the Scent",
        body: "Wash, dry, and wear. The soft, powdery lavender releases gently with every movement — quiet luxury, all day long.",
      },
    ],
    reviews: [
      {
        author: "Ananya R.",
        location: "Delhi",
        rating: 5,
        date: "March 2026",
        text: "A serene, quiet luxury. It doesn't shout; it gently hums around you all day. Incredible on silk.",
      },
      {
        author: "Priya S.",
        location: "Bangalore",
        rating: 5,
        date: "February 2026",
        text: "The most understated, beautiful laundry scent I've ever encountered. My silk blouses feel like a second skin.",
      },
      {
        author: "Vikram N.",
        location: "Hyderabad",
        rating: 5,
        date: "January 2026",
        text: "Pale Ash is the scent equivalent of a perfectly pressed linen shirt. Effortless, refined, unforgettable.",
      },
    ],
    tags: ["25 Premium Washes", "750ml", "All Season", "HE Compatible"],
  },
];
