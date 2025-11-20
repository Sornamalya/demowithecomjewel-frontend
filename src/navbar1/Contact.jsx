import React from "react";
import Nav from "./nav";
import Footer from "../Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faGlobe, faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons'

function Contact()
{
    return(
        <div>
            <Nav />
            <div className="row contact-row">
                <div className="col">
                    <h1 style={{margin:"20px 0px",color:"#dd2c88"}}>Contact Us</h1>
                     <li><span><FontAwesomeIcon icon={faLocationDot} /></span><a href="">Karaikal-609 602</a></li>
                       <li> <span><FontAwesomeIcon icon={faEnvelope} /></span><a href="mailto:sornamalya08@gmail.com" target="_blank">Email:sornamalya08@gmail.com</a></li>
                         <li><span><FontAwesomeIcon icon={faPhone} /></span><a href="tel:7339044018" target="_blank">Phone:7339044018</a></li>
                          <li><span><FontAwesomeIcon icon={faGlobe} /></span><a href="">customized_jewels.com</a></li>
                </div>

                <div className="col">

                    <h1 style={{margin:"20px 0px",color:"#dd2c88"}}>Contact Enquiry</h1>

                    <form action="https://formspree.io/f/mjkoznyb" method="post" className="contact-form" style={{background:"ink"}}>
                        <div>
                             <label htmlFor="name">Name:</label>   <br />
                        <input type="text" name="name" placeholder="Your Name..." id="name" /> 

                        </div>
                       
                        <div>
                             <label htmlFor="email">Email:</label>   <br />
                        <input type="email" name="email" placeholder="Your Email Address..." id="email" /> 

                        </div>
                        
                        <div>
                             <label htmlFor="message">Message:</label> 
                              <br />
                         <textarea name="message" id="message" placeholder="Your Message..." rows={7} cols={28} />
                          

                        </div>
                        
                         <div className="form-btn-div">
                            <button type="submit">Submit</button>
                         </div>
                      
                    </form>

                </div>












             </div>  {/* row ending */}


            <Footer />
        </div>
    )
}

export default Contact;