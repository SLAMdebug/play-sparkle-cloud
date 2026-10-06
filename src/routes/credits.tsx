import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Credits – StellarCloud" },
      { name: "description", content: "StellarCloud credits: made with love by NamelessWT, Sweden." },
      { property: "og:title", content: "Credits – StellarCloud" },
      { property: "og:description", content: "StellarCloud is made with love by NamelessWT, Sweden." },
    ],
  }),
  component: Credits,
});

function Credits() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-center animate-fade-up">
      <h1 className="text-3xl font-bold">Credits</h1>
      <div className="rounded-2xl bg-surface p-8 ring-1 ring-border animate-float">
        <p className="text-2xl font-display font-bold">
          Made with <span className="text-primary">♥</span> by NamelessWT
        </p>
        <p className="mt-2 font-semibold text-muted-foreground">Sweden 🇸🇪</p>
      </div>
      <div className="rounded-2xl bg-surface p-6 text-left ring-1 ring-border space-y-2">
        <h2 className="text-lg font-bold">{t("Thanks to", "Tack till")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong className="text-foreground">Atomic Team</strong> – StellarCloud run by Atomic Team.</li>
          <li><strong className="text-foreground">GameDistribution</strong> – för alla spelen.</li>
        </ul>
      </div>
      <Link to="/" className="inline-flex items-center rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground">{t("Back to games", "Tillbaka till spelen")}</Link>
    </div>
  );
}
