/**
 * ============================================================
 * JOMSHUTTLE — CONTENT & DATA MODULE
 * ============================================================
 * Edit this file to update:
 *   - Prices, routes, destinations
 *   - Tour package details
 *   - Company info (phone, email, WhatsApp)
 *   - Navigation items
 *   - Why Us reasons
 *   - Van capacity info
 *
 * To ADD a new tour package:
 *   1. Copy one of the objects in TOUR_PACKAGES array below
 *   2. Paste it at the end of the array (before the closing ])
 *   3. Update: id, title, subtitle, price, duration, image, emoji, whatsappRef, itinerary, includes
 *   4. Save. The tour card & detail modal are auto-generated.
 *
 * To ADD a new destination (state):
 *   1. Copy one object in DESTINATIONS array
 *   2. Update: id, name, emoji, routes (each route has label, largeVan, smallVan, whatsappLink)
 *   3. Save. The destination page and booking buttons are auto-generated.
 * ============================================================
 */

// ── Company Info ──────────────────────────────────────────────
export const COMPANY = {
  name: "JomShuttle",
  logoLight: "assets/jomshuttle_logo_light.webp",
  logoDark: "assets/jomshuttle_logo_dark.webp",
  tagline: "Book now and let us drive you there!",
  phone: "+60136788869",
  whatsappBase: "https://wasap.my/60136788869/",
  whatsappGeneral: "https://wasap.my/60136788869/JomShuttle",
  email: "jomshuttle@gmail.com",
  emailAgent2: "fahmie1997@yahoo.com",
  hours: "24 hours / 7 days a week",
  logoLight: "assets/logo-light.png",  // white-bg logo
  logoDark: "assets/logo-dark.png",   // black-bg logo
  // EmailJS configuration — replace with your actual IDs from emailjs.com
  emailJS: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",      // From EmailJS dashboard → Account
    serviceId: "YOUR_EMAILJS_SERVICE_ID",      // From EmailJS dashboard → Email Services
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",   // From EmailJS dashboard → Email Templates
  }
};

// ── Van Capacity Info (shown on all booking pages) ────────────
export const VAN_INFO = {
  large: {
    label: "Large Van",
    withLuggage: "7–13 passengers (with luggage/bags)",
    withoutLuggage: "7–17 passengers (if no luggage/bag)"
  },
  small: {
    label: "Small Van",
    withLuggage: "4–6 passengers (with luggage/bags)",
    withoutLuggage: "4–10 passengers (if no luggage/bag)"
  }
};

// ── Why Book With Us ──────────────────────────────────────────
export const WHY_US = [
  {
    icon: "🛡️",
    title: "Safe & Trusted",
    desc: "All drivers are licensed, experienced, and background-checked for your peace of mind."
  },
  {
    icon: "🚐",
    title: "Well-Maintained Fleet",
    desc: "Our vans are regularly serviced and in excellent condition for comfort and safety."
  },
  {
    icon: "⏰",
    title: "24/7 Service",
    desc: "We operate round-the-clock, every day of the week — including public holidays."
  },
  {
    icon: "💬",
    title: "Instant WhatsApp Booking",
    desc: "Book in seconds via WhatsApp. Our team responds fast with confirmation."
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "Fixed rates — no hidden charges, no surge pricing. What you see is what you pay."
  },
  {
    icon: "🗺️",
    title: "Nationwide Coverage",
    desc: "We cover all major destinations across Peninsular Malaysia."
  }
];

// ── Destinations / States ─────────────────────────────────────
// Each state has routes. largeVan and smallVan are prices (RM).
// whatsappLink: full wasap.my URL or cbl.link shortcut
export const DESTINATIONS = [
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    emoji: "🏙️",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 ↔ KL City",
        largeVan: 250,
        smallVan: 200,
        whatsappLink: {
          large: "https://wasap.my/60136788869/KLIA-KL-L-RM250",
          small: "https://wasap.my/60136788869/KLIA-KL-S-RM200"
        }
      }
    ]
  },
  {
    id: "selangor",
    name: "Selangor",
    emoji: "🌿",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Kuala Selangor",
        largeVan: 400,
        smallVan: 350,
        whatsappLink: {
          large: "https://cbl.link/u5Sw1mC",
          small: "https://cbl.link/u5Sw1mC"
        }
      }
    ]
  },
  {
    id: "pahang",
    name: "Pahang",
    emoji: "🏔️",
    heroImage: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Genting Highlands",
        largeVan: 500,
        smallVan: 450,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      },
      {
        label: "KLIA / KLIA2 / KL City ↔ Cameron Highlands",
        largeVan: 800,
        smallVan: 750,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      },
      {
        label: "KLIA / KLIA2 / KL City ↔ Taman Negara",
        largeVan: 850,
        smallVan: 800,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      },
      {
        label: "KLIA / KLIA2 / KL City ↔ Kuantan",
        largeVan: 850,
        smallVan: 800,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "negeri-sembilan",
    name: "Negeri Sembilan",
    emoji: "🏖️",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Port Dickson",
        largeVan: 450,
        smallVan: 350,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "perak",
    name: "Perak",
    emoji: "⛏️",
    heroImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Ipoh",
        largeVan: 650,
        smallVan: 600,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "melaka",
    name: "Melaka",
    emoji: "🏛️",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Melaka",
        largeVan: 550,
        smallVan: 500,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "johor",
    name: "Johor",
    emoji: "🌉",
    heroImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Johor",
        largeVan: 900,
        smallVan: 850,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "penang",
    name: "Penang",
    emoji: "🍜",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Penang",
        largeVan: 950,
        smallVan: 900,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "kedah",
    name: "Kedah",
    emoji: "🌾",
    heroImage: "https://images.unsplash.com/photo-1600158772563-e3a5e9a64ab2?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Alor Setar",
        largeVan: 1100,
        smallVan: 1000,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "perlis",
    name: "Perlis",
    emoji: "🌺",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Perlis",
        largeVan: 1300,
        smallVan: 1200,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "kelantan",
    name: "Kelantan",
    emoji: "🎨",
    heroImage: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Kota Bharu",
        largeVan: 1400,
        smallVan: 1300,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ]
  },
  {
    id: "terengganu",
    name: "Terengganu",
    emoji: "🐢",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    routes: [
      {
        label: "KLIA / KLIA2 / KL City ↔ Kuala Terengganu",
        largeVan: 1300,
        smallVan: 1100,
        whatsappLink: { large: "https://cbl.link/u5Sw1mC", small: "https://cbl.link/u5Sw1mC" }
      }
    ],
    // Optional: link to related tour package
    tourLink: { label: "Kuala Terengganu Tour Package", href: "#tour-kuala-terengganu" }
  }
];

