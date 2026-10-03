import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Gamepad2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { categories } from "@/lib/games";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
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
            placeholder="Sök bland spel..."
            className="w-full rounded-full border bg-surface py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
        <div className="ml-auto">
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 ring-1 ring-border hover:ring-primary">
              <Avatar className="h-8 w-8">
                {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
                <AvatarFallback className="bg-secondary text-xs">{profile?.username?.[0]?.toUpperCase() ?? "?"}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold sm:inline">{profile?.username}</span>
            </Link>
          ) : (
            <Link to="/auth" className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-glow">
              Logga in
            </Link>
          )}
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3">
        <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-primary text-primary-foreground" }}
          className="flex shrink-0 items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold ring-1 ring-border">
          <Gamepad2 className="h-3.5 w-3.5" /> Alla
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold ring-1 ring-border hover:ring-primary">
            {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
