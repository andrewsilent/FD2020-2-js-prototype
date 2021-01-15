"use strict";

function MyArray() {
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
}

function MyArrayPrototype() {

  this.push = function push(...args) {           // insert item to array[array.length]        
    for (let i = 0; i < args.length; i++) {  // insert many items to array
      this[this.length++] = args[i]
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

  this.unshift = function unshift(...args) {     // insert items to array[0]
    for (let i = this.length + args.length - 1; i >= args.length; i--) {
      this[i] = this[i - args.length];
    }
    for (let i = 0; i < args.length; i++) {
      this[i] = args[i];
    }
    return this.length += args.length;
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

  this.forEach = function forEach(callback) {   // do some function on each element of array, return changed (mutated) array
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };

  this.map = function map(callback) {           // do dome function on each element of array, and return new array
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr[i] = callback(this[i], i, this);
      newArr.length++;
    }
    return newArr;
  };
}

MyArray.prototype = new MyArrayPrototype();
const myArray = new MyArray();