const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startingBid: { type: Number, required: true },
    currentBid: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    auctionEndTime: { type: Date, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isAuctionOver: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);