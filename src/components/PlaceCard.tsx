import { Link } from "@tanstack/react-router";
import type { Place } from "@/data/mockData";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      to="/places/$placeId"
      params={{ placeId: place.id }}
      className="group block animate-entry"
    >
      <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden relative mb-4 ring-1 ring-border">
        <img
          src={place.hero}
          alt={`${place.name} exterior`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {place.payments.includes("TeleBirr") && (
            <span className="bg-background/95 px-2 py-1 text-[9px] font-bold tracking-tighter uppercase rounded-sm shadow-sm">
              TeleBirr
            </span>
          )}
          {place.verified && (
            <span className="bg-accent text-accent-foreground px-2 py-1 text-[9px] font-bold tracking-tighter uppercase rounded-sm shadow-sm">
              Verified
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-[9px] font-bold tracking-tighter uppercase rounded-sm shadow-sm ${
              place.openNow ? "bg-success/95 text-background" : "bg-foreground/85 text-background"
            }`}
          >
            {place.openNow ? "Open" : "Closed"}
          </span>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline gap-3">
          <h3 className="font-serif text-xl italic leading-tight">{place.name}</h3>
          <span className="text-[11px] font-mono opacity-50 whitespace-nowrap">
            {place.priceRange.split(" ")[0]} ETB
          </span>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          <span className="text-primary font-medium">Landmark · </span>
          {place.landmark}
        </p>
      </div>
    </Link>
  );
}
