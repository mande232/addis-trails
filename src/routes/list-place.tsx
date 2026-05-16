import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { neighborhoods } from "@/data/mockData";

export const Route = createFileRoute("/list-place")({
  head: () => ({
    meta: [
      { title: "List a place — Araat Kilo" },
      { name: "description", content: "Submit a new place to Araat Kilo. Local scouts will verify it." },
      { property: "og:title", content: "List a place — Araat Kilo" },
      { property: "og:description", content: "Add a new Addis place for review." },
    ],
  }),
  component: ListPlacePage,
});

const CATEGORIES = ["Restaurant", "Cafe", "Bar", "Hotel", "Shopping", "Cultural", "Service"] as const;

function ListPlacePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Cafe");
  const [neighborhood, setNeighborhood] = useState(neighborhoods[0].id);
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [details, setDetails] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coverUrl = useObjectUrl(cover);
  const detailUrls = useObjectUrls(details);

  function reset() {
    setName(""); setLandmark(""); setNotes(""); setCover(null); setDetails([]);
    setSubmitted(false); setError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!cover) return setError("Please upload 1 cover image.");
    if (details.length !== 2) return setError("Please upload exactly 2 detail images.");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <section className="max-w-2xl mx-auto px-6 py-24 text-center animate-entry">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Submitted</div>
          <h1 className="font-serif italic text-5xl leading-tight">Thank you.</h1>
          <p className="mt-6 text-foreground/70">
            <strong>{name}</strong> is queued for scout verification. We'll notify you when
            it's live on Araat Kilo.
          </p>
          <button
            onClick={reset}
            className="mt-10 bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary transition-colors"
          >
            List another
          </button>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 animate-entry">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">
          Contribute · አጋር
        </div>
        <h1 className="font-serif text-5xl md:text-6xl italic leading-tight">
          List a place you know.
        </h1>
        <p className="mt-5 text-foreground/70 max-w-xl">
          Submit a spot and a local scout will verify the landmark, hours, and access.
          Upload <strong>1 cover photo</strong> and <strong>exactly 2 detail photos</strong>.
        </p>
      </section>

      <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
        <Field label="Place name">
          <input
            required value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mukush Wine Bar"
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Category">
            <select
              value={category} onChange={(e) => setCategory(e.target.value as typeof category)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Neighborhood">
            <select
              value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary"
            >
              {neighborhoods.map((n) => <option key={n.id} value={n.id}>{n.name} · {n.amharic}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Landmark description" hint="The kind of directions you'd give a friend.">
          <textarea
            required value={landmark} onChange={(e) => setLandmark(e.target.value)}
            rows={3}
            placeholder="Behind the red-roofed Total station, next to the painted blue gate."
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary resize-none"
          />
        </Field>

        <Field label="Cover photo · 1 required">
          <FilePicker accept="image/*" multiple={false} onChange={(f) => setCover(f[0] ?? null)} />
          {coverUrl && (
            <div className="mt-3 aspect-[16/9] rounded-md overflow-hidden ring-1 ring-border bg-muted max-w-md">
              <img src={coverUrl} alt="cover preview" className="w-full h-full object-cover" />
            </div>
          )}
        </Field>

        <Field label="Detail photos · exactly 2 required" hint="One landmark from the street, one of the entrance.">
          <FilePicker
            accept="image/*"
            multiple
            onChange={(f) => setDetails(f.slice(0, 2))}
          />
          {detailUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 max-w-md">
              {detailUrls.map((u, i) => (
                <div key={i} className="aspect-[4/3] rounded-md overflow-hidden ring-1 ring-border bg-muted">
                  <img src={u} alt={`detail ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </Field>

        <Field label="Scout notes" hint="Optional — anything the verifier should know.">
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Owner speaks English; best to call before 6 PM."
            className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary resize-none"
          />
        </Field>

        {error && (
          <div className="text-sm text-destructive font-medium">{error}</div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-foreground transition-colors"
          >
            Submit for review
          </button>
          <button
            type="button"
            onClick={reset}
            className="border border-border px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:border-foreground transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/60 mb-2">{label}</div>
      {children}
      {hint && <div className="mt-2 text-xs text-foreground/50">{hint}</div>}
    </label>
  );
}

function FilePicker({ accept, multiple, onChange }: { accept: string; multiple: boolean; onChange: (f: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className="w-full border border-dashed border-border rounded-md py-6 text-sm text-foreground/60 hover:border-primary hover:text-primary transition-colors"
    >
      Click to choose {multiple ? "files" : "a file"}
      <input
        ref={ref} type="file" accept={accept} multiple={multiple} className="hidden"
        onChange={(e) => onChange(Array.from(e.target.files ?? []))}
      />
    </button>
  );
}

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) { setUrl(null); return; }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url;
}

function useObjectUrls(files: File[]) {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    const u = files.map((f) => URL.createObjectURL(f));
    setUrls(u);
    return () => u.forEach(URL.revokeObjectURL);
  }, [files]);
  return urls;
}
