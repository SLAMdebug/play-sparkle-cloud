import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Om StellarCloud" },
      { name: "description", content: "Läs mer om StellarCloud – gratis webbspel direkt i webbläsaren." },
      { property: "og:title", content: "Om StellarCloud" },
      { property: "og:description", content: "Läs mer om StellarCloud – gratis webbspel direkt i webbläsaren." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 animate-fade-up">
      <h1 className="text-3xl font-bold">Om StellarCloud</h1>
      <p className="text-muted-foreground">
        StellarCloud är en spelsajt där du kan spela hundratals spel direkt i webbläsaren – helt gratis,
        helt utan nedladdning. Allt från skjutspel och racerspel till pussel och simuleringar.
      </p>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">Så funkar det</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Klicka på ett spel och tryck <strong className="text-foreground">Spela nu</strong> – spelet startar direkt i sidan.</li>
          <li>Skapa ett konto med e-post eller Google för att spara favoriter och se din spelhistorik.</li>
          <li>Du kan spela alla spel i helskärm – det är bara att klicka på helskärmsknappen i spelet.</li>
        </ul>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-2">
        <h2 className="text-lg font-bold">Vem ligger bakom?</h2>
        <p className="text-muted-foreground">
          StellarCloud <strong className="text-foreground">Run By Atomic Team</strong>.
        </p>
        <p className="text-muted-foreground text-sm">
          Spelen tillhandahålls av GameDistribution.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/" className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground">Till spelen</Link>
        <Link to="/credits" className="rounded-full bg-surface px-5 py-2 text-sm font-semibold ring-1 ring-border">Credits</Link>
      </div>
    </div>
  );
}
