const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  type: {
    type: String,
    enum: ['normal', 'code', 'file', 'video'],
    required: true,
  },
  postHashtags:{
    type:[String],
    default:[]
    
  },

  content: {
    text: {
      type: String,

      default: null,
    },

    images: {
      type: [String],
      default: [],
      validate: [arr => arr.length <= 3, 'Max 3 images'],
    },

    video: {
      type: String,
      default: null,
    },

    code: {
      language: {
        type: String,
        default: null,
      },
      text: {
        type: String,
        default: null,
      },
    },

    file: {
      
      urlFile: {
        type: String,
        default: null,
      },
      visable:{type:Boolean,default:false},
      textContent:String,
      downlaodAble:{type:Boolean,default:false},
     
    },
  },

  reactCount: {
    type: Number,
    default: 0,
    min: 0,
  },

  commentCount: {
    type: Number,
    default: 0,
    min: 0,
  },

}, { timestamps: true });

postSchema.index({ "content.text": "text"});
module.exports = mongoose.model('Post', postSchema);
