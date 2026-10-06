import { Button } from "@/components/ui/button";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Camera, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getGame, type Game } from "@/lib/games";
import { GameGrid } from "@/components/GameCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "My profile – StellarCloud" },
      { name: "description", content: "Your profile, favorites and recently played games." },
      { property: "og:title", content: "My profile – StellarCloud" },
      { property: "og:description", content: "Your StellarCloud profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 160;
      const s = Math.min(img.width, img.height);
      const context = c.getContext("2d");
      if (!context) { reject(new Error("Image processing unavailable")); return; }
      context.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 160, 160);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function ProfilePage() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [favs, setFavs] = useState<Game[]>([]);
  const [recent, setRecent] = useState<{ game: Game; count: number }[]>([]);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [loading, user, navigate]);
  useEffect(() => { if (profile) setName(profile.username); }, [profile]);
  useEffect(() => {
    if (!user) return;
    supabase.from("favorites").select("game_id").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setFavs((data ?? []).map((r) => getGame(r.game_id)).filter(Boolean) as Game[]));
    supabase.from("play_history").select("game_id, play_count").eq("user_id", user.id).order("last_played_at", { ascending: false }).limit(18)
      .then(({ data }) => setRecent((data ?? []).flatMap((r) => { const g = getGame(r.game_id); return g ? [{ game: g, count: r.play_count }] : []; })));
  }, [user]);

  if (!user) return null;

  const save = async (patch: { username?: string; avatar_url?: string }) => {
    const { error } = await supabase.from("profiles").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) toast.error(t("Could not save", "Kunde inte spara")); else { toast.success(t("Saved!", "Sparat!")); refreshProfile(); }
  };

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) save({ avatar_url: await resizeImage(f) });
  };

  const totalPlays = recent.reduce((a, r) => a + r.count, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">
      <section className="flex flex-wrap items-center gap-6 rounded-2xl bg-card p-6 ring-1 ring-border">
        <label className="group relative cursor-pointer">
          <Avatar className="h-24 w-24 ring-2 ring-primary">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
            <AvatarFallback className="bg-secondary text-3xl font-bold">{profile?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground"><Camera className="h-4 w-4" /></span>
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20}
              className="rounded-lg border bg-surface px-3 py-2 font-display text-xl font-bold outline-none focus:ring-2 focus:ring-ring" />
            <Button onClick={() => name.trim().length >= 3 ? save({ username: name.trim() }) : toast.error(t("At least 3 characters", "Minst 3 tecken"))}
              className="rounded-lg bg-gradient-primary px-4 font-bold text-primary-foreground">{t("Save", "Spara")}</Button>
          </div>
          <p className="text-sm text-muted-foreground">{favs.length} {t("favorites", "favoriter")} · {totalPlays} {t("plays", "spelningar")}</p>
        </div>
        <Button onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold ring-1 ring-border">
          <LogOut className="h-4 w-4" />{t("Sign out", "Logga ut")}</Button>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">{t("Recently played", "Senast spelade")}</h2>
        {recent.length ? <GameGrid games={recent.map((r) => r.game)} /> : <p className="text-sm text-muted-foreground">{t("No games yet.", "Inga spel ännu.")}<Link to="/" className="text-primary">{t("Find a game", "Hitta ett spel")}</Link></p>}
      </section>
      <section>
        <h2 className="mb-4 text-xl font-bold">{t("Favorites", "Favoriter")}</h2>
        {favs.length ? <GameGrid games={favs} /> : <p className="text-sm text-muted-foreground">{t("Tap the heart on a game to save it here.", "Tryck på hjärtat på ett spel för att spara det här.")}</p>}
      </section>
    </div>
  );
}
