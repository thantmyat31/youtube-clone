const router = require("express").Router();
const multer = require("multer");
const Ffmpeg = require("fluent-ffmpeg");
const Video = require("../model/video");
const Subscribe = require("../model/subscribe");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extension(file.originalname);
        if(extension !== ".mp4") {
            return cb(res.status(400).end("only mp4 file is allowed"), false);
        }
        cb(null, true);
    }
})
   
var upload = multer({ storage: storage }).single("file");

router.post("/uploadFiles", (req, res) => {
    upload(req, res, error => {
        if(error) {
            return res.json({
                success: false,
                error
            })
        }

        return res.json({
            success: true,
            filePath: res.req.file.path,
            filename: res.req.file.filename
        });
    })
});

router.post("/thumbnail", (req, res) => {
    let thumbnailFilePath = "";
    let fileDuration = "";

    Ffmpeg.ffprobe(req.body.filePath, (error, metaData) => {
        if(!error) {
            fileDuration = metaData.format.duration;
        }
    });
    
    Ffmpeg(req.body.filePath)
        .on('filenames', function(filenames) {
            thumbnailFilePath = `thumbnails/${filenames[0]}`
        })
        .on('end', function() {
            return res.json({
                success: true,
                fileDuration,
                thumbnailFilePath
            });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            size:'320x180',
            filename: 'thumbnail-%b.png'
        });
});

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body);
    video.save((error, result) => {
        if(error) return res.status(400).json({
            success: false,
            error
        });
        return res.status(200).json({
            success: true,
        });
    })
});

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((error, videos) => {
            if (error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                videos
            });
    })
});

router.post('/getVideo', (req, res) => {
    Video.findById(req.body.videoId)
        .populate('writer')
        .exec((error, video) => {
            if(error) res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                video
            });
        })
});

router.post('/getSubscriptionVideos', (req, res) => {
    Subscribe.find({ "userFrom": req.body.userFrom})
        .exec((error, channels) => {
            if(error) res.status(400).json({
                success: false,
                error
            });
            const subscribedChannel = channels.map(ch => ch.userTo);
            Video.find({ "writer": { $in: subscribedChannel } })
                .populate('writer')
                .exec((error, videos) => {
                    if(error) return res.status(400).json({
                        success: true,
                        error
                    });
                    return res.status(200).json({
                        success: true,
                        videos
                    })
                });
        });
});

router.post('/viewIncrease', (req, res) => {
    Video.findByIdAndUpdate(req.body.videoId, { $inc: { "views": 1 } })
        .exec((error, views) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                views
            });
        });
});

module.exports = router;