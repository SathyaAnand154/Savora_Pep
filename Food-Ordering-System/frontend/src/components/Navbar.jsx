import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User as UserIcon, LogOut, Shield, Package } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="glass-nav" style={{ padding: '15px 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span>🍽️ Savora</span>
                    <span style={{ fontSize: '0.9rem', color: 'gray', fontStyle: 'italic', fontWeight: 'normal' }}>savor every bite</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '500' }}>
                                    <Shield size={18} color="var(--soft-mint-dark)" /> Admin
                                </Link>
                            )}

                            <Link to="/my-orders" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--text-dark)', fontWeight: '500' }}>
                                <Package size={18} color="var(--soft-mint-dark)" /> My Orders
                            </Link>

                            <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--text-dark)', position: 'relative' }}>
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute', top: '-8px', right: '-8px',
                                        background: 'var(--soft-mint-dark)', color: 'white',
                                        borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <UserIcon size={20} />
                                <span>{user.name}</span>
                            </div>

                            <button onClick={logout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'rgba(255,0,0,0.1)', color: 'red' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-outline" style={{ padding: '8px 15px', borderRadius: '8px', textDecoration: 'none' }}>Login</Link>
                            <Link to="/signup" className="btn" style={{ padding: '8px 15px', textDecoration: 'none' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
