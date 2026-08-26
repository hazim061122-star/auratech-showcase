import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { products } from "@/lib/products";

export type Review = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  date: string; // ISO
  title: string;
  body: string;
  verified?: boolean;
};

const seeds: Record<string, Omit<Review, "id" | "slug">[]> = {
  "pulse-air-pro": [
    {
      name: "Nurul Aisyah",
      rating: 5,
      date: "2026-07-18",
      title: "ANC is unreal on the LRT",
      body: "Been commuting from Kelana Jaya every day and these completely erase the train noise. Battery still at 40% by Friday evening. The transparency blend is natural enough that I can order kopi without taking them out.",
      verified: true,
    },
    {
      name: "Daniel Tan",
      rating: 5,
      date: "2026-06-30",
      title: "Worth every ringgit",
      body: "Coming from a much pricier pair, honestly cannot tell the difference in sound. Spatial audio on movies is a nice bonus.",
      verified: true,
    },
    {
      name: "Farah Zulkifli",
      rating: 4,
      date: "2026-06-11",
      title: "Great sound, case is a fingerprint magnet",
      body: "Sound and fit are excellent, the medium tips sealed perfectly for me. Only gripe is the glossy case picks up smudges instantly.",
      verified: true,
    },
    {
      name: "Ariff Rahman",
      rating: 5,
      date: "2026-05-27",
      title: "Call quality surprised me",
      body: "Took a client call in a noisy mamak and they said I sounded like I was in an office.",
    },
    {
      name: "Melissa Wong",
      rating: 3,
      date: "2026-05-02",
      title: "Good but app needs work",
      body: "Hardware is solid. The companion app disconnects now and then and the EQ presets are limited. Hoping for a firmware update.",
      verified: true,
    },
  ],
  "chrono-x1": [
    {
      name: "Syafiq Hamzah",
      rating: 5,
      date: "2026-07-22",
      title: "Two weeks, no charger",
      body: "Wore it through a Broga hike, gym sessions and daily wear. Still had 30% after 12 days. Dual-band GPS tracked my route through the trees without drifting.",
      verified: true,
    },
    {
      name: "Cheryl Lim",
      rating: 5,
      date: "2026-07-03",
      title: "Screen is gorgeous outdoors",
      body: "2000 nits is not marketing fluff, fully readable at noon in Putrajaya. Titanium case feels premium without being heavy.",
      verified: true,
    },
    {
      name: "Rajesh Kumar",
      rating: 4,
      date: "2026-06-14",
      title: "Sleep tracking is accurate",
      body: "Matches how I actually feel in the morning. Would love more third-party app support though.",
      verified: true,
    },
    {
      name: "Hana Idris",
      rating: 4,
      date: "2026-05-19",
      title: "Slightly large on small wrists",
      body: "46mm is a bit chunky for me but the light weight makes up for it. Band quality is excellent.",
    },
    {
      name: "Zaid Osman",
      rating: 3,
      date: "2026-04-28",
      title: "Solid, but pricey",
      body: "No complaints on the hardware. Just wish the charging puck was included in a second one for travel.",
      verified: true,
    },
  ],
  "sonic-drum-360": [
    {
      name: "Amirah Yusof",
      rating: 5,
      date: "2026-07-09",
      title: "Filled the whole balcony",
      body: "Had friends over for a barbecue and one speaker covered the entire space evenly. The light ring reacting to bass is a genuine crowd pleaser.",
      verified: true,
    },
    {
      name: "Kevin Chong",
      rating: 4,
      date: "2026-06-21",
      title: "Bass is punchy for the size",
      body: "Not window-shaking but far more than expected from something this small. Survived a rainy Port Dickson trip too.",
      verified: true,
    },
    {
      name: "Siti Nadhirah",
      rating: 5,
      date: "2026-06-02",
      title: "Battery lasts all weekend",
      body: "Three days of casual listening on one charge.",
    },
    {
      name: "Jason Foo",
      rating: 3,
      date: "2026-05-08",
      title: "Stereo pairing is fiddly",
      body: "Sound is great, but pairing two units sometimes needs a couple of tries before they sync.",
      verified: true,
    },
  ],
  "voltcore-140": [
    {
      name: "Haziq Zainal",
      rating: 5,
      date: "2026-07-15",
      title: "Charges my laptop at full speed",
      body: "140W is the real deal, my 16-inch laptop charges as fast as with the wall adapter. Took it on a flight to Kota Kinabalu with no issues.",
      verified: true,
    },
    {
      name: "Priya Nair",
      rating: 4,
      date: "2026-06-25",
      title: "Heavy but justified",
      body: "480g is noticeable in a small bag, but you're carrying two full laptop charges. Fair trade.",
      verified: true,
    },
    {
      name: "Lee Wei Xiang",
      rating: 5,
      date: "2026-06-05",
      title: "Recharges scary fast",
      body: "Back to half capacity during a lunch break. Ambient LED readout is much better than four little dots.",
    },
    {
      name: "Norhayati Ismail",
      rating: 4,
      date: "2026-05-12",
      title: "Does what it says",
      body: "Three ports means the whole family can top up in the car. Gets warm under full load but never worryingly so.",
      verified: true,
    },
  ],
  "aura-studio-one": [
    {
      name: "Marcus Yeoh",
      rating: 5,
      date: "2026-07-20",
      title: "Reference tuning, genuinely",
      body: "I mix on these at home now. Midrange is untouched by the ANC, which is rare. Clamping force is just right for long sessions.",
      verified: true,
    },
    {
      name: "Intan Suraya",
      rating: 5,
      date: "2026-07-01",
      title: "60 hours is not exaggerated",
      body: "Charged them once in three weeks of daily WFH use.",
      verified: true,
    },
    {
      name: "Gopal Menon",
      rating: 5,
      date: "2026-06-09",
      title: "Best purchase this year",
      body: "The hard case is properly built and the flat-fold makes it easy to slot into a backpack.",
    },
    {
      name: "Yasmin Abdullah",
      rating: 4,
      date: "2026-05-23",
      title: "Comfortable, slightly warm",
      body: "Earcups are plush but in Malaysian weather my ears do get warm after two hours. Sound quality is flawless.",
      verified: true,
    },
    {
      name: "Bryan Ng",
      rating: 3,
      date: "2026-04-30",
      title: "Wired mode needs the cable it ships with",
      body: "Third-party 3.5mm cables gave me a loose connection. Otherwise excellent headphones.",
    },
  ],
  "flux-pad-duo": [
    {
      name: "Alia Roslan",
      rating: 5,
      date: "2026-07-11",
      title: "Tidied my whole desk",
      body: "Phone and watch on one slab, no cable spaghetti. The glow dimming at night is a lovely touch.",
      verified: true,
    },
    {
      name: "Tan Chee Meng",
      rating: 4,
      date: "2026-06-18",
      title: "Solid aluminium build",
      body: "Heavy enough that pulling the phone off doesn't drag the pad along. Charging speed is standard 15W, nothing surprising.",
      verified: true,
    },
    {
      name: "Sharifah Nadia",
      rating: 4,
      date: "2026-05-30",
      title: "Great, wish the cable was longer",
      body: "1.5m just barely reaches my socket. Everything else is perfect.",
    },
    {
      name: "Vincent Loh",
      rating: 3,
      date: "2026-05-04",
      title: "Case thickness matters",
      body: "With a thick rugged case the magnets hold but charging slows. Works flawlessly with a slim case.",
      verified: true,
    },
  ],
};

