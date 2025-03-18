import {BrowserRouter ,Routes,Route } from 'react-router-dom';

import About from './Pages/About';

import Header from './components/header';
import PrivateRoutes from './components/PrivateRoutes';
import AllDetails from './Pages/AllDetails';
import Footer from './Pages/Footer';




export default function App() {
  return <BrowserRouter>
<Header/>
  <Routes>
    <Route path="/" element={<div><AllDetails/><Footer/></div>}></Route>
    <Route path="/about" element={<About/>}></Route>

    
  
 
    <Route element={<PrivateRoutes/>}>
  
   


    </Route>
 
    
  </Routes>
  
  </BrowserRouter>
  
}
