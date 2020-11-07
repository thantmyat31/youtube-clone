const router = require("express").Router();
const Comment = require("./../model/comment");

router.post("/saveComment", (req, res) => {
    const newComment = new Comment(req.body);
    newComment.save((error, comment) => {
        if(error) return res.status(400).json({
            success: false,
            error
        });

        Comment.findById(comment._id)
            .populate('writer')
            .exec((error, result) => {
                if(error) return res.status(400).json({
                    success: false,
                    error
                });

                return res.status(200).json({
                    success: true,
                    comment: result
                })
            });
    })
});

router.post("/getComments", (req, res) => {
    Comment.find({"postId": req.body.postId})
        .populate('writer')
        .exec((error, comments) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });

            return res.status(200).json({
                success: true,
                comments
            });
        })
});

module.exports = router;