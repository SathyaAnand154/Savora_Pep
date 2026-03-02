const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    isOffer: { type: Boolean, default: false },
    isVeg: { type: Boolean, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
