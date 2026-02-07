const rateLimit=require('express-rate-limit')
exports.limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max:5, 
  message: {
    status: 429,
    message:"لقد أرسلت طلبات كثيرة جداً، يرجى المحاولة بعد 5 دقيقة."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

