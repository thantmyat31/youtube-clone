const mongoose = require('mongoose');

const subscribeSchema = mongoose.Schema({
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;