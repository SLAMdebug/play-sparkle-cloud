import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy – StellarCloud" },
      { name: "description", content: "Integritetspolicy för StellarCloud: vad vi sparar och hur vi skyddar dina uppgifter." },
      { property: "og:title", content: "Integritetspolicy – StellarCloud" },
      { property: "og:description", content: "Integritetspolicy för StellarCloud: vad vi sparar och hur vi skyddar dina uppgifter." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 animate-fade-up">
      <h1 className="text-3xl font-bold">Integritetspolicy</h1>
      <p className="text-sm text-muted-foreground">Senast uppdaterad: oktober 2026</p>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">Vilka uppgifter vi sparar</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong className="text-foreground">Kontouppgifter:</strong> e-postadress och användarnamn när du skapar ett konto.</li>
          <li><strong className="text-foreground">Profilbild:</strong> den bild du själv laddar upp på din profil.</li>
          <li><strong className="text-foreground">Dina val i spel:</strong> favoriter och vilka spel du har spelat, så att du kan fortsätta där du slutade.</li>
          <li><strong className="text-foreground">Speldata:</strong> spelens egna framsteg (levels osv.) sparas av spelen själva i din webbläsare, inte hos oss.</li>
        </ul>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">Hur vi använder uppgifterna</h2>
        <p className="text-muted-foreground">
          Vi använder dina uppgifter bara för att ditt konto och din profil ska fungera. Vi säljer aldrig
          dina personuppgifter. Din profil (användarnamn och profilbild) syns för andra användare på sajten.
        </p>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">Reklam och externa tjänster</h2>
        <p className="text-muted-foreground">
          Spelen på StellarCloud tillhandahålls av GameDistribution och annonsörer som Google Ads kan visa
          reklam i spelen och på sajten. Dessa tjänster kan använda cookies för att visa relevanta annonser.
          Inloggning via Google sker via Googles egna tjänster enligt deras villkor.
        </p>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">Dina rättigheter</h2>
        <p className="text-muted-foreground">
          Du kan när som helst ändra din profil eller kontakta oss om du vill ta bort ditt konto och dina
          uppgifter.
        </p>
      </div>
      <p className="text-muted-foreground text-sm">
        Frågor? Kontakta oss via sajten. StellarCloud – Run By Atomic Team.
      </p>
    </div>
  );
}
