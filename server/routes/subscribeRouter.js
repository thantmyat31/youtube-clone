const router = require("express").Router();
const Subscribe = require('./../model/subscribe');

router.post('/subscribeNumber', (req, res) => {
    Subscribe.find({ "userTo": req.body.userTo })
        .exec((error, subscribe) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });
            return res.status(200).json({
                success: true,
                subscribeNumber: subscribe.length
            })
        })
    
});

router.post('/subscribed', (req, res) => {
    Subscribe.find({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
        .exec((error, subscribed) => {
            let result = false;

            if(error) return res.status(400).json({
                success: false,
                error
            });

            if(subscribed.length > 0) {
                result = true;
            }
            return res.status(200).json({
                success: true,
                subscribed: result
            })
        })
});

router.post('/subscription', (req, res) => {
    const subscribe = new Subscribe(req.body);

    subscribe.save((error, result) => {
        if(error) return res.status(400).json({
            success: false,
            error
        });

        return res.status(201).json({
            success: true,
            channelId: result.userTo
        });
    });
});

router.post('/unsubscribe', (req, res) => {
    Subscribe.findOneAndDelete({ "userTo": req.body.userTo, "userFrom": req.body.userFrom })
        .exec((error, result) => {
            if(error) return res.status(400).json({
                success: false,
                error
            });

            return res.status(200).json({
                success: true,
                channelId: result.userTo
            });
        });
});

module.exports = router;