import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { bounties, scoutProfile } from "@/data/mockData";

export const Route = createFileRoute("/scout")({
  head: () => ({
    meta: [
      { title: "Scout dashboard — Araat Kilo" },
      { name: "description", content: "Claim bounties to verify Addis places. Earn ETB to your TeleBirr wallet." },
      { property: "og:title", content: "Scout dashboard — Araat Kilo" },
      { property: "og:description", content: "Earn ETB by keeping the city map alive." },
    ],
  }),
  component: ScoutPage,
});

function ScoutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">
          Scout · ስካውት
        </div>
        <h1 className="font-serif text-5xl md:text-6xl italic leading-tight max-w-3xl">
          Help others find their way, earn ETB.
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10 pb-16">
        {/* Left: bounties */}
        <div className="lg:col-span-2">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50">
              Available bounties · {bounties.length}
            </h2>
            <span className="text-xs font-mono opacity-50">Sorted by reward</span>
          </div>
          <div className="space-y-4">
            {bounties.map((b) => (
              <div
                key={b.id}
                className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex gap-5 items-start">
                  <div className="size-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">{b.type[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 leading-tight">{b.title}</h3>
                    <p className="text-sm text-foreground/60 mb-3 max-w-md">{b.description}</p>
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em]">
                      <span className="text-primary font-bold">{b.type}</span>
                      <span className="size-1 rounded-full bg-foreground/30" />
                      <span className="opacity-60">{b.neighborhood}</span>
                      <span className="size-1 rounded-full bg-foreground/30" />
                      <span className="opacity-60">{b.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 self-end md:self-auto">
                  <div className="text-right">
                    <p className="font-serif italic text-2xl">{b.reward}<span className="text-sm font-sans not-italic ml-1 opacity-60">ETB</span></p>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">expires {b.expiresIn}</p>
                  </div>
                  <button className="bg-foreground text-background px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-primary transition-colors">
                    Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: scout profile */}
        <aside className="space-y-6">
          <div className="bg-foreground text-background rounded-lg p-6">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-4">
              Your profile
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-full bg-primary text-primary-foreground font-serif italic text-2xl flex items-center justify-center">
                {scoutProfile.name[0]}
              </div>
              <div>
                <div className="font-medium">{scoutProfile.name}</div>
                <div className="text-xs opacity-60">
                  Level {scoutProfile.level} · {scoutProfile.title}
                </div>
              </div>
            </div>

            <dl className="space-y-3 text-sm">
              <Stat label="Total earnings" value={`${scoutProfile.totalEarnings.toLocaleString()} ETB`} />
              <Stat label="Pending payout" value={`${scoutProfile.pendingPayout} ETB`} accent />
              <Stat label="Places verified" value={String(scoutProfile.placesVerified)} />
              <Stat label="Accuracy" value={`${scoutProfile.accuracy}%`} />
            </dl>

            <button className="w-full mt-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors">
              Withdraw to TeleBirr
            </button>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/50 mb-3">
              Specialty areas
            </div>
            <div className="flex flex-wrap gap-2">
              {scoutProfile.neighborhoods.map((n) => (
                <span key={n} className="text-xs px-2.5 py-1 bg-secondary rounded-sm">{n}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-baseline border-b border-background/10 pb-2">
      <dt className="text-xs opacity-60">{label}</dt>
      <dd className={`font-serif italic text-lg ${accent ? "text-primary" : ""}`}>{value}</dd>
    </div>
  );
}
