import { categoryIcon } from "@/lib/category-icons";
import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { categories, games } from "@/lib/games";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const featuredIds = [
  "block-runner-subway-escape",
  "turbo-horizon-racing",
  "basketball-stars-2026",
  "chess-multiplayer-online",
  "stickman-warriors-superhero-fight",
];

const featuredGames = featuredIds
  .map((id) => games.find((game) => game.id === id))
  .filter((game): game is (typeof games)[number] => Boolean(game));

export function AppSidebar() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  const currentPath = useRouterState({ select: (router) => router.location.pathname });
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-3">
        <Link to="/" onClick={closeMobile} className="flex h-9 items-center gap-3 overflow-hidden px-1">
          <span className="whitespace-nowrap font-display text-base font-bold group-data-[collapsible=icon]:hidden">
            Stellar<span className="text-primary">Cloud</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Discover", "Upptäck")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === "/"} tooltip={t("All games", "Alla spel")}>
                  <Link to="/" onClick={closeMobile}>
                    <Home />
                    <span>{t("All games", "Alla spel")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {featuredGames.map((game) => (
                <SidebarMenuItem key={game.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === `/game/${game.id}`}
                    tooltip={game.title}
                    size="lg"
                  >
                    <Link to="/game/$id" params={{ id: game.id }} onClick={closeMobile}>
                      <img src={game.thumb} alt="" className="size-8 shrink-0 rounded-md object-cover" />
                      <span>{game.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("Categories", "Kategorier")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const path = `/category/${category.slug}`;
                const Icon = categoryIcon(category.name);
                return (
                  <SidebarMenuItem key={category.slug}>
                    <SidebarMenuButton asChild isActive={currentPath === path} tooltip={categoryLabel(category.name)}>
                      <Link to="/category/$slug" params={{ slug: category.slug }} onClick={closeMobile}>
                        <Icon />
                        <span>{categoryLabel(category.name)}</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{category.count}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}