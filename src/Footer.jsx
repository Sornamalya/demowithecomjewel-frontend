import React from "react";
import logo3 from './images/logo3.png';  // relative to Footer.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faGlobe, faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons'

function Footer() {
    
    return(
    <>
    <div className="row footerrow"  style={{marginTop:"30px",backgroundColor:"#F2BED1"}}>
        <div className="col-12 col-sm-6 col-md-4" style={{background:"transparent"}}>
            <img id="logofoo" src={logo3} alt="" width="200px" /> 

        </div>
        
           
          <div className="col-12 col-sm-6 col-md-4">
            <h6  style={{marginBottom:"10px" , padding: "6px",fontWeight:"bold",color:"#dd2c88"}}>Customer Support</h6>
            
                <li><a href="">Terms & Conditions</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Shipping & Delivery</a> </li>
                <li><a href="">Refund & Cancellation</a></li>
                <li><a href="">Payment Policy</a></li>
                

            
        </div>

          <div className="col-12 col-sm-6 col-md-4">
            <h6 style={{marginBottom:"10px", padding: "6px",fontWeight:"bold",color:"#dd2c88"}}>Contact Info</h6>
           
                
                <li><span><FontAwesomeIcon icon={faLocationDot} /></span><a href="">Karaikal-609 602</a></li>
               <li> <span><FontAwesomeIcon icon={faEnvelope} /></span><a href="mailto:sornamalya08@gmail.com" target="_blank">Email:sornamalya08@gmail.com</a></li>
                <li><span><FontAwesomeIcon icon={faPhone} /></span><a href="tel:7339044018" target="_blank">Phone:7339044018</a></li>
                <li><span><FontAwesomeIcon icon={faGlobe} /></span><a href="">customized_jewels.com</a></li>
            
        </div>

    </div>
    <h6 style={{marginTop:"10px",backgroundColor:"#F2eBED1",textAlign:"center"}}>© 2025 Sornamalya. All Rights Reserved.</h6>
    
    </>
    );  
}

export default Footer;