/* -------------------------------------------------------------------------- */
/*                         //! Functional Programming                         */
/* -------------------------------------------------------------------------- */

// Functional programming in JavaScript is a programming paradigm that emphasizes the use of functions as the main building
// blocks of programs. It involves writing code in a way that focuses on immutable data, pure functions
// (functions that don't cause side effects), and higher-order functions (functions that can take other functions as arguments
// or return functions as results).

/* --------------------------- //! Pure Functions --------------------------- */

// A pure function in JavaScript always produces the "same output for the same input" and doesn't have any "side effects".
// Side Effects: A pure function does not modify any external state or variables outside of its scope.

//! Side Effects(Communication with outside world)
// Original array
const array = [1, 2, 3];

// Function to remove the last item from an array without modifying the original array
function removeLastItem(arr) {
  // Create a copy of the input array using concat
  const newArray = [].concat(arr);

  // Remove the last item from the copy
  newArray.pop();

  // Return the modified copy
  return newArray;
}

// Call the function to remove the last item from the original array
const array1 = removeLastItem(array);

// Output the original and modified arrays
console.log(array, array1); // Output: [1, 2, 3] [1, 2]

//! Referential transparency

// Pure function that adds two numbers
function add(a, b) {
  return a + b;
}

// Pure function that multiplies a number by 2
function multiplyByTwo(number) {
  return number * 2;
}

// Using the functions
const result1 = add(3, 4); // Evaluates to 7
const result2 = multiplyByTwo(result1); // Evaluates to 14

// Replace function calls with evaluated values
const evaluatedResult = multiplyByTwo(3 + 4); // Evaluates to 14

console.log(result2, evaluatedResult); // Output: 14 14

//! A function can be considered perfect if it adheres to the following principles:
// 1. One task
// 2. return statement
// 3. Pure
// 4. No shared state
// 5. Immutable state
// 6. Composable
// 7. Predictable

/* ---------------------------- // ! Idempotence ---------------------------- */

// Idempotence in JavaScript refers to the property of a function or operation where applying it multiple times produces
// the same result as applying it once.

Math.abs(Math.abs(-50));

/* --------------------- // ! Imperative VS Declerative --------------------- */

// ! Imperative Programming:
// Imperative programming is a programming paradigm where code describes the step-by-step process of how to achieve a task.
// It focuses on the detailed instructions and control flow needed to accomplish a specific goal.

// ! Declarative Programming:
// Declarative programming is a programming paradigm where code describes the desired outcome or result without specifying the detailed steps for achieving it.
// It emphasizes expressing what should be done rather than how it should be done, abstracting away implementation details.

/* ---------------------------- // ! Immutability --------------------------- */
// Immutability in JavaScript refers to the property of data that prevents it from being modified after it has been created.
// In other words, immutable data cannot be changed once it is initialized. This concept is crucial in functional programming
// and is often employed to ensure the predictability and integrity of data.

function modifyPerson(originalPerson, newAge) {
  // Creating a new object with one property modified (immutable approach)
  const modifiedPerson = {
    ...originalPerson, // Spread operator to copy existing properties
    age: newAge, // Modifying the 'age' property
  };
  return modifiedPerson;
}

// Original object
const person = {
  name: "John",
  age: 30,
};

// Creating a modified version of the person object
const modifiedPerson = modifyPerson(person, 31);

console.log(person); // Output: { name: 'John', age: 30 }
console.log(modifiedPerson); // Output: { name: 'John', age: 31 }

// ! Structural Sharing
// structural sharing refers to a memory-saving technique used in immutable data structures. When you make a change
// to an immutable data structure (like adding an element to a list or updating a key-value pair in a map),
// instead of creating an entirely new copy of the data structure, only the parts that are modified are copied. The unchanged
// parts are shared between the original and modified versions.

/* ---------------- // ! Higher Order Functions and Closures ---------------- */

// ! Higher-Order Functions (HOF):
// Higher-order functions are functions that can accept other functions as arguments or return functions as results.
// In JavaScript, functions are first-class citizens, meaning they can be treated as values and passed around like any
// other data type.

// ! Closures:
// Closures are a feature in JavaScript where an inner function has access to the variables and parameters of its outer function,
// even after the outer function has finished executing. Closures allow functions to "remember" the environment in which they
// were created.

// Higher-Order Function: greetGenerator
function greetGenerator(greeting) {
  return function (name) {
    return greeting + " " + name + "!";
  };
}

// Create specific greetings using greetGenerator
const greetHello = greetGenerator("Hello");
const greetGoodbye = greetGenerator("Goodbye");

// Use the generated greetings
console.log(greetHello("John")); // Output: Hello John!
console.log(greetGoodbye("Jane")); // Output: Goodbye Jane!

/* ----------------------------- //   ! Currying ---------------------------- */
// Currying is a technique used in functional programming where a function with multiple arguments is transformed
// into a sequence of functions, each taking a single argument. This allows for partial application of the function,
// where you can fix some of the arguments and generate a new function that takes the remaining arguments.

// Non-curried function
function add(x, y) {
  return x + y;
}

console.log(add(2, 3)); // Output: 5

// Curried function
function add(x) {
  return function (y) {
    return x + y;
  };
}

const add2 = add(2); // Fix the first argument to 2

console.log(add2(3)); // Output: 5

// ! Partial Application
// Partial application is a technique used in functional programming where a new function is created by fixing
// (or partially applying) one or more arguments of an existing function. The result is a specialized version of the
// original function, with some arguments already set, allowing for the creation of simpler functions that require
// fewer parameters when called.

function multiply(x, y, z) {
  return x * y * z;
}

const multiplyByTwo = multiply.bind(null, 2);
const result = multiplyByTwo(3, 4); // This will return 2 * 3 * 4 = 24
console.log(result); // Output: 24

/* ------------------------ // ! Memoization(Caching) ----------------------- */
// Memoization is a technique used in programming to optimize the performance of functions by caching the results of expensive
// function calls and returning the cached result when the same inputs occur again. This can significantly reduce redundant
// calculations, especially for functions with expensive computations or repetitive calls with the same arguments.

function expensiveOperation(n) {
  console.log("Calculating...");
  return n * n;
}

// Memoization function
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      console.log("Caching result...");
      cache[key] = fn.apply(null, args);
    }
    return cache[key];
  };
}

// Create a memoized version of expensiveOperation
const memoizedExpensiveOperation = memoize(expensiveOperation);

// First call (calculates and caches the result)
console.log(memoizedExpensiveOperation(5)); // Output: Calculating... (result: 25)

// Second call with the same argument (returns cached result)
console.log(memoizedExpensiveOperation(5)); // Output: (result: 25) [no calculation]
