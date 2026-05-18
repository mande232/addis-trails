export type Neighborhood = {
  id: string;
  name: string;
  amharic: string;
  description: string;
};

export type Checkpoint = {
  order: number;
  photo: string;
  instructionEn: string;
  instructionAm: string;
  distanceM: number;
  nextLandmark?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type Place = {
  id: string;
  name: string;
  category: "Restaurant" | "Cafe" | "Bar" | "Hotel" | "Shopping" | "Cultural" | "Service";
  neighborhoodId: string;
  priceLevel: 1 | 2 | 3 | 4;
  priceRange: string;
  hero: string;
  gallery: string[];
  landmark: string;
  description: string;
  hours: string;
  openNow: boolean;
  payments: ("Cash" | "TeleBirr" | "CBE Birr" | "Card")[];
  phone: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  popular?: boolean;
  recentlyVerified?: boolean;
  checkpoints: Checkpoint[];
  reviews: Review[];
  goodFor: string[];
};

export const neighborhoods: Neighborhood[] = [
  { id: "bole", name: "Bole", amharic: "ቦሌ", description: "Cosmopolitan restaurants, hotels, and the airport corridor." },
  { id: "piazza", name: "Piazza", amharic: "ፒያሳ", description: "Italian-era architecture, jewelry shops, and old cinemas." },
  { id: "kazanchis", name: "Kazanchis", amharic: "ካዛንቺስ", description: "Diplomatic district with hotels and embassies." },
  { id: "sarbet", name: "Sarbet", amharic: "ሳር ቤት", description: "Quiet residential streets, neighborhood cafes." },
  { id: "megenagna", name: "Megenagna", amharic: "መገናኛ", description: "Major transit hub, malls, and dense markets." },
  { id: "arat-kilo", name: "Arat Kilo", amharic: "አራት ኪሎ", description: "University quarter, museums, monuments." },
];

const img = (q: string, w = 1200, h = 1500) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const places: Place[] = [
  {
    id: "tomoca-piazza",
    name: "Tomoca Coffee",
    category: "Cafe",
    neighborhoodId: "piazza",
    priceLevel: 1,
    priceRange: "45–120 ETB",
    hero: img("photo-1559496417-e7f25cb247f3"),
    gallery: [
      img("photo-1559496417-e7f25cb247f3", 1600, 1000),
      img("photo-1453614512568-c4024d13c247", 1600, 1000),
      img("photo-1497636577773-f1231844b336", 1600, 1000),
    ],
    landmark: "Behind the old Cinema Ethiopia building, look for the yellow awning.",
    description:
      "Founded in 1953, Tomoca is the oldest coffee roaster in Addis. Stand at the polished wooden counter and order a macchiato — there are no chairs, only conversation.",
    hours: "Mon–Sat 7:00–20:00 · Sun 8:00–18:00",
    openNow: true,
    payments: ["Cash", "TeleBirr"],
    phone: "+251 11 111 1781",
    rating: 4.8,
    reviewCount: 1240,
    verified: true,
    popular: true,
    recentlyVerified: true,
    goodFor: ["Solo", "Quick stop", "Coffee lovers"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1582540730843-c84c1f3eaaef", 1600, 2000),
        instructionEn: "Start at the Piazza taxi stop. Face uphill toward the Itegue Taitu Hotel sign.",
        instructionAm: "ከፒያሳ ታክሲ ማቆሚያ ተነስ። ወደ ኢቴጌ ጣይቱ ሆቴል ምልክት ፊትህን አዙር።",
        distanceM: 0,
        nextLandmark: "Itegue Taitu Hotel sign",
      },
      {
        order: 2,
        photo: img("photo-1571115764595-644a1f56a55c", 1600, 2000),
        instructionEn: "Walk past the row of jewelry shops on your right. Continue for two blocks.",
        instructionAm: "በቀኝ በኩል ያሉትን የወርቅ ሱቆች አልፈህ ሁለት ብሎክ ቀጥል።",
        distanceM: 180,
        nextLandmark: "Cinema Ethiopia building",
      },
      {
        order: 3,
        photo: img("photo-1518756131217-31eb79b20e8f", 1600, 2000),
        instructionEn: "Turn right at the old Cinema Ethiopia. The yellow awning is just past the corner.",
        instructionAm: "በአሮጌው ሲኒማ ኢትዮጵያ ወደ ቀኝ ታጠፍ። ቢጫው አዋኒንግ ጥግ ላይ ነው።",
        distanceM: 320,
        nextLandmark: "Tomoca yellow awning",
      },
      {
        order: 4,
        photo: img("photo-1559496417-e7f25cb247f3", 1600, 2000),
        instructionEn: "You've arrived. The entrance is the wooden door under the awning.",
        instructionAm: "ደርሰሃል። መግቢያው ከአዋኒንጉ ስር ያለው የእንጨት በር ነው።",
        distanceM: 380,
      },
    ],
    reviews: [
      { id: "r1", author: "Selam T.", rating: 5, date: "3 days ago", comment: "The macchiato is unmatched. Stand at the counter like a local." },
      { id: "r2", author: "James K.", rating: 5, date: "1 week ago", comment: "Found it easily with the landmark directions. The 'behind cinema' tip saved me." },
    ],
  },
  {
    id: "kategna-bole",
    name: "Kategna Restaurant",
    category: "Restaurant",
    neighborhoodId: "bole",
    priceLevel: 2,
    priceRange: "180–420 ETB",
    hero: img("photo-1555396273-367ea4eb4db5"),
    gallery: [
      img("photo-1555396273-367ea4eb4db5", 1600, 1000),
      img("photo-1546833999-b9f581a1996d", 1600, 1000),
    ],
    landmark: "Directly opposite the Friendship Mall gate, next to the tall blue bank.",
    description:
      "A modern injera house known for its kitfo and shiro. Spacious, family-friendly, and one of the few places that gracefully serves first-time visitors.",
    hours: "Daily 11:00–23:00",
    openNow: true,
    payments: ["Cash", "TeleBirr", "Card"],
    phone: "+251 91 111 1234",
    rating: 4.6,
    reviewCount: 820,
    verified: true,
    popular: true,
    goodFor: ["Groups", "First-timers", "Dinner"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1469854523086-cc02fe5d8800", 1600, 2000),
        instructionEn: "Start at Bole Medhanialem Church. Walk toward Edna Mall.",
        instructionAm: "ከቦሌ መድኃኒዓለም ቤተክርስቲያን ተነስተህ ወደ ኢድና ሞል ሂድ።",
        distanceM: 0,
        nextLandmark: "Edna Mall corner",
      },
      {
        order: 2,
        photo: img("photo-1517248135467-4c7edcad34c4", 1600, 2000),
        instructionEn: "At Edna Mall, cross the street and continue past the ATMs.",
        instructionAm: "በኢድና ሞል መንገዱን ተሻግረህ ATM ዎችን አልፈህ ቀጥል።",
        distanceM: 220,
        nextLandmark: "Tall blue bank",
      },
      {
        order: 3,
        photo: img("photo-1555396273-367ea4eb4db5", 1600, 2000),
        instructionEn: "The tall blue bank is on your right. Kategna's wooden sign is across the street.",
        instructionAm: "ረጅሙ ሰማያዊ ባንክ በቀኝህ ነው። የካተኛ የእንጨት ምልክት መንገዱ ማዶ ነው።",
        distanceM: 410,
      },
    ],
    reviews: [
      { id: "r1", author: "Hanna M.", rating: 5, date: "2 days ago", comment: "Best beyaynetu in Bole. Servers will explain every dish." },
    ],
  },
  {
    id: "lideta-rooftop",
    name: "Lideta Rooftop Lounge",
    category: "Bar",
    neighborhoodId: "kazanchis",
    priceLevel: 3,
    priceRange: "350–900 ETB",
    hero: img("photo-1514933651103-005eec06c04b"),
    gallery: [img("photo-1514933651103-005eec06c04b", 1600, 1000)],
    landmark: "Atop the Dashen Bank building, entrance is the small glass door next to the ATM.",
    description: "Sunset cocktails over the Kazanchis skyline. Quiet weeknights, busy Fridays.",
    hours: "Tue–Sun 17:00–01:00 · Closed Mon",
    openNow: false,
    payments: ["TeleBirr", "Card"],
    phone: "+251 92 222 4567",
    rating: 4.4,
    reviewCount: 312,
    verified: true,
    recentlyVerified: true,
    goodFor: ["Date", "Sunset", "Drinks"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1444723121867-7a241cacace9", 1600, 2000),
        instructionEn: "From Kazanchis roundabout, walk toward the Hilton. Keep the embassy wall on your left.",
        instructionAm: "ከካዛንቺስ ክብ መንገድ ወደ ሂልተን ሂድ። የኤምባሲው ግድግዳ በግራህ ይሁን።",
        distanceM: 0,
      },
      {
        order: 2,
        photo: img("photo-1514933651103-005eec06c04b", 1600, 2000),
        instructionEn: "The Dashen Bank tower is on the corner. The lounge entrance is the small glass door beside the ATM.",
        instructionAm: "ዳሸን ባንክ ሕንፃ ጥግ ላይ ነው። የላውንጁ መግቢያ ከ ATM አጠገብ ያለው ትንሽ የመስታወት በር ነው።",
        distanceM: 240,
      },
    ],
    reviews: [],
  },
  {
    id: "shola-crafts",
    name: "Shola Market Crafts",
    category: "Shopping",
    neighborhoodId: "megenagna",
    priceLevel: 1,
    priceRange: "Varies",
    hero: img("photo-1518709268805-4e9042af2176"),
    gallery: [img("photo-1518709268805-4e9042af2176", 1600, 1000)],
    landmark: "Across from the main bus terminal entrance, tucked between the spice stalls.",
    description: "Hand-loomed cotton, leather, and silver. Bring small bills and a sense of patience.",
    hours: "Mon–Sat 8:00–19:00",
    openNow: true,
    payments: ["Cash"],
    phone: "+251 93 555 9988",
    rating: 4.3,
    reviewCount: 156,
    verified: false,
    goodFor: ["Souvenirs", "Locals", "Bargaining"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1469474968028-56623f02e42e", 1600, 2000),
        instructionEn: "Start at Megenagna terminal taxi stand. Face the blue minibus row.",
        instructionAm: "ከመገናኛ ታክሲ ማቆሚያ ተነስ። ወደ ሰማያዊዎቹ ሚኒባሶች ፊትህን አዙር።",
        distanceM: 0,
        nextLandmark: "Bus terminal main gate",
      },
      {
        order: 2,
        photo: img("photo-1502602898657-3e91760cbb34", 1600, 2000),
        instructionEn: "Cross to the terminal's main gate. Keep the red kiosk on your right.",
        instructionAm: "ወደ ዋናው የጣቢያ በር ተሻገር። ቀዩ ኪዮስክ በቀኝህ ይሁን።",
        distanceM: 90,
        nextLandmark: "Row of spice stalls",
      },
      {
        order: 3,
        photo: img("photo-1542838132-92c53300491e", 1600, 2000),
        instructionEn: "Walk past two rows of spice stalls. Follow the scent of berbere and shiro.",
        instructionAm: "ሁለት ረድፍ የቅመም መሸጫዎችን አልፍ። የበርበሬና ሽሮ ሽታ ተከተል።",
        distanceM: 220,
        nextLandmark: "Crafts alley entrance",
      },
      {
        order: 4,
        photo: img("photo-1518709268805-4e9042af2176", 1600, 2000),
        instructionEn: "The crafts alley opens on your left, marked by hanging baskets.",
        instructionAm: "የእጅ ስራ መተላለፊያ በግራህ ይከፈታል፣ በተንጠለጠሉ ቅርጫቶች ምልክት ያለው።",
        distanceM: 310,
      },
    ],
    reviews: [],
  },
  {
    id: "taitu-hotel",
    name: "Itegue Taitu Hotel",
    category: "Hotel",
    neighborhoodId: "piazza",
    priceLevel: 2,
    priceRange: "1,800–3,500 ETB / night",
    hero: img("photo-1566073771259-6a8506099945"),
    gallery: [img("photo-1566073771259-6a8506099945", 1600, 1000)],
    landmark: "Piazza center, uphill from the bank, the wooden colonial facade.",
    description: "Africa's first hotel, opened 1898. Vegetarian buffet daily; ask about jazz nights.",
    hours: "24 hours",
    openNow: true,
    payments: ["Cash", "Card", "TeleBirr"],
    phone: "+251 11 156 0787",
    rating: 4.2,
    reviewCount: 980,
    verified: true,
    goodFor: ["History", "Stay", "Buffet"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1566073771259-6a8506099945", 1600, 2000),
        instructionEn: "From Piazza taxi stop, walk uphill. The wooden colonial building is unmistakable.",
        instructionAm: "ከፒያሳ ታክሲ ማቆሚያ ወደ ላይ ሂድ። የእንጨት የቅኝ ግዛት ሕንፃው ግልጽ ነው።",
        distanceM: 0,
      },
    ],
    reviews: [],
  },
  {
    id: "yod-abyssinia",
    name: "Yod Abyssinia",
    category: "Restaurant",
    neighborhoodId: "bole",
    priceLevel: 3,
    priceRange: "400–800 ETB",
    hero: img("photo-1414235077428-338989a2e8c0"),
    gallery: [img("photo-1414235077428-338989a2e8c0", 1600, 1000)],
    landmark: "Off the Bole road, behind the Total petrol station with the red roof.",
    description: "Cultural restaurant with live azmari music and traditional dance every night.",
    hours: "Daily 12:00–01:00",
    openNow: true,
    payments: ["Cash", "Card", "TeleBirr"],
    phone: "+251 11 661 2299",
    rating: 4.5,
    reviewCount: 1450,
    verified: true,
    popular: true,
    goodFor: ["Tourists", "Groups", "Music"],
    checkpoints: [
      {
        order: 1,
        photo: img("photo-1444723121867-7a241cacace9", 1600, 2000),
        instructionEn: "Look for the red-roofed Total station on Bole road.",
        instructionAm: "በቦሌ መንገድ ላይ ቀይ ጣሪያ ያለውን Total ማደሻ ፈልግ።",
        distanceM: 0,
      },
      {
        order: 2,
        photo: img("photo-1414235077428-338989a2e8c0", 1600, 2000),
        instructionEn: "Turn into the side street behind it. Yod's grass-roofed entrance is at the end.",
        instructionAm: "ወደ ጀርባው የጎን መንገድ ታጠፍ። የዮድ ሣር ጣሪያ መግቢያ መጨረሻ ላይ ነው።",
        distanceM: 200,
      },
    ],
    reviews: [],
  },
];

