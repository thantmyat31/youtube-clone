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

router.post('/getdislikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId};
    } else {
        variable = {commentId: req.body.commentId};
    }
    Dislike.find(variable)
        .exec((error, dislikes) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                dislikes
            });
        })
});

router.post('/uplike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId,  userId: req.body.userId};
    }
    
    const like = new Like(variable);
    like.save((error, likeResult) => {
        if(error) return res.status(400).json({
            success: false,
            error
        });
        Dislike.findOneAndDelete(variable)
            .exec((error, result) => {
                if(error) return res.status(400).json({
                    success: false,
                    error
                });
                return res.status(200).json({
                    success: true,
                    likeResult
                });
            });
    })
});

router.post('/unlike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId,  userId: req.body.userId};
    }
    
    Like.findOneAndDelete(variable)
        .exec((error, unlikeResult) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                unlikeResult
            });
        });
});

router.post('/updislike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId,  userId: req.body.userId};
    }

    const dislike = new Dislike(variable);
    dislike.save((error, dislikeResult) => {
        if(error) return res.status(400).json({
            success: false,
            error
        });
        Like.findOneAndDelete(variable)
            .exec((error, result) => {
                if(error) return res.status(400).json({
                    success: false,
                    error
                });
                return res.status(200).json({
                    success: true,
                    dislikeResult
                });
            });
    });
    
});

router.post('/undislike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId,  userId: req.body.userId};
    }

    Dislike.findOneAndDelete(variable)
        .exec((error, undislikeResult) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                undislikeResult
            });
        });
    
});

module.exports = router;