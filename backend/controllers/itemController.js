const Item = require('../models/Item');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ isAuctionOver: false }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('seller', 'name email');
        if (!item) return res.status(404).json({ msg: 'Item not found' });
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new item
exports.createItem = async (req, res) => {
    const { name, description, startingBid, imageUrl, auctionEndTime } = req.body;
    try {
        const newItem = new Item({
            name,
            description,
            startingBid,
            currentBid: startingBid,
            imageUrl,
            auctionEndTime,
            seller: req.user.id
        });
        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// You'll need to import the new Bid model at the top of the file
const Bid = require('../models/Bid');

// ...

// Replace the old placeBid function with this one
exports.placeBid = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        if (req.user.id === item.seller.toString()) {
            return res.status(400).json({ msg: "You cannot bid on your own item." });
        }

        if (new Date() > new Date(item.auctionEndTime)) {
            return res.status(400).json({ msg: 'Auction has already ended' });
        }

        const { bidAmount } = req.body;
        if (bidAmount <= item.currentBid) {
            return res.status(400).json({ msg: 'Bid must be higher than the current bid' });
        }

        // --- New Logic: Create a Bid document ---
        const newBid = new Bid({
            item: req.params.id,
            user: req.user.id,
            amount: bidAmount
        });
        await newBid.save();

        // --- Update the item with the new highest bid ---
        item.currentBid = bidAmount;
        item.highestBidder = req.user.id;
        const updatedItem = await item.save();

        res.json(updatedItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        // Check if the user is the seller
        if (item.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Item.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Item removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add this function to itemController.js
exports.getBidsForItem = async (req, res) => {
    try {
        const bids = await Bid.find({ item: req.params.id })
            .populate('user', 'name')
            .sort({ createdAt: -1 }); // Show newest bids first
        res.json(bids);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};