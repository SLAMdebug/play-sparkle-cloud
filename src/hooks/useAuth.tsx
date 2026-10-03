import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = { id: string; username: string; avatar_url: string | null };
type Ctx = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<Ctx>({ user: null, profile: null, loading: true, refreshProfile: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid: string | undefined) => {
    if (!uid) return setProfile(null);
    const { data } = await supabase.from("profiles").select("id, username, avatar_url").eq("id", uid).maybeSingle();
    setProfile(data);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setTimeout(() => loadProfile(session?.user?.id), 0);
    });
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      loadProfile(data.user?.id).finally(() => setLoading(false));
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile: () => loadProfile(user?.id) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
