export function Footer() {
  return (
    <footer className="bg-foreground text-background/40 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-serif italic text-2xl text-background/85">Araat Kilo</div>
          <p className="text-xs mt-2 max-w-xs leading-relaxed">
            Find your way through Addis the way locals do — by landmarks, not addresses.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-background transition-colors">About the project</a>
          <a href="#" className="hover:text-background transition-colors">Scout guidelines</a>
          <a href="#" className="hover:text-background transition-colors">Privacy</a>
          <a href="#" className="hover:text-background transition-colors">Contact</a>
        </div>
        <div className="text-[10px] font-mono">Addis Ababa · © 2026</div>
      </div>
      <div className="tibeb-border h-1 opacity-30" />
    </footer>
  );
}
