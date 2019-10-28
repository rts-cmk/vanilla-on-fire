# Firebase

Firebase er et produkt fra Google, hvor de tilbyder en række forskellige services vi kan benytte som base i vores applikationer.

Det er gratis at sætte op, og kan skaleres op hvis det bliver nødvendigt.

Vi starter med at se på hvordan vi kan benytte deres database, Firestore, som lager i en webapplikation. og vi starter med en meget simpel "Todo" app.

Vi kommer rundt om de fire grundlæggende **CRUD** principper, _Create, Read, Update, Delete_ og får lagt siden online.

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

Her skal man beslutte om man vil benytte den originale _Realtime Database_ eller det nye _Cloud Firestore_

Vi vil gerne arbejde med de nye teknologier, så vi klikker på **Create database** under **Cloud Firestore**

Da vi er igang med at lære at benytte Firestore, så sættes databasen op til at kære i **Test mode**, vi er klar over det gør at ALLE vil have adgang til at læse/skrive, men det simplificerer vores app meget her i starten.

Det næste Firebase vil vide, er hvor du mener datalageres skal være placeret fysisk, det er et spørgsmål om optimering af latency og lign, så det er vigtigt at vælge en server tæt på den primære region... vi er i Europa, så vi vælger den første der hedder noget med **Eur** i navnet.

Klik Done og vent på opsætningen af databasen.

# Collections

Firestore arbejder ud fra et koncept kaldet "Collections", som minder en smule om "Tabeller" i en MySQL database, men det er meget mere fleksibelt end en SQL tabel.
Det er teknisk set nærmere et JSON objekt, hvor vi selv kan bestemme hvilke felter hver enkelt **document** skal have, og hvert **document** kan indeholde **collections** af andre **documents**... så det er super fleksibelt.

Alle **Collections** skal have et navn, så klik på **Start Collection** og udfyld **Collection ID** med "todos", og klik **Next**

Vi kan indsætte et **document** manuelt, så der er lidt data i vores collection:

- title, string, "Forbind til Firebase"
- content, string, "Der skal oprettes en forbindelse til Firebase og indholdet udskrives på en hjemmeside"
- isDone, boolean, false

Klik **Save** når alt det er tastet (eller noget der ligner).

Derefter vil det være muligt at se noget der minder om dette billede:
![Todo colecetion](assets/collection.png)

# HTML siden der skal arbejde med Firestore

I den HTML side du har oprettet, indsætte et enkelt `ul` som skal bruges til at vise alle dine _todos_, giv den en id `todos`

Du kan selvfølgelig knytte et stylesheet til siden, så det kan styles en smule.

Opret også et **scripts.js** hvor vi vil skrive vores koder til at udskrive og håndtere **todos**

Derudover skal vi lige sikre dine firebase scripts er indsat korrekt.

Linket til SDK scriptet skal står i `<head>`, og der skal tilføjes et script mere:

```html
<head>
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-firestore.js"></script>
</head>
```

Deruover i bunden af `<body>` skal forbindelsen til dit firebase projekt indsættes FØR dit eget script, samt vi tilpasser det en smule ud fra de behov vi har.
_messagingSenderId_ og _appId_ er ikke nødvendige, og vi der oprettes en `const db = firebase.firestore()` som vi kan benytte senerehen, til at arbejde med databasen.

```html
<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSzAzW8gYeChVVo3M2mr76XI-2fHXAeXZwKc",
    authDomain: "todo-app-e87dd.firebaseapp.com",
    databaseURL: "https://todo-app-e87dd.firebaseio.com",
    projectId: "todo-app-e87dd",
    storageBucket: "todo-app-e87dd.appspot.com"
    // messagingSenderId: "62961450759",
    // appId: "1:62961453789:web:44c85ee444598170d6e3cc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // referer til databasen
  const db = firebase.firestore();
</script>
```

# Hent og udskriv alle Documents i en Collection

For at hente alt i en collection, skal vi skrive lidt kode i vores egen scripts fil.

Vi kan benytte `db` variablen til at hente data ud.

```javascript
// hent data
db.collection("todos")
  .get()
  .then(function(snapshot) {
    snapshot.docs.forEach(function(doc) {
      console.log(doc);
    });
  });
```

