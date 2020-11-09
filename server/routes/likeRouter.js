const router = require("express").Router();

const Like = require('../model/like');
const Dislike = require('../model/dislike');

router.post('/getlikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId};
    } else {
        variable = {commentId: req.body.commentId};
    }
    Like.find(variable)
        .exec((error, likes) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                likes
            });
        })
});

module.exports = router;