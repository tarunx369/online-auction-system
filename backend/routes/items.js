const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Import all controller functions once
const {
    getAllItems,
    getItemById,
    createItem,
    placeBid,
    deleteItem,
    getBidsForItem
} = require('../controllers/itemController');

// @route   GET api/items
// @desc    Get all auction items
router.get('/', getAllItems);

// @route   GET api/items/:id
// @desc    Get a single item by its ID
router.get('/:id', getItemById);

// @route   GET api/items/:id/bids
// @desc    Get all bids for an item
router.get('/:id/bids', getBidsForItem);

// @route   POST api/items
// @desc    Create a new auction item
router.post('/', auth, createItem);

// @route   POST api/items/:id/bid
// @desc    Place a bid on an item
router.post('/:id/bid', auth, placeBid);

// @route   DELETE api/items/:id
// @desc    Delete an item
router.delete('/:id', auth, deleteItem);

module.exports = router;