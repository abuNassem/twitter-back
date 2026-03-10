const rateLimit = require('express-rate-limit')
exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again after a minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

