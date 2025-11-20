
import './App.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import { Route, Routes,Router ,Navigate} from 'react-router';
import React,{useState,useEffect} from 'react';

import Home from './navbar1/Home'
import Nav from './navbar1/nav'
import Login from './Login';
import Register from './Register';
import About from './navbar1/About';
import Contact from './navbar1/Contact';
import NewArrivals from './navbar1/NewArrivals';
import Products from './navbar1/Products'
import Wishlist from './Wishlist';
import Cart from './Cart';
import OrderHistoryPage from './OrderHistoryPage';
import ProductViewComp from './ProductViewComp';
import PaymentComp from './PaymentComp';
import AddressComp from './AddressComp';
import Footer from './Footer';











function App() {
     const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };


  return (
    <>
    
    <div className='container-xl' style={{overflowX:"hidden"}}>
     
     {/* <Home /> */}
    <Routes>
      <Route index path='/' element={<Home />}/>
      <Route path='/productspage' element={<Products />}/> 
      <Route path='/newarrivalspage' element={<NewArrivals />}/>
      

      <Route path='/aboutpage' element={<About />}/>
      <Route path='/contactpage' element={<Contact />}/>
      <Route path='/loginpage' element={<Login />} />
      <Route path='/cartpage' element={<Cart />} />

      
       <Route path='/registerpage' element={<Register />}/>
      <Route path='/wishlistpage' element={<Wishlist />}/>
       <Route path="/productviewpage" element={<ProductViewComp />} />
         <Route path="/addresscomp" element={<AddressComp />} />
 <Route path="/paymentcomp" element={<PaymentComp />} />
           <Route path='/orderhistorypage' element={<OrderHistoryPage />} />




         
         
         
       
       
         

    </Routes>
    
    
    </div>
    
    </>
    
  )
}

export default App;
