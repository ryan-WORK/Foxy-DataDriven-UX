export function isOdd(i) {
  return i % 2 !== 0;
}

export function isEven(i) {
  return i % 2 === 0;
}

export function findIt(items, item) {
    for (const item of items) {
        if (item.name === 'b') {
            return item
        }
    }
}

// Compare ===> Sort
function compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }
  }

  export function sortBy(key, data) {
    let arrayCopy = [...data];
      return arrayCopy.sort(this.compareBy(key));
  }

export function isPrime(n){
  let divisor = 2;

  while (n > divisor){
    if(n % divisor == 0){
     return false;
    }
    else
      divisor++;
  }
  return true;
}

export function primeFactors(n){
  let factors = [],
      divisor = 2;

  while(n>2){
    if(n % divisor == 0){
       factors.push(divisor);
       n= n/ divisor;
    }
    else{
      divisor++;
    }
  }
  return factors;
}

export function removeDuplicate(arr){
  let exists ={},
      outArr = [],
      elm;

  for(let i =0; i<arr.length; i++){
    elm = arr[i];
    if(!exists[elm]){
      outArr.push(elm);
      exists[elm] = true;
   }
  }
  return outArr;
}

export function mergeSortedArray(a, b){
  let merged = [],
      aElm = a[0],
      bElm = b[0],
      i = 1,
      j = 1;

  if(a.length ==0)
    return b;
  if(b.length ==0)
    return a;
  /*
  if aElm or bElm exists we will insert to merged array
  (will go inside while loop)
   to insert: aElm exists and bElm doesn't exists
             or both exists and aElm < bElm
    this is the critical part of the example
  */
  while(aElm || bElm){
   if((aElm && !bElm) || aElm < bElm){
     merged.push(aElm);
     aElm = a[i++];
   }
   else {
     merged.push(bElm);
     bElm = b[j++];
   }
  }
  return merged;
}

export function reverseStr(str){
  let rtnStr = '';
  for(let i = str.length-1; i>=0;i--){
    rtnStr +=str[i];
  }
  return rtnStr;
}

export function sumFinder(arr, sum){
  let differ = {},
      len = arr.length,
      substract;

  for(let i =0; i<len; i++){
     substract = sum - arr[i];

     if(differ[substract])
       return true;
     else
       differ[arr[i]] = true;
  }

  return false;
}

export function topSum(arr){

  let biggest = arr[0],
      second = arr[1],
      len = arr.length,
      i = 2;

  if (len<2) return null;

  if (biggest<second){
    biggest = arr[1];
    second = arr[0];
  }

  for(; i<len; i++){

   if(arr[i] > biggest){
      second = biggest;
      biggest = arr[i];
    }
   else if (arr[i]>second){
      second = arr[i];
   }

 }
 return biggest + second;
}

