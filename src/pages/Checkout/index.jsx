import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, qty } = location.state || {};
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    county: "",
    mobile: "",
  });

  const subTotal = product?.price * qty;
  const total = subTotal;

  // Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        const data = await res.json();
        if (!data.success) return navigate("/login");
        setUser(data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch addresses for user
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/address/user`,
          {
            withCredentials: true,
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );
        const data = res.data;

        // 🚨 Your backend MUST return an array of addresses like: { addresses: [...] }
        const fetched = Array.isArray(data.addresses) ? data.addresses : [];
        setAddresses(fetched);
        setSelectedAddress(fetched[0]?._id || null);
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
        setAddresses([]);
      }
    };
    if (user) fetchAddresses();
  }, [user]);

  const handleAddAddress = async () => {
    if (
      !newAddress.address_line ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode ||
      !newAddress.mobile
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!/^\d{10,15}$/.test(newAddress.mobile)) {
      toast.error("Invalid mobile number (10-15 digits).");
      return;
    }

    setAddressLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/add`,
        newAddress,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const added = res.data;
      if (res.status === 201 && added) {
        toast.success("Address added!");
        setShowAddForm(false);
        setNewAddress({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          county: "",
          mobile: "",
        });
        setAddresses((prev) => [added, ...prev]);
        setSelectedAddress(added._id);
      } else {
        toast.error("Failed to add address.");
      }
    } catch (err) {
      console.error("Add address error:", err);
      toast.error("Error adding address.");
    } finally {
      setAddressLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    setLoading(true);
    const payload = {
      productId: product._id,
      product_details: {
        name: product.name,
        Image: product.images.map((img) => img.url),
      },
      qty,
      delivery_address: selectedAddress,
      subTotalAmt: subTotal,
      totalAmt: total,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.success) {
        setOrderSuccess(data.order);
      } else {
        toast.error(data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Order could not be placed.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
        <p>
          Order ID: <span className="font-mono">{orderSuccess.orderId}</span>
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-6 btn-org px-4 py-2"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Checkout</h2>
      {!product && <p className="text-red-500">No product selected.</p>}

      {/* Product Summary */}
      {product && (
        <div className="flex items-center gap-4 border p-3 rounded-md">
          <img
            src={product.images[0]?.url || ""}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p>Qty: {qty}</p>
            <p>Price: LKR {subTotal?.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Address Selection */}
      <div>
        <h3 className="font-medium mb-2">Select Delivery Address</h3>

        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <label
              key={addr._id}
              className="flex items-center border p-2 rounded mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="address"
                value={addr._id}
                checked={selectedAddress === addr._id}
                onChange={() => setSelectedAddress(addr._id)}
                className="mr-2"
              />
              <div>
                <p className="font-medium">{addr.address_line}</p>
                <p className="text-sm">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-sm text-gray-600">Mobile: {addr.mobile}</p>
              </div>
            </label>
          ))
        ) : (
          <p>No saved addresses found.</p>
        )}

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm text-blue-600 underline mt-2"
        >
          {showAddForm ? "Cancel" : "+ Add New Address"}
        </button>

        {showAddForm && (
          <div className="border p-3 mt-4 rounded space-y-2">
            <input
              type="text"
              placeholder="Address Line *"
              className="border w-full p-2 rounded"
              value={newAddress.address_line}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address_line: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City *"
              className="border w-full p-2 rounded"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="State *"
              className="border w-full p-2 rounded"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode *"
              className="border w-full p-2 rounded"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="County"
              className="border w-full p-2 rounded"
              value={newAddress.county}
              onChange={(e) =>
                setNewAddress({ ...newAddress, county: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mobile *"
              className="border w-full p-2 rounded"
              value={newAddress.mobile}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobile: e.target.value })
              }
            />
            <button
              onClick={handleAddAddress}
              className="btn-org w-full py-2 mt-2"
              disabled={addressLoading}
            >
              {addressLoading ? "Saving..." : "Save Address"}
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="border p-3 rounded">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Subtotal:</span>
          <span>LKR {subTotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>LKR {total?.toFixed(2)}</span>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handlePlaceOrder}
        className="btn-org w-full py-3 text-white text-lg rounded"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
