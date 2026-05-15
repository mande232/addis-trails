import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getPlaceById, type Place } from "@/data/mockData";

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
  const total = place.checkpoints.length;
  const cp = place.checkpoints[step];
  const progress = ((step + 1) / total) * 100;
  const arrived = step === total - 1;

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
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold tracking-tighter uppercase text-xs">Live route</span>
          <span className="text-[10px] font-mono opacity-50">
            Checkpoint {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </header>

      <div className="px-6 py-6 border-b border-background/10">
        <div className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-1">Walking to</div>
        <h1 className="font-serif italic text-3xl md:text-4xl">{place.name}</h1>
      </div>

      {/* Main canvas */}
      <div className="flex-1 flex flex-col md:flex-row animate-fade" key={step}>
        <div className="w-full md:w-3/5 h-[55vh] md:h-auto relative bg-neutral-800">
          <img
            src={cp.photo}
            alt={`Checkpoint ${cp.order}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
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
          <div className="space-y-8">
            {cp.nextLandmark && !arrived && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 block">
                  Next landmark
                </span>
                <p className="text-lg leading-snug">{cp.nextLandmark}</p>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] opacity-40 mb-2 block">
                Distance from start
              </span>
              <p className="text-5xl font-serif italic">{cp.distanceM}m</p>
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
            </div>
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
