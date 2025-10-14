import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css'
import linkidn from './Images/linkedin.png';
import web from './Images/web.jpg';
import contact from './Images/contact.png';
import github from './Images/githubNew.png';

export default function Footer() {
    return(
    <>
     <footer className='modern-footer'>
      <div className='footer-container'>
        {/* Footer Top Section */}
        <div className='footer-top'>
          <div className='footer-column footer-about'>
            <div className='footer-logo'>
              <h2>Shehan's Freelancing Hub</h2>
              <div className='logo-underline'></div>
            </div>
            <p className='footer-description'>
              Transforming ideas into stunning digital experiences. Professional web design and development services tailored for your success.
            </p>
            <div className='footer-social-links'>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='footer-social-icon' title='LinkedIn'>
                <img src={linkidn} alt='LinkedIn' />
              </a>
              <a href='https://github.com' target='_blank' rel='noopener noreferrer' className='footer-social-icon' title='GitHub'>
                <img src={github} alt='GitHub' />
              </a>
              <a href='#contact' className='footer-social-icon' title='Contact'>
                <img src={contact} alt='Contact' />
              </a>
              <a href='#portfolio' className='footer-social-icon' title='Portfolio'>
                <img src={web} alt='Portfolio' />
              </a>
            </div>
          </div>

          <div className='footer-column'>
            <h3>Quick Links</h3>
            <ul className='footer-links'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><a href='#services'>Services</a></li>
              <li><a href='#portfolio'>Portfolio</a></li>
              <li><a href='#contact'>Contact</a></li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3>Services</h3>
            <ul className='footer-links'>
              <li><a href='#services'>Web Design</a></li>
              <li><a href='#services'>Full Stack Development</a></li>
              <li><a href='#services'>UI/UX Design</a></li>
              <li><a href='#services'>Software Solutions</a></li>
              <li><a href='#services'>Consulting</a></li>
            </ul>
          </div>

          <div className='footer-column footer-contact'>
            <h3>Get In Touch</h3>
            <div className='footer-contact-info'>
              <div className='footer-info-item'>
                <div className='info-icon'>📧</div>
                <div className='info-content'>
                  <span className='info-label'>Email</span>
                  <a href='mailto:shehansalitha1999@gmail.com'>shehansalitha1999@gmail.com</a>
                </div>
              </div>
              <div className='footer-info-item'>
                <div className='info-icon'>📱</div>
                <div className='info-content'>
                  <span className='info-label'>Phone</span>
                  <a href='tel:+94766722019'>+94 76 672 2019</a>
                </div>
              </div>
              <div className='footer-info-item'>
                <div className='info-icon'>📍</div>
                <div className='info-content'>
                  <span className='info-label'>Location</span>
                  <span>Kurunegala, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className='footer-bottom'>
          <div className='footer-bottom-content'>
            <p className='copyright'>
              © 2024 Shehan's Freelancing Hub. All rights reserved.
            </p>
            <div className='footer-bottom-links'>
              <a href='#privacy'>Privacy Policy</a>
              <span className='separator'>•</span>
              <a href='#terms'>Terms of Service</a>
            </div>
            <p className='designed-by'>
              Designed & Developed by <span className='highlight-name'>Shehan Salitha Dilshan</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className='footer-wave'>
        <svg viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path d='M0,0 C300,100 900,0 1200,50 L1200,120 L0,120 Z' fill='currentColor'></path>
        </svg>
      </div>
    </footer>
    
    </>
    )
}