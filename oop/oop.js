/* -------------------------------------------------------------------------- */
/*                               //! OOP and FP                               */
/* -------------------------------------------------------------------------- */
/*
! OOP Encapsulation (Java)
* Achieved through class-based structures, bundling data and behavior within the same class.
! FP Encapsulation (JavaScript)
* Achieved through closures, higher-order functions, and immutability, allowing functions to
* encapsulate data and behavior separately.
*/

/* -------------------------------------------------------------------------- */
/*                            //! Factory functions                           */
/* -------------------------------------------------------------------------- */
/*
 * A factory function is a function that returns another function or object. The purpose of a factory function is to
 * create and configure instances of objects or functions in a flexible and reusable way.
 */
// Factory function for creating person objects
function createPerson(name, age) {
  // Encapsulated data and behavior
  return {
    name: name,
    age: age,
    greet: function () {
      console.log(
        `Hello, my name is ${this.name} and I am ${this.age} years old.`
      );
    },
  };
}

// Usage of the factory function
const person1 = createPerson("John", 30);
const person2 = createPerson("Alice", 25);

person1.greet(); // Outputs: Hello, my name is John and I am 30 years old.
person2.greet(); // Outputs: Hello, my name is Alice and I am 25 years old.

/* -------------------------------------------------------------------------- */
/*                             //! Object.create()                            */
/* -------------------------------------------------------------------------- */

// Prototype object with the greet method
const personProto = {
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  },
};

// Factory function using Object.create()
function createNewPerson(name, age) {
  // Create a new object with a prototype linked to the personProto object
  const person = Object.create(personProto);

  // Set encapsulated data
  person.name = name;
  person.age = age;

  return person;
}

// Usage of the factory function
const newPerson11 = createNewPerson("John", 30);
const newPerson22 = createNewPerson("Alice", 25);

newPerson11.greet(); // Outputs: Hello, my name is John and I am 30 years old.
newPerson22.greet(); // Outputs: Hello, my name is Alice and I am 25 years old.

/* -------------------------------------------------------------------------- */
/*                          //! Constructor Functions                         */
/* -------------------------------------------------------------------------- */
/*
 * A constructor function in JavaScript is a function that is used to create and initialize objects. It is a special
 * function that is called with the new keyword to create instances of a particular type of object. Constructor functions
 * typically define properties and behaviors that will be shared by all instances created with them.
 */
// Constructor function for creating person objects
function Person(name, age) {
  // Properties set on the instance
  this.name = name;
  this.age = age;
}

// Prototype method shared by all instances
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating instances using the constructor
const newPerson1 = new Person("John", 30);
const newPerson2 = new Person("Alice", 25);

newPerson1.greet(); // Outputs: Hello, my name is John and I am 30 years old.
newPerson2.greet(); // Outputs: Hello, my name is Alice and I am 25 years old.

/*
 ? If you don't use the new keyword with a constructor function, then "this" keyword inside the function will not refer to a
 ? newly created instance. Instead, it will refer to the global object (window in a browser environment, or global in Node.js).
 
 ? If you use an arrow function as a method added to the prototype, it will have some implications because arrow functions do 
 ? not have their own this. Instead, they inherit the this value from the enclosing scope, here(Person prototype) this value 
 ? being inherited from the surrounding scope, which is the global scope. 
 */

/* -------------------------------------------------------------------------- */
/*                               //! ES6 Classes                              */
/* -------------------------------------------------------------------------- */

/*
* ES6 classes are a syntactical sugar over the existing prototype-based inheritance in JavaScript. They provide a 
* cleaner and more convenient way to create constructor functions and prototype chains. Here's a basic explanation.

! Instance:
* Meaning: An instance is a specific occurrence or realization of an object created from a class.
* Analogy: Think of a class as a blueprint for a house. An instance is a physical house built from that blueprint.You 
* can have multiple houses (instances) based on the same blueprint (class), but each house is a distinct, separate entity.

! Class:
* Meaning: A class is a "template" or blueprint that defines the properties and behaviors common to objects of a certain type.
* Analogy: If you think of a class as a blueprint for a house, it specifies the structure, layout, and features that all 
* houses of that type will have.

! Object:
* Meaning: An object is a concrete instance of a class, created using the class's blueprint.
* Analogy: Continuing with the house analogy, an object is an actual house built from the blueprint. Each house is an object, 
* and all the houses share common characteristics defined by the blueprint (class).

! Instantiate:
* Meaning: "Instantiation" is the process of creating an instance (object) of a class.
* Analogy: When you decide to build a house based on a blueprint, you are instantiating that blueprint to create a physical 
* house.

! Blueprint:
* Meaning: A blueprint is a detailed plan or model that serves as a guide for constructing something.
* Analogy: In programming, a class acts as a blueprint. It defines the structure, properties, and methods that objects 
* created from it will have.

!Object-Oriented Programming (OOP):
* Meaning: OOP is a programming "paradigm" that models the real world using objects, which are instances of classes. 
* It emphasizes encapsulation, inheritance, and polymorphism.
* Analogy: Using the house analogy, OOP is like designing a city where each building (object) is constructed based on 
* blueprints (classes) that define common characteristics.
*/

//? In JavaScript, classes are built on prototypal inheritance, allowing objects to inherit directly from other objects.
//? The class syntax introduced in ECMAScript 2015 provides a cleaner way to work with prototypes, but under the hood,
//? JavaScript's inheritance is prototype-based. In contrast, C++ follows classical inheritance, where classes are explicitly
//? defined blueprints, and objects are instances of these classes. The syntax, underlying principles, and flexibility in
//? structuring code differ significantly between the prototypal inheritance in JavaScript and the classical inheritance model
//? in C++.

class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

const peter = new Elf("Peter", "stones");
console.log(peter instanceof Elf);
console.log(peter.attack());

/* -------------------------------------------------------------------------- */
/*                          //! 4-Ways to use "this"                          */
/* -------------------------------------------------------------------------- */

//! 1. new binding this
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person11 = new Person("Xavier", 55);
console.log(person11);

//! 2. implicit binding this
const person22 = {
  name: "Karen",
  age: 40,
  hi() {
    console.log("hi" + this.name);
  },
};

//! 3. explicit binding this
const person33 = {
  name: "Karen",
  age: 40,
  hi: function () {
    console.log("hi" + this.setTimeout);
  }.bind(window),
};

//! 4. arrow function this
const person44 = {
  name: "Karen",
  age: 40,
  hi: function () {
    var inner = () => {
      console.log("hi" + this.name);
    };
    return inner();
  },
};
