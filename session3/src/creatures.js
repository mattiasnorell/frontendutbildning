class Mamal {
    // Ett sätt att skapa privata variabler/funktioner i en klass.
    // Om den försöker anropas utanför klassens scope kommer ett exception kastas
    #daysInAYear = 365;

    constructor() {
        this.age = 0;
    }

    getAgeInDays() {
        return this.age * this.#daysInAYear;
    }
}

class Pet extends Mamal {
    constructor() {
        super();
        this.race = "Hund";
    }
}

export class Human extends Mamal {
    constructor() {
        super();
        this.race = "Människa";
    }
}

export class Dog extends Pet {
    constructor(name, age, owner) {
        super();
        this.race = "Hund";
        this.age = age;
        this.name = name;
        this.owner = owner;
    }

    #ageInDogYears(){
        if(this.age === 0) return 0;
        
        return 14 + ((this.age - 1) * 7); // Tydligen räknas första året dubbelt. ¯\_(ツ)_/¯ 
    }
    
    displayInfo(){
        console.log(`Namn: ${this.name}`);
        console.log(`Ras: ${this.race}`);
        console.log(`Ålder: ${this.age}`);
        console.log(`Ålder i hundår: ${this.#ageInDogYears()}`);
        console.log(`Ägare: ${this.owner.fullName()}`);
        
        return this;
    }
}