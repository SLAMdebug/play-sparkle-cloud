import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { games, categories, byCategory } from "@/lib/games";
import { GameGrid, GameCard } from "@/components/GameCard";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StellarCloud – Spela gratis webbspel direkt" },
      { name: "description", content: "Spela hundratals 3D-, 2D- och HTML5-spel direkt i webbläsaren utan nedladdning." },
      { property: "og:title", content: "StellarCloud – Spela gratis webbspel direkt" },
      { property: "og:description", content: "Hundratals spel direkt i webbläsaren. Skapa konto och spara favoriter." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = games.find((game) => game.id === "bowmasters") ?? games[0];
  if (!featured) return null;
  const promotedIds = ["bowmasters", "block-runner-subway-escape", "turbo-horizon-racing", "basketball-stars-2026"];
  const popularGames = [
    ...promotedIds.map((id) => games.find((game) => game.id === id)).filter((game): game is (typeof games)[number] => Boolean(game)),
    ...games,
  ].filter((game, index, list) => list.findIndex((item) => item.id === game.id) === index).slice(0, 24);
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6">
      <section className="animate-fade-up relative overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={featured.banner} alt={featured.title} className="h-72 w-full object-cover transition duration-[3s] hover:scale-105 md:h-96" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="absolute bottom-0 p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-glow">Utvalt spel</p>
          <h1 className="mt-1 text-3xl font-bold md:text-5xl">{featured.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground line-clamp-2">{featured.description}</p>
          <Link to="/game/$id" params={{ id: featured.id }}
            className="animate-pulse-glow mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground transition hover:scale-105">
            <Play className="h-4 w-4 fill-current" /> Spela nu
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Populära spel</h2>
        <GameGrid games={popularGames} />
      </section>

      <AdSlot label="Mellanbanner" />

      {categories.slice(0, 10).map((c, i) => (
        <div key={c.slug} className="space-y-10">
          <section className="animate-fade-up">
            <div className="mb-3 flex items-end justify-between">
              <h2 className="text-xl font-bold">{c.name}</h2>
              <Link to="/category/$slug" params={{ slug: c.slug }} className="text-sm font-semibold text-primary">
                Visa alla ({c.count})
              </Link>
            </div>
            <div className="grid auto-cols-[45%] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[30%] md:auto-cols-[18%]">
              {byCategory(c.slug).slice(0, 12).map((g, j) => <GameCard key={g.id} game={g} index={j} />)}
            </div>
          </section>
          {i % 3 === 2 && <AdSlot label="Annonsplats" />}
        </div>
      ))}
    </div>
  );
}