export const getPlaceById = (id: string) => places.find((p) => p.id === id);
export const getPlacesByNeighborhood = (n: string | "all") =>
  n === "all" ? places : places.filter((p) => p.neighborhoodId === n);

export type Bounty = {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  type: "Verify" | "Photo" | "Hours" | "Translate" | "Audit";
  reward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  expiresIn: string;
};

export const bounties: Bounty[] = [
  {
    id: "b1",
    title: "Verify 'Old Coffee House' Closure",
    description: "Walk by and confirm whether this place is still operating.",
    neighborhood: "Arat Kilo",
    type: "Verify",
    reward: 150,
    difficulty: "Easy",
    expiresIn: "5 days",
  },
  {
    id: "b2",
    title: "New Photo for Lion Zoo Entrance",
    description: "Capture a clear daytime photo of the entrance gate for navigation.",
    neighborhood: "Siddist Kilo",
    type: "Photo",
    reward: 85,
    difficulty: "Easy",
    expiresIn: "10 days",
  },
  {
    id: "b3",
    title: "Update hours: Addis Fine Arts (Sheraton)",
    description: "Call and confirm current weekday and weekend hours.",
    neighborhood: "Kirkos",
    type: "Hours",
    reward: 75,
    difficulty: "Easy",
    expiresIn: "3 days",
  },
  {
    id: "b4",
    title: "Translate menu: Habesha 2000",
    description: "Translate the full Amharic menu to English. Owner has approved.",
    neighborhood: "Bole",
    type: "Translate",
    reward: 350,
    difficulty: "Medium",
    expiresIn: "14 days",
  },
  {
    id: "b5",
    title: "Add 5 checkpoint photos: Castelli Restaurant",
    description: "Walk the route from Piazza taxi stop and capture 5 landmark photos.",
    neighborhood: "Piazza",
    type: "Photo",
    reward: 280,
    difficulty: "Medium",
    expiresIn: "7 days",
  },
];

