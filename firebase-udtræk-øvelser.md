# Udtræk fra firebase.firestore()

Ind til videre har vi fokuseret på opsætning og grundlæggende brug af firebase.firestore, det næste vi skal dyrke, er hvordan man trækker data ud og hvilke muligheder der er for filtrering og sortering og lign.

Udgangspunktet er en ny collection kaldet bolcher, som I måske kan huske fra tidligere.

Du skal finde på en document struktur til bolcherne, så vi kan oprette en collection af bolcher, hvorpå vi kan afprøve en række forskellige udtræk.

![birgers bolcher](assets/bolcher.png)

## udskiv data.

Der vil være 10 opgaver, hvor hver opgave skal udkrives i noget HTML, du må selv bestemme hvordan strukturen ser ud, og hvordan hver opgave bliver kaldt.

Det er ikke nødvendigt at opsætte `onSnapshot` funktioner i denne opgave. Du kan eksperimentere med async/await.

```javascript
db.collection("bolcher")
  .get()
  .then(function(snapshot) {
    console.log(snapshot);
  });

(async function() {
  let snapshot = await db.collection("bolcher").get();
  console.log(snapshot);
})();
```

1. Udskriv alle informationer om alle bolcher.