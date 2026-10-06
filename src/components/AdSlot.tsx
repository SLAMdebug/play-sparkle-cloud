import { useLanguage } from "@/components/LanguageProvider";
export function AdSlot({ className = "", label }: { className?: string; label?: string }) {
  const { t } = useLanguage();
  return (
    <div
      data-ad-slot
      className={`flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-primary/40 bg-surface/60 text-center animate-fade-in ${className}`}
    >
      <div>
        <p className="text-sm font-bold tracking-widest text-primary">NO ADS HERE</p>
        <p className="text-[10px] uppercase text-muted-foreground">{t(label ?? "Ad space", ({ "Top banner 728×90": "Topbanner 728×90" } as Record<string, string>)[label ?? ""] ?? label ?? "Annonsplats")}</p>
      </div>
    </div>
  );
}
