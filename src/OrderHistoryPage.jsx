import React, { useEffect, useState } from "react";
import Nav from './navbar1/nav'

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("No user found in localStorage. Please log in.");
      return;
    }

    fetch(`https://demowithecomjewel-backend.onrender.com/api/orders/history/${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    
    <div className="p-6">
      <Nav />
      <h2 className="text-xl font-bold mb-4" style={{ textAlign: "center" }}>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div style={{boxShadow:" 0 2px 5px rgba(0,0,0,0.1)"}}
            key={order.orderId}
            className="border rounded p-4 mb-4 "
          >
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {order.addressLine || "N/A"},{" "}
              {order.city || "N/A"},{" "}
              {order.state || "N/A"} - {order.zipCode || "N/A"}
            </p>

            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="list-disc ml-6">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    
                    {item.productName || "Unknown"} - {item.quantity} × ₹
                    {item.price}
                  </li>
                )) || <li>No items</li>}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistoryPage;
