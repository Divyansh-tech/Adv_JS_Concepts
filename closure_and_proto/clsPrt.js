/* -------------------------------------------------------------------------- */
/*                           //! Function Constructor                          */
/* -------------------------------------------------------------------------- */
var funcC = new Function("p1", "p2", "return p1 + p2");
console.log(funcC(1, 3)); //4

/*
 * HOF(Higher Order FUnction): a function that is operates on other functions that operates on other functions by
 * taking them as argument or return them or both
 */
const multipleBy = (num1) => (num2) => num1 * num2;

const multiplyBy2 = multipleBy(2);
const multiplyBy5 = multipleBy(5);
console.log(multiplyBy2(4));
console.log(multiplyBy5(10));

/* -------------------------------------------------------------------------- */
/*                                  //! Closures                                */
/* -------------------------------------------------------------------------- */

/*
 * In JavaScript, a closure allows inner functions to maintain access to their containing function's variables, even after
 * the containing function has finished executing. When a function forms a closure over its variables, those variables
 * are not immediately removed from memory but are held until there are no more references to the inner function.
 * The JavaScript garbage collector eventually frees up these variables when they are no longer accessible or referenced
 * by the code.
 */
function outerFunction() {
  // This variable is contained in the outer function's scope
  let outerVar = 10;
  function innerFunction() {
    // The inner function can access the outerVar
    console.log(outerVar); // Outputs 10
  }
  // Call the inner function
  innerFunction();
}
// Call the outer function
outerFunction();

/* --------------------------- //! Closures and Memory -------------------------- */
//! Memory efficient
// Define a function that creates a large array and returns a value at a given index.
function heavyDuty(index) {
  // Create a new array filled with "testData."
  const bigArray = new Array(7000).fill("testData");
  // Log that the array is created (executed every time you call the function).
  console.log("bigArray created");
  // Return the value at the specified index in the array.
  return bigArray[index];
}

// Call the heavyDuty function multiple times to retrieve data from the same array.
heavyDuty(999);
heavyDuty(999);
heavyDuty(999);

// Define a function that creates a large array and returns an inner function to access data.
function heavyDuty2() {
  // Create a new array filled with "testData" (executed only once).
  const bigArray = new Array(7000).fill("testData");
  // Log that the array is created (executed only once).
  console.log("closure bigArray created");
  // Return an inner function that accesses data at a specified index in the array.
  return (index) => bigArray[index];
}

// Call heavyDuty2 to get the inner function.
const getHeavyDuty = heavyDuty2();

// Use the inner function to access data at different indices, reusing the same array.
getHeavyDuty(999);
getHeavyDuty(888);
getHeavyDuty(777);

/* --------------------- //! Closures and Encapsulation --------------------- */
/*
 * Closures enable the creation of private variables within functions. Variables declared in an outer function
 * are not directly accessible from the outside, providing a form of encapsulation
 */
// Create a function that encapsulates nuclear button functionality using closures.
// we encapsulate the state of timeWithoutDestruction within the makeNuclearButton function using closures. The functions
// passTime, totalPeaceTime, and launch have access to this private state, allowing them to interact with it.
// When you call ohno.totalPeaceTime(), it retrieves the total time without destruction by accessing the enclosed state
// via the totalPeaceTime function.
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;

  // Define a function to increase the time without destruction.
  const passTime = () => timeWithoutDestruction++;

  // Define a function to retrieve the total time without destruction.
  const totalPeaceTime = () => timeWithoutDestruction;

  // Define a function to launch the nuclear button and reset the time without destruction.
  const launch = () => {
    timeWithoutDestruction = -1;
    return "booooom";
  };

  // Set an interval to periodically increase the time without destruction.
  setInterval(passTime, 1000);

  // Return an object with functions that allow interacting with the nuclear button.
  return {
    //! If we want this function not be accessible publically for security concerns we can remove it from here
    launch: launch, // Function to launch the button and reset time.
    totalPeaceTime: totalPeaceTime, // Function to get the total time without destruction.
  };
};

// Create an instance of the nuclear button using the makeNuclearButton function.
const ohno = makeNuclearButton();

// Call the totalPeaceTime function to get the total time without destruction.
ohno.totalPeaceTime();

/* -------------------------- //! Closure Imp Exercise1 -------------------------- */
const arr = [1, 2, 3, 4];
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log("I am at index: ", arr[i - 1]);
  }, 3000);
}
// here output is 4 times (I am at index:  4)

// we want index to updated each time
/*
 * for this
 * 1.simple use let i.
 * 2.we can implement closure using IIFE
 */
for (var i = 0; i < arr.length; i++) {
  ((closureI) => {
    setTimeout(() => {
      console.log("Fixed: I am at index: ", arr[closureI]);
    }, 3000);
  })(i);
}

/* -------------------------------------------------------------------------- */
/*                    //! Prototype Inheritance in JavaScript:                    */
/* -------------------------------------------------------------------------- */
/*
 * Prototype inheritance is a mechanism in JavaScript where objects can inherit properties and methods from other
 * objects through their prototype chain. Objects in JavaScript have a prototype, and when properties or methods are
 * accessed, JavaScript looks up the prototype chain to find them.

* Here are the basic advantages of prototypal inheritance in JavaScript, summarized with headers:
* 1.Code Reusability
* 2.Flexibility and Dynamic Nature
* 3. Encapsulation
* 4. Memory Efficiency
* 5. Easy Modification and Extension
*/
//! Remember, while using __proto__ can be instructive for understanding prototype inheritance, it's generally recommended to
//! use Object.create() or constructor functions for creating more maintainable and less error-prone code.
//!  __proto__ is not recommended for production code due to potential performance and compatibility issues

// Parent object
const animal = {
  type: "Generic Animal",
  sound: function () {
    console.log("Generic animal sound");
  },
};

// Child object
const dog = {
  breed: "Labrador",
  bark: function () {
    console.log("Woof! Woof!");
  },
};

// Setting the prototype of 'dog' to 'animal'
dog.__proto__ = animal;

//! Recommended
// Creating a new object 'dog' with 'animal' as its prototype
//? const dog = Object.create(animal);

// Accessing properties and methods
console.log(dog.type); // Outputs: Generic Animal
dog.sound(); // Outputs: Generic animal sound
dog.breed = "Golden Retriever";
dog.bark(); // Outputs: Woof! Woof!

/*
* __proto__ as a reference or pointer that points to the prototype object of the current object. It allows you to 
* navigate up the prototype chain, accessing the prototype of an object.

* In JavaScript, a prototype is an object from which other objects inherit properties and methods. Every object in JavaScript
* has a prototype, and when you access a property or method on an object, JavaScript looks for it in the object itself. 
* If it doesn't find the property or method, it looks up the prototype chain until it finds it or reaches the end of the chain.

* specifically in the context of the prototype property, it's more accurate to say that only functions have a prototype
* property. Functions in JavaScript, being first-class objects, have a prototype property that is used when they are used 
* as constructor functions. This prototype property becomes the prototype of objects created using that function as a 
* constructor.
*/

/* -------------------------- //! Closure Imp Exercise2- Extend functionality of built in object -------------------------- */
//! #1. Date object => to have new method .lastYear() which shows last year 'YYYY' format.

Date.prototype.lastYear = function () {
  return this.getFullYear() - 1;
};

const lastYear = new Date("1988-10-10").lastYear();
console.log("lastYear: ", lastYear);

//! #2. Modify .map() to print ':)' at end of eact item.

Array.prototype.map = function () {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(this[i] + ":)");
  }
  return arr;
};

console.log([1, 2, 3].map());
