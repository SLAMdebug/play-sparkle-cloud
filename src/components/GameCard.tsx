import { Link } from "@tanstack/react-router";
import type { Game } from "@/lib/games";
import { Lock } from "lucide-react";

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  return (
    <Link
      to="/game/$id"
      params={{ id: game.id }}
      style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
      className="animate-fade-up group relative block overflow-hidden rounded-xl bg-card ring-1 ring-border transition duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:ring-primary hover:shadow-glow"
    >
      <img src={game.thumb} alt={game.title} loading="lazy" className={`aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110 ${game.locked ? "brightness-50 grayscale-[40%]" : ""}`} />
      {game.locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Lock className="h-7 w-7 text-foreground drop-shadow" />
          <span className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Coming soon</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-fade p-2 pt-8 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="truncate text-sm font-semibold">{game.title}</p>
      </div>
    </Link>
  );
}

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {games.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
    </div>
  );
}
