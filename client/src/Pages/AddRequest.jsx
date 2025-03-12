import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddRequest() {
  const [imagePercent, setImagePercent] = useState(0);
  const fileRef1 = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [image1, setImage1] = useState(undefined);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userId: currentUser._id,
    name: "",
    user_email: "",
    contact: "",
    project_type: "",
    budget_range: "",
    project_timeline: "",
    preferred_communication_mode: "",
    project_details: "",
    profilePicture: ""
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (image1) {
      handleFileUpload(image1, 'profilePicture');
    }
  }, [image1]);

  const handleFileUpload = async (image, field) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        setError('Image upload failed');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({
            ...prev,
            [field]: downloadURL
          }));
        });
      }
    );
  };

  const handleImage1Click = () => {
    fileRef1.current.click();
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.user_email) errors.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.user_email)) errors.user_email = "Email is invalid";
    if (!formData.contact) errors.contact = "Contact is required";
    else if (!/^\d{10}$/.test(formData.contact)) errors.contact = "Contact should be a 10-digit number";
    if (!formData.project_type) errors.project_type = "Project type is required";
    if (!formData.budget_range) errors.budget_range = "Budget range is required";
    if (!formData.project_timeline) errors.project_timeline = "Project timeline is required";
    if (!formData.preferred_communication_mode) errors.preferred_communication_mode = "Preferred communication mode is required";
    if (!formData.project_details) errors.project_details = "Project details are required";
    if (!formData.profilePicture) errors.profilePicture = "Profile picture is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    try {
      const res = await fetch('/api/auth/createRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create item');
      }

      alert('Request created successfully');
      navigate('/OwnRequests');
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="container mt-5">
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#007bff",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Create Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your Name"
              className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Email"
              className={`form-control ${validationErrors.user_email ? 'is-invalid' : ''}`}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
            />
            {validationErrors.user_email && <div className="invalid-feedback">{validationErrors.user_email}</div>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Contact"
              className={`form-control ${validationErrors.contact ? 'is-invalid' : ''}`}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            {validationErrors.contact && <div className="invalid-feedback">{validationErrors.contact}</div>}
          </div>
          <label>Select Project Type</label>
<div className="mb-3">
  <select
    className={`form-select ${validationErrors.project_type ? 'is-invalid' : ''}`}
    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
  >
    <option value="">Select Project Type</option>
    <option value="Web Development">Web Development</option>
    <option value="UI/UX Design">UI/UX Design</option>
    <option value="Web Hosting Solutions">Web Hosting Solutions</option>
    <option value="E-commerce Solutions">E-commerce Solutions</option>
    <option value="Other">Other</option>
  </select>
  {validationErrors.project_type && <div className="invalid-feedback">{validationErrors.project_type}</div>}
</div>

<label>Select Budget Range</label>
<div className="mb-3">
  <select
    className={`form-select ${validationErrors.budget_range ? 'is-invalid' : ''}`}
    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
  >
    <option value="">Select Budget Range</option>
    <option value="Below $500">Below $500</option>
    <option value="$500 - $1,000">$500 - $1,000</option>
    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
    <option value="Above $5,000">Above $5,000</option>
  </select>
  {validationErrors.budget_range && <div className="invalid-feedback">{validationErrors.budget_range}</div>}
</div>

<label>Select Project Timeline</label>
<div className="mb-3">
  <select
    className={`form-select ${validationErrors.project_timeline ? 'is-invalid' : ''}`}
    onChange={(e) => setFormData({ ...formData, project_timeline: e.target.value })}
  >
    <option value="">Select Project Timeline</option>
    <option value="Less than 1 month">Less than 1 month</option>
    <option value="1-3 months">1-3 months</option>
    <option value="3-6 months">3-6 months</option>
    <option value="Flexible">Flexible</option>
  </select>
  {validationErrors.project_timeline && <div className="invalid-feedback">{validationErrors.project_timeline}</div>}
</div>

<div className="mb-3">
  <label htmlFor="communicationMode" className="form-label">Select Communication Mode</label>
  <select
    className={`form-select ${validationErrors.preferred_communication_mode ? 'is-invalid' : ''}`}
    onChange={(e) => setFormData({ ...formData, preferred_communication_mode: e.target.value })}
  >
    <option value="">Select Communication Mode</option>
    <option value="Email">Email</option>
    <option value="Phone">Phone</option>
    <option value="Video Call">Video Call</option>
  </select>
  {validationErrors.preferred_communication_mode && <div className="invalid-feedback">{validationErrors.preferred_communication_mode}</div>}
</div>


          <div className="mb-3">
            <textarea
              className={`form-control ${validationErrors.project_details ? 'is-invalid' : ''}`}
              placeholder="Describe your project"
              onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
            />
            {validationErrors.project_details && <div className="invalid-feedback">{validationErrors.project_details}</div>}
          </div>
        <input type='file' ref={fileRef1} id='profilePicture' hidden accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleImage1Click}
          >
            Upload File("PDF, DOC, DOCX, PNG, JPG")
          </button>
        </div>
        <div className="text-center">
          <img
            src={
              formData.profilePicture ||
              "https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE="
            }
            alt="Profile"
            onClick={handleImage1Click}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "3px solid #007bff",
              cursor: "pointer",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        </div>
        <div className="mb-3">
          {imageError ? (
            <span className="text-danger">Error uploading image (file size must be less than 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-success">Image uploaded successfully</span>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Submit
        </button>
        <div className="mt-3">
       
        </div>
      </form>
      {error && (
        <p className="text-danger text-center mt-3" style={{ fontSize: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  </div>
  
  );
}
