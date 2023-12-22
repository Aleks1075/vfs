import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../queries/Order';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import '../styles/checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [createOrder] = useMutation(CREATE_ORDER);
  const cart = location.state?.cart as CartItem[]; // Retrieve cart from state

  const handleConfirmOrder = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("User not logged in");

      // Prepare order input
      const orderInput = {
        orderDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        totalPrice: cart.reduce((total, item) => total + item.orderLinePrice * item.quantity, 0),
        userId,
        shirtOrderLines: cart.map(({ shirtsId, quantity, size, orderLinePrice }) => ({
          shirtsId, quantity, size, orderLinePrice
        })),
      };

      await createOrder({ variables: { orderInput } });
      navigate('/confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!cart) return <p>No items in the cart.</p>;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <p>Shirt ID: {item.shirtsId}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
            <p>Price: {item.orderLinePrice}</p>
          </div>
        ))}
      </div>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Checkout;