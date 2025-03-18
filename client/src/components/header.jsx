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
       
        <h3 id="h3">Delivering Excellence in Web Development and Design</h3>
        <div className="contact-number">
        <span  onClick={handleCall}>
          <i className="fab fa-whatsapp"></i> 0766722019
        </span>
        </div>
        {/* { <button and Design
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button> } */}
          {/* <div className='other-topics'>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          </div> */}
          {/* <Link to="/profile"> 
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
          </Link> */}
    
      </div>
    </div>
  );
}
