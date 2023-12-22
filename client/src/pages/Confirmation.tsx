import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <h1>Order Confirmed</h1>
      <p>Your order has been successfully placed.</p>
      <p>Ready for pickup at Firskovvej 18, 2800 Kongens Lyngby, Vintage Football Shirts Headquarters.</p>
      <button onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );
};

export default Confirmation;