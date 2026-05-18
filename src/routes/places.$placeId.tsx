import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPlaceById, neighborhoods, type Place } from "@/data/mockData";

export const Route = createFileRoute("/places/$placeId")({
  loader: ({ params }): { place: Place } => {
    const place = getPlaceById(params.placeId);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.place.name} — Araat Kilo` },
          { name: "description", content: loaderData.place.description },
          { property: "og:title", content: `${loaderData.place.name} — Araat Kilo` },
          { property: "og:description", content: loaderData.place.landmark },
          { property: "og:image", content: loaderData.place.hero },
          { name: "twitter:image", content: loaderData.place.hero },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-serif italic text-3xl">Place not found</p>
        <Link to="/" className="text-primary mt-4 inline-block underline">Back to discover</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <p className="font-serif italic text-2xl mb-2">Something broke loading this place.</p>
        <p className="text-sm text-foreground/60">{error.message}</p>
      </div>
    </div>
  ),
  component: PlacePage,
});

function PlacePage() {
  const { place } = Route.useLoaderData() as { place: Place };
  const [activeImg, setActiveImg] = useState(0);
  const hood = neighborhoods.find((n) => n.id === place.neighborhoodId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero gallery */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <Link to="/" className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 hover:text-primary">
          ← Back to discover
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-8 aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-border bg-muted relative">
            <img src={place.gallery[activeImg]} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {place.verified && (
                <span className="bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-sm">
                  Verified
                </span>
              )}
              {place.recentlyVerified && (
                <span className="bg-background/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-sm">
                  Updated this week
                </span>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3">
            {place.gallery.slice(0, 3).map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[4/3] rounded-md overflow-hidden ring-1 transition-all ${
                  activeImg === i ? "ring-primary ring-2" : "ring-border opacity-70 hover:opacity-100"
                }`}
              >
                <img src={g} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Title bar */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 mb-2">
              <span>{place.category}</span>
              <span className="size-1 rounded-full bg-foreground/30" />
              <span>{hood?.name} · <span className="font-amharic">{hood?.amharic}</span></span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl italic tracking-tight">{place.name}</h1>
            <p className="mt-4 max-w-2xl text-foreground/70 leading-relaxed">{place.description}</p>
          </div>
          <div className="flex flex-col gap-3 min-w-[220px]">
            <Link
              to="/places/$placeId_/navigate"
              params={{ placeId: place.id }}
              className="bg-primary text-primary-foreground px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-foreground transition-colors text-center"
            >
              Start navigation →
            </Link>
            <a
              href={`tel:${place.phone}`}
              className="border border-border px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              Call · {place.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Landmark callout */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-foreground text-background p-8 md:p-10 rounded-lg">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
            How to find it · መለያ ቦታ
          </div>
          <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-3xl">
            {place.landmark}
          </p>
          <div className="flex items-center gap-6 mt-8 text-xs uppercase tracking-[0.2em] opacity-60">
            <span>{place.checkpoints.length} checkpoints</span>
            <span>·</span>
            <span>~{place.checkpoints[place.checkpoints.length - 1]?.distanceM ?? 0}m walk</span>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <InfoBlock label="Hours">
          <div className="flex items-center gap-2 mb-2">
            <span className={`size-2 rounded-full ${place.openNow ? "bg-success" : "bg-destructive"}`} />
            <span className="font-medium text-sm">{place.openNow ? "Open now" : "Closed"}</span>
          </div>
          <p className="text-foreground/70">{place.hours}</p>
        </InfoBlock>
        <InfoBlock label="Price">
          <p className="font-serif italic text-2xl">{place.priceRange}</p>
          <p className="mt-2 text-foreground/70">
            {"$".repeat(place.priceLevel)}
            <span className="text-foreground/30">{"$".repeat(4 - place.priceLevel)}</span>
          </p>
        </InfoBlock>
        <InfoBlock label="Payments">
          <div className="flex flex-wrap gap-2">
            {place.payments.map((p) => (
              <span key={p} className="text-xs px-2 py-1 border border-border rounded-sm font-medium">
                {p}
              </span>
            ))}
          </div>
        </InfoBlock>
        <InfoBlock label="Rating">
          <p className="font-serif italic text-2xl">{place.rating.toFixed(1)} <span className="text-foreground/40 text-base">/ 5</span></p>
          <p className="mt-1 text-foreground/70 text-xs">{place.reviewCount.toLocaleString()} reviews</p>
        </InfoBlock>
        <InfoBlock label="Good for">
          <div className="flex flex-wrap gap-2">
            {place.goodFor.map((g) => (
              <span key={g} className="text-xs px-2 py-1 bg-secondary rounded-sm">{g}</span>
            ))}
          </div>
        </InfoBlock>
        <InfoBlock label="Contact">
          <p className="text-foreground/70 text-sm">{place.phone}</p>
        </InfoBlock>
      </section>

      {/* Reviews */}
      {place.reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="tibeb-border h-1 mb-10 opacity-50" />
          <h2 className="font-serif italic text-3xl mb-6">What locals say</h2>
          <div className="space-y-6">
            {place.reviews.map((r) => (
              <div key={r.id} className="border border-border p-6 rounded-lg">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-medium">{r.author}</span>
                  <span className="text-xs font-mono opacity-50">{r.date}</span>
                </div>
                <div className="text-accent text-sm mb-2">{"★".repeat(r.rating)}<span className="opacity-30">{"★".repeat(5 - r.rating)}</span></div>
                <p className="text-foreground/80 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 mb-3 pb-2 border-b border-border">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
