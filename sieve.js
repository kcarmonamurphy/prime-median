exports.findMedian = (primes) => {
  let numPrimes = primes.length;

  if (numPrimes % 2 == 0) {
    return [
      primes[numPrimes/2-1],
      primes[numPrimes/2]
    ];
  }
  return primes[Math.floor(numPrimes/2)]
}

exports.findPrimes = (n) => {

  //create an array of all numbers from 2..n
  let array = [...Array(n-2).keys()].map(v => v+2);

  //iterate for all values from 2..sqrt(n)
  for(let i = 2; i < Math.sqrt(n); i++) {

    let j = 0;

    while (true) {
      //k is a non-prime (composite) number
      let k = i**2 + i*j;
      if (k < n) {
        removeFromArray(k,array)
        j++;
        continue;
      }
      break;
    }
  }

  return array
}

const removeFromArray = (k, arr) => {
  let index = arr.indexOf(k);
  if (index !== -1) arr.splice(index, 1);
  return arr;
}