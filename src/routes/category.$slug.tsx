import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { byCategory, categoryName } from "@/lib/games";
import { GameGrid } from "@/components/GameCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const name = categoryName(params.slug);
    if (!name) throw notFound();
    return { name };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} games – StellarCloud` : "Category – StellarCloud";
    const d = loaderData ? `Spela gratis ${loaderData.name} games direkt i webbläsaren.` : "Game category";
    return { meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const { slug } = Route.useParams();
  const { name } = Route.useLoaderData();
  const list = byCategory(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-1 text-3xl font-bold">{categoryLabel(name)}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{list.length} {t("games", "spel")}</p>
      <GameGrid games={list} />
    </div>
  );
}
