import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import './css/profile.css'
import { updateUserStart,updateUserFailure, updateUserSuccess, deleteUserStart,deleteUserSuccess,deleteUserFailure, signout } from '../redux/User/userSlice';


export default function Profile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null);
  const [image,setImage]=useState(undefined);
  const [imagePercent,setImagePercent]=useState(0);
  const [imageError,setImageError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setuodateSuccess]=useState(false)

 
    const {currentUser,loading,error}=useSelector((state)=>state.user)
    useEffect(()=>{
      if(image){
        handleFileUpload(image)
          }
      },[image]);

      const handleFileUpload=async (image)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime()+image.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,image)

        uploadTask.on('state_changed',
          (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImagePercent(Math.round(progress))
          
    },
  
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>setFormData({ ...formData, 
        profilePicture:downloadURL}))

      }
    
   )
  };

  const handlechange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }



  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData,)
      });
      const data=await res.json();
      if(data.success===false){
          dispatch(updateUserFailure(data));
          return
      }
      dispatch(updateUserSuccess(data));
      setuodateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error));
    }
  };



  const handledeleteAccount =async ()=>{
    try{
      dispatch(deleteUserStart())
        const res=await fetch(`/api/user/delete/${currentUser._id}`,{

        method:'DELETE',
        })
        const data=await res.json();
        if(data.success===false){
          dispatch(deleteUserFailure(data))
          return;
        }
        dispatch(deleteUserSuccess(data))
        alert('user deleted successfully')
    }catch(error){
        dispatch(deleteUserFailure(error))
    }
  }


  const handleSignOut=async ()=>{
    try{

      await fetch('api/auth/signout')
      dispatch(signout())
    }catch(error){
        console.log(error)
    }
  }
  return (

    <div className="container user-profile mt-5">
    <h1 className="text-center mb-4">Profile</h1>
    <form onSubmit={handleSubmit} className="user-profile-form">
      <div className="form-group text-center">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="img-thumbnail profile-picture mb-3"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-danger">
          {imageError ? (
            <span>Error uploading image (file size must be less than 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-success">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
      </div>
      <div className="form-group">
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="form-control mb-3"
          onChange={handlechange}
        />
      </div>
      <div className="form-group">
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handlechange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handlechange}
        />
      </div>
      <button className="btn btn-primary btn-block" type="submit">
        {loading ? 'Loading...' : 'Update'}
      </button>
    </form>
    <div className="d-flex justify-content-between mt-4">
      <span
        onClick={handledeleteAccount}
        className="btn btn-danger btn-sm"
      >
        Close Account
      </span>
      <span
        onClick={handleSignOut}
        className="btn btn-secondary btn-sm"
      >
        Sign Out
      </span>
    </div>
    <div className="d-flex justify-content-between mt-3">
      <Link className="btn btn-info btn-sm" to="/AddRequest">
        Add Request
      </Link>
      <Link className="btn btn-success btn-sm" to="/OwnRequests">
        My Requests
      </Link>
    </div>
    <p className="text-danger mt-3">{error && 'Something went wrong'}</p>
    <p className="text-success">{updateSuccess && 'User updated successfully'}</p>
  </div>
  
  )
}
