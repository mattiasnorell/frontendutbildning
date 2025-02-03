/*
FRONTEND FÖR ALLA - Del 2
JavaScript


_Lite historia_
Skapades 1995
Är dynamiskt / svagt typat
Är på inget sätt släkt med Java
*/





// Kommentarer

// Antingen skriver man på en rad

/*
Eller så skriver man på många rader.
Det kan vara användbart.
Om det inte görs i onödan.
*/





// Variabler
var myVariable = "Detta är en variabel";

const myConstVariable = "Denna kan ej ändras";
let myLetVariable = "Denna kan ändras";



// Några av variabeltyperna
var myString = "En sträng";     // String (strängar)
var myNumber = 123;             // Number (numerisk)
var myArray = ["1","2","3"]     // Array (lista)
var myObject = {"key": "value"} // Object

var myUndefined = undefined;    // Undefined
var myNull = null;              // Null



// Utvecklarkonsollen
console.log("Här kan man skriva vad man vill")
console.log("Eller skicka in en variabel", myVariable);



// Funktioner

// Deklarerad funktion
function declaredFunction(input) {
    console.log(input);
}

declaredFunction("My value"); // Resultat: My value;

// "Arrow"-funktion
const arrowFunction = (input) => {
    console.log(input);
}

arrowFunction("My value"); // Resultat: My value;


// Självexekverande funktion
(function (input) {
    console.log(input) // Resultat: vår input-variabel
})("vår input-variabel");


// Globala moduler
window  // webbläsaren

document // root-noden av html-dokumentet