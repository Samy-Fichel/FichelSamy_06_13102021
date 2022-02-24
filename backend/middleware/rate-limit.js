const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 01 * 60 * 1000, //01 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 01 minutes)
});

// Apply the rate limiting middleware to all requests
module.exports = limiter;