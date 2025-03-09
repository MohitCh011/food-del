import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </div>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={() => { setMenu("home"); setIsMobileMenuOpen(false); }} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu"); setIsMobileMenuOpen(false); }} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => { setMenu("mob-app"); setIsMobileMenuOpen(false); }} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        <a href='#footer' onClick={() => { setMenu("contact"); setIsMobileMenuOpen(false); }} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <>
            <button onClick={() => setShowLogin(true)}>sign in</button>
            <button onClick={() => setShowLogin(true)}>admin login</button> {/* Added Admin Login Button */}
          </>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
