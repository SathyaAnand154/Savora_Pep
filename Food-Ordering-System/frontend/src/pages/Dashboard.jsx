import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Search, MapPin, Star, Tag, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
    const { addToCart } = useContext(CartContext);
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState(''); // New Category State
    const [isOffer, setIsOffer] = useState(false);
    const [typeFilter, setTypeFilter] = useState('All'); // 'All', 'Veg', 'Non-Veg'
    const [minRating, setMinRating] = useState('');

    const CATEGORIES = [
        { name: 'All', icon: '🍽️' },
        { name: 'North Indian', icon: '🍛' },
        { name: 'Biryani', icon: '🍚' },
        { name: 'South Indian', icon: '🥞' },
        { name: 'Street Food', icon: '🥟' },
        { name: 'Chinese', icon: '🍜' },
        { name: 'Fast Food', icon: '🍔' },
        { name: 'Drinks', icon: '🥤' },
        { name: 'Dessert', icon: '🍨' }
    ];

    useEffect(() => {
        fetchFoods();
    }, [search, location, category, isOffer, typeFilter, minRating]);

    const fetchFoods = async () => {
        try {
            const queryParams = new URLSearchParams({
                search,
                location,
                category: category === 'All' ? '' : category,
                isOffer: isOffer || '',
                isVeg: typeFilter === 'Veg' ? 'true' : typeFilter === 'Non-Veg' ? 'false' : '',
                minRating: minRating || ''
            });
            const { data } = await axios.get(`http://localhost:5000/api/food?${queryParams}`);
            setFoods(data);
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    };

    return (
        <div style={{ padding: '20px 0' }}>
            {/* Advertisement Banner */}
            <div className="glass-panel" style={{
                padding: '0',
                marginBottom: '30px',
                borderRadius: '15px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
                boxShadow: '0 10px 30px rgba(255, 154, 158, 0.3)'
            }}>
                <div style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#333' }}>
                    <div style={{ maxWidth: '70%' }}>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#d81b60', fontWeight: 'bold' }}>Special Weekend Offer! 🎉</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#555' }}>Get 50% OFF on all Biryanis and Desserts. Use code <strong style={{ color: '#d81b60' }}>YUMMY50</strong> at checkout.</p>
                        <button className="btn" style={{
                            background: '#d81b60',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(216, 27, 96, 0.4)',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >Order Now</button>
                    </div>
                    <div style={{ fontSize: '6rem', transform: 'rotate(10deg)' }}>
                        🥘
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
                <h2 style={{ marginBottom: '15px' }}>Find Your Favorite Food 🍕</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={20} color="#999" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                        <input
                            type="text"
                            placeholder="Search for restaurants, cuisine or a dish..."
                            className="input-field"
                            style={{ paddingLeft: '45px', marginBottom: 0 }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ width: '250px', position: 'relative' }}>
                        <MapPin size={20} color="#999" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                        <input
                            type="text"
                            placeholder="Location (e.g. Mumbai)"
                            className="input-field"
                            style={{ paddingLeft: '45px', marginBottom: 0 }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Selection Carousel */}
                <div style={{
                    display: 'flex', gap: '20px', overflowX: 'auto', padding: '10px 0', marginTop: '20px',
                    scrollbarWidth: 'none', msOverflowStyle: 'none'
                }}>
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                cursor: 'pointer', minWidth: '80px', opacity: category === cat.name ? 1 : 0.6,
                                transform: category === cat.name ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%', background: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '24px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                border: category === cat.name ? '2px solid var(--soft-mint-dark)' : '2px solid transparent'
                            }}>
                                {cat.icon}
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: category === cat.name ? 'bold' : 'normal', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} />
                            <Tag size={18} color="var(--soft-mint-dark)" /> Offers Only
                        </label>

                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: '20px', overflow: 'hidden' }}>
                            <button
                                onClick={() => setTypeFilter('All')}
                                style={{ padding: '8px 15px', border: 'none', background: typeFilter === 'All' ? 'var(--soft-mint-dark)' : 'transparent', color: typeFilter === 'All' ? 'white' : '#666', cursor: 'pointer', transition: '0.3s' }}
                            >All</button>
                            <button
                                onClick={() => setTypeFilter('Veg')}
                                style={{ padding: '8px 15px', border: 'none', background: typeFilter === 'Veg' ? 'green' : 'transparent', color: typeFilter === 'Veg' ? 'white' : '#666', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <div style={{ width: '12px', height: '12px', border: `1px solid ${typeFilter === 'Veg' ? 'white' : 'green'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: typeFilter === 'Veg' ? 'white' : 'green' }}></div></div> Veg
                            </button>
                            <button
                                onClick={() => setTypeFilter('Non-Veg')}
                                style={{ padding: '8px 15px', border: 'none', background: typeFilter === 'Non-Veg' ? 'red' : 'transparent', color: typeFilter === 'Non-Veg' ? 'white' : '#666', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <div style={{ width: '12px', height: '12px', border: `1px solid ${typeFilter === 'Non-Veg' ? 'white' : 'red'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: typeFilter === 'Non-Veg' ? 'white' : 'red' }}></div></div> Non-Veg
                            </button>
                        </div>

                        <select className="input-field" style={{ marginBottom: 0, padding: '10px', width: '130px', marginLeft: '10px' }} value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                            <option value="">Any Rating</option>
                            <option value="4">4+ Stars</option>
                            <option value="4.5">4.5+ Stars</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid-3">
                {foods.map(food => (
                    <div key={food._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <img src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} alt={food.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {food.isVeg ? (
                                        <div style={{ width: '16px', height: '16px', border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'green' }}></div>
                                        </div>
                                    ) : (
                                        <div style={{ width: '16px', height: '16px', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'red' }}></div>
                                        </div>
                                    )}
                                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{food.name}</h3>
                                </div>
                                <span style={{ fontWeight: 'bold', color: 'var(--soft-mint-dark)', fontSize: '1.2rem' }}>₹{food.price}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Star size={16} fill="gold" color="gold" /> {food.rating}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={16} /> {food.location}
                                </span>
                                {food.isOffer && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'green' }}>
                                        <Tag size={16} /> Offer
                                    </span>
                                )}
                            </div>

                            <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>{food.description}</p>

                            <button
                                onClick={() => addToCart(food)}
                                className="btn"
                                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                            >
                                <ShoppingBag size={18} /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
                {foods.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                        <h3>No food items found matching your criteria.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
