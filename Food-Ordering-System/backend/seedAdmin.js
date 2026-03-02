const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_ordering_db')
    .then(() => console.log('MongoDB connected for seeding Admin'))
    .catch(err => console.log(err));

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@foodys.com' });

        if (adminExists) {
            console.log('Admin user already exists!');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await User.create({
                name: 'Admin User',
                email: 'admin@foodys.com',
                password: hashedPassword,
                role: 'admin',
                phone: '9999999999',
                address: 'Admin Headquarters'
            });

            console.log('Admin user created successfully!');
            console.log('Email: admin@foodys.com');
            console.log('Password: admin123');
        }
    } catch (err) {
        console.error('Error creating admin:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();
