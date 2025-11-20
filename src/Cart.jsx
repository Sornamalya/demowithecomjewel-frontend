import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Nav from "./navbar1/nav";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const userId = user?.id;

  useEffect(() => {
    if (user) {
      fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${userId}/cart`)
        .then(res => res.json())
        .then(data => {
          setCartItems(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId,
        quantity: newQty
      }),
    });
    if (res.ok) {
      const updatedCart = await res.json();
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = async (productId) => {
    const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/cart/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId
      }),
    });
    if (res.ok) {
      const updatedCart = await res.json();
      setCartItems(updatedCart);
    }
  };

  const shippingFee = 60;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = cartTotal + shippingFee;

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <Nav />

      {!user ? (
        <h1 style={{ textAlign: "center" 
        }}>
          Please login to view your cart.{" "} <h6 style={{fontSize:"20px",marginTop:"30px"}}> <Link to="/loginpage" style={{ color: "#dd2c88" }}>
            Login
          </Link></h6>
        </h1>
        
         
      ) : cartItems.length === 0 ? (
        <h1 style={{ textAlign: "center",marginTop:"50px" }}>
          No items in your cart.  <h6 style={{fontSize:"20px",marginTop:"30px"}}><Link to="/productspage" style={{ color: "#dd2c88", }}>
            View Products {'>>'}  </Link></h6></h1>      
          
       
      ) : (
        <>
          <h1 style={{ textAlign: "center",margin:"20px 0px 30px 0px" }}>My Cart</h1> <hr />

          {cartItems.map(item => (
            <div key={item.productId} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              <div className="row">
                <div className="col-6 col-md-3" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={`https://demowithecomjewel-backend.onrender.com${item.imageUrl}`} alt={item.productName} width="100" />
                </div>

                <div className="col-6 col-md-3">
                  <h4>{item.productName}</h4>
                  <p> ₹{item.price}</p>
                  <p className="mob-qty">
                    <span style={{ fontWeight: "bold" }}>Qty:</span>
                    <button
                      style={{ fontWeight: "bold", border: "none", padding: "5px", borderRadius: "5px", background: "transparent" }}
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >-</button>
                    {item.quantity}
                    <button
                      style={{ fontWeight: "bold", border: "none", padding: "5px", borderRadius: "5px", background: "transparent" }}
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >+</button>
                    <span>
                      <button
                        style={{ border: "none", padding: "3px", borderRadius: "5px", color: "red", marginLeft: "1px", background: "transparent" }}
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  </p>
                </div>

                <div className="col-6 col-md-3 bigscrn-qty">
                  <p>
                    <span style={{ fontWeight: "bold" }}>Qty:</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ border: "none", padding: "5px 10px", background: "transparent" }}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ border: "none", padding: "5px 10px", background: "transparent" }}>+</button>
                    <span>
                      <button
                        style={{ border: "none", padding: "5px 10px", borderRadius: "5px", color: "red", marginLeft: "10px", background: "transparent" }}
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </span>
                  </p>
                </div>

                <div className="col-6 col-md-3 cart-total">
                  <h6>Total: ₹{item.price * item.quantity}</h6>
                </div>
              </div>
            </div>
          ))}

          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col-6 col-md-6 cart-amt-name">
              <h3>Total : </h3>
              <h3>Shipping: </h3>
              <h2>Order Total: </h2>
            </div>
            <div className="col-6 col-md-6 cart-amt">
              <h4 > ₹{cartTotal}</h4>
              <h4> ₹{shippingFee}</h4>
              <h2> ₹{grandTotal}</h2>
            </div>
            <div className="col-12 col-md-12 cart-btn">
              <button onClick={() => (window.location.href = "/addresscomp")}>Continue</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
