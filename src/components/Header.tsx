import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Discover", exact: true },
  { to: "/map", label: "Map" },
  { to: "/trips", label: "Itinerary" },
  { to: "/scout", label: "Scout" },
  { to: "/list-place", label: "List" },
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
] as const;

export function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="size-9 bg-primary text-primary-foreground rounded-sm flex items-center justify-center font-serif italic text-xl shadow-sm group-hover:rotate-3 transition-transform">
            A
          </div>
          <div className="leading-tight">
            <div className="font-serif italic text-2xl tracking-tight">Araat Kilo</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">
              Addis · አዲስ
            </div>
          </div>
        </Link>
        <div className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors whitespace-nowrap"
              activeProps={{ className: "text-foreground" }}
              activeOptions={l.exact ? { exact: true } : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
