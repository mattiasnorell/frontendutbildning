import { reverse } from "./src/stringHelpers";

// Då vi redan har en import som heter reverse ger vi den ett alias för att undvika konflikter
import { reverse as arrayReverse} from "./src/arrayHelper";

// Default importer kan namnges som man vill
// T.ex med sitt riktiga namn...
import User from "./src/user"; 
// ...eller ett påhittat.
import test from "./src/user";
import {Dog} from "./src/creatures";

const inputString = "Hello world!";
const inputArray = ["Hello", "world", "!"];

console.log(inputString);
console.log(reverse(inputString));

console.log(inputArray);
console.log(arrayReverse(inputArray));


const user = new User("Förnamn", "Efternamn", 42);
const testUser = new test("Test", "Testsson", 12);
const dog = new Dog("Husdjur", 10, user).displayInfo(); // Chaining

console.log("\n")
user.displayInfo();
console.log("\n")
testUser.displayInfo();
