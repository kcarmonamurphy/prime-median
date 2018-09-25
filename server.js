const sieve = require('./sieve.js');

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});

app.get('/api/:n', (req, res) => {
	const n = parseInt(req.params.n);

  //larger values of n can cause heap overflow
  if (n <= 2 || n > 10000) {
    return res.json({
      error: "Please supply a positive integer larger than 2 but less than 10000"
    });
  }

	let primes = sieve.findPrimes(n);
	let median = sieve.findMedian(primes);
  
	res.json({
    result: `${median}`
  });
});

app.get('*', (req, res) => {
  res.json({
    error: "Usage: GET /n where n is any positive integer larger than 2"
  });
});

