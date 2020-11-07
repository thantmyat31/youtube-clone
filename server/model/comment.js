const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    responseTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;