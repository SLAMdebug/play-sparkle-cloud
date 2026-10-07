import { Button } from "@/components/ui/button";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sign in – StellarCloud" },
      { name: "description", content: "Sign in or create a StellarCloud account." },
      { property: "og:title", content: "Sign in – StellarCloud" },
      { property: "og:description", content: "Create an account and save your favorite games." },
    ],
  }),
  component: AuthPage,
});

const field = "w-full rounded-lg border bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

function AuthPage() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) navigate({ to: "/profile" }); }, [user, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "up") {
      const { error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: window.location.origin, data: { username } },
      });
      if (error) toast.error(error.message); else toast.success(t("Account created!", "Kontot är skapat!"));
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(t("Incorrect email or password", "Fel e-post eller lösenord"));
    }
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
        <h1 className="text-2xl font-bold">{mode === "in" ? t("Sign in", "Logga in") : t("Create account", "Skapa konto")}</h1>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {mode === "up" && <input required minLength={3} maxLength={20} placeholder={t("Username", "Användarnamn")} value={username} onChange={(e) => setUsername(e.target.value)} className={field} />}
          <input required type="email" placeholder={t("Email", "E-post")} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          <input required type="password" minLength={6} placeholder={t("Password", "Lösenord")} value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          <Button type="submit" disabled={busy} className="w-full rounded-lg bg-gradient-primary py-2.5 font-bold text-primary-foreground shadow-glow disabled:opacity-60">
            {mode === "in" ? t("Sign in", "Logga in") : t("Create account", "Skapa konto")}
          </Button>
        </form>
        <Button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 w-full text-sm text-primary">
          {mode === "in" ? t("No account? Create one", "Inget konto? Skapa ett") : t("Already registered? Sign in", "Har du konto? Logga in")}
        </Button>
      </div>
    </div>
  );
}
