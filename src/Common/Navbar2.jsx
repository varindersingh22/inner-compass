import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [navBackground, setNavBackground] = useState('transparent');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBackground('solid');
    } else {
      setNavBackground('transparent');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${navBackground}`}>
      <div className="section">
        <div className="navbar-title">My Website</div>
      </div>
    </nav>
  );
}

export default Navbar;
