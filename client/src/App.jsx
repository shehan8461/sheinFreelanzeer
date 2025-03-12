import {BrowserRouter ,Routes,Route } from 'react-router-dom';

import About from './Pages/About';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Header from './components/header';
import PrivateRoutes from './components/PrivateRoutes';
import AllDetails from './Pages/AllDetails';
import Footer from './Pages/Footer';
import AddRequest from './Pages/AddRequest';
import OwnRequests from './Pages/OwnRequests';
import UpdateRequest from './Pages/UpdateRequest';






export default function App() {
  return <BrowserRouter>
<Header/>
  <Routes>
    <Route path="/" element={<div><AllDetails/><Footer/></div>}></Route>
    <Route path="/about" element={<About/>}></Route>

    <Route path="/sign-in" element={<div><Signin/><Footer/></div>}></Route>
    <Route path="/AddRequest" element={<AddRequest/>}></Route>
    <Route path="/sign-up" element={<SignUp/>}></Route>

 
    <Route element={<PrivateRoutes/>}>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/OwnRequests" element={<OwnRequests/>}></Route>
    <Route path="/update-request/:id" element={<UpdateRequest/>}></Route>


    </Route>
 
    
  </Routes>
  
  </BrowserRouter>
  
}
