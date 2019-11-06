# CMS administrationen

Clientside navigationen og den grundelæggende opsætning burde være nogenlunde på plads på nuværende tidspunkt. Samt der bør være knyttet et login til siden, så brugere kan logge af og på.

Det næste vi skal se på er at få startet selve administrations delen af vores CMS.

Selve administrations panelets struktur, opsættes på samme måde som clientside delen, med en enkelt index.html i roden af admin mappen, og inkludering af de nødvendige scripts.

Navigationen skal ikke være trukket ud af en database, vi opretter de links der er behov for, og opretter de tilhørende routes manuelt.

Tanken er at første admin område vi arbejder på, er selve linksene til vores clientside navigation.

## #!/navigation

Administrations panelet til håndtering af menuen, består grundlæggende set af 2 elementer

* en tabel der viser alle de eksisterende links, med en ret og slet knap
* en formular der kan benyttes til oprettelse og redigering af et link

Der er flere tilgange til et CRUD panel, den jeg viser er baseret på url-handlinger, som f.eks. `add` og `edit` hvor sidens indhold udskiftes eller opdateres ved hver handling.

En anden tilgang er at opsætte en `onSnapshot()` på navigations collection, og benytte `change.type` til at bestemme om et element skal indsættes, fjernes eller opdateres ved hver handling.

Der er som sådan ikke nogen rigtig eller forkert tilgang, det handler om at få funktionerne til at udføre det nødvendige, derefter kan man optimere og tilpasse.


## Formularen

For at oprette et nyt link, skal vi have en formular med: Navn, adresse, placering i menuen og om linket kræver admin-rettigheder.
Det er 4 inputfelter, samt der skal være en knap så vi kan submitte formen.

Der knyttes en eventlistner på formularens submit event, og formularen skal selvfølgelig valideres inden data forsøges indsat i databasen.

Tænk på at formularen skal kunne genbruges til redigering, da det er præcis de samme felter og valideringer der skal foregå ved redigering.

## Tabellen

Visningen af navigations elementerne, foregår i en almindelig html `<table>` hvor hver række repræsenterer et menupunkt. Der skal være muligheden for at klikke på ret, og på slet ud for hvert link

Det er ikke nødvendigt at udskrive samtlige informationer om hvert link på skærmen, doc.id er ikke vigtig og man kan f.eks. visualiesere adminlinks ved en farve.

