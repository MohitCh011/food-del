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
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
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
      <p className="footer-copyright"> All Right Reserved to PVPSIT.</p>
    </div>
  )
}

export default Footer
