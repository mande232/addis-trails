import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getPlaceById, type Place } from "@/data/mockData";
import { vibeMap } from "@/data/vibe";

export const Route = createFileRoute("/places/$placeId/navigate")({
  loader: ({ params }): { place: Place } => {
    const place = getPlaceById(params.placeId);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Navigating to ${loaderData.place.name} — Araat Kilo` },
          { name: "description", content: `Landmark-by-landmark walking guide to ${loaderData.place.name}.` },
        ]
      : [],
  }),
  component: NavigatePage,
});

function NavigatePage() {
  const { place } = Route.useLoaderData() as { place: Place };
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showOverview, setShowOverview] = useState(false);
  const total = place.checkpoints.length;
  const cp = place.checkpoints[step];
  const progress = ((step + 1) / total) * 100;
  const arrived = step === total - 1;
  const totalDistance = place.checkpoints[total - 1]?.distanceM ?? 0;
  const remainingDistance = Math.max(totalDistance - cp.distanceM, 0);

  const coord = vibeMap[place.id];
  const mapSrc = coord
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coord.lng - 0.004}%2C${coord.lat - 0.003}%2C${coord.lng + 0.004}%2C${coord.lat + 0.003}&layer=mapnik&marker=${coord.lat}%2C${coord.lng}`
    : null;

  return (
    <div className="min-h-screen bg-foreground text-background flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-5 border-b border-background/10 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/places/$placeId", params: { placeId: place.id } })}
          className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 hover:opacity-100"
        >
          ← Exit route
        </button>
        <div className="flex items-center gap-4">
          <span className="text-primary font-bold tracking-tighter uppercase text-xs">Live route</span>
          <span className="text-[10px] font-mono opacity-50">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={() => setShowOverview((v) => !v)}
            className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60 hover:opacity-100 border border-background/20 px-3 py-1.5"
          >
            {showOverview ? "Hide route" : "All checkpoints"}
          </button>
        </div>
      </header>

      <div className="px-6 py-6 border-b border-background/10">
        <div className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-1">Walking to</div>
        <h1 className="font-serif italic text-3xl md:text-4xl">{place.name}</h1>
      </div>

      {/* Overview drawer */}
      {showOverview && (
        <div className="border-b border-background/10 bg-background/5 animate-fade">
          <div className="px-6 py-6 max-h-[55vh] overflow-y-auto">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-4">
              Route overview · {total} checkpoints · {totalDistance}m total
            </div>
            <ol className="space-y-3">
              {place.checkpoints.map((c, i) => {
                const isCurrent = i === step;
                const isPast = i < step;
                return (
                  <li key={c.order}>
                    <button
                      onClick={() => {
                        setStep(i);
                        setShowOverview(false);
                      }}
                      className={`w-full text-left flex gap-4 p-3 border transition-colors ${
                        isCurrent
                          ? "border-primary bg-primary/10"
                          : "border-background/10 hover:border-background/30"
                      }`}
                    >
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-neutral-800 relative">
                        <img src={c.photo} alt="" className="w-full h-full object-cover" />
                        {isPast && (
                          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center text-background text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-[0.25em] ${
                              isCurrent ? "text-primary" : "opacity-50"
                            }`}
                          >
                            CP {String(c.order).padStart(2, "0")} · {c.distanceM}m
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">
                              You are here
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-snug">{c.instructionEn}</p>
                        {c.nextLandmark && (
                          <p className="text-xs opacity-60 mt-1">→ {c.nextLandmark}</p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}

      {/* Main canvas */}
      <div className="flex-1 flex flex-col md:flex-row animate-fade" key={step}>
        <div className="w-full md:w-3/5 h-[55vh] md:h-auto relative bg-neutral-800">
          <img
            src={cp.photo}
            alt={`Checkpoint ${cp.order}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-background/90 text-foreground px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em]">
            Checkpoint {String(cp.order).padStart(2, "0")}
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <h2 className="text-xl md:text-2xl font-medium leading-snug max-w-2xl">
              {cp.instructionEn}
            </h2>
            <p className="text-primary text-lg md:text-2xl font-amharic font-medium leading-snug mt-3 max-w-2xl">
              {cp.instructionAm}
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            {cp.nextLandmark && !arrived && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 block">
                  Next landmark
                </span>
                <p className="text-lg leading-snug">{cp.nextLandmark}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 block">
                  Walked
                </span>
                <p className="text-3xl font-serif italic">{cp.distanceM}m</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 block">
                  Remaining
                </span>
                <p className="text-3xl font-serif italic text-primary">{remainingDistance}m</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] opacity-40">
                <span>Journey progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-background/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex gap-1 pt-2">
                {place.checkpoints.map((c, i) => (
                  <button
                    key={c.order}
                    onClick={() => setStep(i)}
                    aria-label={`Jump to checkpoint ${c.order}`}
                    className={`flex-1 h-1.5 transition-colors ${
                      i <= step ? "bg-primary" : "bg-background/15 hover:bg-background/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mini-map */}
            {mapSrc && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] opacity-40">
                    Destination on map
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${coord!.lat},${coord!.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary hover:underline"
                  >
                    Open in Maps ↗
                  </a>
                </div>
                <div className="relative h-36 border border-background/15 overflow-hidden">
                  <iframe
                    title={`Map of ${place.name}`}
                    src={mapSrc}
                    className="absolute inset-0 w-full h-full grayscale contrast-125 brightness-90"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-background/10" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {arrived ? (
              <Link
                to="/places/$placeId"
                params={{ placeId: place.id }}
                className="block w-full py-5 bg-primary text-primary-foreground font-bold uppercase tracking-[0.25em] text-sm text-center hover:bg-background hover:text-foreground transition-colors"
              >
                You've arrived ✓
              </Link>
            ) : (
              <button
                onClick={() => setStep((s) => Math.min(s + 1, total - 1))}
                className="w-full py-5 bg-background text-foreground font-bold uppercase tracking-[0.25em] text-sm hover:bg-primary hover:text-background transition-colors"
              >
                I've reached this point
              </button>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                disabled={step === 0}
                className="flex-1 py-3 border border-background/20 text-xs font-medium uppercase tracking-[0.2em] hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <a
                href={`tel:${place.phone}`}
                className="flex-1 py-3 border border-background/20 text-xs font-medium uppercase tracking-[0.2em] hover:border-primary text-center transition-colors"
              >
                Call place
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
