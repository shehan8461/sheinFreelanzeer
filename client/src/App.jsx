import {BrowserRouter ,Routes,Route } from 'react-router-dom';

import About from './Pages/About';

import Header from './components/header';
import ImprovedHeader from './components/ImprovedHeader';
import PrivateRoutes from './components/PrivateRoutes';
import AllDetails from './Pages/AllDetails';
import AllDetailsImproved from './Pages/AllDetailsImproved';
import Footer from './Pages/Footer';




export default function App() {
  return <BrowserRouter>
<ImprovedHeader/>
  <Routes>
    <Route path="/" element={<div><AllDetailsImproved/><Footer/></div>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/old" element={<div><Header/><AllDetails/><Footer/></div>}></Route>

    
  
 
    <Route element={<PrivateRoutes/>}>
  
   


    </Route>
 
    
  </Routes>
  
  </BrowserRouter>
  
}
