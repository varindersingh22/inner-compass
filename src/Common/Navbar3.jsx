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
      <Link className="navbar-title-link" to={'/dashboard'}>
            <img src="images/cardinal-points.png" alt="Logo" className="navbar-logo " />
            Innercompass
          </Link>
        <div className="navbar-links">
          <Link className="nav-link" to={'/dashboard'}>Home</Link>
          <Link className="nav-link" to={'/chat'}>Chat</Link>
          <div className="navbar-buttons">
          <button className="login-button"><Link to={'/'}>Logout</Link></button>
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
