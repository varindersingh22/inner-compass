import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [navBackground, setNavBackground] = useState('transparent');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBackground('solid');
    } else {
      setNavBackground('transparent');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${navBackground}`}>
      <div className="section">
        <Link className="navbar-title-link" to={'/dashboard'}>
          <img src="images/cardinal-points.png" alt="Logo" className="navbar-logo" />
          Innercompass
        </Link>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link className="nav-link" to={'/dashboard'} onClick={toggleMenu}>Home</Link>
          <Link className="nav-link" to={'/chat'} onClick={toggleMenu}>Chat</Link>
          <div className="navbar-buttons">
            <button className="login-button"><Link to={'/'}>Logout</Link></button>
          </div>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
