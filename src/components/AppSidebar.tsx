import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Grid2X2, Home, Sparkles } from "lucide-react";
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
  "bowmasters",
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
  const currentPath = useRouterState({ select: (router) => router.location.pathname });
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-3">
        <Link to="/" onClick={closeMobile} className="flex h-9 items-center gap-3 overflow-hidden px-1">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gamepad2 className="size-4" />
          </span>
          <span className="whitespace-nowrap font-display text-base font-bold">
            Stellar<span className="text-primary">Cloud</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Upptäck</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === "/"} tooltip="Alla spel">
                  <Link to="/" onClick={closeMobile}>
                    <Home />
                    <span>Alla spel</span>
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
          <SidebarGroupLabel>Kategorier</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category, index) => {
                const path = `/category/${category.slug}`;
                const Icon = index % 2 === 0 ? Grid2X2 : Sparkles;
                return (
                  <SidebarMenuItem key={category.slug}>
                    <SidebarMenuButton asChild isActive={currentPath === path} tooltip={category.name}>
                      <Link to="/category/$slug" params={{ slug: category.slug }} onClick={closeMobile}>
                        <Icon />
                        <span>{category.name}</span>
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