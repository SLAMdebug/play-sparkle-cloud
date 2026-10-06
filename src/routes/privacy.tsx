import { useLanguage, useCategoryLabel } from "@/components/LanguageProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy policy – StellarCloud" },
      { name: "description", content: "StellarCloud privacy policy: what we store and how we protect your information." },
      { property: "og:title", content: "Privacy policy – StellarCloud" },
      { property: "og:description", content: "StellarCloud privacy policy: what we store and how we protect your information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLanguage();
  const categoryLabel = useCategoryLabel();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 animate-fade-up">
      <h1 className="text-3xl font-bold">{t("Privacy policy", "Integritetspolicy")}</h1>
      <p className="text-sm text-muted-foreground">{t("Last updated: October 2026", "Senast uppdaterad: oktober 2026")}</p>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">{t("Information we store", "Vilka uppgifter vi sparar")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong className="text-foreground">{t("Account details:", "Kontouppgifter:")}</strong>{t("your email address and username when you create an account.", "e-postadress och användarnamn när du skapar ett konto.")}</li>
          <li><strong className="text-foreground">{t("Profile picture:", "Profilbild:")}</strong>{t("the image you upload to your profile.", "den bild du själv laddar upp på din profil.")}</li>
          <li><strong className="text-foreground">{t("Your game activity:", "Dina val i spel:")}</strong>{t("favorites and your play history.", "favoriter och vilka spel du har spelat, så att du kan fortsätta där du slutade.")}</li>
          <li><strong className="text-foreground">{t("Game data:", "Speldata:")}</strong>{t("games manage their own progress in your browser; we do not store their levels.", "spelens egna framsteg (levels osv.) sparas av spelen själva i din webbläsare, inte hos oss.")}</li>
        </ul>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">{t("How we use information", "Hur vi använder uppgifterna")}</h2>
        <p className="text-muted-foreground">{t("We use account information to operate your account and profile. We do not sell your personal information. Your username and profile picture are visible to other users.", "Vi använder dina uppgifter bara för att ditt konto och din profil ska fungera. Vi säljer aldrig dina personuppgifter. Din profil (användarnamn och profilbild) syns för andra användare på sajten.")}</p>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">{t("Advertising and external services", "Reklam och externa tjänster")}</h2>
        <p className="text-muted-foreground">{t("Games are provided by GameDistribution and may contain advertising and third-party cookies. Site advertising slots are currently placeholders. Google sign-in is subject to Google’s terms.", "Spelen på StellarCloud tillhandahålls av GameDistribution och annonsörer som Google Ads kan visa reklam i spelen och på sajten. Dessa tjänster kan använda cookies för att visa relevanta annonser. Inloggning via Google sker via Googles egna tjänster enligt deras villkor.")}</p>
      </div>
      <div className="rounded-2xl bg-surface p-6 ring-1 ring-border space-y-4">
        <h2 className="text-lg font-bold">{t("Your rights", "Dina rättigheter")}</h2>
        <p className="text-muted-foreground">{t("You can edit your profile at any time and request deletion of your account and personal information from the site operator.", "Du kan när som helst ändra din profil eller kontakta oss om du vill ta bort ditt konto och dina uppgifter.")}</p>
      </div>
      <p className="text-muted-foreground text-sm">{t("StellarCloud – Run By Atomic Team.", "Frågor? Kontakta oss via sajten. StellarCloud – Run By Atomic Team.")}</p>
    </div>
  );
}
