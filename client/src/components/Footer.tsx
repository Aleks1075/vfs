import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Social Media</h4>
            <p>
            <img style={{width: '20px'}} src='../../images/instagram.svg'/>
              vintageFootballShirts
            </p>
            <p>
            <img style={{width: '20px'}} src='../../images/twitter.svg'/>
              vintageFootballShirts
            </p>
            <p>
            <img style={{width: '20px'}} src='../../images/facebook.svg'/>
              vintageFootballShirts
            </p>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: vintagefootballshirts@hotmail.com</p>
      
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vintage Football Shirts | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;