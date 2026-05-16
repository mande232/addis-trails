import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { places, neighborhoods } from "@/data/mockData";
import { vibeMap, powerDot, powerLabel, crowdLabel } from "@/data/vibe";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map explorer — Araat Kilo" },
      { name: "description", content: "Browse Addis Ababa places on the map. Filter by neighborhood and live vibe." },
      { property: "og:title", content: "Map explorer — Araat Kilo" },
      { property: "og:description", content: "Find places across Addis on a live map." },
    ],
  }),
  component: MapView,
});

const ADDIS_BBOX = "38.65,8.92,38.88,9.08"; // lon-min, lat-min, lon-max, lat-max
const ADDIS_CENTER = { lat: 9.005, lng: 38.763 };

function MapView() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(places[0]?.id ?? "");

  const filtered = places.filter(
    (p) =>
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.landmark.toLowerCase().includes(query.toLowerCase()),
  );

  const selected = places.find((p) => p.id === selectedId);
  const v = selected ? vibeMap[selected.id] : undefined;

  const marker = v ?? ADDIS_CENTER;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${ADDIS_BBOX}&layer=mapnik&marker=${marker.lat},${marker.lng}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <section className="max-w-7xl mx-auto w-full px-6 pt-10 pb-6 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
          Map · ካርታ
        </div>
        <h1 className="font-serif text-4xl md:text-5xl italic">The city, at a glance.</h1>
        <p className="text-foreground/70 mt-3 max-w-xl">
          Tap a place to recenter the map and see its live vibe — power, wifi, and crowd.
        </p>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 pb-16 grid lg:grid-cols-[360px_1fr] gap-6">
        {/* List */}
        <div className="border border-border rounded-lg bg-card flex flex-col max-h-[70vh]">
          <div className="p-4 border-b border-border">
            <input
              type="search"
              placeholder="Search by name or landmark…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mt-2">
              {filtered.length} of {places.length}
            </div>
          </div>
          <div className="overflow-y-auto divide-y divide-border">
            {filtered.map((p) => {
              const vp = vibeMap[p.id];
              const hood = neighborhoods.find((n) => n.id === p.neighborhoodId);
              const active = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-4 transition-colors ${
                    active ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    {vp && (
                      <span className={`size-2 rounded-full shrink-0 ${powerDot[vp.power]}`} />
                    )}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 mt-1">
                    {p.category} · {hood?.name}
                  </div>
                  <div className="text-xs text-foreground/60 mt-1 truncate">{p.landmark}</div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="p-6 text-sm text-foreground/50 text-center">No matches.</div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="border border-border rounded-lg overflow-hidden bg-muted flex flex-col">
          <div className="aspect-[16/10] lg:aspect-auto lg:flex-1 relative">
            <iframe
              key={mapSrc}
              src={mapSrc}
              title="Addis Ababa map"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>

          {selected && (
            <div className="p-5 border-t border-border bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif italic text-2xl">{selected.name}</h3>
                  <p className="text-sm text-foreground/60 mt-1 max-w-md">{selected.landmark}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link
                    to="/places/$placeId"
                    params={{ placeId: selected.id }}
                    className="text-[10px] font-bold uppercase tracking-[0.25em] bg-foreground text-background px-4 py-2.5 hover:bg-primary transition-colors text-center"
                  >
                    Details
                  </Link>
                  <Link
                    to="/places/$placeId/navigate"
                    params={{ placeId: selected.id }}
                    className="text-[10px] font-bold uppercase tracking-[0.25em] border border-border px-4 py-2.5 hover:border-primary hover:text-primary transition-colors text-center"
                  >
                    Navigate
                  </Link>
                </div>
              </div>
              {v && (
                <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border text-xs">
                  <Vibe label={powerLabel[v.power]} dot={powerDot[v.power]} />
                  <Vibe label={`Wifi · ${v.wifiMbps} Mbps`} dot={v.wifiMbps > 15 ? "bg-success" : v.wifiMbps > 0 ? "bg-accent" : "bg-destructive"} />
                  <Vibe label={`Crowd · ${crowdLabel[v.crowd]}`} dot="bg-primary" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Vibe({ label, dot }: { label: string; dot: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2 rounded-full ${dot}`} />
      <span className="font-medium">{label}</span>
    </div>
  );
}
