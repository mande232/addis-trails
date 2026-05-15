import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaceCard } from "@/components/PlaceCard";
import { neighborhoods, getPlacesByNeighborhood } from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Araat Kilo — Discover Addis Ababa by neighborhood" },
      { name: "description", content: "Browse cafes, restaurants, and landmarks across Bole, Piazza, Kazanchis and more. Verified by local scouts." },
      { property: "og:title", content: "Araat Kilo — Discover Addis Ababa by neighborhood" },
      { property: "og:description", content: "Find places in Addis the way locals do." },
    ],
  }),
  component: Index,
});

const categories = ["All", "Cafe", "Restaurant", "Bar", "Hotel", "Shopping", "Cultural"] as const;
type Cat = (typeof categories)[number];

function Index() {
  const [hood, setHood] = useState<string>("all");
  const [cat, setCat] = useState<Cat>("All");
  const [openOnly, setOpenOnly] = useState(false);

  let places = getPlacesByNeighborhood(hood);
  if (cat !== "All") places = places.filter((p) => p.category === cat);
  if (openOnly) places = places.filter((p) => p.openNow);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 animate-entry">
        <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-[0.25em] text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          A city by landmark · በመለያ ቦታ
        </div>
        <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
          Where are you <span className="italic text-primary">headed</span> in Addis?
        </h1>
        <p className="mt-6 text-lg text-foreground/70 max-w-2xl leading-relaxed">
          Skip the broken addresses. Browse places by neighborhood, then follow
          a guide of <em>landmarks</em> — bank towers, painted gates, the
          church on the corner — straight to the door.
        </p>
      </section>

      {/* Neighborhood chips */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50">
            Neighborhood
          </h2>
          <span className="text-xs font-mono opacity-50">{places.length} places</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          <Chip active={hood === "all"} onClick={() => setHood("all")}>
            All Areas
          </Chip>
          {neighborhoods.map((n) => (
            <Chip key={n.id} active={hood === n.id} onClick={() => setHood(n.id)}>
              {n.name} <span className="font-amharic opacity-60 ml-1">{n.amharic}</span>
            </Chip>
          ))}
        </div>

        {/* Sub filters */}
        <div className="flex flex-wrap items-center gap-2 mt-2 mb-10 pb-6 border-b border-border">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                cat === c
                  ? "bg-foreground text-background"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
              className="accent-primary size-3.5"
            />
            Open now
          </label>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {places.length === 0 ? (
          <div className="text-center py-24 text-foreground/50">
            No places match these filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {places.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        )}
      </section>

      {/* Scout teaser */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <div className="tibeb-border h-1 mb-12 opacity-60" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] mb-4 text-primary">
              Local scouts
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              Help others find their way, earn ETB.
            </h2>
            <p className="mt-6 text-foreground/70 max-w-md">
              Verify places, photograph landmarks, translate menus. Get paid to TeleBirr.
            </p>
          </div>
          <div>
            <Link
              to="/scout"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary transition-colors"
            >
              Open scout board
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-foreground text-background"
          : "border border-border hover:border-primary/50 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
