# CMS delen af Vanilla on Fire

Hele sidste uge gik med at få en grundlæggende forståelse for hvordan Firebase fungerer, og nu handler det om at få konstureret et CMS der er baseret på javascript og firebase. Javscript delen bliver så vanilla som muligt, dvs ingen eksterne frameworks, ud over de moduler vi skal benytte for at arbejde med firebase... derfor navnet **Vanilla on Fire**

Vi kommer rundt om "frontend" og "backend", dvs de dele der er synligt for alle og den funktionalitet der er gemt bag et login.

CMS er ganske enkelt forkortelsen af "Content Management System", og det er i sin grundlæggende form et adminpanel og et clientside website der arbejder sammen.

Der er meget avancerede systemer tilgængelige, og de har både styrker og svagheder. Sikkerheden er oftest det størrste problem ved f.eks. Joomla eller Wordpress. 

Fordelen ved et mindre CMS som det vi kommer til at konstruere, er dels at vi uddelegerer sikkerheden til googles firebase authentication, og det næste er at vores system ikke er i brug på millioner af domæner og er derfor knap så attraktiv for hackere.... vi skal selvfølgelig stadig arbejde med sikring af vores kode, og validering af data. 

Vi kommer til at arbejde med CRUD principperne, samt tilføje noget fil håndtering og derigennem genbruge clientside billedeupload med skalering.

Vi har også prøvet Netlify til hosting af vores todo-projekt, med dette projekt vil vi afprøve hosting igennem firebase Hosting, og filupolad til firebase Storage.
 
##  Github Classroom Assignment

Der er oprettet et Github Classroom Assignment som er der hvor dit CMS skal produceres. 

Der skal gerne pushes dagligt, så du har en backup online i tilfælde af computer nedbrud og andet. Det giver også mulighed for skrifteligt feedback på dine koder!

Husk vi ikke arbejder med node/express i dette projekt, så det er **IKKE** nødvendigt at køre `npm init`. Det er kun hvis du opsætter en preprocessor det kan være nødvendigt.

## Firebase Project

Du skal oprette et nyt Project på Firebase, så du ikke får blandet todo app og CMS projektet sammen.

Du bestemer selv hvad projektet skal hedde, et forslag er noget med "Vanilla-on-fire" i navnet.

## Opsætning af applikationens struktur.

Det er målet at få splittet hjemmesiden op i 2 dele. Den ene er det offentligt tilgængelige som alle kan se, og det andet er et administrations panel der kræver man er logget på for at få adgang.

Begge dele bliver drevet af hver deres html fil og de tilhørende javascript filer.

Derudover skal der være nogle styles og et sted til statiske filer.

Der er mange måde man kan løse dette på, og det simplste er at have en dedikeret mappe til administrationen, noget i stil med dette. *(I er selvfølgelig velkommen til at arbejde emd Grunt, Gulp, Webpack eller lign preprocessorer, bare ingen clientside biblioteker!)*  


Sørg for clientside filerne ligger i en mappe i dit projekt, den mappe skal vi benytte senere når vi depployer til firebase hosting. Arbejdes der med preprocessorer og `src` og `dist` mapper, så kommer dette helt af sig selv.

`root` er den mappe der indlæses i browseren som indeholder forsiden af vores hjemmeside.

* root/ 
  * admin/
    * styles/
    * scripts/
    * index.html
  * images/
  * styles/
  * scripts/
  * index.html


## Designet

Det er ikke super vigtigt hvordan designet på hjemmesiden ser ud, det vigtige her er at funktionaliteten er tilstede. 

Clientside html siden skal som minimum indeholde følgende:

* header, til sidens logo og slogan
* nav, til sidens nvigation
* section, til det primære indhold 
  * main, dette er stedet hvor indholdet vises
  * div, til en side bar med funktioner vil tilføjer løbende *(og nej, et er IKKE en aside)*.
* footer, til copyright og andet sjov.

## Firebase opsætning

Vores CMS skal kunne håndtere om en bruger er logget på eller ej, og vi skal kunne bestemme hvem der er administratorer. Derfor skal Authentication sættes op, her benytter vi igen *Email/password* signin metoden.

Opret en bruger og tilføj en loginform til hjemmesiden.

Sørg for at firebase.auth er inkluderet og knyt `auth.onStateChanges()` til dit script, så du kan vise/skjule loginformularen alt efter om brugeren er logget på eller ej.

Vi konctrerer os om administrator custum claim senere, i starten er det nok vi kan logge af og på.

## Frontend Navigationen

Det er meningen vi skal kunne opsætte en dynamisk navigation på siden, som drives af firebase.

Til det formål skal vi have en collection til vores links. I første omgang vil vi gerne gemme 4 informationer om et link:
* Navnet der skal stå på linket
* Adressen linket skal pege på
* Placeringen i navigationen
* Om linket kræver admin rettigheder eller ej.

Opret 4-5 links, og giv et par af dem administrator krav.

Så skal alle links i collectionen hentes og løbes igennem, og for hvert link tilføjes det til nav tagget i html dokumentet. her er det rodens index der arbejdes på.

Hvis `auth.currentUser` ikke er `null` så vises links der kræver administrator rettigheder. Dette vil vil opdatere senere, men lige nu er det ikke vigtigt at man rent faktisk har admin-rettigheder.

Sørg for at navigationen opdateres hver gang brugeren logger af eller på, og når siden indlæses... hint: `auth.onStateChanged()`
