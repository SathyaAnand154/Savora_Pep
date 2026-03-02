const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress } = req.body;

        if (items && items.length === 0) {
            return res.status(400).json({ message: 'No food items' });
        }

        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            deliveryAddress,
            // Default simulated payment in INR
            paymentStatus: 'Completed'
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.food', 'name image');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
