import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";
import { searchGames } from "@/lib/games";
import { GameGrid } from "@/components/GameCard";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s['q'] === "string" ? s['q'] : "" }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Search games – StellarCloud" },
      { name: "description", content: "Search hundreds of free browser games on StellarCloud." },
      { property: "og:title", content: "Search games – StellarCloud" },
      { property: "og:description", content: "Search hundreds of free browser games." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const { q } = Route.useSearch();
  const results = searchGames(q);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">{t("Results for", "Resultat för")} "{q}" ({results.length})</h1>
      {results.length ? <GameGrid games={results} /> : <p className="text-muted-foreground">{t("No games found.", "Inga spel hittades.")}</p>}
    </div>
  );
}
