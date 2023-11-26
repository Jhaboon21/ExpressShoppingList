const Item = require('../item');
const express = require('express');
const router = express.Router();

// Get Homepage with all items
router.get('', (req, res, next) => {
    try {
        return res.json({ items: Item.findAllItems() });
    } catch (err) {
        return next(err);
    }
});

// POST homepage with new item
router.post('', (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({ item: newItem });
    } catch (err) {
        return next(err);
    }
});

// GET /:name of item
router.get('/:name', (req, res, next) => {
    try {
        let foundItem = Item.find(req.params.name);
        return res.json({ item: foundItem });
    } catch (err) {
        return next(err);
    }
});

// PATCH /:name of item
router.patch('/:name', (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({ item: foundItem });
    } catch (err) {
        return next(err);
    }
});

// DELETE /:name of item
router.delete('/:name', (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({ message: "Deleted" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;