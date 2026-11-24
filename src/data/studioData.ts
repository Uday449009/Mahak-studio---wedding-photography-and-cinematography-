export type PackageId = 'basic' | 'standard' | 'premium' | 'golden';

export interface WeddingPackage {
  id: PackageId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  highlightLabel?: string;
  isFeatured?: boolean;
  isRoyal?: boolean;
  deliverables: string[];
  summaryMeta: string;
}

export interface ComparisonRow {
  id: string;
  category: string;
  detailHint: string;
  values: Record<PackageId, { text: string; included: 'yes' | 'partial' | 'no' }>;
}

export interface TestimonialItem {
  id: string;
  couple: string;
  city: string;
  packageUsed: string;
  weddingDate: string;
  quote: string;
  highlight: string;
}

export interface ShowcaseFrame {
  id: string;
  title: string;
  ceremony: string;
  location: string;
  caption: string;
  src: string;
  alt: string;
  aspect: '4:3' | '3:4';
}

export const STUDIO_CONTACTS = {
  brandName: 'Mahak Studio',
  city: 'Indore, Madhya Pradesh',
  serviceAreas: 'Indore · Ujjain · Dewas · Malwa Region',
  raja: {
    name: 'Raja Dangi',
    role: 'Studio Founder & Lead Booking Coordinator',
    displayPhone: '+91 97536 51885',
    rawPhone: '9753651885',
    telHref: 'tel:+919753651885',
    whatsappHref: 'https://wa.me/919753651885',
  },
  om: {
    name: 'Om Thakur',
    role: 'Operations & Cinematography Lead',
    displayPhone: '+91 83055 94823',
    rawPhone: '8305594823',
    telHref: 'tel:+918305594823',
    whatsappHref: 'https://wa.me/918305594823',
  },
  instagram: {
    handle: '@MAHAK_studio_32',
    url: 'https://instagram.com/MAHAK_studio_32',
  },
} as const;

