import React from 'react';
import { Link } from 'react-router-dom';
import shirtsBanner from '../../images/shirtsBanner.png'

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3em' }}>YOUR CLASSIC FOOTBALL SHIRTS JOURNEY STARTS HERE!</h1>
      <p style={{ fontSize: '1.5em', marginTop: '20px' }}>
        GO TO THE SHIRTS PAGE AND EXPLORE OUR COLLECTION!
      </p>
      <Link to="/shirts">
        <img src={shirtsBanner} alt="Shirts Banner" style={{ width: '100%', marginTop: '30px' }} />
      </Link>
    </div>
  );
};

export default HomePage;