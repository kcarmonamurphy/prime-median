const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});

app.get('/api/:n', (req, res) => {
	const n = parseInt(req.params.n);

  if (n <= 2) {
    return res.status(400).json({
      error: "Please supply a positive integer larger than 2"
    });
  }

	let primes = findPrimes(n);
	let median = findMedian(primes);
	res.json({
    result: `${median}`
  });
});

app.get('*', (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  res.status(404).json({
    error: "Usage: GET /n where n is any positive integer larger than 2"
  });
});

const findMedian = (primes) => {
	let numPrimes = primes.length;

	if (numPrimes % 2 == 0) {
		return [
			primes[numPrimes/2-1],
			primes[numPrimes/2]
		];
	}
	return primes[Math.floor(numPrimes/2)]
}

const findPrimes = (n) => {

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