const mongoose = require('mongoose');

const subscribeSchema = mongoose.Schema({
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;