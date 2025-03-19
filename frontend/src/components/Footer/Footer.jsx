import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Discover the freshest avocados delivered right to your doorstep! We've been your go-to source for creamy, delicious avocados since day one. From farm to table, we ensure quality and flavor in every bite. Experience the perfect avocado, every time.</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer">
                    <img src={assets.facebook_icon} alt="Facebook" />
                </a>
                <a href="https://x.com/Mohit68251475" target="_blank" rel="noopener noreferrer">
                    <img src={assets.twitter_icon} alt="Twitter" />
                </a>
                <a href="https://www.linkedin.com/in/mohit-ch-a87282272/" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 8500*******</li>
                <li>contact@avocado.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> All Rights Reserved to PVPSIT.</p>
    </div>
  )
}

export default Footer
