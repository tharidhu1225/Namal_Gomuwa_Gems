import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/order/user/${userId}`);
    console.log("Orders fetched:", response.data);
    setOrders(response.data);
  } catch (err) {
    console.error("Error fetching orders:", err);
    setError(err.response?.data?.message || "Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div>Error: {error}</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.status}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
          <h4>Products:</h4>
          <ul>
            {order.products.map(({ productId, quantity }) => (
              <li key={productId._id}>
                {productId?.name || "Product"} - Quantity: {quantity} - Price: ${productId?.price || "N/A"}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Price:</strong> ${order.total_price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
