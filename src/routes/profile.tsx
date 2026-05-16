import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { scoutProfile } from "@/data/mockData";
import { submissions, badges } from "@/data/vibe";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: `${scoutProfile.name} — Scout profile · Araat Kilo` },
      { name: "description", content: "Scout earnings, badges, and activity on Araat Kilo." },
      { property: "og:title", content: "Scout profile — Araat Kilo" },
      { property: "og:description", content: "Track your bounties, badges, and payouts." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const nextLevelAt = (scoutProfile.level + 1) * 1000;
  const pctToNext = Math.min(100, Math.round((scoutProfile.totalEarnings / nextLevelAt) * 100));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">
          Profile · መገለጫ
        </div>
        <div className="flex items-end gap-6 flex-wrap">
          <div className="size-24 rounded-full bg-foreground text-background font-serif italic text-5xl flex items-center justify-center">
            {scoutProfile.name[0]}
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-5xl italic leading-tight">{scoutProfile.name}</h1>
            <p className="text-foreground/60 mt-1">
              Level {scoutProfile.level} · {scoutProfile.title} · Addis Ababa
            </p>
          </div>
          <Link
            to="/scout"
            className="bg-primary text-primary-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-foreground transition-colors"
          >
            Find bounties
          </Link>
        </div>

        {/* level progress */}
        <div className="mt-10">
          <div className="flex justify-between text-xs font-mono uppercase tracking-[0.2em] opacity-60 mb-2">
            <span>Level {scoutProfile.level}</span>
            <span>{scoutProfile.totalEarnings.toLocaleString()} / {nextLevelAt.toLocaleString()} ETB</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${pctToNext}%` }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <Stat label="Total earned" value={`${scoutProfile.totalEarnings.toLocaleString()} ETB`} />
        <Stat label="Pending" value={`${scoutProfile.pendingPayout} ETB`} accent />
        <Stat label="Verified" value={String(scoutProfile.placesVerified)} />
        <Stat label="Accuracy" value={`${scoutProfile.accuracy}%`} />
      </section>

      {/* Badges */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] opacity-50 mb-5">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`border rounded-lg p-5 text-center ${
                b.earned ? "border-primary bg-primary/5" : "border-border opacity-50"
              }`}
            >
              <div className={`size-12 mx-auto rounded-full mb-3 flex items-center justify-center font-serif italic text-xl ${
                b.earned ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}>
                {b.name[0]}
              </div>
              <div className="font-medium text-sm">{b.name}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] mt-1 opacity-60">
                {b.earned ? "Earned" : b.hint}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] opacity-50 mb-5">Recent activity</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          {submissions.map((s, i) => (
            <div
              key={s.id}
              className={`flex justify-between items-center gap-4 p-5 ${
                i !== submissions.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{s.bountyTitle}</div>
                <div className="text-xs font-mono opacity-50 mt-0.5">{s.submittedAt}</div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                    s.status === "Approved"
                      ? "text-success"
                      : s.status === "Rejected"
                      ? "text-destructive"
                      : "text-accent"
                  }`}
                >
                  {s.status}
                </span>
                <span className="font-serif italic text-lg w-24 text-right">
                  {s.reward > 0 ? `${s.reward} ETB` : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border rounded-lg p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">{label}</div>
      <div className={`font-serif italic text-3xl mt-1 ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
