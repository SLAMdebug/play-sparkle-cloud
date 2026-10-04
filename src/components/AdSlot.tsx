export function AdSlot({ className = "", label = "Annonsplats" }: { className?: string; label?: string }) {
  return (
    <div
      data-ad-slot
      className={`flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-primary/40 bg-surface/60 text-center animate-fade-in ${className}`}
    >
      <div>
        <p className="text-sm font-bold tracking-widest text-primary">NO ADS HERE</p>
        <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
