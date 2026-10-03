import { createFileRoute } from "@tanstack/react-router";
import { searchGames } from "@/lib/games";
import { GameGrid } from "@/components/GameCard";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "Sök spel – StellarCloud" },
      { name: "description", content: "Sök bland hundratals gratis webbspel på StellarCloud." },
      { property: "og:title", content: "Sök spel – StellarCloud" },
      { property: "og:description", content: "Sök bland hundratals gratis webbspel." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchGames(q);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Resultat för "{q}" ({results.length})</h1>
      {results.length ? <GameGrid games={results} /> : <p className="text-muted-foreground">Inga spel hittades.</p>}
    </div>
  );
}
