const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const { protect, admin } = require('../middleware/auth');

// @desc    Fetch all food items (with filters for location, offers, rating, search)
// @route   GET /api/food
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, location, category, isOffer, isVeg, minRating } = req.query;
        let query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (location) query.location = { $regex: location, $options: 'i' };
        if (category) query.category = category;
        if (isOffer === 'true') query.isOffer = true;
        if (isVeg !== undefined && isVeg !== '') query.isVeg = isVeg === 'true';
        if (minRating) query.rating = { $gte: Number(minRating) };

        const foods = await Food.find(query);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch single food item
// @route   GET /api/food/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a food item
// @route   POST /api/food
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const food = new Food(req.body);
        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a food item
// @route   PUT /api/food/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a food item
// @route   DELETE /api/food/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        await food.deleteOne();
        res.json({ message: 'Food item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