export type Trip = {
  id: string;
  name: string;
  date: string;
  status: "Upcoming" | "Past" | "Draft";
  placeIds: string[];
  estTimeMin: number;
  estCostETB: number;
};

export const trips: Trip[] = [
  {
    id: "t1",
    name: "Piazza coffee crawl",
    date: "Sat · Mar 22",
    status: "Upcoming",
    placeIds: ["tomoca-piazza", "taitu-hotel"],
    estTimeMin: 180,
    estCostETB: 850,
  },
  {
    id: "t2",
    name: "First night in Addis",
    date: "Tonight",
    status: "Upcoming",
    placeIds: ["yod-abyssinia", "lideta-rooftop"],
    estTimeMin: 240,
    estCostETB: 1800,
  },
  {
    id: "t3",
    name: "Bole food tour",
    date: "Last Sunday",
    status: "Past",
    placeIds: ["kategna-bole", "yod-abyssinia"],
    estTimeMin: 200,
    estCostETB: 1200,
  },
];

export const scoutProfile = {
  name: "Dawit Mekonnen",
  level: 4,
  title: "Coffee Specialist",
  totalEarnings: 2450,
  pendingPayout: 235,
  placesVerified: 32,
  accuracy: 96,
  neighborhoods: ["Piazza", "Arat Kilo", "Sarbet"],
};
