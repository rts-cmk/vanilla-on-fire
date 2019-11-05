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

## Navigationen, konceptet

Vores CMS skal kunne reagere når der klikkes ind på forskellige links, og til det har vi brug for noget routing funktionalitet.

Princippet vil kommer til at arbejde med, er et koncept kaldet **hash-bang** ... `#!` 

Det benyttes fordi det sker i browseren uden at der sendes en request til serveren, og derved kan vi klare al logikken i browseren, og kun spørge serveren efter det data vi har behov for.

Den simple forklaring på at benytte `#!`, frem for udelukkende `#` er pga søgemaskine optimering. Normalt vil et hashtag blive ignoreret af en web-crawler, men konventionen er `#!` indekseres som almindelige navigations links. *(dette er den gengse forklaring, det er langt mere kompliceret, og kan i nogle tilfælde kræve serverside routing regler der omskriver URL's, men det er en helt anden snak vi helt udelader i dette simplificerede eksempel)*

Alle vores links på clientside, oprettes så de starter med et `#!` og derefter angiver vi den sti vi ønsker at udføre. Her kommer vi tæt på et koncept kaldet **RESTful** REST er en forkortelse af *Representational State Transfer* som handler om at hver request indeholder den ønskede handling, samt hvilket formål requesten har. 


Men for at gøre det lidt lettere for os i vores routing, vil vi ikke gå "all in" på REST, vi udelader request-typen `get, post, put, delete, patch` og i stedet koncentrerer os om handlingerne i de funktioner der knyttes til routen.

Normalt ville man oprette routes i stil med `#!/category/:id` som vi har set i en express app. Det bliver en ret kompliceret routing motor vi skal skrive, for at kunne håndtere parametre i vores routes.

Det vi benytter, er routes der ser ud som dette eksempel `#!/category?id=xyz` altså hvor vi tilføjer en querystring til vores `hashbang`. På den måde kan vi have en route med variabelt indhold med en forholdsvis enkel `.split('?')` funktion der håndterer parametre.

Det bliver nok først rigtig tydeligt hvad dette betyder, når vi begynder at knytte dynamiske data til vores routes.

## Routing motoren

For at gøre det lidt lettere for os selv at håndtere routes, giver det mening at konstuere en lille routeing klasse der kan klare det tunge arbejde.

Konceptet er at vi kan tilføje routes til klassen ved at skrive lidt kode i stil med dette *(placeringen af de routes, forklares senere)*

```javascript
router.add('#!/home', function(req){
   console.log(req);
   // do the thing
});
```


Eller med en lidt mere modular kode, have funktioner der kan knyttes til routes i stil med dette eksempel.
```javascript
function renderAbout(req){
   console.log(req);
   // kode der henter fra db og indsætter i html
}

router.add('#!/about', renderAbout);
```

Det ser jo ganske bekendt ud, hvis vi husker tilbage på express og den måde routes benyttes der. Dog skal vi ikke koncentrere os om `.get()` eller `.post()` da ingen af ruterne kaldes pga et post eller get kald... de aktiveres når hash'en ændres. 

Så det skal vi kunne håndtere, heldigvis er der en eventlistner vi kan benytte, nemlig `hashchanged`:
```javascript
window.addEventListener("hashchange", function() {
   console.log(window.location.hash);
}, true);
```
Nu får vi en besked i konsollen, hver gang hash'en ændres. 

Det er smart, fordi med den event og routing klassen, vil vi kunne håndtere langt de fleste scenarier på clientside delen.

Det eneste vi mangler nu, er selve routing motoren:
```javascript
// placeres i en fil kaldet Router.js
class Router {
   constructor() {
      this.routes = [];
   }

   add(uris, callback) {
      // Sikrer der er sendt en URI og en callback function med til add()
      if (!uris || !callback) throw new Error('uri eller callback skal sendes med til router.add(uri, callback)');
      // sikrer at callback er en funktion
      if (typeof callback !== "function") throw new TypeError('typeof callback skal være en funktion');

      // add() kan håndtere arrays af URI's
      // her er konceptet at hvis det ikke er et array, så konverteres uri til et array
      if (!Array.isArray(uris)) {
         let temp = uris;
         uris = [];
         uris.push(temp);
      }

      // da URIs nu er et array kan vi køre en foreach og tilføje samme callback til flere routes
      uris.forEach(uri => {
         // hvis route allerede er oprettet, sendes en fejlbesked tilbage
         this.routes.forEach(route => {
            if (route.uri === uri) throw new Error(`uri ${route.uri} er allerede oprettet`);
         })

         // gem et route objekt i routes arrayet
         const route = {
            uri, 
            callback
         }
         this.routes.push(route);
      });
   }

   resolve() {
      // hold styr på om en route matcher hash uri.
      let found = false;

      this.routes.some(route => {
         let regEx = new RegExp(`^${route.uri}$`); 
          // super grundlæggende håndtering af querystrings ... ?key=value 
         let path = window.location.hash.split('?');

         if (path[0].match(regEx)) {
            found = true; // en route mathcer
            let req = { path } // griber hash og placerer i en variabel...
            return route.callback.call(this, req);
         }
      });
      // hvis ingen route matchede, sendes vi tilbage til forsiden
      if (!found) {
         if (window.location.hash != '') {
            console.error(window.location.hash + ' kunne ikke findes');
         }
         window.location.hash = '#!/';
      }
   }
}
```

Filen med Router klassen skal inkluderes og klassen instancieres, jeg foreslår det sker samme sted som firebase.firestore(), så arbejder klasserne startes et samlet sted.


## Opret routes

Nu hvor der er en routing motor, og du kan udskrive alle dine links fra din collection, så skal det hele knyttes sammen.

Her er det knap så dynamisk, da alle routes skal oprettes manuelt i et dokument der indlæses når siden besøges. Men det er helt fint, til at starte med, så lad os prøve at få samlet det hele.

Jeg foreslår der oprettes en javascript fil kaldet `routes.js` som indlæses efter firebase instancieringen. I denne `routes.js` fil kan vi tilføje alle de routes vi har behov for.

Der er det nødvendigt at du ser på de routes du har tilføjet i din collection, og tilføjer de samme routes til `routes.js`.

Eftersom vi endnu ikke har noget konkret indhold at vise, er det helt i orden at indholdet sættes statisk i hver route, så er det lidt nemmere at styre.
Her er et eksempel på en route til "home" og det tilhørende kode der skal udføres når route rammes
```javascript
router.add('#!/home', function(req){
   console.log(req);
   let main = documen.querySelector('main');
   main.innerHTML = `
      <h1>Vanilla Lorem</h1>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nunc massa, elementum sit amet interdum eu,
         interdum ut nisi. Vestibulum in ipsum id tellus fermentum bibendum in nec ligula. Praesent sollicitudin
         ullamcorper augue sed auctor. Praesent sagittis justo non sollicitudin tincidunt. Donec auctor tempor lorem
         ac viverra. Sed convallis magna ut auctor rhoncus. Curabitur non ligula mi. In id neque ac est aliquet
         aliquet in ut lacus. In dignissim arcu ut velit vehicula scelerisque. Ut consectetur, erat sit amet commodo
         rhoncus, est massa consequat nibh, vitae molestie nulla ante eget augue. Sed sed tellus accumsan, porttitor
         felis quis, consectetur tortor.</p>`;
});
```

Det er en fordel hvis menupunkterne bliver fremhævet når de besøges, samt at det kun er det aktive menupunkt der er fremhævet. Det kan vi håndtere i kombination af `hashchanged` funktionen og hver route.
```javascript 
window.addEventListener("hashchange", function() {
   // fjern alle aktivt markerede links
   let links = document.querySelectorAll('nav a');
   links.forEach(link => {
      link.classList.remove('active');
   })
   router.resolve();
}, true);
```

og i f.eks `#!/home` routen, tilføjes en klasse kaldet `active` til linket med homeroute stien
```javascript
document.querySelector('nav a[href="#!/home"]').classList.add('active');
```

## Flere routes, der skal udføre den samme funktion

Vores home route er lige nu defineret som `#!/home`, men hvad nu hvis brugeren lander på en route der ikke findes, så sendes brugeren til `#/!` og ikke `#!/home`.
Det kan derfor være en fordel at have muligheden for at flere routes udfører den samme funktion.

Router klassen er sat op så den kan håndtere at man sender et array af URI's, som så kan udføre den samme funktion.
```javascript
router.add(['#!/','#!/home'], function(req){
   // begge routes udføre denne funktion.
});
```

