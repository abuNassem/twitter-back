const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // 1. الشخص الذي سيتلقى الإشعار (صاحب التغريدة مثلاً)
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true // تحسين سرعة الاستعلام
    },
    // 2. الشخص الذي قام بالفعل (الذي عمل لايك مثلاً)
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // 3. نوع الإشعار
    type: {
        type: String,
        enum: ['like', 'comment'],
        required: true
    },
    text: {
        type: String,
        maxLength:30 ,
        
       },
    // 4. الرابط أو الشيء المرتبط بالإشعار (اختياري حسب النوع)
    // إذا كان لايك، نخزن ID البوست
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
   
    isRead: {
        type: Boolean,
        default: false
    },
    // 6. وقت الإشعار
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// إضافة Index مركب لجعل جلب الإشعارات غير المقروءة أسرع
notificationSchema.index({ recipient: 1, isRead: 1 });

const Notific= mongoose.model('Notification', notificationSchema);

module.exports=Notific