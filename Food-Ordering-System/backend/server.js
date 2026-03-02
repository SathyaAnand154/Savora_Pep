const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('bufferCommands', false);

mongoose.connection.on('error', err => console.log('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_ordering_db')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/food', require('./routes/food.route'));
app.use('/api/orders', require('./routes/order.route'));

// Reports route (aggregate for admin dashboard)
app.get('/api/reports', require('./middleware/auth').protect, require('./middleware/auth').admin, async (req, res) => {
    try {
        const userCount = await mongoose.model('User').countDocuments();
        const orderCount = await mongoose.model('Order').countDocuments();
        const foodCount = await mongoose.model('Food').countDocuments();

        // Revenue logic:
        const orders = await mongoose.model('Order').find();
        const revenue = orders.reduce((acc, current) => acc + current.totalAmount, 0);

        res.json({ userCount, orderCount, foodCount, revenue });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
