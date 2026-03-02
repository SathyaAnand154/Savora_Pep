import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--glass-bg, rgba(255, 255, 255, 0.1))',
            backdropFilter: 'blur(10px)',
            padding: '40px 20px',
            marginTop: 'auto',
            borderTop: '1px solid var(--glass-border, rgba(255, 255, 255, 0.2))',
            color: 'inherit',
            textAlign: 'center',
            boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.05)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'left' }}>
                <div>
                    <h3 style={{ color: 'var(--soft-mint-dark, #2b7a78)' }}>Savora 🍽️</h3>
                    <p style={{ fontSize: '0.9rem', color: 'gray', marginTop: '10px', fontStyle: 'italic' }}>savor every bite</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px', fontSize: '0.9rem', color: 'gray', lineHeight: '1.8' }}>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Home</li>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Menu</li>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Offers</li>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Contact Us</li>
                    </ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px', fontSize: '0.9rem', color: 'gray', lineHeight: '1.8' }}>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Terms & Conditions</li>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Privacy Policy</li>
                        <li style={{ cursor: 'pointer', transition: '0.3s' }}>Cookie Policy</li>
                    </ul>
                </div>
            </div>
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9rem', color: 'gray' }}>
                &copy; {new Date().getFullYear()} Savora. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
