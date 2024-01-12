import React from 'react';
import playStore from "../../Images/playstore.png";
import appStore from "../../Images/Appstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className='lertFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>

        <div className='ImageItems'>
          <img src={playStore} alt='playstore' style={{width:"200px", marginRight:"10px"}} />
          <img src={appStore} alt='appstore' style={{width:"200px"}} />
        </div>

      </div>
      <div className='midFooter'>
        <h1>Ecommerce</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2024 &copy; Shubham.d</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer
