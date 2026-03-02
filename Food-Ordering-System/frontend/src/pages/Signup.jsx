import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // For demo purposes, letting them choose

    const submitHandler = (e) => {
        e.preventDefault();
        register(name, email, password, role);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--soft-mint-dark)' }}>Create Account</h2>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />

                    <select
                        className="input-field"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ appearance: 'none' }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>Sign Up</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--soft-mint-dark)', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
