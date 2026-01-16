const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthUser = async (req, res, next) => {
    try {
       const authHeader = req.headers['authorization']; 

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
}

// استخراج التوكن
const providedToken = authHeader.split(' ')[1];


        // 2. التحقق من صحة التوكن (داخل try/catch)
        // إذا كان التوكن "null" أو مشوه، سينتقل الكود فوراً لكتلة catch
        const decoded = jwt.verify(providedToken, process.env.JWT_SECRT);

        // 3. البحث عن المستخدم
        const user = await User.findById(decoded.id).select('name _id email profileImage');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 4. إرسال البيانات للمرحلة التالية
        req.user = user;
        req.token =  providedToken;
        next();

    } catch (error) {
        // إذا فشل الـ verify أو أي عملية أخرى، نرسل رد خطأ واضح بدلاً من انهيار السيرفر
        console.log("Auth Middleware Error:", error);
                 res.status(500).json({error });

        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = AuthUser;