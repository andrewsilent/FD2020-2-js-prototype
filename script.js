"use strict";

function MyArray() {
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
}

function myArrayPrototype() {

  this.push = function push() {           // insert item to array[array.length]        
    for (let i = 0; i < arguments.length; i++) {  // insert many items to array
      this[this.length++] = arguments[i]
    }
    return this.length;
  };

  this.pop = function pop() {                 // delete item from array[array.length]
    if (this.length > 0) {
      const lastItem = this[this.length - 1];
      delete this[--this.length];
      return lastItem;
    }
  };

  this.unshift = function unshift(item) {     // insert item to array[0]
    for (let i = this.length; i > 0; i--) {
      this[i] = this[i - 1];
    }
    this[0] = item;
    return ++this.length;
  };

  this.shift = function shift() {             // delete item array[0]
    if (this.length > 0) {
      const firstItem = this[0];
      delete this[0];
      for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1];
      }
      delete this[--this.length];
      return firstItem;
    }
  };

  this.concat = function concat(array) {      // concat arrays and return new array
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr.push(this[i]);
    }
    for (let i = 0; i < array.length; i++) {
      newArr.push(array[i]);
    }
    return newArr;
  };

  this.reverse = function reverse() {         // reverse array
    for (let i = 0; i < this.length; i++) {
      this[i - this.length + 1] = this[i];
    }
    for (let i = 1; i < this.length; i++) {
      this[i] = this[-i];
      delete this[-i];
    }
    return this;
  };

  this.forEach = function forEach(expression) {   // do some function on each element of array, return changed (mutated) array
    for (let i = 0; i < this.length; i++) {
      this[i] = expression(this[i], i, this);
    }
  };

  this.map = function map(expression) {           // do dome function on each element of array, and return new array
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr[i] = expression(this[i], i, this);
      newArr.length++;
    }
    return newArr;
  };
}

MyArray.prototype = new myArrayPrototype();
const myArray = new MyArray();

const array1 = new MyArray('a', 'b', 'c');
const array2 = new MyArray('d', 'e', 'f');
let array3 = array1.concat(array2);
console.log(array3);
console.log(array3.reverse());

function addSomeValue(element, index, array) {
  return element = 'a' + element + 5;
}

function addStar(element, index, array) {
  return element = element + '*';
}

array3.forEach(addSomeValue);
console.log(array3);
array3.forEach(addSomeValue);
console.log(array3);
console.log(array3.map(addStar));