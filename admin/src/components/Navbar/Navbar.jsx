import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const userDetails = {
    name: "Mohit",
    email: "mohittt@gmail.com",
    profileImage: assets.profile_image
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "https://food-del-t11.vercel.app/";  // Redirect to your URL after logging out
  };

  return (
    <>
      <div className='navbar'>
        <a href="https://food-del-t11.vercel.app/">
          <img className='logo' src={assets.logo} alt="Logo" />
        </a>
        <img
          className='profile'
          src={userDetails.profileImage}
          alt="Profile"
          onClick={() => setShowProfile(true)}
        />
      </div>

      {showProfile && (
        <div className="profile-modal" onClick={() => setShowProfile(false)}>
          <div className="profile-content" onClick={(e) => e.stopPropagation()}>
            <img className='profile-large' src={userDetails.profileImage} alt="Profile" />
            <h2>{userDetails.name}</h2>
            <p>{userDetails.email}</p>
            <button onClick={() => setShowProfile(false)}>Close</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
