import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import Nav from "./navbar1/nav";
import Footer from "./Footer";

export default function AddressPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ show: false, total: 0 });
  const [formAddress, setFormAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: ""
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();
  const userId = user?.id;

  // Fetch cart, addresses, profile
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Cart
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

    // Addresses
    fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${userId}/addresses`)
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(err => console.error(err));

    // Profile
    fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserName(data.name))
      .catch(err => console.error(err));
  }, [user, userId]);

  // Update quantity
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId, quantity: newQty })
    });
    if (res.ok) {
      const updatedCart = await res.json();
      setCartItems(updatedCart);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/cart/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId })
    });
    if (res.ok) {
      const updatedCart = await res.json();
      setCartItems(updatedCart);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setFormAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add address
  const handleAddAddress = async () => {
  try {
    const isDuplicate = addresses.some(
      a =>
        a.addressLine === formAddress.addressLine &&
        a.city === formAddress.city &&
        a.state === formAddress.state &&
        a.zipCode === formAddress.zipCode &&
        a.contactNumber === formAddress.contactNumber
    );
    if (isDuplicate) return alert("This address already exists!");

    // Include userId here
    const payload = {
      ...formAddress,
      userId: userId
    };

    const res = await fetch(`https://demowithecomjewel-backend.onrender.com/api/users/address/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to add address");

    const saved = await res.json();
    setAddresses(prev => [...prev, saved]);
    setFormAddress({ addressLine: "", city: "", state: "", zipCode: "", contactNumber: "" });
    setShowAddressModal(false);
  } catch (err) {
    console.error(err);
    alert("Error saving address");
  }
};


  // Delete address
  const deleteAddress = async (id) => {
    try {
      const res = await fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${userId}/addresses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddresses(prev => prev.filter(a => a.id !== id));
        if (selectedAddressId === id) setSelectedAddressId(null);
      } else {
        alert("Failed to delete address");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity+60, 0);

  // Payment modal handler
  const handlePayment = async () => {
    if (!user) return alert("Please login first");
    if (!cartItems || cartItems.length === 0) return alert("Cart is empty");
    if (!selectedAddressId) return alert("Please select an address");

    try {
      // Step 1: Place the order
      const orderRes = await fetch(`https://demowithecomjewel-backend.onrender.com/api/orders/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, addressId: selectedAddressId })
      });

      if (!orderRes.ok) throw new Error("Failed to place order");
      const order = await orderRes.json();

      // Step 2: Fake payment
      const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/payment/fake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId || order.id })
      });
      if (!res.ok) throw new Error("Payment failed");

      alert("Payment successful!");
      setPaymentModal({ show: false, total: 0 });
      setCartItems([]);

      // Step 3: Navigate to order history
      navigate("/orderhistorypage");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Nav />
      <h2 style={{ color: "#dd2c88", marginBottom: "20px" }}>Saved Addresses</h2>

      <div className="addr-card-div">
        {addresses.length === 0 && <p>No address added yet.</p>}
        {addresses.map(addr => (
          <div
            key={addr.id}
            className="addr-card"
            style={{
        border: selectedAddressId === addr.id ? "2px solid #dd2c88" : "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        cursor: "pointer"
            }}
            onClick={() => setSelectedAddressId(addr.id)}
          >
            <input
        type="radio"
        name="selectedAddress"
        checked={selectedAddressId === addr.id}
        onChange={() => setSelectedAddressId(addr.id)}
            />
            <span style={{ marginLeft: "10px" }}>
        {addr.addressLine}, {addr.city}, {addr.state} - {addr.zipCode}
            </span>
            <p style={{ fontWeight: "bold" }}>Contact: {addr.contactNumber}</p>
            <button
        onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
        style={{ color: "red", border: "none", background: "transparent", fontSize: "16px" }}
            >
        <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAddressModal(true)}
        style={{ marginBottom: "20px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}
      >
        <FontAwesomeIcon icon={faAdd} /> Add Address
      </button>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="addr-modal" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: "999"
        }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
            <h2 style={{ textAlign: "center", color: "#dd2c88" }}>Add New Address</h2>
            <input type="text" name="addressLine" placeholder="Address Line..." value={formAddress.addressLine} onChange={handleChange} /><br/>
            <input type="text" name="city" placeholder="City..." value={formAddress.city} onChange={handleChange} /><br/>
            <input type="text" name="state" placeholder="State..." value={formAddress.state} onChange={handleChange} /><br/>
            <input type="text" name="zipCode" placeholder="Zip Code..." value={formAddress.zipCode} onChange={handleChange} /><br/>
            <input type="tel" name="contactNumber" placeholder="Contact Number..." value={formAddress.contactNumber} onChange={handleChange} /><br/>
            <button onClick={handleAddAddress} style={{ margin: "20px 0px 20px 10px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}>Add</button>
            <button onClick={() => setShowAddressModal(false)} style={{ margin: "20px 0px 20px 10px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}>Cancel</button>
          </div>
        </div>
      )}

      <hr />

      <h2 style={{ color: "#dd2c88", marginBottom: "20px" }}>Cart Summary</h2>
      {cartItems.map(item => (
        <div key={item.productId} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <div className="row">
            <div className="col-6 col-md-3" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={`https://demowithecomjewel-backend.onrender.com${item.imageUrl}`} alt={item.productName} width="100" />
            </div>
            <div className="col-6 col-md-3">
        <h4>{item.productName}</h4>
        <p>₹{item.price}</p>
        <p className="mob-qty">
          <span style={{ fontWeight: "bold" }}>Qty:</span>
          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ border: "none", padding: "5px", background: "transparent" }}>-</button>
          {item.quantity}
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ border: "none", padding: "5px", background: "transparent" }}>+</button>
          <button onClick={() => removeFromCart(item.productId)} style={{ border: "none", padding: "3px", color: "red", marginLeft: "10px", background: "transparent" }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
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
        <h6>Total: ₹{item.price * item.quantity +60}</h6>
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setPaymentModal({ show: true, total: totalAmount })} style={{ margin: "20px 0px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}>
          Proceed to Payment
        </button>
      </div>

      <Footer />

      {/* Payment Modal */}
      {paymentModal.show && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: "999"
        }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
            <h2 style={{ textAlign: "center", color: "#dd2c88" }}>Payment</h2>
            <p>Total Amount: ₹{totalAmount}</p>
            <button onClick={handlePayment} style={{ margin: "20px 0px 20px 10px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}>Pay Now</button>
            <button onClick={() => setPaymentModal({ show: false, total: 0 })} style={{ margin: "20px 0px 20px 10px", background: "transparent", border: ".2px solid", borderRadius: "4px", color: "#dd2c88" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
