const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true 
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment'],
        required: true
    },
    text: {
        type: String,
        maxLength:30 ,
        
       },
 
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    commentId:{type: mongoose.Schema.Types.ObjectId,default:null},
   
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

notificationSchema.index({ recipient: 1, isRead: 1 });

const Notific= mongoose.model('Notification', notificationSchema);

module.exports=Notific
