import React from "react";
import Nav from "./nav";
// import './../App.css'

// import Nav from './navbar1/nav'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faBars} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CarouselComponent from './../Carousel';
import ProductCategoryButton from './../ProductCategoryButtons';
// import CategoryProduct from './chat'
// import ProductList from './ProductList';
import LatestProducts from './../LatestProducts';
import Footer from './../Footer';
import Login from './../Login';
import Register from './../Register';
import PromiseCards from "../PromiseCards";
import NewArrivals from "./NewArrivals";






function Home()
{
  return(
    <div>
      
     
       <Nav />
      <CarouselComponent />
       <ProductCategoryButton />
       
       <LatestProducts />
     
       <PromiseCards />
      {/* <Login />
       <Register /> */}
       <Footer />
      
     
  
    </div >

  )
}

export default Home;