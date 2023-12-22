import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_SHIRTS } from '../queries/GetAllShirts';
import { Shirts, CartItem } from '../types';
import '../styles/Shop.css';

const Shop = () => {
    const client = useApolloClient();
    const [shirts, setShirts] = useState<Shirts[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const navigate = useNavigate();

    useEffect(() => {
        client.query({ query: GET_ALL_SHIRTS })
            .then(result => setShirts(result.data.shirts))
            .catch(error => console.error(error));
    }, [client]);

    const handleQuantityChange = (shirtId: string, newQuantity: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [shirtId]: newQuantity
        }));
    };

    const addToCart = (shirtId: string, size: string, price: number) => {
        const quantity = quantities[shirtId] || 1;
        const newItem: CartItem = {
            shirtsId: shirtId,
            quantity: quantity,
            size: size,
            orderLinePrice: price * quantity
        };
        setCart([...cart, newItem]);
    };

    const proceedToCheckout = () => {
        navigate('/checkout', { state: { cart } });
    };

    return (
        <div className="shop-container">
            <h1>Shop</h1>
            {shirts.map((shirt) => (
                <div key={shirt.id} className="shirt-item">
                    <h3>{shirt.name}</h3>
                    <p>Price: {shirt.price}</p>
                    <select
                        onChange={(e) => handleQuantityChange(shirt.id, parseInt(e.target.value))}
                        defaultValue="1"
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num} value={num + 1}>{num + 1}</option>
                        ))}
                    </select>
                    <select
                        defaultValue="L"
                    >
                        {shirt.size.map((size: string, index: number) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                    <button onClick={() => addToCart(shirt.id, shirt.size[0], shirt.price)}>Add to Cart</button>
                </div>
            ))}
            <div className="cart-container">
                <h2>Your Cart</h2>
                {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <p>Shirt ID: {item.shirtsId}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                        <p>Price: {item.orderLinePrice}</p>
                    </div>
                ))}
                <button onClick={proceedToCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Shop;