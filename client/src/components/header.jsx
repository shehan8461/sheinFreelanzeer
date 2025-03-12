import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCall = () => {
    window.location.href = "tel:0766722019";
  };

  return (
    <div className="nav">
      <div className="navbardetails">
        <Link to="/">
          <h1 className="twebpagename"><b>Shehan's Freelancing Hub</b></h1>
        </Link>
        <span className="contact-number" onClick={handleCall}>
          <i className="fab fa-whatsapp"></i> 0766722019
        </span>
        <h3 id="h3">Delivering Excellence in Web Development and Design</h3>
        { <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button> }
         <ul className={`other-topics ${menuOpen ? 'open' : ''}`}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>c
          </Link>
          <Link to="/profile"> 
             {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt=""
                id="img"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>SignIn</li>
            )}
          </Link>
        </ul> 
      </div>
    </div>
  );
}
