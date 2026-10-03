import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { games, categories, byCategory } from "@/lib/games";
import { GameGrid, GameCard } from "@/components/GameCard";

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
  const featured = games[0]!;
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6">
      <section className="relative overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={featured.banner} alt={featured.title} className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="absolute bottom-0 p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-glow">Utvalt spel</p>
          <h1 className="mt-1 text-3xl font-bold md:text-5xl">{featured.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground line-clamp-2">{featured.description}</p>
          <Link to="/game/$id" params={{ id: featured.id }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow">
            <Play className="h-4 w-4 fill-current" /> Spela nu
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Populära spel</h2>
        <GameGrid games={games.slice(1, 25)} />
      </section>

      {categories.slice(0, 8).map((c) => (
        <section key={c.slug}>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-xl font-bold">{c.name}</h2>
            <Link to="/category/$slug" params={{ slug: c.slug }} className="text-sm font-semibold text-primary">
              Visa alla ({c.count})
            </Link>
          </div>
          <div className="grid auto-cols-[45%] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[30%] md:auto-cols-[18%]">
            {byCategory(c.slug).slice(0, 12).map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
