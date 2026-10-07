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
  locked?: boolean;
};

const pg = (slug: string, img: string) => `https://static.playgama.com/p-img/pg/${slug}/${img}?width=1200`;
const pgUrl = (slug: string) => `https://playgama.com/export/game/${slug}?clid=p_f9aecc80-75c9-44c0-9e43-b84aaa649932`;
const mk = (id: string, title: string, url: string, img: string, categories: string[]): Game => ({
  id, title, url, thumb: img, banner: img, categories, mobile: true,
  description: `Play ${title} free on StellarCloud.`, instructions: "",
});

export const playableGames: Game[] = [
  mk("bowmasters-archery-shooting", "Bowmasters", "https://www.madkidgames.com/full/bowmasters-archery-shooting", "https://www.madkidgames.com/games/bowmasters-archery-shooting/thumb_1.jpg", ["Shooter", "Battle"]),
  mk("block-blast", "Block Blast", "https://blockblastmaster.io/export?clid=p_f9aecc80-75c9-44c0-9e43-b84aaa649932", "https://blockblastmaster.io/og-image.png", ["Puzzle", "Casual"]),
  mk("moto-x3m", "Moto X3M", pgUrl("moto-x3m"), pg("moto-x3m", "big_preview/6863e1c77f624087bae1d217cdf4c240"), ["Racing & Driving"]),
  mk("soccer-random", "Soccer Random", pgUrl("soccer-random"), pg("soccer-random", "big-preview/6f59ef235c1e42198225c02473d66943"), ["Sports"]),
  mk("snow-rush-3d", "SnowRush 3D", pgUrl("snow-rush-3d"), pg("snow-rush-3d", "big-preview/0dcecabbe4834f8aaa990f42fda7c180"), ["Agility", "Casual"]),
  mk("poison-candy-obby-1-or-2player", "Poison Candy: Obby 1 Or 2-Player", pgUrl("poison-candy-obby-1-or-2player"), pg("poison-candy-obby-1-or-2player", "big-preview/5b39a31fa32f4ddc86229fab59d9e0d8"), ["Adventure", "Agility"]),
  mk("backrooms-craft", "Backrooms Craft", pgUrl("backrooms-craft"), pg("backrooms-craft", "big_preview/34cec4a8a9af49fe98f613b4e57776a4"), ["Horror", "Adventure"]),
  mk("golf-orbit", "Golf Orbit", pgUrl("golf-orbit"), pg("golf-orbit", "big-preview/e7f203e28b0745d880d1c0a995e9b213"), ["Sports", "Casual"]),
  mk("ultimate-lawn-mowing-simulator-mower", "Ultimate Lawn Mowing Simulator: Mower Master", pgUrl("ultimate-lawn-mowing-simulator-mower"), pg("ultimate-lawn-mowing-simulator-mower", "big-preview/151e60cdfe234b899a6040b4c1f997e7"), ["Simulation"]),
];

const ids = new Set(playableGames.map((g) => g.id));
export const games: Game[] = [
  ...playableGames,
  ...(raw as Game[])
    .filter((game) => game.id !== "bowmasters" && game.title.toLowerCase() !== "bowmasters" && !ids.has(game.id))
    .map((g) => ({ ...g, locked: true })),
];

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
