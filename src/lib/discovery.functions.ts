import { createServerFn } from '@tanstack/react-start';
import { getRequest, getCookie, setCookie } from '@tanstack/react-start/server';
import { z } from 'zod';
import { getGame } from '@/lib/games';

export const getVisitorCountry = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest() as Request & { cf?: { country?: string } };
  // The hosting edge resolves country from the IP; never send/store the IP.
  const country = request.cf?.country ?? request.headers.get('cf-ipcountry');
  return { country: country && /^[A-Z]{2}$/.test(country) ? country : null };
});

export const getWeeklyTrending = createServerFn({ method: 'GET' }).handler(async () => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data, error } = await supabaseAdmin.rpc('weekly_trending');
  if (error) throw new Error('Unable to load trending games');
  return (data ?? []).map(({ game_id, opens, plays }) => ({ gameId: game_id, opens, plays }));
});

export const recordGameActivity = createServerFn({ method: 'POST' })
  .inputValidator((input) => z.object({ gameId: z.string().min(1).max(160), event: z.enum(['open', 'play']) }).parse(input))
  .handler(async ({ data }) => {
    if (!getGame(data.gameId)) throw new Error('Unknown game');
    let visitor = getCookie('stellar_visitor');
    if (!visitor || !z.string().uuid().safeParse(visitor).success) {
      visitor = crypto.randomUUID();
      setCookie('stellar_visitor', visitor, { httpOnly: true, sameSite: 'lax', secure: getRequest().url.startsWith('https:'), path: '/', maxAge: 60 * 60 * 24 * 30 });
    }
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(visitor));
    const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.rpc('record_game_activity', { p_game_id: data.gameId, p_event: data.event, p_visitor_hash: hash });
    if (error) throw new Error('Unable to record game activity');
    return { ok: true };
  });