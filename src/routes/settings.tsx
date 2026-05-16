import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { pendingVideos } from "@/data/vibe";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Araat Kilo" },
      { name: "description", content: "Role-based controls for admins, business owners, and event organizers." },
      { property: "og:title", content: "Settings — Araat Kilo" },
      { property: "og:description", content: "Moderation, live status, and event scheduling." },
    ],
  }),
  component: SettingsPage,
});

type Role = "Admin" | "Owner" | "Organizer";
const ROLES: Role[] = ["Admin", "Owner", "Organizer"];

function SettingsPage() {
  const [role, setRole] = useState<Role>("Admin");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">
          Settings · ቅንብር
        </div>
        <h1 className="font-serif text-5xl md:text-6xl italic leading-tight">
          Run your corner of Addis.
        </h1>
        <p className="mt-5 text-foreground/70 max-w-xl">
          Switch roles to manage moderation, live status, or events. Demo data only.
        </p>

        <div className="mt-10 flex gap-1 border-b border-border">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] border-b-2 -mb-px transition-colors ${
                role === r
                  ? "border-primary text-foreground"
                  : "border-transparent text-foreground/40 hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        {role === "Admin" && <AdminPanel />}
        {role === "Owner" && <OwnerPanel />}
        {role === "Organizer" && <OrganizerPanel />}
      </section>

      <Footer />
    </div>
  );
}

function AdminPanel() {
  const [items, setItems] = useState(pendingVideos);

  function act(id: string) {
    setItems((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <div>
      <h2 className="text-xs font-mono uppercase tracking-[0.25em] opacity-50 mb-5">
        Pending moderation · {items.length}
      </h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-[10px] font-mono uppercase tracking-[0.2em] opacity-70">
            <tr>
              <th className="text-left p-4">Place</th>
              <th className="text-left p-4">Scout</th>
              <th className="text-left p-4">Submitted</th>
              <th className="text-left p-4">Flag</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="p-4 font-medium">{v.place}</td>
                <td className="p-4 text-foreground/70">{v.scout}</td>
                <td className="p-4 text-foreground/60 text-xs font-mono">{v.submittedAt}</td>
                <td className="p-4">
                  {v.flagged ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive">
                      Flagged
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono opacity-40">—</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => act(v.id)} className="text-xs font-bold uppercase tracking-[0.2em] text-success mr-3 hover:underline">
                    Approve
                  </button>
                  <button onClick={() => act(v.id)} className="text-xs font-bold uppercase tracking-[0.2em] text-destructive hover:underline">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-10 text-center text-foreground/50">Queue is clear.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OwnerPanel() {
  const [power, setPower] = useState<"stable" | "flicker" | "down">("stable");
  const [wifi, setWifi] = useState(24);
  const [crowd, setCrowd] = useState<"quiet" | "lively" | "packed">("lively");

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Control label="Power status">
        <div className="flex gap-2">
          {(["stable", "flicker", "down"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPower(p)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-md border transition-colors ${
                power === p ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Control>

      <Control label={`Wifi · ${wifi} Mbps`}>
        <input
          type="range" min={0} max={100} value={wifi}
          onChange={(e) => setWifi(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
      </Control>

      <Control label="Crowd">
        <div className="flex gap-2">
          {(["quiet", "lively", "packed"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCrowd(c)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-md border transition-colors ${
                crowd === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Control>

      <div className="md:col-span-3 border border-border rounded-lg p-6 bg-card mt-2">
        <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-50 mb-3">Live preview</div>
        <p className="font-serif italic text-2xl">
          Customers see: <span className="text-primary">{power}</span> power · {wifi} Mbps wifi · {crowd} crowd.
        </p>
      </div>
    </div>
  );
}

function OrganizerPanel() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6">
      <h2 className="text-xs font-mono uppercase tracking-[0.25em] opacity-50">Schedule an event</h2>
      <Control label="Event name">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tibeb Jazz Night"
          className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
      </Control>
      <div className="grid md:grid-cols-2 gap-6">
        <Control label="Date">
          <input required type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
        </Control>
        <Control label="Venue">
          <input required value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Taitu Hotel, Piazza"
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary" />
        </Control>
      </div>
      <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-foreground transition-colors">
        Publish event
      </button>
      {saved && <div className="text-sm text-success">Event published (demo).</div>}
    </form>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/60 mb-2">{label}</div>
      {children}
    </label>
  );
}
