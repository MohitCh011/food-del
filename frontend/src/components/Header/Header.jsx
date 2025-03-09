import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [menu, setMenu] = useState("");

    const handleViewMenuClick = () => {
        setMenu("menu");
        document.getElementById("explore-menu")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={handleViewMenuClick}>View Menu</button>
                <a href='#explore-menu' className={`${menu === "menu" ? "active" : ""}`}></a>
            </div>
        </div>
    );
};

export default Header;
