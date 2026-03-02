import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Trash2, ShoppingBag, CreditCard, MapPin, QrCode, Smartphone, Coins, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import myQrCode from '../assets/my_qr_code.jpeg';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState('');

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, NetBanking, COD
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
    const navigate = useNavigate();

    const handleOpenPayment = () => {
        if (!address) {
            alert('Please enter a delivery address');
            return;
        }
        setShowPaymentModal(true);
    };

    const processPayment = async () => {
        setPaymentStatus('processing');

        // Simulate real-world payment delay
        setTimeout(async () => {
            try {
                const orderData = {
                    items: cartItems.map(item => ({
                        food: item.food._id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount: getCartTotal() + 50, // Including delivery fee
                    deliveryAddress: address,
                    paymentStatus: 'Completed'
                };

                await axios.post('http://localhost:5000/api/orders', orderData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });

                setPaymentStatus('success');

                // After showing success animation for 3 seconds, clear cart and redirect
                setTimeout(() => {
                    clearCart();
                    setShowPaymentModal(false);
                    navigate('/');
                }, 3000);

            } catch (error) {
                alert('Error placing order');
                setPaymentStatus('idle');
                setShowPaymentModal(false);
            }
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <ShoppingBag size={64} color="#ccc" />
                <h2>Your cart is empty!</h2>
            </div>
        );
    }

    const grandTotal = getCartTotal() + 50;

    return (
        <div style={{ position: 'relative' }}>
            <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Cart Items List */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>Your Items</h2>
                    {cartItems.map((item) => (
                        <div key={item.food._id} className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '15px', marginBottom: '15px', gap: '20px' }}>
                            <img src={item.food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                    {item.food.isVeg ? (
                                        <div style={{ width: '12px', height: '12px', border: '1px solid green', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'green' }}></div>
                                        </div>
                                    ) : (
                                        <div style={{ width: '12px', height: '12px', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'red' }}></div>
                                        </div>
                                    )}
                                    <h4 style={{ margin: 0 }}>{item.food.name}</h4>
                                </div>
                                <p style={{ margin: 0, color: 'var(--soft-mint-dark)', fontWeight: 'bold' }}>₹{item.price}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button
                                    className="btn-outline"
                                    style={{ padding: '5px 10px', borderRadius: '4px' }}
                                    onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="btn-outline"
                                    style={{ padding: '5px 10px', borderRadius: '4px' }}
                                    onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                                >+</button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.food._id)}
                                style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer', padding: '10px' }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary & Address */}
                <div>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Order Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#666' }}>Item Total</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#666' }}>Delivery Fee (approx)</span>
                            <span>₹50</span>
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '15px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>To Pay</span>
                            <span style={{ color: 'var(--soft-mint-dark)' }}>₹{grandTotal}</span>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontSize: '0.9rem' }}>
                                <MapPin size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                Delivery Address:
                            </label>
                            <textarea
                                className="input-field"
                                rows="3"
                                placeholder="Enter your full apartment & street address..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{ resize: 'none' }}
                            ></textarea>
                        </div>

                        <button
                            className="btn"
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '15px', fontSize: '1.1rem' }}
                            onClick={handleOpenPayment}
                        >
                            Select Payment Option
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Portal Overlay */}
            {showPaymentModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass-panel" style={{ width: '100%', maxWidth: '700px', background: 'rgba(255,255,255,0.95)', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                        {/* Payment Header */}
                        <div style={{ padding: '20px 30px', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft-mint)' }}>
                            <h3 style={{ margin: 0, color: '#1a4d3e' }}>Complete Payment</h3>
                            <button
                                onClick={() => paymentStatus === 'idle' && setShowPaymentModal(false)}
                                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: paymentStatus === 'idle' ? 'pointer' : 'not-allowed', color: '#1a4d3e' }}
                            >×</button>
                        </div>

                        {/* Payment Body Content */}
                        <div style={{ display: 'flex', minHeight: '400px' }}>

                            {/* Payment Methods Sidebar */}
                            <div style={{ width: '250px', borderRight: '1px solid rgba(0,0,0,0.1)', background: '#f8fafc' }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {[
                                        { id: 'UPI', icon: QrCode, label: 'UPI / QR Code' },
                                        { id: 'Card', icon: CreditCard, label: 'Credit / Debit Card' },
                                        { id: 'NetBanking', icon: Smartphone, label: 'Net Banking' },
                                        { id: 'COD', icon: Coins, label: 'Cash on Delivery' },
                                    ].map((method) => (
                                        <li
                                            key={method.id}
                                            onClick={() => paymentStatus === 'idle' && setPaymentMethod(method.id)}
                                            style={{
                                                padding: '20px', display: 'flex', alignItems: 'center', gap: '15px',
                                                cursor: paymentStatus === 'idle' ? 'pointer' : 'not-allowed',
                                                background: paymentMethod === method.id ? 'white' : 'transparent',
                                                borderLeft: paymentMethod === method.id ? '4px solid var(--soft-mint-dark)' : '4px solid transparent',
                                                fontWeight: paymentMethod === method.id ? 'bold' : 'normal',
                                                color: paymentMethod === method.id ? 'var(--text-dark)' : '#666',
                                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <method.icon size={20} color={paymentMethod === method.id ? 'var(--soft-mint-dark)' : '#999'} />
                                            {method.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Payment Details Area */}
                            <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                                {paymentStatus === 'success' ? (
                                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
                                        <CheckCircle size={80} color="green" style={{ marginBottom: '20px' }} />
                                        <h2 style={{ color: 'green', marginBottom: '10px' }}>Payment Successful!</h2>
                                        <p style={{ color: '#666' }}>Your order has been placed. Redirecting to home...</p>
                                    </div>
                                ) : paymentStatus === 'processing' ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="loader" style={{
                                            border: '4px solid #f3f3f3', borderTop: '4px solid var(--soft-mint-dark)',
                                            borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 20px'
                                        }}></div>
                                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                                        <h3>Processing Payment...</h3>
                                        <p style={{ color: '#666' }}>Please do not close this window.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ width: '100%', marginBottom: '30px', textAlign: 'center' }}>
                                            <p style={{ color: '#666', marginBottom: '5px' }}>Amount to pay</p>
                                            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', margin: 0 }}>₹{grandTotal}</h1>
                                        </div>

                                        {paymentMethod === 'UPI' && (
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <div style={{ padding: '15px', background: 'white', display: 'inline-block', borderRadius: '12px', border: '1px solid #eee', marginBottom: '20px' }}>
                                                    {/* Custom QR Code */}
                                                    <img src={myQrCode} alt="Custom UPI QR Code" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
                                                </div>
                                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>Scan with PhonePe, GPay, or Paytm</p>
                                            </div>
                                        )}

                                        {paymentMethod === 'Card' && (
                                            <div style={{ width: '100%' }}>
                                                <input type="text" placeholder="Card Number" className="input-field" disabled={true} value="XXXX XXXX XXXX 1234 (Demo)" />
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <input type="text" placeholder="MM/YY" className="input-field" disabled={true} value="12/25" />
                                                    <input type="text" placeholder="CVV" className="input-field" disabled={true} value="***" />
                                                </div>
                                                <input type="text" placeholder="Name on Card" className="input-field" disabled={true} value="John Doe" />
                                            </div>
                                        )}

                                        {paymentMethod === 'NetBanking' && (
                                            <div style={{ width: '100%', textAlign: 'center' }}>
                                                <select className="input-field">
                                                    <option>State Bank of India</option>
                                                    <option>HDFC Bank</option>
                                                    <option>ICICI Bank</option>
                                                    <option>Axis Bank</option>
                                                </select>
                                                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>You will be redirected to your bank's portal.</p>
                                            </div>
                                        )}

                                        {paymentMethod === 'COD' && (
                                            <div style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
                                                <Coins size={48} color="#999" style={{ marginBottom: '15px' }} />
                                                <p>Pay cash to the delivery executive when your food arrives.</p>
                                            </div>
                                        )}

                                        <button
                                            className="btn"
                                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: 'auto' }}
                                            onClick={processPayment}
                                        >
                                            {paymentMethod === 'COD' ? 'Place Order (COD)' : `Pay ₹${grandTotal}`}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
