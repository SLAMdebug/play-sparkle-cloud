CREATE POLICY "Service manages activity" ON public.game_activity FOR ALL TO service_role USING (true) WITH CHECK (true);
ALTER FUNCTION public.weekly_trending() SECURITY INVOKER;
REVOKE EXECUTE ON FUNCTION public.weekly_trending() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.weekly_trending() TO service_role;