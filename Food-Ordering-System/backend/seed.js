const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food_ordering_db')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.log(err));

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=500`;

const sampleFoods = [
    // --- NORTH INDIAN ---
    {
        name: "Butter Chicken", description: "Tender chicken cooked in a rich, creamy tomato gravy with a hint of fenugreek.",
        price: 349, category: "North Indian", rating: 4.8, isOffer: true, isVeg: false, location: "Delhi",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=60", stock: 20
    },
    {
        name: "Paneer Butter Masala", description: "Soft paneer cubes simmered in a creamy, slightly sweet tomato gravy.",
        price: 299, category: "North Indian", rating: 4.5, isOffer: false, isVeg: true, location: "Delhi",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=500&q=60", stock: 15
    },
    {
        name: "Dal Makhani", description: "Rich and creamy black lentils slow-cooked overnight with butter and spices.",
        price: 249, category: "North Indian", rating: 4.7, isOffer: false, isVeg: true, location: "Punjab",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60", stock: 30
    },
    {
        name: "Mutton Rogan Josh", description: "Classic Kashmiri dish of tender mutton slow-cooked with aromatic spices.",
        price: 450, category: "North Indian", rating: 4.6, isOffer: false, isVeg: false, location: "Kashmir",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&w=500&q=60", stock: 12
    },

    // --- BIRYANI ---
    {
        name: "Hyderabadi Mutton Biryani", description: "Aromatic basmati rice layered with tender mutton pieces and special Awadhi spices.",
        price: 499, category: "Biryani", rating: 4.9, isOffer: false, isVeg: false, location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=60", stock: 10
    },
    {
        name: "Lucknowi Chicken Biryani", description: "Mild, subtle, and beautifully fragrant chicken biryani cooked in dum style.",
        price: 399, category: "Biryani", rating: 4.8, isOffer: true, isVeg: false, location: "Lucknow",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb4cbfc3cb?auto=format&fit=crop&w=500&q=60", stock: 15
    },
    {
        name: "Paneer Tikka Biryani", description: "Smoky paneer tikka nestled in long-grain aromatic rice.",
        price: 320, category: "Biryani", rating: 4.4, isOffer: false, isVeg: true, location: "Hyderabad",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60", stock: 20
    },

    // --- SOUTH INDIAN ---
    {
        name: "Masala Dosa", description: "Crispy crepe made from fermented rice and lentil batter, filled with spiced potato mash.",
        price: 120, category: "South Indian", rating: 4.6, isOffer: true, isVeg: true, location: "Bangalore",
        image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=500&q=60", stock: 50
    },
    {
        name: "Chicken Chettinad", description: "Spicy and fiery chicken curry made with roasted spices and coconut.",
        price: 320, category: "South Indian", rating: 4.7, isOffer: false, isVeg: false, location: "Chennai",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=60", stock: 18
    },

    // --- CHINESE / ASIAN ---
    {
        name: "Chicken Hakka Noodles", description: "Wok-tossed noodles with shredded chicken, veggies, and classic soy-garlic sauce.",
        price: 220, category: "Chinese", rating: 4.5, isOffer: false, isVeg: false, location: "Mumbai",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", stock: 25
    },
    {
        name: "Veg Manchurian Dry", description: "Crispy vegetable balls tossed in dark, spicy, and tangy soy-based sauce.",
        price: 199, category: "Chinese", rating: 4.4, isOffer: true, isVeg: true, location: "Pune",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=60", stock: 30
    },
    {
        name: "Chilli Chicken", description: "Classic Indo-Chinese diced chicken tossed with green chilies and bell peppers.",
        price: 280, category: "Chinese", rating: 4.6, isOffer: false, isVeg: false, location: "Kolkata",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=60", stock: 20
    },

    // --- FAST FOOD / STREET FOOD ---
    {
        name: "Mumbai Vada Pav", description: "Spicy potato fritter sandwiched between a soft bun with dry garlic chutney.",
        price: 30, category: "Street Food", rating: 4.7, isOffer: false, isVeg: true, location: "Mumbai",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=60", stock: 100
    },
    {
        name: "Pani Puri (6 pcs)", description: "Crispy hollow puris filled with spicy tangy water, sweet chutney, and potatoes.",
        price: 50, category: "Street Food", rating: 4.8, isOffer: true, isVeg: true, location: "Kolkata",
        image: "https://images.unsplash.com/photo-1601050690597-df0b40cf3e63?auto=format&fit=crop&w=500&q=60", stock: 40
    },
    {
        name: "Zinger Burger", description: "Extra crispy fried chicken fillet with lettuce and mayo in a toasted bun.",
        price: 249, category: "Fast Food", rating: 4.2, isOffer: true, isVeg: false, location: "Mumbai",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", stock: 25
    },
    {
        name: "Margherita Pizza", description: "Classic delight with 100% real mozzarella cheese on a traditional crust.",
        price: 299, category: "Fast Food", rating: 4.3, isOffer: false, isVeg: true, location: "Delhi",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60", stock: 15
    },
    {
        name: "Chicken Pepperoni Pizza", description: "Loaded with spicy chicken pepperoni and gooey cheese.",
        price: 399, category: "Fast Food", rating: 4.7, isOffer: false, isVeg: false, location: "Delhi",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60", stock: 12
    },

    // --- DRINKS / COOL DRINKS ---
    {
        name: "Thick Cold Coffee", description: "Classic blended cold coffee with creamy milk and vanilla ice cream.",
        price: 150, category: "Drinks", rating: 4.5, isOffer: true, isVeg: true, location: "Bangalore",
        image: "https://images.unsplash.com/photo-1461023058943-07cb1ce8dbb3?auto=format&fit=crop&w=500&q=60", stock: 50
    },
    {
        name: "Fresh Lime Soda", description: "Refreshing summer drink with freshly squeezed lemon, salt, and sweet syrup.",
        price: 80, category: "Drinks", rating: 4.2, isOffer: false, isVeg: true, location: "Mumbai",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60", stock: 80
    },
    {
        name: "Oreo Milkshake", description: "Thick shake loaded with crushed Oreos and chocolate drizzle.",
        price: 180, category: "Drinks", rating: 4.6, isOffer: false, isVeg: true, location: "Delhi",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", stock: 35
    },

    // --- DESSERTS ---
    {
        name: "Gulab Jamun (2 pcs)", description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup.",
        price: 90, category: "Dessert", rating: 4.9, isOffer: false, isVeg: true, location: "Delhi",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=60", stock: 40
    },
    {
        name: "Rasmalai (2 pcs)", description: "Soft paneer discs soaked in thickened, sweetened, and saffron-infused milk.",
        price: 120, category: "Dessert", rating: 4.8, isOffer: false, isVeg: true, location: "Kolkata",
        image: "https://images.unsplash.com/photo-1633504820252-78d91a9fba11?auto=format&fit=crop&w=500&q=60", stock: 25
    }
];

const seedDB = async () => {
    try {
        await Food.deleteMany(); // Clear existing
        console.log('Cleared existing food items.');
        await Food.insertMany(sampleFoods);
        console.log('Successfully seeded database with varied Zomato-style food items!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
