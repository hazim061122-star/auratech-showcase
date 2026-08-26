import earbuds from "@/assets/p-earbuds.jpg";
import watch from "@/assets/p-watch.jpg";
import speaker from "@/assets/p-speaker.jpg";
import charger from "@/assets/p-charger.jpg";
import headphones from "@/assets/p-headphones.jpg";
import pad from "@/assets/p-pad.jpg";

export type Category = "Audio" | "Wearables" | "Power" | "Desk";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  altImage: string;
  colors: string[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  inBox: string[];
};

export const products: Product[] = [
  {
    slug: "pulse-air-pro",
    name: "Pulse Air Pro",
    tagline: "Adaptive ANC earbuds with spatial audio",
    category: "Audio",
    price: 549,
    compareAt: 649,
    rating: 4.8,
    reviews: 1284,
    badge: "Best seller",
    image: earbuds,
    altImage: headphones,
    colors: ["Carbon", "Arctic", "Cyan"],
    description:
      "Six microphones, a dedicated silicon DSP and adaptive noise cancellation that re-tunes itself 48,000 times a second. Pulse Air Pro disappears in your ear and leaves only the music.",
    highlights: [
      "Adaptive ANC with transparency blend",
      "9h playback, 34h with the case",
      "Head-tracked spatial audio",
    ],
    specs: [
      { label: "Driver", value: "11mm graphene dynamic" },
      { label: "Codec", value: "LDAC / aptX Lossless / AAC" },
      { label: "Battery", value: "9h buds · 34h case" },
      { label: "Charging", value: "USB-C + Qi wireless" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Weight", value: "4.9g per bud" },
    ],
    inBox: ["Pulse Air Pro buds", "Charging case", "4 ear tip sizes", "USB-C braided cable"],
  },
  {
    slug: "chrono-x1",
    name: "Chrono X1",
    tagline: "Titanium smartwatch with always-on AMOLED",
    category: "Wearables",
    price: 1099,
    rating: 4.7,
    reviews: 842,
    badge: "New",
    image: watch,
    altImage: pad,
    colors: ["Titanium", "Midnight"],
    description:
      "A grade-5 titanium case, sapphire crystal and a 2000-nit always-on display. Chrono X1 tracks 140 workouts, sleep stages and recovery without asking for a charger all week.",
    highlights: ["14-day typical battery", "Dual-band GPS", "Sapphire crystal + 10ATM"],
    specs: [
      { label: "Display", value: '1.43" AMOLED, 2000 nits' },
      { label: "Case", value: "Grade-5 titanium, 46mm" },
      { label: "Battery", value: "14 days typical" },
      { label: "Sensors", value: "HR, SpO2, ECG, skin temp" },
      { label: "GPS", value: "Dual-band L1 + L5" },
      { label: "Water resistance", value: "10ATM" },
    ],
    inBox: ["Chrono X1", "Fluoroelastomer band", "Magnetic charge puck"],
  },
  {
    slug: "sonic-drum-360",
    name: "Sonic Drum 360",
    tagline: "Omnidirectional speaker with reactive light ring",
    category: "Audio",
    price: 349,
    compareAt: 429,
    rating: 4.6,
    reviews: 517,
    image: speaker,
    altImage: earbuds,
    colors: ["Carbon", "Slate"],
    description:
      "A 360° driver array with a passive bass radiator, wrapped in acoustic mesh. The light ring reacts to the low end so a room can feel the track before it hears it.",
    highlights: ["360° driver array", "24h playtime", "Stereo pairing over BT 5.4"],
    specs: [
      { label: "Output", value: "40W RMS" },
      { label: "Drivers", value: "2x 20W + passive radiator" },
      { label: "Battery", value: "24 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, USB-C, AUX" },
      { label: "Water resistance", value: "IP67" },
      { label: "Weight", value: "780g" },
    ],
    inBox: ["Sonic Drum 360", "USB-C cable", "Woven carry strap"],
  },
  {
    slug: "voltcore-140",
    name: "Voltcore 140",
    tagline: "140W GaN power bank for laptops and phones",
    category: "Power",
    price: 299,
    rating: 4.5,
    reviews: 393,
    image: charger,
    altImage: pad,
    colors: ["Carbon"],
    description:
      "Gallium nitride internals mean 140W of laptop-class output in something that still slides into a jacket pocket. Three ports, smart load balancing, airline-legal capacity.",
    highlights: ["140W max output", "24,000mAh capacity", "Charges 0-50% in 25 min"],
    specs: [
      { label: "Capacity", value: "24,000mAh / 86Wh" },
      { label: "Max output", value: "140W USB-C PD 3.1" },
      { label: "Ports", value: "2x USB-C, 1x USB-A" },
      { label: "Recharge", value: "0-50% in 25 minutes" },
      { label: "Display", value: "Ambient LED status" },
      { label: "Weight", value: "480g" },
    ],
    inBox: ["Voltcore 140", "240W USB-C cable", "Travel pouch"],
  },
  {
    slug: "aura-studio-one",
    name: "Aura Studio One",
    tagline: "Over-ear reference headphones",
    category: "Audio",
    price: 899,
    rating: 4.9,
    reviews: 671,
    badge: "Editor's pick",
    image: headphones,
    altImage: speaker,
    colors: ["Carbon", "Graphite"],
    description:
      "Studio-tuned 45mm drivers with memory-foam earcups that vanish after ten minutes. Hybrid ANC drops cabin noise by up to 42dB without touching the midrange.",
    highlights: ["42dB hybrid ANC", "60h playback", "Hi-Res wired + wireless"],
    specs: [
      { label: "Driver", value: "45mm bio-cellulose" },
      { label: "ANC", value: "Hybrid, up to 42dB" },
      { label: "Battery", value: "60 hours ANC on" },
      { label: "Codec", value: "LDAC / aptX HD" },
      { label: "Weight", value: "268g" },
      { label: "Folding", value: "Flat-fold, hard case" },
    ],
    inBox: ["Aura Studio One", "Hard shell case", "3.5mm cable", "USB-C cable"],
  },
  {
    slug: "flux-pad-duo",
    name: "Flux Pad Duo",
    tagline: "Magnetic desk charger with ambient glow",
    category: "Desk",
    price: 189,
    compareAt: 229,
    rating: 4.4,
    reviews: 226,
    image: pad,
    altImage: charger,
    colors: ["Carbon", "Sand"],
    description:
      "A magnetic 15W pad and watch dock built into a machined aluminium slab, with an under-glow that dims itself when the room goes dark.",
    highlights: ["15W magnetic charging", "Watch + phone in one", "Adaptive ambient glow"],
    specs: [
      { label: "Output", value: "15W magnetic + 5W watch" },
      { label: "Material", value: "Anodised aluminium" },
      { label: "Glow", value: "Ambient light sensor" },
      { label: "Input", value: "USB-C PD 30W" },
      { label: "Footprint", value: "180 x 96mm" },
      { label: "Cable", value: "1.5m braided" },
    ],
    inBox: ["Flux Pad Duo", "30W adapter", "Braided USB-C cable"],
  },
];

export const categories: Category[] = ["Audio", "Wearables", "Power", "Desk"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 })
    .format(value)
    .replace("MYR", "RM ")
    .replace(/\u00a0/g, " ")
    .trim();
