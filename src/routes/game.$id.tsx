import { recordGameActivity } from "@/lib/discovery.functions";
import { Button } from "@/components/ui/button";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Maximize, Heart, Play, Lock } from "lucide-react";
import { toast } from "sonner";
import { getGame, games, slugify } from "@/lib/games";
import { GameCard } from "@/components/GameCard";
import { AdSlot } from "@/components/AdSlot";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/game/$id")({
  loader: ({ params }) => {
    const game = getGame(params.id);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },{ title: "Game not found – StellarCloud" }, { name: "robots", content: "noindex" }] };
    const { game } = loaderData;
    const t = `Play ${game.title} free – StellarCloud`;
    return {
      meta: [
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { title: t },
        { name: "description", content: game.description.slice(0, 155) },
        { property: "og:title", content: t },
        { property: "og:description", content: game.description.slice(0, 155) },
        { property: "og:image", content: game.banner },
        { name: "twitter:image", content: game.banner },
      ],
    };
  },
  component: GamePage,
});

function GamePage() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const { game } = Route.useLoaderData();
  const { user } = useAuth();
  const [running, setRunning] = useState(false);
  const [fav, setFav] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRunning(false);
    if (!user) return setFav(false);
    supabase.from("favorites").select("game_id").eq("user_id", user.id).eq("game_id", game.id).maybeSingle()
      .then(({ data }) => setFav(!!data));
  }, [user, game.id]);

  useEffect(() => { void recordGameActivity({ data: { gameId: game.id, event: "open" } }).catch(() => {}); }, [game.id]);

  const start = async () => {
    setRunning(true);
    void recordGameActivity({ data: { gameId: game.id, event: "play" } }).catch(() => {});
    if (!user) return;
    const { data } = await supabase.from("play_history").select("play_count").eq("user_id", user.id).eq("game_id", game.id).maybeSingle();
    await supabase.from("play_history").upsert({
      user_id: user.id, game_id: game.id, play_count: (data?.play_count ?? 0) + 1, last_played_at: new Date().toISOString(),
    });
  };

  const toggleFav = async () => {
    if (!user) { toast(t("Sign in to save favorites", "Logga in för att spara favoriter")); return; }
    if (fav) await supabase.from("favorites").delete().eq("user_id", user.id).eq("game_id", game.id);
    else await supabase.from("favorites").insert({ user_id: user.id, game_id: game.id });
    setFav(!fav);
  };

  const related = games.filter((g) => g.id !== game.id && g.categories.some((c) => game.categories.includes(c))).slice(0, 12);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
      <div ref={frameRef} className="animate-fade-up relative aspect-video w-full overflow-hidden rounded-2xl bg-card ring-1 ring-border">
        {game.locked ? (
          <>
            <img src={game.banner} alt={game.title} className="h-full w-full object-cover blur-sm brightness-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Lock className="h-14 w-14" />
              <p className="text-2xl font-bold">{t("Coming soon", "Kommer snart")}</p>
            </div>
          </>
        ) : running ? (
          <iframe
            src={game.url}
            title={game.title}
            className="h-full w-full"
            allow="autoplay; fullscreen; gamepad; gyroscope; accelerometer; clipboard-write; screen-wake-lock; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <img src={game.banner} alt={game.title} className="h-full w-full object-cover blur-sm brightness-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <img src={game.thumb} alt="" className="animate-float w-40 rounded-xl ring-2 ring-primary shadow-glow md:w-56" />
              <Button onClick={start} className="animate-pulse-glow inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3 text-lg font-bold text-primary-foreground transition hover:scale-110">
                <Play className="h-5 w-5 fill-current" />{t("Play", "Spela")}</Button>
              <AdSlot className="w-64 min-h-[60px]" label={t("Before the game", "Före spelet")} />
            </div>
          </>
        )}
      </div>
      <AdSlot className="hidden lg:flex min-h-[400px]" label={t("Side banner 160×600", "Sidobanner 160×600")} />
      </div>
      <AdSlot className="mt-4" label={t("Below the game", "Under spelet")} />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold md:text-3xl">{game.title}</h1>
        <div className="ml-auto flex gap-2">
          <Button onClick={toggleFav} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold ring-1 ring-border hover:ring-primary">
            <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : ""}`} /> {fav ? t("Favorite", "Favorit") : t("Add to favorites", "Lägg till favorit")}
          </Button>
          <Button onClick={() => frameRef.current?.requestFullscreen()} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold ring-1 ring-border hover:ring-primary">
            <Maximize className="h-4 w-4" />{t("Fullscreen", "Helskärm")}</Button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {game.categories.map((c) => (
          <Link key={c} to="/category/$slug" params={{ slug: slugify(c) }} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{categoryLabel(c)}</Link>
        ))}
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div><h2 className="mb-1 font-bold">{t("About the game", "Om spelet")}</h2><p className="text-sm text-muted-foreground">{game.description}</p></div>
        {game.instructions && <div><h2 className="mb-1 font-bold">{t("How to play", "Så spelar du")}</h2><p className="whitespace-pre-line text-sm text-muted-foreground">{game.instructions}</p></div>}
      </div>
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold">{t("Related games", "Liknande spel")}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">{related.map((g) => <GameCard key={g.id} game={g} />)}</div>
        </section>
      )}
    </div>
  );
}
