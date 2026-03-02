import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Package, Clock, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><div className="loader" style={{ margin: '0 auto', width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid var(--soft-mint-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div><style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style><h2>Loading your orders...</h2></div>;
    }

    if (orders.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px' }} className="glass-panel">
                <Search size={64} color="#ccc" style={{ marginBottom: '20px' }} />
                <h2>No Orders Found</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>Looks like you haven't placed any orders yet.</p>
                <Link to="/" className="btn">Browse Food</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 0', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={28} color="var(--soft-mint-dark)" /> My Orders
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => (
                    <div key={order._id} className="glass-panel" style={{ padding: '25px', position: 'relative', overflow: 'hidden' }}>
                        {/* Status Ribbon */}
                        <div style={{
                            position: 'absolute', top: '20px', right: '-30px', background: order.status === 'Delivered' ? 'green' : 'var(--soft-mint-dark)',
                            color: 'white', padding: '5px 40px', transform: 'rotate(45deg)', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                            {order.status}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingRight: '60px' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Clock size={16} /> {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <MapPin size={16} /> {order.deliveryAddress}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 5px 0' }}>Order Total</p>
                                <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>₹{order.totalAmount}</h3>
                            </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px dashed rgba(0,0,0,0.1)', margin: '0 0 20px 0' }} />

                        <div>
                            <h4 style={{ marginBottom: '15px' }}>Items Ordered:</h4>
                            {order.items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
                                    <img src={item.food?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} alt={item.food?.name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.food?.name || 'Item Unavailable'}</p>
                                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Qty: {item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>
                                        ₹{item.quantity * item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