// ── Tour Packages ─────────────────────────────────────────────
/**
 * HOW TO ADD A NEW TOUR PACKAGE:
 * ─────────────────────────────────────────────────────────────
 * 1. Copy the block below (from the opening { to the closing },)
 * 2. Paste it at the END of the TOUR_PACKAGES array (before the closing ])
 * 3. Fill in your details:
 *    - id: unique slug, e.g. "langkawi" (no spaces)
 *    - title: Display name
 *    - subtitle: Short tagline
 *    - duration: e.g. "3D2N"
 *    - price: e.g. "RM499/pax" — shown on card
 *    - priceNote: small print under price
 *    - image: URL to a photo (use Unsplash or your hosted image)
 *    - emoji: single emoji for visual flair
 *    - whatsappRef: appended to wasap.my/60136788869/ — e.g. "Langkawi"
 *    - itinerary: array of day objects { day, items[] }
 *    - includes: array of strings (what's included)
 *    - badge: optional label like "NEW" or "POPULAR"
 * ─────────────────────────────────────────────────────────────
 *
 * EXAMPLE TEMPLATE TO COPY:
 * {
 *   id: "langkawi",
 *   title: "Langkawi Island",
 *   subtitle: "Sun, sea & duty-free shopping",
 *   duration: "3D2N",
 *   price: "RM499/pax",
 *   priceNote: "Sharing group • Min 10 pax",
 *   image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
 *   emoji: "🏝️",
 *   whatsappRef: "Langkawi",
 *   badge: "NEW",
 *   itinerary: [
 *     { day: "Day 1", items: ["9:00pm — Depart KL Sentral", "Overnight journey"] },
 *     { day: "Day 2", items: ["Check-in hotel", "Cable Car & Sky Bridge", "Eagle Square"] },
 *     { day: "Day 3", items: ["Duty-free shopping", "2:00pm — Depart for KL"] }
 *   ],
 *   includes: ["Transport (van)", "Hotel accommodation", "Tour guide", "Travel insurance"]
 * },
 */
