const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
},{
    timestamp: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;