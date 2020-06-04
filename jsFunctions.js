"use strict";

var arr = [1, 3, 3, 5];
var obj = { name: "md", address: "nowhere" };

// FOR EACH //
Array.prototype.myEach = function (callback) {
  //length of array to run
  for (let i = 0; i < this.length; i++) {
    //callback called to iterate index of this array
    callback(this[i], i, this);
  }
};

// MAP //
Array.prototype.myMap = function (callback) {
  //initialize empty array to push into
  var mapArr = [];
  //iterate through this array and push the callback into array
  //then array is returned
  for (let i = 0; i < this.length; i++) {
    mapArr.push(callback(this[i], i, this));
  }
  return mapArr;
};

// FILTER //
Array.prototype.myFilter = function (callback, context) {
  //initialize empty array to push into
  var filterArr = [];
  //iterate through this array and check if context value
  //of this is true at the index. If true, push the this index into array
  //then array is returned
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      filterArr.push(this[i]);
    }
  }
  return filterArr;
};

// SOME //
Array.prototype.mySome = function (callback, context) {
  //iterate through this array and check if context value
  //of this is true at the index. If true, return true else false
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) return true;
  }
  return false;
};

// EVERY //
Array.prototype.myEvery = function (callback, context) {
  //iterate through this array and check if context value
  //of this is false at any index. If false, return false else true
  for (let i = 0; i < this.length; i++) {
    if (!callback.call(context, this[i], i, this)) return false;
  }
  return true;
};

// REDUCE //
Array.prototype.myReduce = function (callback, inital) {
  //initialize the accumulator if defined
  var sum = inital === undefined ? undefined : inital;
  //iterate through array and check if sum is defined, if true,
  //add this index for every run and then return sum
  for (let i = 0; i < this.length; i++) {
    if (sum !== undefined) {
      sum = callback.call(undefined, sum, this[i], i, this);
    } else {
      sum = this[i];
    }
  }

  return sum;
};

// INCLUDES //
Array.prototype.myIncludes = function (key, start) {
  //iterate through the array and find if this array typeof
  //and key typeof are equal and compare their values. If found, return
  //true else false
  var initial = start != undefined ? start : 0;
  if (initial > this.length) return "index out of bounds";
  else {
    for (let i = initial; i < this.length; i++) {
      if (typeof this[i] === typeof key && this[i] === key) return true;
    }

    return false;
  }
};

// INDEXOF //
Array.prototype.myIndexOf = function (key, start) {
  //check if a starting index was provided
  var initial = start != undefined ? start : 0;
  //check if provided index is in range
  if (initial > this.length) return "index out of bounds";
  else {
    //iterate through the array and find if this array typeof
    //and key typeof are equal and compare their values. If found, return
    //i else -1
    for (let i = initial; i < this.length; i++) {
      if (typeof this[i] === typeof key && this[i] === key) return i;
    }

    return -1;
  }
};

// PUSH //
Array.prototype.myPush = function () {
  //create an empty array to push into
  var pushArr = [];
  //argument index
  var j = 0;
  if (arguments.length === 0)
    return "function does not take such number/type of arguments";
  //iterate for every index of the combined this array and args array
  for (let i = 0; i <= this.length + arguments.length - 1; i++) {
    //add i of this until length-1
    if (i <= this.length - 1) {
      pushArr[i] = this[i];
    } else {
      // add j of args until end of condition
      pushArr[i] = arguments[j];
      j++;
    }
  }

  return pushArr;
};

// LASTINDEXOF //
Array.prototype.myUnshift = function (key, start) {
  //check if a starting index was provided else start at max index
  var initial = start != undefined ? start : this.length - 1;
  if (start > this.length - 1) return "array index out of bounds";
  else {
    //run from last index and search backwards
    for (let i = initial; i >= 0; i--) {
      if (this[i] === key) return i;
    }

    return -1;
  }
};

// KEYS //
Object.grabKeys = function (obj) {
  //check for incompatible data parameter
  if (typeof obj !== "object") return "function expects object argument";
  else {
    //initialize empty array to push keys into
    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }
  }

  return keys;
};

// VALUES //
Object.grabValues = function (obj) {
  //check for incompatible data parameter
  if (typeof obj !== "object") return "function expects object argument";
  else {
    var values = [];
    //iterate through each key in object and check if propert exists
    //if true, push object[key] into the values array and return
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        values.push(obj[key]);
      }
    }
    return values;
  }
};

// TEST PASSED! //
arr.myEach((element) => {
  console.log("element", element); // should print "element [i]" for every element
});

var map = arr.myMap((element) => element * 10);
console.log("my map", map); //should return each element as product of 10

var filter = arr.myFilter((element) => element > 2);
console.log("filter", filter); // should only return elements greater than 2

var some = arr.mySome((element) => element % 2 === 0);
console.log(some); //should return false as array has no even numbers

var every = arr.myEvery((element) => element > 1);
console.log("every", every); //should return false as index at 1 is 1

var reduce = arr.myReduce((x, y) => x + y);
console.log("reduce", reduce); //should return 12 as the sum

var includes = arr.myIncludes(2, 1);
console.log("includes", includes); //should return false

var indexOf = arr.myIndexOf(3, 2);
console.log("index of", indexOf); //should return index of 2

var push = arr.myPush(1, 2, 3, 4);
console.log("push new", push); //should return [1,3,3,5,1,2,3,4]

var lastIndex = arr.myUnshift(6);
console.log("last index", lastIndex); //should return -1

var keys = Object.grabKeys(obj);
console.log("keys", keys); //should return ["name", "address"]

var values = Object.grabValues(obj);
console.log("values", values); //should return ["md", "nowhere"]
