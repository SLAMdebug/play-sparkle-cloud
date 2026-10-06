import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getWeeklyTrending } from "@/lib/discovery.functions";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { games } from "@/lib/games";
import { GameGrid } from "@/components/GameCard";
import { AdSlot } from "@/components/AdSlot";

const trendingOptions = queryOptions({ queryKey: ["weekly-trending"], queryFn: () => getWeeklyTrending(), staleTime: 60_000 });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(trendingOptions),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "StellarCloud – Play free browser games" },
      { name: "description", content: "Play hundreds of 3D, 2D and HTML5 games in your browser, without downloads." },
      { property: "og:image", content: games[0]?.banner },
      { name: "twitter:image", content: games[0]?.banner },
      { property: "og:title", content: "StellarCloud – Play free browser games" },
      { property: "og:description", content: "Hundreds of browser games. Create an account and save favorites." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const { data: ranking } = useSuspenseQuery(trendingOptions);
  const featured = games[0];
  if (!featured) return null;
  const trendingGames = ranking.flatMap((row) => {
    const game = games.find((item) => item.id === row.gameId);
    return game ? [game] : [];
  });
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6">
      <section className="animate-fade-up relative overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={featured.banner} alt={featured.title} className="h-72 w-full object-cover transition duration-[3s] hover:scale-105 md:h-96" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="absolute bottom-0 p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-glow">{t("Featured game", "Utvalt spel")}</p>
          <h1 className="mt-1 text-3xl font-bold md:text-5xl">{featured.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground line-clamp-2">{featured.description}</p>
          <Link to="/game/$id" params={{ id: featured.id }}
            className="animate-pulse-glow mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground transition hover:scale-105">
            <Play className="h-4 w-4 fill-current" />{t("Play now", "Spela nu")}</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">{t("Trending this week", "Trendande denna vecka")}</h2>
        {trendingGames.length ? <GameGrid games={trendingGames} /> : <p className="text-sm text-muted-foreground">{t("The first weekly chart is coming soon.", "Den första veckolistan kommer snart.")}</p>}
      </section>

      <AdSlot label={t("Middle banner", "Mellanbanner")} />

      <section>
        <h2 className="mb-4 text-xl font-bold">{t("All games", "Alla spel")}</h2>
        <GameGrid games={games.slice(0, 120)} />
      </section>

    </div>
  );
}
