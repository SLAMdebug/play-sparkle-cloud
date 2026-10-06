import raw from "@/data/games.json";

export type Game = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  url: string;
  thumb: string;
  banner: string;
  categories: string[];
  mobile: boolean;
};

export const games = (raw as Game[]).filter((game) => game.id !== "bowmasters" && game.title.toLowerCase() !== "bowmasters");

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const counts = new Map<string, number>();
games.forEach((g) => g.categories.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));

export const categories = [...counts.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, slug: slugify(name), count }));

export const getGame = (id: string) => games.find((g) => g.id === id);
export const byCategory = (slug: string) =>
  games.filter((g) => g.categories.some((c) => slugify(c) === slug));
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name;
export const searchGames = (q: string) => {
  const s = q.trim().toLowerCase();
  return s ? games.filter((g) => g.title.toLowerCase().includes(s)) : [];
};
