import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
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
        <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
          <Link to="/" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
            Discover
          </Link>
          <Link to="/trips" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Itinerary
          </Link>
          <Link to="/scout" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Scout
          </Link>
        </div>
      </div>
    </nav>
  );
}
