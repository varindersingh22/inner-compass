import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <p>Designed by Varinderjot Singh</p>
      </div>
    </footer>
  );
};

export default Footer;