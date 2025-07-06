const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);