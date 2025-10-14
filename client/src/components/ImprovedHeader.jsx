import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './improvedheader.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ImprovedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect which section is in view
      const sections = ['home', 'services', 'skills', 'why-choose', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === 'home' ? 'hero-section' : sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // If at the very top, set to home
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = "tel:0766722019";
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId); // Set active immediately on click
    
    const element = document.getElementById(sectionId === 'home' ? 'hero-section' : sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMenuOpen(false);
    } else if (sectionId === 'home') {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleDropdownItemClick = (sectionId) => {
    scrollToSection(sectionId);
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  const handleMobileDropdownItemClick = (sectionId) => {
    scrollToSection(sectionId);
    setOpenMobileDropdown(null);
    setMenuOpen(false);
  };

  // Get header class based on active dropdown
  const getHeaderClass = () => {
    let classes = 'improved-header';
    if (scrolled) classes += ' scrolled';
    if (menuOpen) classes += ' mobile-menu-open';
    if (openDropdown) {
      classes += ' dropdown-active';
      if (openDropdown === 'skills') classes += ' dropdown-active-skills';
      if (openDropdown === 'contact') classes += ' dropdown-active-contact';
    }
    return classes;
  };

  // Get mobile menu class based on active dropdown
  const getMobileMenuClass = () => {
    let classes = 'improved-nav-mobile';
    if (menuOpen) classes += ' active';
    if (openMobileDropdown) {
      classes += ' mobile-dropdown-active';
      if (openMobileDropdown === 'services') classes += ' mobile-dropdown-services';
      if (openMobileDropdown === 'skills') classes += ' mobile-dropdown-skills';
      if (openMobileDropdown === 'why-choose') classes += ' mobile-dropdown-why-choose';
      if (openMobileDropdown === 'contact') classes += ' mobile-dropdown-contact';
    }
    return classes;
  };

  return (
    <header className={getHeaderClass()}>
      <div className="improved-header-container">
        {/* Logo Section */}
        <Link to="/" className="improved-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <span className="logo-letter">S</span>
          </div>
          <div className="logo-content">
            <h1 className="logo-title">Code & Create by Shein</h1>
            <p className="logo-subtitle">Freelancing Excellence</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="improved-nav-desktop">
          <ul className="nav-menu">
            <li>
              <Link 
                to="/" 
                className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
              >
                <i className="fas fa-home nav-item-icon"></i>
                <span>Home</span>
              </Link>
            </li>
            <li 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#services" 
                className={`nav-item ${activeSection === 'services' ? 'active' : ''} ${openDropdown === 'services' ? 'dropdown-open' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
              >
                <i className="fas fa-briefcase nav-item-icon"></i>
                <span>Services</span>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
              </a>
              <div className={`nav-dropdown ${openDropdown === 'services' ? 'active' : ''}`}>
                <div className="dropdown-content">
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('services')}>
                    <div className="dropdown-icon">🎨</div>
                    <div className="dropdown-text">
                      <h4>Web Design</h4>
                      <p>Beautiful, modern designs</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('services')}>
                    <div className="dropdown-icon">💼</div>
                    <div className="dropdown-text">
                      <h4>Full Stack Development</h4>
                      <p>Complete web solutions</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('services')}>
                    <div className="dropdown-icon">✨</div>
                    <div className="dropdown-text">
                      <h4>UI/UX Design</h4>
                      <p>Intuitive interfaces</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('services')}>
                    <div className="dropdown-icon">🚀</div>
                    <div className="dropdown-text">
                      <h4>Software Solutions</h4>
                      <p>Scalable software</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('skills')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#skills" 
                className={`nav-item ${activeSection === 'skills' ? 'active' : ''} ${openDropdown === 'skills' ? 'dropdown-open' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
              >
                <i className="fas fa-code nav-item-icon"></i>
                <span>Skills</span>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
              </a>
              <div className={`nav-dropdown ${openDropdown === 'skills' ? 'active' : ''}`}>
                <div className="dropdown-content skills-dropdown">
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('skills')}>
                    <div className="dropdown-icon">⚛️</div>
                    <div className="dropdown-text">
                      <h4>React</h4>
                      <p>Expert - 95%</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('skills')}>
                    <div className="dropdown-icon">🎨</div>
                    <div className="dropdown-text">
                      <h4>Figma</h4>
                      <p>Advanced - 90%</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('skills')}>
                    <div className="dropdown-icon">🅰️</div>
                    <div className="dropdown-text">
                      <h4>Angular</h4>
                      <p>Advanced - 85%</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('skills')}>
                    <div className="dropdown-icon">▲</div>
                    <div className="dropdown-text">
                      <h4>Next.js</h4>
                      <p>Expert - 92%</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('skills')}>
                    <div className="dropdown-icon">💨</div>
                    <div className="dropdown-text">
                      <h4>Tailwind</h4>
                      <p>Expert - 93%</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('why-choose')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#why-choose" 
                className={`nav-item ${activeSection === 'why-choose' ? 'active' : ''} ${openDropdown === 'why-choose' ? 'dropdown-open' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('why-choose');
                }}
              >
                <i className="fas fa-star nav-item-icon"></i>
                <span>Why Choose</span>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
              </a>
              <div className={`nav-dropdown ${openDropdown === 'why-choose' ? 'active' : ''}`}>
                <div className="dropdown-content">
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('why-choose')}>
                    <div className="dropdown-icon">🎯</div>
                    <div className="dropdown-text">
                      <h4>Client-Centric Approach</h4>
                      <p>Your vision is my priority</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('why-choose')}>
                    <div className="dropdown-icon">💎</div>
                    <div className="dropdown-text">
                      <h4>Expert Talent</h4>
                      <p>Diverse services, one roof</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('why-choose')}>
                    <div className="dropdown-icon">💰</div>
                    <div className="dropdown-text">
                      <h4>Cost-Effective</h4>
                      <p>High quality, fair pricing</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('why-choose')}>
                    <div className="dropdown-icon">🚀</div>
                    <div className="dropdown-text">
                      <h4>Future-Ready Growth</h4>
                      <p>Cutting-edge solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#contact" 
                className={`nav-item ${activeSection === 'contact' ? 'active' : ''} ${openDropdown === 'contact' ? 'dropdown-open' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                <i className="fas fa-envelope nav-item-icon"></i>
                <span>Contact</span>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
              </a>
              <div className={`nav-dropdown ${openDropdown === 'contact' ? 'active' : ''}`}>
                <div className="dropdown-content contact-dropdown">
                  <div className="dropdown-item" onClick={() => handleDropdownItemClick('contact')}>
                    <div className="dropdown-icon">📧</div>
                    <div className="dropdown-text">
                      <h4>Send Message</h4>
                      <p>Get in touch with us</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={handleCall}>
                    <div className="dropdown-icon">📞</div>
                    <div className="dropdown-text">
                      <h4>Call Us</h4>
                      <p>0766722019</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => window.open('https://linkedin.com', '_blank')}>
                    <div className="dropdown-icon">💼</div>
                    <div className="dropdown-text">
                      <h4>LinkedIn</h4>
                      <p>Connect professionally</p>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => window.open('https://github.com', '_blank')}>
                    <div className="dropdown-icon">💻</div>
                    <div className="dropdown-text">
                      <h4>GitHub</h4>
                      <p>View my projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="improved-header-actions">
          <button className="improved-whatsapp-btn" onClick={handleCall}>
            <i className="fab fa-whatsapp"></i>
            <span className="whatsapp-text">0766722019</span>
            <span className="whatsapp-pulse"></span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={getMobileMenuClass()}>
        <div className="mobile-nav-wrapper">
          <ul className="mobile-nav-menu">
            <li>
              <Link 
                to="/" 
                className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
              >
                <div className="mobile-nav-icon">
                  <i className="fas fa-home"></i>
                </div>
                <div className="mobile-nav-content">
                  <span className="mobile-nav-title">Home</span>
                  <span className="mobile-nav-desc">Back to homepage</span>
                </div>
              </Link>
            </li>
            <li>
              <div className="mobile-nav-dropdown-wrapper">
                <a 
                  href="#services" 
                  className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''} ${openMobileDropdown === 'services' ? 'dropdown-open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMobileDropdown('services');
                  }}
                >
                  <div className="mobile-nav-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="mobile-nav-content">
                    <span className="mobile-nav-title">Services</span>
                    <span className="mobile-nav-desc">What I offer</span>
                  </div>
                  <i className={`fas fa-chevron-down mobile-dropdown-arrow ${openMobileDropdown === 'services' ? 'open' : ''}`}></i>
                </a>
                {openMobileDropdown === 'services' && (
                  <div className="mobile-dropdown-content">
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('services')}>
                      <span className="mobile-dropdown-icon">🎨</span>
                      <span className="mobile-dropdown-text">Web Design</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('services')}>
                      <span className="mobile-dropdown-icon">💼</span>
                      <span className="mobile-dropdown-text">Full Stack Development</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('services')}>
                      <span className="mobile-dropdown-icon">✨</span>
                      <span className="mobile-dropdown-text">UI/UX Design</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('services')}>
                      <span className="mobile-dropdown-icon">🚀</span>
                      <span className="mobile-dropdown-text">Software Solutions</span>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="mobile-nav-dropdown-wrapper">
                <a 
                  href="#skills" 
                  className={`mobile-nav-item ${activeSection === 'skills' ? 'active' : ''} ${openMobileDropdown === 'skills' ? 'dropdown-open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMobileDropdown('skills');
                  }}
                >
                  <div className="mobile-nav-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="mobile-nav-content">
                    <span className="mobile-nav-title">Skills</span>
                    <span className="mobile-nav-desc">My expertise</span>
                  </div>
                  <i className={`fas fa-chevron-down mobile-dropdown-arrow ${openMobileDropdown === 'skills' ? 'open' : ''}`}></i>
                </a>
                {openMobileDropdown === 'skills' && (
                  <div className="mobile-dropdown-content">
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('skills')}>
                      <span className="mobile-dropdown-icon">⚛️</span>
                      <span className="mobile-dropdown-text">React - Expert 95%</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('skills')}>
                      <span className="mobile-dropdown-icon">🎨</span>
                      <span className="mobile-dropdown-text">Figma - Advanced 90%</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('skills')}>
                      <span className="mobile-dropdown-icon">🅰️</span>
                      <span className="mobile-dropdown-text">Angular - Advanced 85%</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('skills')}>
                      <span className="mobile-dropdown-icon">▲</span>
                      <span className="mobile-dropdown-text">Next.js - Expert 92%</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('skills')}>
                      <span className="mobile-dropdown-icon">💨</span>
                      <span className="mobile-dropdown-text">Tailwind - Expert 93%</span>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="mobile-nav-dropdown-wrapper">
                <a 
                  href="#why-choose" 
                  className={`mobile-nav-item ${activeSection === 'why-choose' ? 'active' : ''} ${openMobileDropdown === 'why-choose' ? 'dropdown-open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMobileDropdown('why-choose');
                  }}
                >
                  <div className="mobile-nav-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="mobile-nav-content">
                    <span className="mobile-nav-title">Why Choose</span>
                    <span className="mobile-nav-desc">Reasons to work</span>
                  </div>
                  <i className={`fas fa-chevron-down mobile-dropdown-arrow ${openMobileDropdown === 'why-choose' ? 'open' : ''}`}></i>
                </a>
                {openMobileDropdown === 'why-choose' && (
                  <div className="mobile-dropdown-content">
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('why-choose')}>
                      <span className="mobile-dropdown-icon">🎯</span>
                      <span className="mobile-dropdown-text">Client-Centric</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('why-choose')}>
                      <span className="mobile-dropdown-icon">💎</span>
                      <span className="mobile-dropdown-text">Expert Talent</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('why-choose')}>
                      <span className="mobile-dropdown-icon">💰</span>
                      <span className="mobile-dropdown-text">Cost-Effective</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('why-choose')}>
                      <span className="mobile-dropdown-icon">🚀</span>
                      <span className="mobile-dropdown-text">Future-Ready</span>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="mobile-nav-dropdown-wrapper">
                <a 
                  href="#contact" 
                  className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''} ${openMobileDropdown === 'contact' ? 'dropdown-open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMobileDropdown('contact');
                  }}
                >
                  <div className="mobile-nav-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="mobile-nav-content">
                    <span className="mobile-nav-title">Contact</span>
                    <span className="mobile-nav-desc">Get in touch</span>
                  </div>
                  <i className={`fas fa-chevron-down mobile-dropdown-arrow ${openMobileDropdown === 'contact' ? 'open' : ''}`}></i>
                </a>
                {openMobileDropdown === 'contact' && (
                  <div className="mobile-dropdown-content">
                    <div className="mobile-dropdown-item" onClick={() => handleMobileDropdownItemClick('contact')}>
                      <span className="mobile-dropdown-icon">📧</span>
                      <span className="mobile-dropdown-text">Send Message</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={handleCall}>
                      <span className="mobile-dropdown-icon">📞</span>
                      <span className="mobile-dropdown-text">Call: 0766722019</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => window.open('https://linkedin.com', '_blank')}>
                      <span className="mobile-dropdown-icon">💼</span>
                      <span className="mobile-dropdown-text">LinkedIn</span>
                    </div>
                    <div className="mobile-dropdown-item" onClick={() => window.open('https://github.com', '_blank')}>
                      <span className="mobile-dropdown-icon">💻</span>
                      <span className="mobile-dropdown-text">GitHub</span>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>

          {/* Mobile WhatsApp Button */}
          <div className="mobile-whatsapp-wrapper">
            <button className="mobile-whatsapp-btn" onClick={handleCall}>
              <i className="fab fa-whatsapp"></i>
              <span>Call Now: 0766722019</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
}
