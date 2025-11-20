import React, { useEffect, useState } from "react";

export default function UserDashboard({ user }) {
  const [data, setData] = useState(null);
  const [address, setAddress] = useState({ street: "", city: "" });
  const [payment, setPayment] = useState({ method: "", details: "" });

  const fetchUserData = () => {
    fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${user.id}/response`)
      .then((res) => res.json())
      .then(setData);
  };

  useEffect(fetchUserData, []);

  const addAddress = async () => {
    await fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${user.id}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    fetchUserData();
  };

  const addPayment = async () => {
    await fetch(`https://demowithecomjewel-backend.onrender.com/api/users/${user.id}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
    fetchUserData();
  };

  return (
    <div>
      <h3>User Dashboard</h3>
      {data && (
        <>
          <h4>Cart:</h4>
          <ul>
            {data.cart.map((c) => (
              <li key={c.id}>{c.name} - ₹{c.price}</li>
            ))}
          </ul>

          <h4>Wishlist:</h4>
          <ul>
            {data.wishlist.map((w) => (
              <li key={w.id}>{w.name}</li>
            ))}
          </ul>

          <h4>Addresses:</h4>
          <ul>
            {data.addresses.map((a, i) => (
              <li key={i}>{a.street}, {a.city}</li>
            ))}
          </ul>
          <input placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          <input placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <button onClick={addAddress}>Add Address</button>

          <h4>Payments:</h4>
          <ul>
            {data.payments.map((p, i) => (
              <li key={i}>{p.method} - {p.details}</li>
            ))}
          </ul>
          <input placeholder="Method" onChange={(e) => setPayment({ ...payment, method: e.target.value })} />
          <input placeholder="Details" onChange={(e) => setPayment({ ...payment, details: e.target.value })} />
          <button onClick={addPayment}>Add Payment</button>
        </>
      )}
    </div>
  );
}
