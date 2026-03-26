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
};

export const products: ProductProps[] = [
  /*
  {
    id: "starter",
    name: "Discovery Edition",
    price: "₹85.00",
    colorHex: "#D4AF37",
    colorName: "Discovery Collection",
    shortDesc:
      "Experience all four signature scents beautifully boxed. A perfect introduction to Dry Down.",
    description:
      "The Dry Down Discovery Edition is a masterclass in garment care. Four bespoke fabric conditioners designed to soften, protect, and delicately scent your most treasured wardrobes. Featuring Burnt Sugar, Acid Bloom, Pale Ash, and Butter Petal in a premium presentation box.",
    size: "4 x 100 ML",
    features: [
      "Deep Care",
      "Clean Wear",
      "Lasting Scent",
      "Fine Fragrance Formulation",
    ],
    pros: [
      "Ideal way to test all scents",
      "Perfect luxury gift item",
      "Premium presentation box",
    ],
    cons: [
      "Includes smaller sample sizes",
      "High demand item, often waitlisted",
    ],
    review: {
      text: "The presentation alone blew me away, but the scents are pure alchemy. Never returning to standard laundry care.",
      author: "E. Montgomery",
    },
    bgColor: "bg-brand-base",
    textColor: "text-brand-dark",
    imageUrl: "/main.webp",
    image: "/main.webp",
    notes: [], // No notes for starter pack
    imgGradient:
      "linear-gradient(45deg, #1C1C1C 25%, #6f2a33 50%, #4c7c42 75%, #F5F2EB 100%)",
  },
  */
  {
    id: "burnt-sugar",
    name: "Burnt Sugar",
    price: "₹599.00",
    colorHex: "#6f2a33",
    colorName: "Warm. Gourmand. Intense.",
    shortDesc: "A dark, rich ode to gourmand warmth and toasted vanilla.",
    description:
      "Some scents are forgettable. Burnt Sugar is not. A deeply gourmand fragrance that opens with the brightness of Blood Mandarin and Spun Sugar, softens into Sambac Jasmine and Dark Plum, and settles into a skin-close warmth of Melted Vanilla and Precious Woods. Designed to stay with you — not just through the wash, but through the day.",
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
    image: "/BURNT_SUGAR.webp",
    notes: [80, 20, 10, 95, 60], // Woody, Floral, Fresh, Sweet, Spicy (mock interpretation)
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
      "Acid Bloom represents a disruption to traditional clean linen scents. It strikes with a tart, vibrant green opening, drying down to a dewy, euphoric floral heart. It energizes while locking moisture and suppleness into every weave.",
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
    image: "/ACID_BLOOM.webp",
    notes: [15, 95, 90, 30, 10], // Woody, Floral, Fresh, Sweet, Spicy
    imgGradient: "linear-gradient(135deg, #4c7c42 0%, #294723 100%)",
    topNotes: "Crisp Apple, Green Leaves",
    heartNotes: "Dewy Peony, Jasmine",
    baseNotes: "White Woods, Clean Musk",
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
      "For the understated minimalist, Pale Ash is a masterclass in restraint. It utilizes light purple lavender absolute and dry, ashen woods to leave a clean, almost ghostly trail of refined comfort on your garments. An absolute necessity for delicate silks and intimates.",
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
    image: "/PALE_ASH.webp",
    notes: [45, 75, 50, 20, 10], // Woody, Floral, Fresh, Sweet, Spicy
    imgGradient: "linear-gradient(135deg, #6d5f83 0%, #3e364c 100%)",
    topNotes: "Bergamot, Clary Sage",
    heartNotes: "French Lavender, Orris Root",
    baseNotes: "Ash Wood, Tonka Bean",
  },
  /*
  {
    id: "butter-petal",
    name: "Butter Petal",
    price: "₹599.00",
    colorHex: "#c9884e",
    colorName: "Warm Golden Tan",
    shortDesc:
      "Golden hour wrapped in creamy vanilla, soft skin, and sun-drenched linen.",
    description:
      "Comfort embodied. Butter Petal envelops your wardrobe in a light, warm tan haze of creamy lactonic notes and sun-kissed flora. It transforms stiff cottons into cloud-like fabrics, providing a familiar yet profoundly elevated olfactory experience.",
    size: "NET QTY 750 ML",
    features: ["Deep Care", "Clean Wear", "Lasting Scent", "25 Premium Washes"],
    pros: [
      "Highly universally loved scent",
      "Makes towels miraculously fluffy",
      "Fine Fragrance quality",
    ],
    cons: [
      "Can be perceived as slightly sweet",
      "Lacks the 'freshness' of citrus-based products",
    ],
    review: {
      text: "Wrapping myself in a towel washed with Butter Petal is honestly the highlight of my morning routine.",
      author: "Sarah L.",
    },
    bgColor: "bg-[#c9884e]",
    textColor: "text-[#F5F2EB]",
    imageUrl: "/main.webp",
    image: "/img2.png",
    notes: [30, 60, 20, 85, 40], // Woody, Floral, Fresh, Sweet, Spicy
    imgGradient: "linear-gradient(135deg, #c9884e 0%, #875931 100%)",
    topNotes: "Almond Blossom, Sweet Orange",
    heartNotes: "Tuberose, Gardenia",
    baseNotes: "Sandalwood, Coconut Milk",
  },
  */
];
