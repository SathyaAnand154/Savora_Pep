import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, BarChart2, Users, ShoppingBag, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [reports, setReports] = useState({ userCount: 0, orderCount: 0, foodCount: 0, revenue: 0 });
    const [showAddForm, setShowAddForm] = useState(false);

    // New Food State
    const [newFood, setNewFood] = useState({
        name: '', description: '', price: '', category: '', location: '', isOffer: false, isVeg: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    });

    useEffect(() => {
        fetchFoods();
        fetchReports();
    }, []);

    const fetchFoods = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/food');
            setFoods(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReports = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/reports', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setReports(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddFood = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/food', newFood, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setShowAddForm(false);
            setNewFood({ name: '', description: '', price: '', category: '', location: '', isOffer: false, isVeg: true, image: '' });
            fetchFoods();
            fetchReports();
        } catch (error) {
            alert('Error adding food');
        }
    };

    const handleDeleteFood = async (id) => {
        if (window.confirm('Delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/food/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchFoods();
                fetchReports();
            } catch (error) {
                alert('Error deleting food');
            }
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Admin Dashboard</h2>

            {/* Reports Section */}
            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(157, 237, 208, 0.3)', padding: '15px', borderRadius: '50%' }}>
                        <Users size={24} color="var(--soft-mint-dark)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Users</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{reports.userCount}</h3>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(157, 237, 208, 0.3)', padding: '15px', borderRadius: '50%' }}>
                        <ShoppingBag size={24} color="var(--soft-mint-dark)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Orders</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{reports.orderCount}</h3>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(157, 237, 208, 0.3)', padding: '15px', borderRadius: '50%' }}>
                        <BarChart2 size={24} color="var(--soft-mint-dark)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Revenue</p>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>₹{reports.revenue}</h3>
                    </div>
                </div>
            </div>

            {/* Food Management */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Food Menu Management ({reports.foodCount} items)</h3>
                <button className="btn" onClick={() => setShowAddForm(!showAddForm)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Plus size={16} /> Add New Food
                </button>
            </div>

            {showAddForm && (
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
                    <h4>Add New Food Item</h4>
                    <form onSubmit={handleAddFood} className="grid-3">
                        <input type="text" placeholder="Name" required className="input-field" value={newFood.name} onChange={e => setNewFood({ ...newFood, name: e.target.value })} />
                        <input type="number" placeholder="Price (₹)" required className="input-field" value={newFood.price} onChange={e => setNewFood({ ...newFood, price: e.target.value })} />
                        <input type="text" placeholder="Category" required className="input-field" value={newFood.category} onChange={e => setNewFood({ ...newFood, category: e.target.value })} />
                        <input type="text" placeholder="Location City" required className="input-field" value={newFood.location} onChange={e => setNewFood({ ...newFood, location: e.target.value })} />
                        <input type="text" placeholder="Image URL" required className="input-field" value={newFood.image} onChange={e => setNewFood({ ...newFood, image: e.target.value })} />

                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" checked={newFood.isOffer} onChange={e => setNewFood({ ...newFood, isOffer: e.target.checked })} />
                            Is Special Offer?
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" checked={newFood.isVeg} onChange={e => setNewFood({ ...newFood, isVeg: e.target.checked })} />
                            Is Pure Veg?
                        </label>

                        <textarea placeholder="Description" required className="input-field" style={{ gridColumn: '1 / -1', resize: 'none' }} rows="2" value={newFood.description} onChange={e => setNewFood({ ...newFood, description: e.target.value })}></textarea>

                        <button type="submit" className="btn" style={{ gridColumn: '1 / -1' }}>Save Food Item</button>
                    </form>
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--glass-bg)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--glass-shadow)' }}>
                    <thead style={{ background: 'rgba(157, 237, 208, 0.4)' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Item</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Location</th>
                            <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(food => (
                            <tr key={food._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} alt={food.name} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {food.isVeg ? (
                                                <div style={{ width: '12px', height: '12px', border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'green' }}></div>
                                                </div>
                                            ) : (
                                                <div style={{ width: '12px', height: '12px', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'red' }}></div>
                                                </div>
                                            )}
                                            <span style={{ fontWeight: 'bold' }}>{food.name}</span>
                                        </div>
                                        {food.isOffer && <span style={{ background: 'gold', color: '#333', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>Special Offer</span>}
                                    </div>
                                </td>
                                <td style={{ padding: '15px' }}>{food.category}</td>
                                <td style={{ padding: '15px' }}>₹{food.price}</td>
                                <td style={{ padding: '15px' }}>{food.location}</td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button onClick={() => handleDeleteFood(food._id)} style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
