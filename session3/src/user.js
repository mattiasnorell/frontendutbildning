import {Human} from './creatures';

// Att använda "default" i exporten går endast att använda en gång per modul, detta för att
// importen sedan förutsätter att det inte är en namngiven export och kan då namnges med valfritt namn
export default class User extends Human {
    constructor(firstName, lastName, age) {
        super(); // Super() måste användas på classer med arv (extends), detta för att den ärvda klassen ska "startas"

        this.age = age;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    
    displayInfo(){
        console.log(`Namn: ${this.firstName} ${this.lastName}`);
        console.log(`Ras: ${this.race}`);
        console.log(`Ålder: ${this.age}`);
        console.log(`Ålder i dagar: ${this.getAgeInDays()}`);
    }
}