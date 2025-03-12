import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css'

export default function Footer() {
    return(
    <>
     <footer>
    <div class="footer">
      <div class="footer-bottom">   
        <p id='gmail'><i className="fas fa-envelope"></i>  shehansalitha1999@gmail.com</p>
        <p id='location'><i className="fas fa-map-marker-alt"></i> Kurunegala,Sri Lanka</p>
        <p id='phone'><i className="fas fa-phone"></i> <span id='hire-me'> Hire Me </span> 076-6722019</p>
        <div id='footer-main-details'>
        <p>© 2024 Shehan's Freelancing Hub. All rights reserved.  Website designed by  Shehan Salitha Dilshan</p>
        {/* <p>Website designed by W.P. Shehan Salitha Dilshan</p> */}
        </div>
      </div>
    </div>

  </footer>
    
    </>
    )
}