'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOdd = isOdd;
exports.isEven = isEven;
exports.findIt = findIt;
exports.sortBy = sortBy;
exports.isPrime = isPrime;
exports.primeFactors = primeFactors;
exports.removeDuplicate = removeDuplicate;
exports.mergeSortedArray = mergeSortedArray;
exports.reverseStr = reverseStr;
exports.sumFinder = sumFinder;
exports.topSum = topSum;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isOdd(i) {
  return i % 2 !== 0;
}

function isEven(i) {
  return i % 2 === 0;
}

function findIt(items, item) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _item = _step.value;

      if (_item.name === 'b') {
        return _item;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// Compare ===> Sort
function compareBy(key) {
  return function (a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
}

function sortBy(key, data) {
  var arrayCopy = [].concat(_toConsumableArray(data));
  return arrayCopy.sort(this.compareBy(key));
}

function isPrime(n) {
  var divisor = 2;

  while (n > divisor) {
    if (n % divisor == 0) {
      return false;
    } else divisor++;
  }
  return true;
}

function primeFactors(n) {
  var factors = [],
      divisor = 2;

  while (n > 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

function removeDuplicate(arr) {
  var exists = {},
      outArr = [],
      elm = void 0;

  for (var i = 0; i < arr.length; i++) {
    elm = arr[i];
    if (!exists[elm]) {
      outArr.push(elm);
      exists[elm] = true;
    }
  }
  return outArr;
}

function mergeSortedArray(a, b) {
  var merged = [],
      aElm = a[0],
      bElm = b[0],
      i = 1,
      j = 1;

  if (a.length == 0) return b;
  if (b.length == 0) return a;
  /*
  if aElm or bElm exists we will insert to merged array
  (will go inside while loop)
   to insert: aElm exists and bElm doesn't exists
             or both exists and aElm < bElm
    this is the critical part of the example
  */
  while (aElm || bElm) {
    if (aElm && !bElm || aElm < bElm) {
      merged.push(aElm);
      aElm = a[i++];
    } else {
      merged.push(bElm);
      bElm = b[j++];
    }
  }
  return merged;
}

function reverseStr(str) {
  var rtnStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    rtnStr += str[i];
  }
  return rtnStr;
}

function sumFinder(arr, sum) {
  var differ = {},
      len = arr.length,
      substract = void 0;

  for (var i = 0; i < len; i++) {
    substract = sum - arr[i];

    if (differ[substract]) return true;else differ[arr[i]] = true;
  }

  return false;
}

function topSum(arr) {

  var biggest = arr[0],
      second = arr[1],
      len = arr.length,
      i = 2;

  if (len < 2) return null;

  if (biggest < second) {
    biggest = arr[1];
    second = arr[0];
  }

  for (; i < len; i++) {

    if (arr[i] > biggest) {
      second = biggest;
      biggest = arr[i];
    } else if (arr[i] > second) {
      second = arr[i];
    }
  }
  return biggest + second;
}