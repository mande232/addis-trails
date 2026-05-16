// Lightweight vibe / live-signal extensions for the existing places dataset.
// Kept separate so the canonical mockData.Place type stays stable.

export type PowerStatus = "stable" | "flicker" | "down";
export type CrowdLevel = "quiet" | "lively" | "packed";

export type VibeSignal = {
  placeId: string;
  lat: number;
  lng: number;
  power: PowerStatus;
  wifiMbps: number;
  crowd: CrowdLevel;
  vibeScore: number; // 0–100
  updatedMinAgo: number;
};

// Approximate Addis Ababa coordinates per landmark
export const vibeMap: Record<string, VibeSignal> = {
  "tomoca-piazza": {
    placeId: "tomoca-piazza",
    lat: 9.0357, lng: 38.7517,
    power: "stable", wifiMbps: 18, crowd: "lively", vibeScore: 88, updatedMinAgo: 12,
  },
  "kategna-bole": {
    placeId: "kategna-bole",
    lat: 8.9931, lng: 38.7892,
    power: "stable", wifiMbps: 42, crowd: "packed", vibeScore: 92, updatedMinAgo: 6,
  },
  "lideta-rooftop": {
    placeId: "lideta-rooftop",
    lat: 9.0136, lng: 38.7642,
    power: "flicker", wifiMbps: 9, crowd: "quiet", vibeScore: 71, updatedMinAgo: 41,
  },
  "shola-crafts": {
    placeId: "shola-crafts",
    lat: 9.0192, lng: 38.8011,
    power: "down", wifiMbps: 0, crowd: "packed", vibeScore: 63, updatedMinAgo: 22,
  },
  "taitu-hotel": {
    placeId: "taitu-hotel",
    lat: 9.0361, lng: 38.7521,
    power: "stable", wifiMbps: 24, crowd: "lively", vibeScore: 82, updatedMinAgo: 18,
  },
  "yod-abyssinia": {
    placeId: "yod-abyssinia",
    lat: 8.9889, lng: 38.7913,
    power: "stable", wifiMbps: 30, crowd: "packed", vibeScore: 90, updatedMinAgo: 9,
  },
};

export const powerLabel: Record<PowerStatus, string> = {
  stable: "Power · stable",
  flicker: "Power · flickering",
  down: "Power · out",
};

export const crowdLabel: Record<CrowdLevel, string> = {
  quiet: "Quiet",
  lively: "Lively",
  packed: "Packed",
};

export const powerDot: Record<PowerStatus, string> = {
  stable: "bg-success",
  flicker: "bg-accent",
  down: "bg-destructive",
};

// Demo bounty submissions for the scout dashboard
export type Submission = {
  id: string;
  bountyTitle: string;
  status: "Pending review" | "Approved" | "Rejected";
  submittedAt: string;
  reward: number;
};

export const submissions: Submission[] = [
  { id: "s1", bountyTitle: "Verify Castelli hours", status: "Approved", submittedAt: "2 days ago", reward: 120 },
  { id: "s2", bountyTitle: "Photo: Lion Zoo entrance", status: "Pending review", submittedAt: "9 hrs ago", reward: 85 },
  { id: "s3", bountyTitle: "Translate menu: Habesha 2000", status: "Approved", submittedAt: "1 week ago", reward: 350 },
  { id: "s4", bountyTitle: "Audit: Bole Friday market", status: "Rejected", submittedAt: "3 weeks ago", reward: 0 },
];

export const badges = [
  { id: "b1", name: "Coffee Specialist", earned: true, hint: "Verify 25 cafes" },
  { id: "b2", name: "Piazza Local", earned: true, hint: "10 bounties in Piazza" },
  { id: "b3", name: "Night Owl", earned: true, hint: "5 after-dark verifications" },
  { id: "b4", name: "Translator", earned: false, hint: "Submit 10 EN/AM translations" },
  { id: "b5", name: "Cartographer", earned: false, hint: "Add 50 checkpoint photos" },
];

export const pendingVideos = [
  { id: "v1", place: "Yod Abyssinia", scout: "Hanna M.", submittedAt: "12 min ago", flagged: false },
  { id: "v2", place: "Kategna Bole", scout: "Dawit M.", submittedAt: "1 hr ago", flagged: true },
  { id: "v3", place: "Tomoca Piazza", scout: "Selam T.", submittedAt: "3 hrs ago", flagged: false },
];
