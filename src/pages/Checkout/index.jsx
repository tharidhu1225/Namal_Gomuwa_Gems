import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { product, qty, cartItems } = location.state || {};
  const isMultiple = Array.isArray(cartItems) && cartItems.length > 0;

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default: Credit/Debit Card
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subTotal = isMultiple
    ? cartItems.reduce((sum, item) => sum + item.productId.price * item.qty, 0)
    : product?.price * qty;

  const total = subTotal;

  // Fetch user
  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.success) return navigate("/login");
        setUser(data.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, token]);

  // Fetch addresses
  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      setAddressLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/address/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const fetched = Array.isArray(res.data.addresses) ? res.data.addresses : [];
        setAddresses(fetched);
        setSelectedAddress(fetched[0]?._id || null);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddresses();
  }, [user, token]);

  // Place Order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) return toast.error("Please select a delivery address.");
    if (!user?._id) return toast.error("User not loaded.");
    if (!paymentMethod) return toast.error("Please select a payment method.");

    const uniqueOrderId = `ORD-${Date.now()}`;
    setLoading(true);

    try {
      const payload = {
        userId: user._id,
        orderId: uniqueOrderId,
        delivery_address: selectedAddress,
        totalAmt: total,
        payment_method: paymentMethod,
        products: isMultiple
          ? cartItems.map(item => ({
              productId: item.productId._id,
              productType: item.productType || "gem",
              qty: item.qty,
              subTotalAmt: item.productId.price * item.qty,
              product_details: {
                name: item.productId.name,
                Image: item.productId.images?.map(img => img.url) || [],
              },
            }))
          : [
              {
                productId: product._id,
                productType: product?.type || "gem",
                qty,
                subTotalAmt: subTotal,
                product_details: {
                  name: product.name,
                  Image: product.images?.map(img => img.url) || [],
                },
              },
            ],
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/placeOrder`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.order) {
        setOrderSuccess(res.data.order);
        toast.success("Order placed successfully!");
      } else {
        toast.error(res.data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Order placement error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Order could not be placed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Order Placed View
  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
        <p>Order ID: <span className="font-mono">{orderSuccess.orderId}</span></p>
        <button onClick={() => navigate("/orders")} className="mt-6 btn-org px-4 py-2">
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Checkout</h2>

      {/* No Product Fallback */}
      {!product && !isMultiple && <p className="text-red-500">No product selected.</p>}

      {/* Products */}
      {isMultiple
        ? cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border p-3 rounded-md mb-3">
              <img
                src={item.productId.images[0]?.url || ""}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.productId.name}</p>
                <p>Qty: {item.qty}</p>
                <p>Price: LKR {(item.productId.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))
        : product && (
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
        {addressLoading ? (
          <div className="flex justify-center items-center py-4">
            <CircularProgress size={30} />
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <label
              key={addr._id}
              className="flex items-center border p-2 rounded mb-2 cursor-pointer hover:shadow-md transition"
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
                <p className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-sm text-gray-600">Mobile: {addr.mobile}</p>
              </div>
            </label>
          ))
        ) : (
          <p className="text-gray-500">No saved addresses found.</p>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="font-medium mb-2">Select Payment Method</h3>
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit / Debit Card
        </label>
        {/* You can add more payment methods here later */}
      </div>

      {/* Summary */}
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

      {/* Place Order */}
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
