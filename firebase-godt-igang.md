# Firebase
Firebase er et produkt fra Google, hvor de tilbyder en række forskellige services vi kan benytte som base i vores applikationer.

Det er gratis at sætte op, og kan skaleres op hvis det bliver nødvendigt.

Vi starter med at se på hvordan vi kan benytte deres database, Firestore, som lager i en webapplikation. og vi starter med en meget simpel "Todo" app.

Vi kommer rundt om de fire grundlæggende **CRUD** principper, *Create, Read, Update, Delete* og får lagt siden online.

# Firebase Konto

Aller først skal man oprette en konto hos Firebase, det gøres med en google konto, som knyttes til firebase.
En Google konto er også gratis, så opret en hvis du ikke allerede har en.

Derefter besøges **[https://firebase.google.com/](https://firebase.google.com/)** hvor du logger ind øverst til højre.

![Login](assets/login.png)

# Projects

På Firebase kan man oprette flere projekter, som hver især kan benytte forskellige services på Firebase, start med at oprette et projekt ved at klikke på **Add project** 

![Add Project](assets/add-project.png)

Giv projektet et navn, f.eks. `Todo App`, da det er hvad vi først vil koncentrere os om.

Det efter spørger Firebase om du vil knytte analytics til projektet, det har vi ikke behov for at sætte op lige nu, så den springes over.

Klik videre og affent at projektet bliver klargjort.


# Knyt applikationen til Firebase

Firebase arbejder ud fra at hvert projekt har en eller flere Apps knyttet til projektet, så det første vi skal gøre er at registrere en app.

Klik på **App** ikonet:
![App Ikonet](assets/register-app.png)

Navnet kunne f.eks. være **Todo App**

Unlad at sætte flueben i **Hosting**, da vi vil fokusere på en anden hosting platform først.


Du vil se en kodestump der minder om denne
```javascript
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSzAzW8gYeChVVo3M2mr76XI-2fHXAeXZwKc",
    authDomain: "todo-app-e87dd.firebaseapp.com",
    databaseURL: "https://todo-app-e87dd.firebaseio.com",
    projectId: "todo-app-e87dd",
    storageBucket: "todo-app-e87dd.appspot.com",
    messagingSenderId: "62961450759",
    appId: "1:62961453789:web:44c85ee444598170d6e3cc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

Du skal kopiere den kodestump der er på din skærm, og indsætte den i et html dokument du opretter i dit repository. 

Det er muligt at finde frem til javascript koden igen, hvis du får klikket væk unden at have kopieret.



# Knyt en Database til projektet

Når appen er sat op, skal vi beslutte hvilke services appen skal benytte, vi koncentrerer os om **Database** i første omgang, så find det menupunkt i menuen til venstre.

Her skal man beslutte om man vil benytte den originale *Realtime Database* eller det nye *Cloud Firestore* 

Vi vil gerne arbejde med de nye teknologier, så vi klikker på **Create database** under **Cloud Firestore**

Da vi er igang med at lære at benytte Firestore, så sættes databasen op til at kære i **Test mode**, vi er klar over det gør at ALLE vil have adgang til at læse/skrive, men det simplificerer vores app meget her i starten.

Det næste Firebase vil vide, er hvor du mener datalageres skal være placeret fysisk, det er et spørgsmål om optimering af latency og lign, så det er vigtigt at vælge en server tæt på den primære region... vi er i Europa, så vi vælger den første der hedder noget med **Eur** i navnet.

Klik Done og vent på opsætningen af databasen.

# Collections

Firestore arbejder ud fra et koncept kaldet "Collections", som minder en smule om "Tabeller" i en MySQL database, men det er meget mere fleksibelt end en SQL tabel.
Det er teknisk set nærmere et JSON objekt, hvor vi selv kan bestemme hvilke felter hver enkelt **document** skal have, og hvert **document** kan indeholde  **collections** af andre **documents**... så det er super fleksibelt.

Alle **Collections** skal have et navn, så klik på **Start Collection** og udfyld **Collection ID** med "todos", og klik **Next**

Vi kan indsætte et **document** manuelt, så der er lidt data i vores collection:

* title, string, "Forbind til Firebase"
* content, string, "Der skal oprettes en forbindelse til Firebase og indholdet udskrives på en hjemmeside"
* isDone, boolean, false

Klik **Save** når alt det er tastet (eller noget der ligner).

Derefter vil det være muligt at se noget der minder om dette billede:
![Todo colecetion](assets/collection.png)

