import { Button } from "@/components/ui/button";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const { t, language, setLanguage } = useLanguage();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4">
        <SidebarTrigger className="h-9 w-9 shrink-0" aria-label={t("Open game menu", "Öppna spelmeny")} />
        <Link to="/" className="hidden font-display text-xl font-bold sm:block">
          Stellar<span className="text-primary">Cloud</span>
        </Link>
        <form
          className="relative flex-1 max-w-md"
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search", search: { q } }); }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search games...", "Sök bland spel...")}
            className="w-full rounded-full border bg-surface py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
        <Button variant="ghost" size="sm" aria-label={t("Switch to Swedish", "Byt till engelska")} onClick={() => setLanguage(language === "en" ? "sv" : "en")}>{language === "en" ? "SV" : "EN"}</Button>
        <div className="ml-auto shrink-0">
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 ring-1 ring-border hover:ring-primary">
              <Avatar className="h-8 w-8">
                {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
                <AvatarFallback className="bg-secondary text-xs">{profile?.username?.[0]?.toUpperCase() ?? "?"}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold sm:inline">{profile?.username}</span>
            </Link>
          ) : (
            <Link to="/auth" className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow">{t("Sign in", "Logga in")}</Link>
          )}
        </div>
      </div>
    </header>
  );
}
