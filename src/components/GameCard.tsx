import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/games";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to="/game/$id"
      params={{ id: game.id }}
      className="group relative block overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:ring-primary hover:shadow-glow"
    >
      <img src={game.thumb} alt={game.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-fade p-2 pt-8 opacity-0 transition group-hover:opacity-100">
        <p className="truncate text-sm font-semibold">{game.title}</p>
      </div>
    </Link>
  );
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {games.map((g) => <GameCard key={g.id} game={g} />)}
    </div>
  );
}
