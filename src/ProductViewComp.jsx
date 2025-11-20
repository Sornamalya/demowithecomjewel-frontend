import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";


export default function ProductViewComp({
  product,
  onClose,
  toggleCart,
  toggleWishlist,
  isInCart,
  isInWishlist,
}) {
  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div className="full-modal"
      
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        <div className="view-modal-img">
           <img
          src={`https://demowithecomjewel-backend.onrender.com${product.imageUrl}`}
          alt={product.name}
          width={200}
        />
        </div>
        <div className="view-modal">
        <h2>{product.name}</h2>
        <h6>Rs.{product.price}</h6>

         <button onClick={() => toggleWishlist(product.id)}>
          {isInWishlist ? <FontAwesomeIcon icon={faHeartSolid} />:<FontAwesomeIcon icon={faHeartRegular} /> }
        </button>

        <button 
         onClick={() => toggleCart(product.id)}
          >
          {isInCart ?" Remove " : "Add to Cart"}
        </button>
       

        <br />
        {/* <button
          onClick={onClose}
          style={{ marginTop: "10px", background: "red", color: "white",position:"absolute",top:"160px",right:"140px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button> */}
        </div>
       
      </div>
    </div>
  );
}
