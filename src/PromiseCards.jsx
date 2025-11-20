import React from "react";

function PromiseCards() {
    return(
        <div>
            <h4  style={{textAlign:"center",fontWeight:"bolder"}}>Our Promise in Every Order</h4>
            <div className="row promiserow"  style={{marginTop:"30px"}}>
                <div className="col-md-4 col-xl-3 col-12 col-sm-6">
                    <div className="promise-card">
                        <h1>🧶</h1>
                        <h6>Every Piece, Thoughtfully Chosen</h6>
                        <p>We source with purpose — materials that inspire, elevate, and endure.</p>

                    </div>
                </div>

                 <div className="col-md-4 col-xl-3 col-12 col-sm-6">
                    <div className="promise-card">
                        <h1>🚀</h1>
                        <h6>Your Order, On Its Way Fast</h6>
                        <p>We prepare and ship within 48 hours — so your ideas keep flowing.</p>

                    </div>
                </div>

                 <div className="col-md-4 col-xl-3 col-12 col-sm-6">
                    <div className="promise-card">
                        <h1>👑</h1>
                        <h6>Made for Creators of Style</h6>
                        <p>For those who turn materials into magic, and ideas into wearable art.</p>

                    </div>
                </div>

                 <div className="col-md-4 col-xl-3 col-12 col-sm-6">
                    <div className="promise-card">
                        <h1>🛍️</h1>
                        <h6>A Seamless Shopping Experience</h6>
                        <p>Secure checkout, smooth flow, and reliable delivery you can count on.</p>

                    </div>
                </div>
            </div>

        </div>
    );
    
}
export default PromiseCards;