import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function PaymentComp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state;

  const handlePayment = async () => {
    try {
      // Step 1: Call fake payment endpoint
      const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/payment/fake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      });

      if (!res.ok) throw new Error("Payment failed");

      alert("Payment successful!");
      navigate("/orderhistorypage");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>
      <p>Order ID: {orderId}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