export const seedReviews: Review[] = products.flatMap((p) =>
  (seeds[p.slug] ?? []).map((r, i) => ({ ...r, slug: p.slug, id: `${p.slug}-${i}` })),
);

export type ReviewSummary = {
  average: number;
  total: number;
  distribution: { stars: number; count: number; percent: number }[];
};

export function summarize(reviews: Review[]): ReviewSummary {
  const total = reviews.length;
  const average = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, percent: total ? (count / total) * 100 : 0 };
  });
  return { average: Math.round(average * 10) / 10, total, distribution };
}

type Ctx = {
  reviews: Review[];
  addReview: (r: Omit<Review, "id" | "date" | "slug"> & { slug: string }) => void;
};

const ReviewsContext = createContext<Ctx | null>(null);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);

  const addReview: Ctx["addReview"] = useCallback((r) => {
    setReviews((prev) => [
      { ...r, id: `${r.slug}-user-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  }, []);

  const value = useMemo(() => ({ reviews, addReview }), [reviews, addReview]);
  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useProductReviews(slug: string) {
  const ctx = useContext(ReviewsContext);
  const all = ctx?.reviews ?? seedReviews;
  const list = useMemo(
    () =>
      all
        .filter((r) => r.slug === slug)
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [all, slug],
  );
  const summary = useMemo(() => summarize(list), [list]);
  return { reviews: list, summary, addReview: ctx?.addReview };
}

export const formatReviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric" });
