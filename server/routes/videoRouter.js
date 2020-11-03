const router = require("express").Router();
const multer = require("multer");
const User = require("./../model/user");
const auth = require("./../middlewares/auth");
const Ffmpeg = require("fluent-ffmpeg");
const Video = require("../model/video");

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
            console.log(metaData);
            console.log(metaData.format.duration);

            fileDuration = metaData.format.duration;
        }
    });
    
    Ffmpeg(req.body.filePath)
        .on('filenames', function(filenames) {
            console.log('Will generate ' + filenames.join(', '));
            thumbnailFilePath = `thumbnails/${filenames[0]}`

        })
        .on('end', function() {
            console.log('Screenshots taken');
            return res.json({
                success: true,
                fileDuration,
                thumbnailFilePath
            });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'300x250',
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

module.exports = router;