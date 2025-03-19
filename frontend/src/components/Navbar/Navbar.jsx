import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isSearchOpen) setIsSearchOpen(false);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isSearchOpen]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        section.focus();
      }, 500);
    }
  };

  const handleHomeClick = () => {
    setMenu("home");
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>

      <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </div>

      <ul className={`navbar-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <span onClick={handleHomeClick} className={`${menu === "home" ? "active pointer" : "pointer"}`}>home</span>
        <span onClick={() => { scrollToSection('explore-menu'); setMenu("menu"); setIsMobileMenuOpen(false); }} className={`${menu === "menu" ? "active pointer" : "pointer"}`}>menu</span>
        <span onClick={() => { scrollToSection('app-download'); setMenu("mob-app"); setIsMobileMenuOpen(false); }} className={`${menu === "mob-app" ? "active pointer" : "pointer"}`}>mobile app</span>
        <span onClick={() => { scrollToSection('footer'); setMenu("contact"); setIsMobileMenuOpen(false); }} className={`${menu === "contact" ? "active pointer" : "pointer"}`}>contact us</span>
      </ul>

      <div className="navbar-right">
        <div className="search-container">
          <img 
            src={assets.search_icon} 
            alt="Search" 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            style={{ cursor: 'pointer' }}
          />
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="search-box">
              <input 
                type="text" 
                placeholder="Search foods..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          )}
        </div>

        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Cart" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button className="sign-in" onClick={() => setShowLogin(true)}>sign in</button>
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
