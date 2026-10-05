# Sidomeny och tydligare spelutbud

## Ändringar
- Lägg till en öppningsbar sidomeny med en tydlig knapp som alltid går att nå.
- Visa alla kategorier i sidomenyn med antal spel och markera vald kategori.
- Lägg även en sektion med kända/populära spel i sidomenyn, med officiella spelbilder där de finns i GameDistribution-katalogen.
- Ta bort den horisontella kategoriraden längst upp och kategorirutnätet mitt på startsidan.
- Behåll startsidan fokuserad på utvalt spel, populära spel och spelrader.
- Prioritera Bowmasters, Subway-liknande spelet och andra välkända titlar som faktiskt finns i den officiella katalogen. Lägg inte in kopior eller externa spel som saknar tillstånd/inbäddningsstöd.

## Teknisk lösning
- Använd projektets befintliga Shadcn-sidomeny med kompakt ikonläge på dator och öppningsbar panel på mobil.
- Placera sidomenyn i den gemensamma sidlayouten så den finns på alla sidor.
- Använd TanStack Router för aktiva länkar och befintliga kategori- och speladresser.
- Regenerera spelkatalogen från GameDistributions publika feed om nya godkända titlar finns; ändra inte katalogfilen för hand.
- Kontrollera resultatet på både mobil och dator samt säkerställ att sidan bygger utan fel.
