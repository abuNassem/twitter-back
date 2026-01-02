const mongo = require('mongoose');

const postSchema = new mongo.Schema({
    userId: { type: mongo.Schema.Types.ObjectId, ref: "user", required: true },
    content: {
        text: { type: String, default: null },
        images: { type: [String], default: [],max:3 }
    },
    reactCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 }
}, { timestamps: true });

const Post = mongo.model('Post', postSchema);

module.exports = Post;