Der oprettes et _snapshot_ af **todos** collectionen, dette indeholder alle dokumenterne og noget metadata vedrørende hvert element, som f.eks. document-id.

dette kan vi udskrive helt som vi plejer, hvis vi benytter `.data()` funktionen

```javascript
// hent data
db.collection("todos")
  .get()
  .then(function(snapshot) {
    snapshot.docs.forEach(function(doc) {
      console.log(doc.data()); // dette er blot for at demonstrere hvordan man får fat i indholdet
    });
  });
```

---

Lad os udskrive alle todo's som en usorteret liste af elementer...dvs den `ul` du skulle indsætte tidligere, med id `todos`
Hvert Todo kommer til at bestå af en overskrift, et tekst område, og en checkbox. Derudover knyttes en knap til hvert enkelt, så man kan slette en todo.

Det vil give god mening at oprette en funktion til at udskrive hvert enkelt todo-dokument, da vi senere kommer til at arbejde med automatisk opdatering af listen ud fra nogle handlinger.

```javascript
const todos = document.querySelector("#todos"); // ul tagget i html dokumentet
function renderTodo(doc) {
  // opret elementerne
  let li = document.createElement("li");
  let title = document.createElement("h3");
  let content = document.createElement("p");
  let isDone = document.createElement("p");
  let checkbox = document.createElement("input");
  let remove = document.createElement("button");

  // sæt attributter og værdier
  li.setAttribute("data-id", doc.id);
  title.textContent = doc.data().title;
  content.textContent = doc.data().content;
  isDone.textContent = "Afsluttet? ";
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = doc.data().isDone;
  isDone.appendChild(checkbox);
  remove.textContent = "x";

  // knyt elementerne til ul tagget
  li.appendChild(title);
  li.appendChild(content);
  li.appendChild(isDone);
  li.appendChild(remove);
  todos.appendChild(li);
}
```

Nu har vi en funktion der kan klare visningen af hvert element, så skal den kaldes ved at ændre i hent data funktionen.

```javascript
// hent data
db.collection("todos")
  .get()
  .then(function(snapshot) {
    snapshot.docs.forEach(function(doc) {
      renderTodo(doc);
    });
  });
```

# Opdater data

Der er en checkbox i vores todo element, som skal benyttes til at markere om et punkt er udført eller ej. Der skal skrives lidt kode for at opdatere firestore dokumentet

Lige under `todos.appendChild(li);` inden i `renderTodo` funktionen, skrives den enventhandler der skal knyttes til checkboxen.

```javascript
checkbox.addEventListener("change", function(event) {
  event.stopPropagation();
  db.collection("todos")
    .doc(doc.id)
    .update({
      isDone: checkbox.checked
    })
    .then(function() {
      window.location.replace(window.location);
    });
});
```

# Slet data

Der er en knap i vores todo element, som skal benyttes til at slette elementer. Der skal skrives lidt kode for at få knappen til at slette.

Lige under `todos.appendChild(li);` inden i `renderTodo` funktionen, skrives den enventhandler der skal knyttes til knappen.

```javascript
remove.addEventListener("click", function(event) {
  if (confirm("Vil du slette?")) {
    let id = event.target.parentElement.getAttribute("data-id");
    db.collection("todos")
      .doc(id)
      .delete()
      .then(function() {
        window.location.replace(window.location);
      });
  }
});
```

# Opret data

For at indsætte en ny todo fra vores hjemmeside, skal vi have en formular med et titel felt, og et felt til indholdet samt en checkbox. Der bør også være en knap til at submitte data.

```html
<form id="add-todo">
  <div>
    <label>Titel:</label>
    <input type="text" name="title" />
  </div>
  <div>
    <label>Indhold</label>
    <textarea name="content"></textarea>
  </div>
  <div>
    <label>Afsluttet?</label>
    <input type="checkbox" name="done" />
  </div>
  <button>Opret</button>
</form>
```

Der skal også knyttes en smule javascript til submit eventen, så vi kan gribe data og sende til firebase:

```javascript
const form = document.querySelector("#add-todo");
// indsæt data
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // HUSK VALIDERING!!!!!

  db.collection("todos")
    .add({
      title: form.title.value,
      content: form.content.value,
      isDone: form.isDone != undefined ? form.isDone.checked : false
    })
    .then(function() {
      window.location.replace(window.location);
    });
});
```
