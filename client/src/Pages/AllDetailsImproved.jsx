import React, { useState, useEffect, useRef } from 'react';
import './css/alldetailsimproved.css';
import logo from './Images/my1.png';
import logo1 from './Images/people.jpg';
import logo2 from './Images/pixeles.jpg';
import logo3 from './Images/responsive.jpg';
import linkidn from './Images/linkedin.png';
import web from './Images/web.jpg';
import contact from './Images/contact.png';
import github from './Images/githubNew.png';
import react from './Images/react.png';
import dotnet from './Images/Microsoft_.NET_logo.svg';
import angular from './Images/angularNew.png';
import laravel from './Images/laravel.png';
import nextJs from './Images/nextJs.png';
import sql from './Images/sql.png';
import mongodb from './Images/sql.png'; // Temporary - replace with mongodb.png
import python from './Images/web.jpg'; 
import mongob from './Images/MongoDB.jpeg'
import pythons from  './Images/AI and Machine Learning Projects in Python – Fast & Efficient.jpeg'// Temporary - replace with python.png
import tailwind from './Images/tailwind.png';
import packettracer from './Images/packettracer.png';
import figma from './Images/figma.png';
import mobile from './Images/cross-platform.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

export default function AllDetailsImproved() {
  const [webDesigns, setWebDesigns] = useState(0);
  const [uiDesigns, setUiDesigns] = useState(0);
  const [projects, setProjects] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);

    const scrollToContact = () => {
    console.log('Scroll to contact triggered');
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      console.log('Contact form found:', contactForm);
      
      // Method 1: Try scrollIntoView
      try {
        contactForm.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        console.log('ScrollIntoView called');
      } catch (error) {
        console.log('ScrollIntoView failed, trying alternative:', error);
        
        // Method 2: Calculate and scroll on document.documentElement
        const headerOffset = 120;
        const elementPosition = contactForm.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        document.documentElement.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      console.log('Contact form not found');
    }
  };

  const scrollToPortfolio = () => {
    // Scroll to services section as portfolio showcase
    const servicesSection = document.getElementById('services');
    
    if (servicesSection) {
      try {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      } catch (error) {
        const headerOffset = 120;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        document.documentElement.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToTop = () => {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
      profileImg.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const animateCount = (setter, target, duration) => {
    let start = 0;
    const increment = target / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(interval);
        setter(target);
      } else {
        setter(Math.ceil(start));
      }
    }, 10);
  };

  useEffect(() => {
    animateCount(setWebDesigns, 40, 7000);
    animateCount(setUiDesigns, 15, 8000);
    animateCount(setProjects, 70, 9000);
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Hero Section
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(heroSection);

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  // Intersection Observer for Skills Section
  useEffect(() => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(skillsSection);

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  // Intersection Observer for Services Section
  useEffect(() => {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(servicesSection);

    return () => {
      if (servicesSection) {
        observer.unobserve(servicesSection);
      }
    };
  }, []);

  // Intersection Observer for Tips Section
  useEffect(() => {
    const tipsSection = document.querySelector('.tips-section');
    if (!tipsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTipsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(tipsSection);

    return () => {
      if (tipsSection) {
        observer.unobserve(tipsSection);
      }
    };
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.username = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.phone_number) errors.phone_number = "Contact is required";
    else if (!/^\d{10}$/.test(formData.phone_number)) errors.phone_number = "Contact should be a 10-digit number";
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message details are required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      await emailjs.send(
        'service_xk2szuj',
        'template_bur8t5m',
        {
          username: formData.username,
          phone_number: formData.phone_number,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'aRfv6KVElbbOn9urH'
      );

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your request was successfully submitted!',
        confirmButtonColor: '#00ff7f',
        width: '300px',
      });

      setFormData({
        username: "",
        phone_number: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send',
        text: error.message,
        confirmButtonColor: '#d33',
        width: '300px',
      });
    } finally {
      setLoading(false);
    }
  };

  // Scroll to contact form and momentarily highlight the Send Message button
  const handleRequestCustomService = () => {
    // Scroll to contact form first
    scrollToContact();

    // After scrolling animation, focus and add a temporary highlight class to the button
    // small timeout to allow scrollIntoView to complete
    setTimeout(() => {
      const sendBtn = document.querySelector('.btn-submit-enhanced');
      if (sendBtn) {
        // focus without scrolling again
        try { sendBtn.focus({ preventScroll: true }); } catch (err) { sendBtn.focus(); }
        sendBtn.classList.add('highlight-once');
        // remove the highlight after animation duration
        setTimeout(() => sendBtn.classList.remove('highlight-once'), 1600);
      }
    }, 600);
  };

  return (
    <div className='improved-home'>
      {/* Hero Section */}
      <section className='hero-section' id='hero-section'>
        <div className='hero-content'>
          <div className='hero-text'>
            <h1 className={`hero-title ${heroVisible ? 'hero-element-visible' : ''}`} style={{ '--delay': '0s' }}>
              <span className='gradient-text'>Transform Your Vision</span>
              <br />Into Digital Reality
            </h1>
            <p className={`hero-subtitle ${heroVisible ? 'hero-element-visible' : ''}`} style={{ '--delay': '0.2s' }}>
              Professional web design & development services tailored for your success. 
              Join <span className='highlight-number'>500+</span> satisfied clients worldwide.
            </p>
            <div className={`hero-cta ${heroVisible ? 'hero-element-visible' : ''}`} style={{ '--delay': '0.4s' }}>
              <button className='btn-primary' onClick={scrollToContact}>Start Your Project</button>
              <button className='btn-secondary' onClick={scrollToPortfolio}>View Services</button>
            </div>
          </div>
          <div className={`hero-image ${heroVisible ? 'hero-element-visible' : ''}`} style={{ '--delay': '0.3s' }}>
            <div className='image-wrapper'>
              <img src={logo} alt='Shehan Freelancing' className='profile-img' id='profile-img' />
              <div className={`floating-badge badge-1 ${heroVisible ? 'badge-visible' : ''}`} style={{ '--delay': '0.6s' }}>
                <span>2+ Years</span>
                <p>Experience</p>
              </div>
              <div className={`floating-badge badge-2 ${heroVisible ? 'badge-visible' : ''}`} style={{ '--delay': '0.8s' }}>
                <span>40+</span>
                <p>Projects</p>
              </div>
              <div className={`floating-badge badge-3 ${heroVisible ? 'badge-visible' : ''}`} style={{ '--delay': '1s' }}>
                <span>100%</span>
                <p>Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className='social-links'>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <img src={linkidn} alt='LinkedIn' />
          </a>
          <a href='https://github.com' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <img src={github} alt='GitHub' />
          </a>
          <a href='#contact' className='social-icon'>
            <img src={contact} alt='Contact' />
          </a>
          <a href='#portfolio' className='social-icon'>
            <img src={web} alt='Portfolio' />
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className='stats-section'>
        <div className='stats-header'>
          <h2 className='stats-title'>Proven Track Record</h2>
          <p className='stats-subtitle'>Numbers that speak for themselves</p>
        </div>
        <div className='stats-container'>
          <div className='stat-card stat-card-1'>
            <div className='stat-icon-wrapper'>
              <div className='stat-icon'>
                <img src={web} alt='Web Designs' />
              </div>
            </div>
            <div className='stat-content'>
              <h3 className='stat-number'>{webDesigns}+</h3>
              <p className='stat-label'>Web Designs</p>
              <p className='stat-description'>Stunning websites delivered</p>
            </div>
            <div className='stat-progress'>
              <div className='stat-progress-bar' style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className='stat-card stat-card-2'>
            <div className='stat-icon-wrapper'>
              <div className='stat-icon'>
                <img src={figma} alt='UI Designs' />
              </div>
            </div>
            <div className='stat-content'>
              <h3 className='stat-number'>{uiDesigns}+</h3>
              <p className='stat-label'>UI Designs</p>
              <p className='stat-description'>Beautiful interfaces crafted</p>
            </div>
            <div className='stat-progress'>
              <div className='stat-progress-bar' style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className='stat-card stat-card-3'>
            <div className='stat-icon-wrapper'>
              <div className='stat-icon'>
                <img src={react} alt='Total Projects' />
              </div>
            </div>
            <div className='stat-content'>
              <h3 className='stat-number'>{projects}+</h3>
              <p className='stat-label'>Total Projects</p>
              <p className='stat-description'>Successfully completed</p>
            </div>
            <div className='stat-progress'>
              <div className='stat-progress-bar' style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
        <div className='stats-badges'>
          <div className='badge-item'>
            <span className='badge-icon'>⭐</span>
            <span className='badge-text'>5.0 Rating</span>
          </div>
          <div className='badge-item'>
            <span className='badge-icon'>💯</span>
            <span className='badge-text'>100% Satisfaction</span>
          </div>
          <div className='badge-item'>
            <span className='badge-icon'>⚡</span>
            <span className='badge-text'>Fast Delivery</span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className='skills-section' id='skills'>
        <div className='skills-header'>
          <h2 className='section-title'>
            <span className='title-line'></span>
            Technologies I Master
            <span className='title-line'></span>
          </h2>
          <p className='skills-subtitle'>Cutting-edge tools and frameworks for exceptional results</p>
        </div>
        <div className='skills-grid'>
          {[
            { img: react, name: 'React', color: '#61dafb', level: 'Expert', percentage: '100%' },
            { img: figma, name: 'Figma', color: '#f24e1e', level: 'Advanced', percentage: '90%' },
            { img: angular, name: 'Angular', color: '#dd0031', level: 'Advanced', percentage: '85%' },
            { img: nextJs, name: 'Next.js', color: '#000000', level: 'Expert', percentage: '92%' },
            { img: sql, name: 'SQL', color: '#4479a1', level: 'Expert', percentage: '88%' },
            { img: mongob, name: 'MongoDB', color: '#47A248', level: 'Advanced', percentage: '82%' },
            { img: pythons, name: 'Python', color: '#3776AB', level: 'Advanced', percentage: '88%' },
            { img: laravel, name: 'Laravel', color: '#ff2d20', level: 'Advanced', percentage: '87%' },
            { img: tailwind, name: 'Tailwind', color: '#06b6d4', level: 'Expert', percentage: '93%' },
            { img: dotnet, name: '.NET', color: '#512bd4', level: 'Advanced', percentage: '85%' },
            { img: mobile, name: 'Mobile Application', color: '#a855f7', level: 'Advanced', percentage: '85%' },
          ].map((skill, index) => (
            <div 
              key={index} 
              className={`skill-card-enhanced ${skillsVisible ? 'skill-card-visible' : ''}`} 
              style={{ '--skill-color': skill.color, '--delay': `${index * 0.25}s` }}
            >
              <div className='skill-card-inner'>
                <div className='skill-icon-container'>
                  <img 
                    src={skill.img} 
                    alt={skill.name} 
                    className={skill.name === 'Mobile Development' ? 'skill-icon-large' : ''} 
                  />
                  <div className='skill-glow'></div>
                </div>
                <div className='skill-info'>
                  <h3 className='skill-name'>{skill.name}</h3>
                  <span className='skill-level'>{skill.level}</span>
                  <div className='skill-progress-container'>
                    <div className='skill-progress-bg'>
                      <div className='skill-progress-fill' style={{ width: skill.percentage }}></div>
                      <span className='skill-percentage' aria-hidden='false'>{skill.percentage}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-hover-effect'></div>
            </div>
          ))}
        </div>
        <div className='skills-footer'>
          <p className='skills-footer-text'>
            <span className='footer-icon'>🎯</span>
            Always learning and adapting to the latest technologies
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className='services-section' id='services'>
        <div className='services-header'>
          <h2 className='section-title'>
            <span className='title-line'></span>
            What I Offer
            <span className='title-line'></span>
          </h2>
          <p className='services-subtitle'>Comprehensive solutions to bring your digital dreams to life</p>
        </div>
        <div className='services-grid'>
          <div className={`service-card-enhanced service-1 ${servicesVisible ? 'service-card-visible' : ''}`} style={{ '--delay': '0s' }}>
            <div className='service-background-glow'></div>
            <div className='service-icon-wrapper'>
              <div className='service-icon'>
                <img src={web} alt='Web Design' />
              </div>
            </div>
            <div className='service-content'>
              <h3>Web Design</h3>
              <p>Beautiful, modern designs that captivate your audience and drive conversions with stunning visual appeal.</p>
              <ul className='service-features'>
                <li><span className='check-icon'>✓</span> Responsive Design</li>
                <li><span className='check-icon'>✓</span> Modern UI/UX</li>
                <li><span className='check-icon'>✓</span> Fast Loading</li>
                <li><span className='check-icon'>✓</span> SEO Optimized</li>
              </ul>
              <button className='service-btn'>
                Get Started
                <span className='btn-arrow'>→</span>
              </button>
            </div>
            <div className='service-number'>01</div>
          </div>
          
          <div className={`service-card-enhanced service-2 featured ${servicesVisible ? 'service-card-visible' : ''}`} style={{ '--delay': '0.25s' }}>
            <div className='featured-badge'>
              <span className='badge-star'>⭐</span>
              Most Popular
            </div>
            <div className='service-background-glow'></div>
            <div className='service-icon-wrapper'>
              <div className='service-icon'>
                <img src={react} alt='Full Stack Development' />
              </div>
            </div>
            <div className='service-content'>
              <h3>Full Stack Development</h3>
              <p>Complete web solutions from frontend to backend, tailored to your unique business needs and goals.</p>
              <ul className='service-features'>
                <li><span className='check-icon'>✓</span> Custom Development</li>
                <li><span className='check-icon'>✓</span> API Integration</li>
                <li><span className='check-icon'>✓</span> Database Design</li>
                <li><span className='check-icon'>✓</span> Cloud Deployment</li>
              </ul>
              <button className='service-btn'>
                Get Started
                <span className='btn-arrow'>→</span>
              </button>
            </div>
            <div className='service-number'>02</div>
          </div>
          
          <div className={`service-card-enhanced service-3 ${servicesVisible ? 'service-card-visible' : ''}`} style={{ '--delay': '0.5s' }}>
            <div className='service-background-glow'></div>
            <div className='service-icon-wrapper'>
              <div className='service-icon'>
                <img src={figma} alt='UI/UX Design' />
              </div>
            </div>
            <div className='service-content'>
              <h3>UI/UX Design</h3>
              <p>Intuitive interfaces that enhance user experience and engagement with thoughtful design principles.</p>
              <ul className='service-features'>
                <li><span className='check-icon'>✓</span> User Research</li>
                <li><span className='check-icon'>✓</span> Prototyping</li>
                <li><span className='check-icon'>✓</span> User Testing</li>
                <li><span className='check-icon'>✓</span> Wireframing</li>
              </ul>
              <button className='service-btn'>
                Get Started
                <span className='btn-arrow'>→</span>
              </button>
            </div>
            <div className='service-number'>03</div>
          </div>
          
          <div className={`service-card-enhanced service-4 ${servicesVisible ? 'service-card-visible' : ''}`} style={{ '--delay': '0.75s' }}>
            <div className='service-background-glow'></div>
            <div className='service-icon-wrapper'>
              <div className='service-icon'>
                <img src={laravel} alt='Software Solutions' />
              </div>
            </div>
            <div className='service-content'>
              <h3>Software Solutions</h3>
              <p>Scalable software solutions for complex business requirements with cutting-edge technology.</p>
              <ul className='service-features'>
                <li><span className='check-icon'>✓</span> Custom Software</li>
                <li><span className='check-icon'>✓</span> System Integration</li>
                <li><span className='check-icon'>✓</span> Maintenance</li>
                <li><span className='check-icon'>✓</span> Tech Consulting</li>
              </ul>
              <button className='service-btn'>
                Get Started
                <span className='btn-arrow'>→</span>
              </button>
            </div>
            <div className='service-number'>04</div>
          </div>
        </div>
        <div className='services-footer-cta'>
          <p>Can't find what you're looking for?</p>
          <button className='custom-service-btn' onClick={handleRequestCustomService}>Request Custom Service</button>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className='why-choose-section' id='why-choose'>
        <div className='why-choose-header'>
          <h2 className='section-title'>
            <span className='title-line'></span>
            Why Choose Shehan's Freelancing Hub?
            <span className='title-line'></span>
          </h2>
          <p className='why-choose-subtitle'>
            Experience excellence with a partner who truly understands your digital needs
          </p>
        </div>
        
        <div className='why-choose-container'>
          <div className='benefits-grid-enhanced'>
            <div className='benefit-card benefit-1'>
              <div className='benefit-icon-wrapper'>
                <div className='benefit-icon'>
                  <img src={contact} alt='Client-Centric' />
                </div>
                <div className='benefit-glow'></div>
              </div>
              <div className='benefit-number'>01</div>
              <div className='benefit-content'>
                <h3>Client-Centric Approach</h3>
                <p>Your vision is my priority. I deliver tailored solutions that align perfectly with your goals through active collaboration and transparent communication.</p>
                <div className='benefit-features'>
                  <span className='feature-tag'>✓ Personal Attention</span>
                  <span className='feature-tag'>✓ Transparent Process</span>
                  <span className='feature-tag'>✓ Goal Alignment</span>
                </div>
              </div>
              <div className='benefit-hover-line'></div>
            </div>
            
            <div className='benefit-card benefit-2'>
              <div className='benefit-icon-wrapper'>
                <div className='benefit-icon'>
                  <img src={tailwind} alt='Expert Talent' />
                </div>
                <div className='benefit-glow'></div>
              </div>
              <div className='benefit-number'>02</div>
              <div className='benefit-content'>
                <h3>Expert Talent & Diverse Services</h3>
                <p>From stunning websites to intuitive interfaces and reliable hosting - get all your digital needs covered under one roof with proven expertise.</p>
                <div className='benefit-features'>
                  <span className='feature-tag'>✓ Full-Stack Skills</span>
                  <span className='feature-tag'>✓ One-Stop Solution</span>
                  <span className='feature-tag'>✓ Proven Expertise</span>
                </div>
              </div>
              <div className='benefit-hover-line'></div>
            </div>
            
            <div className='benefit-card benefit-3'>
              <div className='benefit-icon-wrapper'>
                <div className='benefit-icon'>
                  <img src={sql} alt='Cost-Effective' />
                </div>
                <div className='benefit-glow'></div>
              </div>
              <div className='benefit-number'>03</div>
              <div className='benefit-content'>
                <h3>Cost-Effective Solutions</h3>
                <p>High-quality work at competitive rates without agency overheads. Flexible schedules ensure timely delivery within your budget.</p>
                <div className='benefit-features'>
                  <span className='feature-tag'>✓ Fair Pricing</span>
                  <span className='feature-tag'>✓ No Hidden Costs</span>
                  <span className='feature-tag'>✓ Flexible Terms</span>
                </div>
              </div>
              <div className='benefit-hover-line'></div>
            </div>
            
            <div className='benefit-card benefit-4'>
              <div className='benefit-icon-wrapper'>
                <div className='benefit-icon'>
                  <img src={nextJs} alt='Future-Ready' />
                </div>
                <div className='benefit-glow'></div>
              </div>
              <div className='benefit-number'>04</div>
              <div className='benefit-content'>
                <h3>Future-Ready Growth</h3>
                <p>Cutting-edge designs and strategic solutions that boost your online presence and create lasting impressions in competitive markets.</p>
                <div className='benefit-features'>
                  <span className='feature-tag'>✓ Modern Tech</span>
                  <span className='feature-tag'>✓ Scalable Design</span>
                  <span className='feature-tag'>✓ Growth Focus</span>
                </div>
              </div>
              <div className='benefit-hover-line'></div>
            </div>
          </div>
          
          <div className='why-choose-stats'>
            <div className='stat-item-small'>
              <div className='stat-number-small'>500+</div>
              <div className='stat-label-small'>Happy Clients</div>
            </div>
            <div className='stat-item-small'>
              <div className='stat-number-small'>2+</div>
              <div className='stat-label-small'>Years Experience</div>
            </div>
            <div className='stat-item-small'>
              <div className='stat-number-small'>100%</div>
              <div className='stat-label-small'>Satisfaction Rate</div>
            </div>
            <div className='stat-item-small'>
              <div className='stat-number-small'>24/7</div>
              <div className='stat-label-small'>Support Available</div>
            </div>
          </div>
          
          <div className='why-choose-cta'>
            <h3>Ready to Start Your Journey?</h3>
            <p>Let's transform your ideas into powerful digital solutions</p>
            <button className='cta-btn-primary' onClick={() => setShowModal(true)}>
              <span>Get Started Now</span>
              <span className='btn-icon'>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className='tips-section'>
        <div className='tips-header'>
          <h2 className='section-title'>
            <span className='title-line'></span>
            Expert Web Design Tips
            <span className='title-line'></span>
          </h2>
          <p className='tips-subtitle'>
            Professional insights to elevate your digital presence
          </p>
        </div>
        <div className='tips-grid-enhanced'>
          <div className={`tip-card-modern tip-1 ${tipsVisible ? 'tip-card-visible' : ''}`} style={{ '--delay': '0s' }}>
            <div className='tip-image-wrapper'>
              <img src={logo1} alt='People-focused design' />
              <div className='tip-overlay'>
                <div className='tip-number'>01</div>
              </div>
              <div className='tip-icon-badge'>
                <span>👥</span>
              </div>
            </div>
            <div className='tip-content-wrapper'>
              <div className='tip-category'>
                <span className='category-tag'>Design Strategy</span>
              </div>
              <h3>Capture Client Attention</h3>
              <p>Create standout websites with personalized designs, intuitive navigation, and engaging content that highlights your unique services and brand identity.</p>
              <div className='tip-highlights'>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Personalized Design</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Intuitive Navigation</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Engaging Content</span>
                </div>
              </div>
              <button className='tip-btn'>
                Learn More
                <span className='tip-arrow'>→</span>
              </button>
            </div>
          </div>
          
          <div className={`tip-card-modern tip-2 ${tipsVisible ? 'tip-card-visible' : ''}`} style={{ '--delay': '0.4s' }}>
            <div className='tip-image-wrapper'>
              <img src={logo2} alt='Quality design' />
              <div className='tip-overlay'>
                <div className='tip-number'>02</div>
              </div>
              <div className='tip-icon-badge'>
                <span>⭐</span>
              </div>
            </div>
            <div className='tip-content-wrapper'>
              <div className='tip-category'>
                <span className='category-tag'>Quality Focus</span>
              </div>
              <h3>Avoid Generic Design</h3>
              <p>Quality web design builds trust, enhances user experience, and drives conversions. Don't let generic templates harm your brand's unique identity.</p>
              <div className='tip-highlights'>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Build Trust</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Better UX</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Drive Conversions</span>
                </div>
              </div>
              <button className='tip-btn'>
                Learn More
                <span className='tip-arrow'>→</span>
              </button>
            </div>
          </div>
          
          <div className={`tip-card-modern tip-3 ${tipsVisible ? 'tip-card-visible' : ''}`} style={{ '--delay': '0.8s' }}>
            <div className='tip-image-wrapper'>
              <img src={logo3} alt='Mobile responsive' />
              <div className='tip-overlay'>
                <div className='tip-number'>03</div>
              </div>
              <div className='tip-icon-badge'>
                <span>📱</span>
              </div>
            </div>
            <div className='tip-content-wrapper'>
              <div className='tip-category'>
                <span className='category-tag'>Responsive Design</span>
              </div>
              <h3>Mobile Responsiveness</h3>
              <p>Ensure seamless browsing across all devices with scalable designs, fluid layouts, and dynamic content adaptation for the perfect user experience.</p>
              <div className='tip-highlights'>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Scalable Designs</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Fluid Layouts</span>
                </div>
                <div className='highlight-item'>
                  <span className='highlight-icon'>✓</span>
                  <span>Dynamic Content</span>
                </div>
              </div>
              <button className='tip-btn'>
                Learn More
                <span className='tip-arrow'>→</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* <div className='tips-footer-section'>
          <div className='tips-cta-box'>
            <div className='cta-icon'>💡</div>
            <h3>Want More Expert Tips?</h3>
            <p>Subscribe to our newsletter for weekly insights and exclusive design strategies</p>
            <div className='newsletter-form'>
              <input type='email' placeholder='Enter your email' className='newsletter-input' />
              <button className='newsletter-btn'>Subscribe</button>
            </div>
          </div>
        </div> */}
      </section>

      {/* Contact Section */}
      <section className='contact-section' id='contact'>
        <div className='contact-header-section'>
          <h2 className='section-title'>
            <span className='title-line'></span>
            Let's Build Something Amazing Together
            <span className='title-line'></span>
          </h2>
          <p className='contact-main-subtitle'>
            Have a project in mind? Let's turn your vision into reality. Get in touch today!
          </p>
        </div>

        <div className='contact-container'>
          <div className='contact-info-enhanced'>
            <div className='contact-info-header'>
              <h3>Get In Touch</h3>
              <p>Choose your preferred way to connect with us. We're here to help bring your ideas to life!</p>
            </div>
            
            <div className='contact-details-grid'>
              <div className='contact-card'>
                <div className='contact-icon-wrapper'>
                  <div className='contact-icon'>📞</div>
                </div>
                <div className='contact-card-content'>
                  <h4>Phone</h4>
                  <p>+94 766 722 019</p>
                  <span className='contact-availability'>Mon-Fri, 9AM-6PM</span>
                </div>
              </div>
              
              <div className='contact-card'>
                <div className='contact-icon-wrapper'>
                  <div className='contact-icon'>📧</div>
                </div>
                <div className='contact-card-content'>
                  <h4>Email</h4>
                  <p>shehanfreelanzer@gmail.com</p>
                  <span className='contact-availability'>24/7 Support</span>
                </div>
              </div>
              
              <div className='contact-card'>
                <div className='contact-icon-wrapper'>
                  <div className='contact-icon'>📍</div>
                </div>
                <div className='contact-card-content'>
                  <h4>Location</h4>
                  <p>Sri Lanka</p>
                  <span className='contact-availability'>Serving Worldwide</span>
                </div>
              </div>
            </div>

            <div className='contact-benefits'>
              <div className='benefit-badge'>
                <span className='benefit-icon'>⚡</span>
                <span>Quick Response</span>
              </div>
              <div className='benefit-badge'>
                <span className='benefit-icon'>🎯</span>
                <span>100% Satisfaction</span>
              </div>
              <div className='benefit-badge'>
                <span className='benefit-icon'>🔒</span>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
          
          <div className='contact-form-enhanced' id='contact-form'>
            <div className='form-header'>
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className='modern-form-enhanced'>
              <div className='form-row'>
                <div className='form-group-enhanced'>
                  <label htmlFor='username'>
                    <span className='label-icon'>👤</span>
                    Full Name
                  </label>
                  <input
                    id='username'
                    type='text'
                    placeholder='Enter your full name'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={validationErrors.username ? 'error' : ''}
                  />
                  {validationErrors.username && <span className='error-text'>{validationErrors.username}</span>}
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group-enhanced'>
                  <label htmlFor='email'>
                    <span className='label-icon'>📧</span>
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='your.email@example.com'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={validationErrors.email ? 'error' : ''}
                  />
                  {validationErrors.email && <span className='error-text'>{validationErrors.email}</span>}
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group-enhanced'>
                  <label htmlFor='phone'>
                    <span className='label-icon'>📱</span>
                    Phone Number
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    placeholder='Enter your phone number'
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className={validationErrors.phone_number ? 'error' : ''}
                  />
                  {validationErrors.phone_number && <span className='error-text'>{validationErrors.phone_number}</span>}
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group-enhanced'>
                  <label htmlFor='subject'>
                    <span className='label-icon'>💼</span>
                    Subject
                  </label>
                  <input
                    id='subject'
                    type='text'
                    placeholder='What is this regarding?'
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={validationErrors.subject ? 'error' : ''}
                  />
                  {validationErrors.subject && <span className='error-text'>{validationErrors.subject}</span>}
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group-enhanced'>
                  <label htmlFor='message'>
                    <span className='label-icon'>💬</span>
                    Your Message
                  </label>
                  <textarea
                    id='message'
                    rows='5'
                    placeholder='Tell us about your project or inquiry...'
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={validationErrors.message ? 'error' : ''}
                  />
                  {validationErrors.message && <span className='error-text'>{validationErrors.message}</span>}
                </div>
              </div>

              <button type='submit' className='btn-submit-enhanced' disabled={loading}>
                {loading ? (
                  <>
                    <span className='spinner'></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className='submit-arrow'>→</span>
                  </>
                )}
              </button>

              <div className='form-footer-note'>
                <span className='note-icon'>🔒</span>
                <span>Your information is safe and will never be shared with third parties</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div className='modal-overlay' onClick={() => setShowModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close-btn' onClick={() => setShowModal(false)}>
              ×
            </button>
            
            <div className='modal-header'>
              <div className='modal-icon'>🚀</div>
              <h2 className='modal-title'>Let's Start Your Project!</h2>
              <p className='modal-subtitle'>Choose how you'd like to begin your journey with us</p>
            </div>
            
            <div className='modal-body'>
              <div className='modal-benefits'>
                <div className='modal-benefit-item'>
                  <div className='modal-benefit-icon'>💼</div>
                  <div className='modal-benefit-text'>
                    <h4>Professional Service</h4>
                    <p>Expert web design & development tailored to your needs</p>
                  </div>
                </div>
                
                <div className='modal-benefit-item'>
                  <div className='modal-benefit-icon'>⚡</div>
                  <div className='modal-benefit-text'>
                    <h4>Fast Delivery</h4>
                    <p>Quick turnaround time without compromising quality</p>
                  </div>
                </div>
                
                <div className='modal-benefit-item'>
                  <div className='modal-benefit-icon'>🎯</div>
                  <div className='modal-benefit-text'>
                    <h4>100% Satisfaction</h4>
                    <p>We don't stop until you're completely happy</p>
                  </div>
                </div>
              </div>
              
              <div className='modal-stats'>
                <div className='modal-stat-item'>
                  <span className='modal-stat-number'>500+</span>
                  <span className='modal-stat-label'>Happy Clients</span>
                </div>
                <div className='modal-stat-item'>
                  <span className='modal-stat-number'>2+</span>
                  <span className='modal-stat-label'>Years Exp</span>
                </div>
                <div className='modal-stat-item'>
                  <span className='modal-stat-number'>24/7</span>
                  <span className='modal-stat-label'>Support</span>
                </div>
              </div>
              
              <div className='modal-actions'>
                <button className='modal-btn-primary' onClick={() => {
                  setShowModal(false);
                  scrollToContact();
                }}>
                  <span>📧</span>
                  <span>Contact Us</span>
                </button>
                <button className='modal-btn-secondary' onClick={() => {
                  setShowModal(false);
                  scrollToPortfolio();
                }}>
                  <span>👀</span>
                  <span>View Services</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className='scroll-to-top-btn' 
          onClick={scrollToTop}
          aria-label='Scroll to top'
        >
          <i className='fas fa-arrow-up'></i>
        </button>
      )}
    </div>
  );
}
