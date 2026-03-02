import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (food) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.food._id === food._id);
            if (existing) {
                return prev.map(item => item.food._id === food._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { food, quantity: 1, price: food.price }];
        });
    };

    const removeFromCart = (foodId) => {
        setCartItems(prev => prev.filter(item => item.food._id !== foodId));
    };

    const updateQuantity = (foodId, quantity) => {
        if (quantity < 1) return removeFromCart(foodId);
        setCartItems(prev => prev.map(item => item.food._id === foodId ? { ...item, quantity } : item));
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
