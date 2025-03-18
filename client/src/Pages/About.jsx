import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About() {
  return (
    <div className="container py-5 bg-dark text-white">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="display-4 fw-bold text-primary">About Me</h1>
        <p className="lead text-light">
          I'm <span className="fw-semibold">Shehan Salitha Dilshan</span>, a passionate software developer specializing in web development, UI/UX design, and web hosting solutions. With over a year of freelance experience and a strong background in 
          <strong> MERN Stack, Angular, and .NET</strong>, I create dynamic and user-friendly applications tailored to client needs.
        </p>
      </div>

      {/* Expertise & Experience Section */}
      <div className="row mt-5 g-4">
        {/* My Expertise */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 bg-secondary text-white">
            <div className="card-body">
              <h2 className="h4 fw-bold">My Expertise</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-secondary text-white">Frontend Development (React.js, Angular, HTML, CSS, JavaScript)</li>
                <li className="list-group-item bg-secondary text-white">Backend Development (Node.js, .NET, PHP, CodeIgniter)</li>
                <li className="list-group-item bg-secondary text-white">UI/UX Design & Responsive Interfaces</li>
                <li className="list-group-item bg-secondary text-white">Web Hosting & Performance Optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="col-md-6">
  <div className="card shadow-lg border-0 bg-secondary text-white">
    <div className="card-body">
      <h2 className="h4 fw-bold">Experience & Education</h2>
      
      {/* Freelance Experience */}
      <h5 className="fw-semibold text-primary">Freelance Developer | Full-Stack Web Solutions</h5>
      <p className="fs-6">
        Over a year of experience in building dynamic, responsive, and high-performance web applications using 
        <strong> React.js, Angular, .NET, Node.js, and MongoDB.</strong> Specialized in UI/UX design, web hosting, and cloud integration.
      </p>

      {/* Professional Work */}
      {/* <h5 className="fw-semibold text-primary">Software Developer | Sun System Pvt Ltd</h5>
      <p className="fs-6">
        Currently working as a <strong>Software Developer</strong>, focusing on enterprise-level solutions, system architecture, and backend services.
        Expertise in database management, API development, and cloud-based deployments.
      </p> */}

      {/* Internship Experience */}
      {/* <h5 className="fw-semibold text-primary">Software Engineering Intern | [Your Previous Internship Company]</h5>
      <p className="fs-6">
        Gained hands-on experience in full-stack development, Agile methodologies, and software testing. Contributed to various 
        client-based projects using <strong>React, Node.js, and MySQL.</strong>
      </p> */}

      {/* Education */}
      <h5 className="fw-semibold text-primary">Education</h5>
      <p className="fs-6">
        Specialized in web development, software architecture, and cloud computing.  
        Key courses: <em>Full-Stack Development, Cybersecurity, Database Management, AI & Machine Learning.</em>
      </p>

      {/* Certifications */}
      {/* <h5 className="fw-semibold text-primary">Certifications</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-secondary text-white">Certified React Developer – Udemy</li>
        <li className="list-group-item bg-secondary text-white">AWS Cloud Practitioner – Amazon</li>
        <li className="list-group-item bg-secondary text-white">UI/UX Design Certification – Coursera</li>
      </ul> */}
    </div>
  </div>
</div>

      </div>

      {/* Why Work With Me Section */}
      <div className="text-center mt-5">
        <h2 className="h4 fw-bold">Why Work With Me?</h2>
        <p className="lead text-light">
          I blend creativity with technical expertise to craft elegant, high-performance applications. Whether you need a sleek website, a complex web app, or an optimized system, I'm here to bring your vision to life with seamless user experiences and scalable solutions.
        </p>
      </div>
    </div>
  );
}
