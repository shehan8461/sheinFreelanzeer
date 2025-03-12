import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the path as per your project structure
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function OwnRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/user/${currentUser._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);

      // Fetch images from Firebase for each order
      data.forEach(order => {
        if (order.profilePicture) {
          fetchFirebaseImage(order.profilePicture, 'profilePicture', order._id);
        }
       
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchFirebaseImage = async (imageUrl, field, orderId) => {
    const storageRef = ref(storage, imageUrl);
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            [field]: downloadUrl
          };
        }
        return order;
      }));
    } catch (error) {
      console.error(`Error fetching image from Firebase for ${field}:`, error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`/api/user/deleteRequest/${orderIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderIdToDelete)
        );
      }
      
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container table-responsive my-5">
  <div className="text-center font-weight-bold text-primary mb-4">Your Information</div>

  {orders.length > 0 ? (
    <table className="table table-hover shadow-sm">
      <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Project Type</th>
          <th>Budget Range</th>
          <th>Project Timeline</th>
          <th>Communication Mode</th>
          <th>Project Details</th>
          <th>Photos</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.name}</td>
            <td>{order.user_email}</td>
            <td>{order.contact}</td>
            <td>{order.project_type}</td>
            <td>{order.budget_range}</td>
            <td>{order.project_timeline}</td>
            <td>{order.preferred_communication_mode}</td>
            <td>{order.project_details}</td>
            <td>
              {order.profilePicture && (
                <img
                  src={order.profilePicture}
                  alt="Profile"
                  className="img-thumbnail"
                  style={{ width: "80px", height: "80px" }}
                />
              )}
            </td>
            <td>
              <Link to={`/update-request/${order._id}`}>
                <button className="btn btn-success btn-sm mx-1">Edit Request</button>
              </Link>
              <button
                className="btn btn-danger btn-sm mx-1"
                onClick={() => {
                  setShowModal(true);
                  setOrderIdToDelete(order._id);
                }}
              >
                Delete Request
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-center text-muted">You have no requests yet!</p>
  )}{showModal && (
    <div className="modal fade show d-block" tabIndex="1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body text-center">
            <i
              className="text-danger mb-3"
              style={{ fontSize: "2rem" }}
            >
              <HiOutlineExclamationCircle />
            </i>
            <h5>Are you sure you want to delete this request?</h5>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              className="btn btn-danger"
              onClick={handleDeleteOrder}
            >
              Yes, I am sure
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setShowModal(false)}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
  

</div>

  );
}
