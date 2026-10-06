import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About StellarCloud" },
      { name: "description", content: "Discover StellarCloud, free games in your browser." },
      { property: "og:title", content: "About StellarCloud" },
      { property: "og:description", content: "Discover StellarCloud, free games in your browser." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 animate-fade-up">
      <h1 className="text-3xl font-bold">{t("About StellarCloud", "Om StellarCloud")}</h1>
      <p className="text-muted-foreground">{t("StellarCloud brings hundreds of free games to your browser, from racing and action to puzzles and simulations.", "StellarCloud är en spelsajt där du kan spela hundratals spel direkt i webbläsaren – helt gratis, helt utan nedladdning. Allt från skjutspel och racerspel till pussel och simuleringar.")}</p>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">{t("Getting started", "Så funkar det")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>{t("Choose a game and press", "Klicka på ett spel och tryck")}<strong className="text-foreground">{t("Play now", "Spela nu")}</strong>{t("— the game opens within the site.", "– spelet startar direkt i sidan.")}</li>
          <li>{t("Create an account with email or Google to save favorites and view your play history.", "Skapa ett konto med e-post eller Google för att spara favoriter och se din spelhistorik.")}</li>
          <li>{t("Open the fullscreen view from the game controls.", "Du kan spela alla spel i helskärm – det är bara att klicka på helskärmsknappen i spelet.")}</li>
        </ul>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-2">
        <h2 className="text-lg font-bold">{t("Who is behind StellarCloud?", "Vem ligger bakom?")}</h2>
        <p className="text-muted-foreground">
          StellarCloud <strong className="text-foreground">Run By Atomic Team</strong>.
        </p>
        <p className="text-muted-foreground text-sm">{t("Games are provided by GameDistribution.", "Spelen tillhandahålls av GameDistribution.")}</p>
      </div>
      <div className="flex gap-3">
        <Link to="/" className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground">{t("Browse games", "Till spelen")}</Link>
        <Link to="/credits" className="rounded-full bg-surface px-5 py-2 text-sm font-semibold ring-1 ring-border">Credits</Link>
      </div>
    </div>
  );
}
