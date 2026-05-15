import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trips, getPlaceById } from "@/data/mockData";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Your trips — Araat Kilo" },
      { name: "description", content: "Plan multi-stop itineraries through Addis. Estimate taxi fare, time, and total spend." },
      { property: "og:title", content: "Your trips — Araat Kilo" },
      { property: "og:description", content: "Multi-stop itineraries through Addis." },
    ],
  }),
  component: TripsPage,
});

function TripsPage() {
  const upcoming = trips.filter((t) => t.status === "Upcoming");
  const past = trips.filter((t) => t.status === "Past");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Itinerary</div>
        <h1 className="font-serif text-5xl md:text-6xl italic leading-tight">Your trips through Addis.</h1>
        <p className="mt-6 text-foreground/70 max-w-xl">
          Stitch saved places into a route. We'll estimate the walking time,
          taxi fare, and which stops are cash-only so nothing surprises you.
        </p>
        <button className="mt-8 bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-foreground transition-colors">
          + New trip
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 mb-6">
          Upcoming
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcoming.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 pb-16">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 mb-6">
          Past
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {past.map((t) => (
            <TripCard key={t.id} trip={t} dim />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TripCard({ trip, dim = false }: { trip: typeof trips[number]; dim?: boolean }) {
  const stops = trip.placeIds.map(getPlaceById).filter(Boolean);

  return (
    <div className={`border border-border bg-card rounded-lg p-6 ${dim ? "opacity-70" : ""}`}>
      <div className="flex justify-between items-baseline mb-3">
        <h3 className="font-serif italic text-2xl">{trip.name}</h3>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
          {trip.status}
        </span>
      </div>
      <p className="text-xs font-mono opacity-60 mb-5">{trip.date}</p>

      <div className="space-y-3 mb-6">
        {stops.map((p, i) => (
          <Link
            key={p!.id}
            to="/places/$placeId"
            params={{ placeId: p!.id }}
            className="flex items-center gap-3 group"
          >
            <span className="size-6 rounded-full bg-secondary text-foreground/60 text-xs font-mono flex items-center justify-center">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                {p!.name}
              </div>
              <div className="text-xs text-foreground/50 truncate">{p!.landmark}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-between text-xs font-mono pt-4 border-t border-border">
        <span>~{Math.floor(trip.estTimeMin / 60)}h {trip.estTimeMin % 60}m</span>
        <span className="font-bold">{trip.estCostETB.toLocaleString()} ETB</span>
      </div>
    </div>
  );
}
