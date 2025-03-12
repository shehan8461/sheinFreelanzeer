import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/updateitem.css';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';



function UpdateRequest() {
  const [imagePercent, setImagePercent] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const fileRef1 = useRef(null);
  const [image1, setImage1] = useState(undefined);
  const [updatediscount, setupdatediscount] = useState({
    name: "",
    user_email: "",
    contact: "",
    project_type: "",
    budget_range: "",
    project_timeline: "",
    preferred_communication_mode: "",
    project_details: "",
    profilePicture: ""


  })
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
          setupdatediscount((prev) => ({
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


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/getitem/${id}`);
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setupdatediscount(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);



  const handleInputChange = (e) => {
    setupdatediscount({
      ...updatediscount,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/user/updateitem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatediscount._id,
          ...updatediscount,
        }),
      });

      const data = await response.json();

      if (data.success) {

        console.log('user  updated successfully');
        alert("updated successfully");


      } else {
        console.error(data.message);
      }
      navigate('/OwnRequests')
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  return (
    <div className="container service-update p-4 bg-light rounded shadow">
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.name}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="user_email" className="form-label">Species:</label>
        <input
          type="text"
          id="user_email"
          name="user_email"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.user_email}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="user_email" className="form-label">Contact:</label>
        <input
          type="text"
         
          name="contact"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.contact}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="project_type" className="form-label">Age:</label>
        <input
          type="text"
          id="project_type"
          name="project_type"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.project_type}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="budget_range" className="form-label">Gender:</label>
        <input
          type="text"
          id="budget_range"
          name="budget_range"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.budget_range}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="project_timeline" className="form-label">Color:</label>
        <input
          type="text"
          id="project_timeline"
          name="project_timeline"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.project_timeline}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="preferred_communication_mode" className="form-label">Weight:</label>
        <input
          type="text"
          id="preferred_communication_mode"
          name="preferred_communication_mode"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.preferred_communication_mode}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="project_details" className="form-label">Price:</label>
        <input
          type="text"
          id="project_details"
          name="project_details"
          className="form-control"
          onChange={handleInputChange}
          value={updatediscount?.project_details}
        />
      </div>
  
      <div className="mb-3 text-center">
        <input
          type="file"
          ref={fileRef1}
          id="profilePicture"
          hidden
          accept="image/*"
          onChange={(e) => setImage1(e.target.files[0])}
        />
        <button
          type="button"
          onClick={handleImage1Click}
          className="btn btn-primary"
        >
          Upload Picture
        </button>
      </div>
  
      <div className="mb-3 text-center">
        <img
          src={
            updatediscount.profilePicture ||
            "https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE="
          }
          alt="Profile"
          className="img-thumbnail rounded-circle"
          onClick={handleImage1Click}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
  
      <div className="text-center">
        <button
          type="button"
          onClick={handleUpdate}
          className="btn btn-success"
        >
          Update Request
        </button>
      </div>
    </form>
  </div>
  
  )
}
export default UpdateRequest;