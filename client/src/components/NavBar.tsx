import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../styles/Navbar.css';
import { useNavItem } from '../useNavItem';

const NavBar = () => {
    const navItem = useNavItem();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Vintage Football Shirts" />
        </Link>
      </div>
      <div className="navbar-menu">
        {token ? (
          <>
            <Link to="/shirts" className={navItem === 'SHIRTS' ? 'active' : ''}>SHIRTS</Link>
            <Link to="/account" className={navItem === 'ACCOUNT' ? 'active' : ''}>ACCOUNT</Link>
            {userRole === 'admin' && ( <Link to="/admin-shirts" className={navItem === 'PRODUCTS' ? 'active' : ''}>PRODUCTS</Link>)}
            {userRole === 'customer' && ( <Link to="/shop" className={navItem === 'SHOP' ? 'active' : ''}>SHOP</Link>)}
            <button onClick={handleLogout}>LogOut</button>
          </>
        ) : (
          <>
            <Link to="/shirts" className={navItem === 'SHIRTS' ? 'active' : ''}>SHIRTS</Link>
            <Link to="/login" className={navItem === 'LOGIN' ? 'active' : ''}>LOGIN</Link>
            <Link to="/register" className={navItem === 'REGISTER' ? 'active' : ''}>REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;