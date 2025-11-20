import React from 'react';
import BraceletBanner from './images/braceletbanner.jpg'
import CharmBanner from './images/charmbanner.jpg'
import NecklaceBanner from "./images/necklacebanner.jpg"
import EarringsBanner from './images/earringsbanner.jpg'
import ClipsBanner from './images/clipsbanner.jpg'
import AnkletBanner from './images/ankletbanner.jpg'
import Carousel from 'react-bootstrap/Carousel';



function CarouselComponent() {
  return (

   
    <Carousel className='carousel'>
       
      <Carousel.Item interval={6000}>
        <img className="d-block w-100 " src={BraceletBanner} alt="First slide" />
         <Carousel.Caption className='caption' style={{color:'black'}}>
          <h3>Bracelets</h3>
          <p>“Wrap your wrist with a bracelet and embrace the magic it holds.”</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        <img className="d-block w-100" src={EarringsBanner} alt="Second slide" />
          <Carousel.Caption className='caption' style={{color:'white'}}>
          <h3>Earrings</h3>
          <p>“Never underestimate the power of a great pair of earrings.”</p>
        </Carousel.Caption>
      </Carousel.Item>
       <Carousel.Item interval={6000}>
        <img className="d-block w-100" src={NecklaceBanner} alt="Second slide" />
          <Carousel.Caption className='caption' style={{color:'white'}}>
          <h3>Necklace</h3>
          <p>“Satisfy your necklace love with my stylish handmade one's”</p>
        </Carousel.Caption>
      </Carousel.Item>
       <Carousel.Item interval={6000}>
        <img className="d-block w-100" src={CharmBanner} alt="Second slide" />
          <Carousel.Caption className='caption' style={{color:'white'}}>
          <h3>Charm</h3>
          <p>“Charm Every Key Moment.”</p>
        </Carousel.Caption>
      </Carousel.Item>
       <Carousel.Item interval={6000}>
        <img className="d-block w-100" src={ClipsBanner} alt="Second slide" />
          <Carousel.Caption className='caption' style={{color:'black'}}>
          <h3>Hair Accessories</h3>
          <p>“Effortlessly chic with a touch of the clip.”</p>
        </Carousel.Caption>
      </Carousel.Item>
       <Carousel.Item interval={6000}>
        <img className="d-block w-100" src={AnkletBanner} alt="Second slide" />
          <Carousel.Caption className='caption' style={{color:'white'}}>
          <h3>Anklet</h3>
          <p>“Every step tells a story.”</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
   
  );
}
export default CarouselComponent;