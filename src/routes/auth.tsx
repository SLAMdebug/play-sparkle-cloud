import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Logga in – StellarCloud" },
      { name: "description", content: "Logga in eller skapa ett konto på StellarCloud." },
      { property: "og:title", content: "Logga in – StellarCloud" },
      { property: "og:description", content: "Skapa konto och spara dina favoritspel." },
    ],
  }),
  component: AuthPage,
});

const field = "w-full rounded-lg border bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

function AuthPage() {
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
      if (error) toast.error(error.message); else toast.success("Kolla din e-post för att bekräfta kontot!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Fel e-post eller lösenord");
    }
    setBusy(false);
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Kunde inte logga in med Google");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
        <h1 className="text-2xl font-bold">{mode === "in" ? "Logga in" : "Skapa konto"}</h1>
        <form onSubmit={submit} className="mt-5 space-y-3">
          {mode === "up" && <input required minLength={3} maxLength={20} placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} className={field} />}
          <input required type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          <input required type="password" minLength={6} placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          <button disabled={busy} className="w-full rounded-lg bg-gradient-primary py-2.5 font-bold text-primary-foreground shadow-glow disabled:opacity-60">
            {mode === "in" ? "Logga in" : "Skapa konto"}
          </button>
        </form>
        <button onClick={google} className="mt-3 w-full rounded-lg bg-surface py-2.5 text-sm font-semibold ring-1 ring-border hover:ring-primary">
          Fortsätt med Google
        </button>
        <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 w-full text-sm text-primary">
          {mode === "in" ? "Inget konto? Skapa ett" : "Har du konto? Logga in"}
        </button>
      </div>
    </div>
  );
}