export const TOUR_PACKAGES = [
  // ── Package 1: Hatyai ──────────────────────────────────────
  {
    id: "hatyai",
    title: "Hat Yai, Thailand",
    subtitle: "Shopping, street food & border adventure",
    duration: "4D2N",
    price: "RM580/pax",
    priceNote: "Sharing group • Transport & Hotel",
    image: "https://images.unsplash.com/photo-1683119100517-3e626369cbd2?q=80",
    emoji: "🇹🇭",
    whatsappRef: "HatyaiSongkla",
    badge: "POPULAR",
    itinerary: [
      {
        day: "Day 1",
        items: [
          "10:00pm — Depart from KL Sentral",
          "Breakfast stop at Bukit Kayu Hitam (before immigration)"
        ]
      },
      {
        day: "Day 2",
        items: [
          "6:00am — Immigration clearance at the border",
          "🌄 Hatyai Municipal Park (city panorama view)",
          "🏨 Hotel check-in (rest & refresh)",
          "🛍️ Central Festival Mall shopping",
          "🚤 Floating Market Khlong Hae",
          "🛒 Asean Night Bazaar & Asean Plaza",
          "🛺 Return by tuk-tuk (last van 8:30pm)"
        ]
      },
      {
        day: "Day 3",
        items: [
          "8:00am — Dimsum breakfast at Zaina",
          "🕌 Songkhla Grand Mosque",
          "☕ Cafe Amazon, Mungkhang Singhanakorn",
          "⛴️ Ferry crossing to Songkhla (with van)",
          "🍛 Lunch at Chabura Dimsum Songkhla",
          "🧜 Samila Beach & Mermaid Statue",
          "🏔️ Tan Kuan Hill (Flag Hill)",
          "🐘 Chang Puak Camp / Seaverse Cafe",
          "🛍️ Free & Easy at Lee Garden Plaza",
          "🛺 Return by tuk-tuk (last van 8:30pm)"
        ]
      },
      {
        day: "Day 4",
        items: [
          "8:00am — Breakfast at Roti De Forest",
          "🛒 Kim Yong Market (Cashew Nut Market)",
          "🍗 Lunch at Kaitod Decha Airport",
          "🛍️ Nora Plaza & Kaysorn Outlet",
          "🥘 Steamboat dinner in Hatyai",
          "Depart to border before 5:00pm",
          "🌙 ETA back at KL Sentral — after midnight"
        ]
      }
    ],
    includes: [
      "Van transport (KL ↔ Hatyai return)",
      "Hotel accommodation (2 nights)",
      "Licensed tour guide",
      "Travel insurance",
      "All sightseeing transfers listed"
    ],
    note: "Custom date available for private groups of minimum 10 pax."
  },

  // ── Package 2: Kuala Terengganu ────────────────────────────
  {
    id: "kuala-terengganu",
    title: "Kuala Terengganu",
    subtitle: "Crystal mosque, Pulau Redang & coastal charm",
    duration: "4D3N",
    price: "RM5,880",
    priceNote: "Private tour • 12 pax (max 13)",
    image: "https://images.unsplash.com/photo-1595542028715-8412db1e862f?q=80",
    emoji: "🐢",
    whatsappRef: "KualaTerengganu",
    badge: "PRIVATE",
    itinerary: [
      {
        day: "Day 1",
        items: [
          "9:00pm — Depart from Kuala Lumpur",
          "Overnight journey (~6–7 hours)"
        ]
      },
      {
        day: "Day 2",
        items: [
          "4:00–5:00am — Arrive in Kuala Terengganu",
          "8:00am — Nasi Dagang Atas Tol breakfast",
          "9:00am — City exploration tour",
          "12:00pm — Crystal Mosque (Masjid Kristal)",
          "1:00pm — Jumaat prayer (for men)",
          "2:00pm — Lunch at local restaurant",
          "3:30pm — Keropok Lekor & local produce shopping",
          "5:00pm — Batu Buruk Beach leisure",
          "6:00pm — Drawbridge Kuala Terengganu",
          "7:30pm — Dinner",
          "9:00pm — Check-in at Kuala Terengganu homestay"
        ]
      },
      {
        day: "Day 3 — Pulau Redang Day Trip",
        items: [
          "6:00am — Early breakfast",
          "6:30am — Depart to Merang Jetty (30–40 min)",
          "7:30am — Pulau Redang day trip registration",
          "8:00am–4:00pm — Pulau Redang: snorkeling, beach & lunch included",
          "5:00pm — Return to jetty & homestay",
          "7:00pm — Dinner",
          "9:00pm — Rest at homestay"
        ]
      },
      {
        day: "Day 4 — Return to KL",
        items: [
          "8:00am — Breakfast & pack up",
          "9:30am — Homestay check-out",
          "10:00am–12:00pm — Pasar Payang (souvenirs) & optional museum",
          "12:30pm — Lunch",
          "2:00pm — Depart back to Kuala Lumpur",
          "10:00–11:00pm — ETA arrival in KL"
        ]
      }
    ],
    includes: [
      "Van transport (KL ↔ Kuala Terengganu return)",
      "Homestay accommodation (3 nights)",
      "Pulau Redang day trip with lunch",
      "All sightseeing transfers as listed",
      "Licensed tour guide"
    ],
    note: "Rate: RM5,880 for 12 pax. 13th pax: add RM490."
  }
  // ────────────────────────────────────────────────────────────
  // ADD NEW TOUR PACKAGE HERE — copy the template above ↑
  // ────────────────────────────────────────────────────────────
];

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Ahmad Zulkifli",
    location: "Kuala Lumpur",
    text: "Booked a KLIA transfer for a group of 10. Driver was on time, van was clean, and the price was exactly as stated. Will definitely book again!",
    rating: 5,
    avatar: "AZ"
  },
  {
    name: "Siti Norbaya",
    location: "Selangor",
    text: "The Hatyai package was absolutely amazing. The tour guide was funny and knowledgeable. Shopping in Hat Yai was a blast! 10/10 recommend.",
    rating: 5,
    avatar: "SN"
  },
  {
    name: "Raj Kumar",
    location: "Penang",
    text: "Needed a last-minute airport transfer. WhatsApp reply came in under 3 minutes. Smooth ride to KLIA2. Great service at a fair price.",
    rating: 5,
    avatar: "RK"
  },
  {
    name: "Nurul Hidayah",
    location: "Johor Bahru",
    text: "Took the Kuala Terengganu private tour with my family. Pulau Redang was breathtaking. Everything was organized perfectly. Worth every ringgit!",
    rating: 5,
    avatar: "NH"
  }
];