export const STUDIO_IMAGES = {
  heroCouple: '/src/assets/images/hero_indian_couple_1795519175109.jpg',
  mkCinematic: '/src/assets/images/mk_cinematic_portrait_1795519227044.jpg',
  droneMandap: '/src/assets/images/wedding_drone_mandap_1795519174479.jpg',
  candidSangeet: '/src/assets/images/wedding_candid_sangeet_1795519175727.jpg',
} as const;

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 25000,
    priceLabel: '₹25,000/-',
    tagline: 'Essential traditional coverage for intimate family ceremonies.',
    summaryMeta: '2 Cameras · 30-Page Album · 250 Photos',
    deliverables: [
      '1 Traditional Photo + 1 Traditional Video',
      'Full Length Wedding Video',
      'Photo Book Album (12x36, 30 Pages, 250 Photos)',
      'All Photos RAW in 32GB Pendrive',
      '12x18 Photo Frame',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 40000,
    priceLabel: '₹40,000/-',
    tagline: 'Elevated traditional coverage with aerial drone views and digital album.',
    summaryMeta: 'Drone Included · 50-Page + Mini Album · 350 Photos',
    deliverables: [
      '1 Traditional Photo + 1 Traditional Video',
      '1 Drone Camera + Full Length Video',
      'Photo Book Album (12x36, 50 Pages, 350 Photos) + MINI Book Album',
      'QR Digital Album + Table Photo Calendar',
      'All RAW data in 64GB Pendrive',
      '16x24 Photo Frame',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 60000,
    priceLabel: '₹60,000/-',
    tagline: 'Complete candid photography, cinematic films, drone, teaser, and Instagram reels.',
    highlightLabel: 'Special Offer · Most Popular',
    isFeatured: true,
    summaryMeta: 'Candid + Cinematic + Drone · 80 Pages · 500 Photos',
    deliverables: [
      '1 Traditional Photo + 1 Traditional Video',
      '1 Drone Camera + 1 Candid Photo',
      '1 Cinematic Video Camera + 1 Cinematic Video',
      '1 Teaser + 3 Instagram Reels + Full Length Video',
      '50/30 Page 2-Album Set (80 Pages total, 500 Photos) + MINI Book Album',
      'QR Digital Album + Table Photo Calendar',
      'All RAW data in 64GB Pendrive',
      '16x24 Photo Frame',
    ],
  },
  {
    id: 'golden',
    name: 'Golden',
    price: 80000,
    priceLabel: '₹80,000/-',
    tagline: 'Grand royal wedding production with live L.E.D wall display and gallery frames.',
    highlightLabel: 'Grand Royal Tier',
    isRoyal: true,
    summaryMeta: 'LED Wall Live + 10 LED Frames · 80–100 Pages · 650 Photos',
    deliverables: [
      '1 Traditional Photo + 1 Traditional Video',
      '1 Drone Camera + 1 Candid Photo',
      '1 Cinematic Video Camera + 1 Cinematic Video',
      '1 Teaser + 3 Instagram Reels + Full Length Video',
      '1 L.E.D Wall Live Display during wedding',
      '10 Gallery LED Photo Frames',
      '50/50 Page 2-Album Set (80-100 Pages, 650 Photos) + MINI Book Album',
      'QR Digital Album + Table Photo Calendar',
      'All RAW data in 64GB Pendrive',
      '20x30 Photo Frame',
    ],
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'cameras-drone',
    category: 'Cameras & Drone',
    detailHint: 'Traditional still, video & aerial coverage',
    values: {
      basic: { text: '1 Trad. Photo + 1 Trad. Video (No Drone)', included: 'partial' },
      standard: { text: '1 Trad. Photo + 1 Trad. Video + 1 Drone', included: 'yes' },
      premium: { text: 'Trad. Photo & Video + 1 Drone + Candid + Cinema Cam', included: 'yes' },
      golden: { text: 'Full Multi-Cam Crew + 1 Drone + Candid + Cinema Cam', included: 'yes' },
    },
  },
  {
    id: 'candid-cinematic',
    category: 'Candid & Cinematic Coverage',
    detailHint: 'Editorial portraits & wedding film craft',
    values: {
      basic: { text: 'Not Included', included: 'no' },
      standard: { text: 'Not Included', included: 'no' },
      premium: { text: '1 Candid Photographer + 1 Cinematic Video', included: 'yes' },
      golden: { text: '1 Candid Photographer + 1 Cinematic Video', included: 'yes' },
    },
  },
  {
    id: 'teaser-reels',
    category: 'Teaser + Reels',
    detailHint: 'MK Cinematic social-ready short edits',
    values: {
      basic: { text: 'Full Length Video Only', included: 'no' },
      standard: { text: 'Full Length Video Only', included: 'no' },
      premium: { text: '1 Wedding Teaser + 3 Instagram Reels', included: 'yes' },
      golden: { text: '1 Wedding Teaser + 3 Instagram Reels', included: 'yes' },
    },
  },
  {
    id: 'albums-photos',
    category: 'Album Pages & Photo Count',
    detailHint: '12x36 flush-mount albums, mini book & QR digital',
    values: {
      basic: { text: '30 Pages (250 Photos)', included: 'partial' },
      standard: { text: '50 Pages (350 Photos) + MINI Book + QR Digital', included: 'yes' },
      premium: { text: '50/30 2-Album Set (80 Pages, 500 Photos) + MINI + QR', included: 'yes' },
      golden: { text: '50/50 2-Album Set (80–100 Pages, 650 Photos) + MINI + QR', included: 'yes' },
    },
  },
  {
    id: 'pendrive-frames',
    category: 'Pendrive & Framed Prints',
    detailHint: 'RAW archive, wall frames & table calendar',
    values: {
      basic: { text: '32GB Pendrive + 12x18 Frame', included: 'partial' },
      standard: { text: '64GB Pendrive + 16x24 Frame + Table Calendar', included: 'yes' },
      premium: { text: '64GB Pendrive + 16x24 Frame + Table Calendar', included: 'yes' },
      golden: { text: '64GB Pendrive + 20x30 Frame + 10 Gallery LED Frames', included: 'yes' },
    },
  },
  {
    id: 'led-wall',
    category: 'LED Wall Live Setup',
    detailHint: 'Live ceremonial broadcast for large wedding lawns',
    values: {
      basic: { text: 'Not Included', included: 'no' },
      standard: { text: 'Not Included', included: 'no' },
      premium: { text: 'Not Included', included: 'no' },
      golden: { text: '1 Live L.E.D Wall Display at Venue', included: 'yes' },
    },
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    couple: 'Aarav & Kritika Patidar',
    city: 'Vijay Nagar, Indore',
    packageUsed: 'Premium Package',
    weddingDate: 'February 2026',
    highlight: '3 reels delivered within 48 hours of our reception',
    quote:
      'Raja Dangi and his team made both our families feel completely effortless in front of the lens. MK Cinematic cut three Sangeet and Haldi reels so fast that our guests were sharing them the very next evening, and the 80-page two-album set arrived right on the promised date.',
  },
  {
    id: 't2',
    couple: 'Devansh & Niharika Joshi',
    city: 'Freeganj, Ujjain',
    packageUsed: 'Golden Package',
    weddingDate: 'December 2025',
    highlight: 'Seamless drone baraat shots & live LED wall',
    quote:
      'For our 900-guest lawn wedding in Ujjain, Om Thakur managed the live LED wall setup and drone crew without a single hiccup. Every relative sitting at the back could watch the Jaimala clearly, and the 10 glowing gallery LED frames at the entrance became everyone’s favorite photo spot.',
  },
  {
    id: 't3',
    couple: 'Siddharth & Tanvi Verma',
    city: 'Civil Lines, Dewas',
    packageUsed: 'Standard Package',
    weddingDate: 'November 2025',
    highlight: 'Crystal-clear QR digital album & punctual delivery',
    quote:
      'We booked the Standard tier with Raja Dangi for our two-day celebrations in Dewas. The aerial drone frames over the courtyard mandap looked straight out of a film, the 64GB RAW pendrive was neatly organized event-wise, and our relatives abroad loved browsing the QR digital album.',
  },
];

export const SHOWCASE_FRAMES: ShowcaseFrame[] = [
  {
    id: 'drone-mandap',
    title: 'Twilight Courtyard Mandap — Aerial Drone Craft',
    ceremony: 'Pheras & Baraat',
    location: 'Indore Heritage Lawn',
    caption:
      'Stabilized 4K aerial coverage capturing the architectural grandeur, glowing floral mandap, and full guest gathering included from Standard tier onward.',
    src: STUDIO_IMAGES.droneMandap,
    alt: 'Aerial twilight photograph of a royal Indian outdoor courtyard wedding mandap illuminated with warm marigold drapes and amber fairy lights in Indore',
    aspect: '4:3',
  },
  {
    id: 'candid-sangeet',
    title: 'Unscripted Sangeet Rhythm — Candid & Cinematic',
    ceremony: 'Sangeet & Cocktail Night',
    location: 'Indore & Ujjain',
    caption:
      'Natural-light candid stills and gimbal-stabilized cinematic sequences built for MK Cinematic wedding teasers and vertical Instagram reels.',
    src: STUDIO_IMAGES.candidSangeet,
    alt: 'Candid photograph of an Indian bride in a ruby embroidered lehenga and groom in an ivory sherwani laughing and dancing under warm chandeliers and sparklers',
    aspect: '4:3',
  },
];
