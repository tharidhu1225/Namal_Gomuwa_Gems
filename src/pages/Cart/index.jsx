import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Checkbox, Button } from "@mui/material";
import GemLoader from "../../components/LoadingEffect";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        if (!userData.success) throw new Error("User not authenticated");

        const userId = userData.data._id;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        const cartWithQty = data.map(item => ({ ...item, quantity: 1 }));
        setCartItems(cartWithQty);
        setLoading(false);
      } catch (error) {
        console.error("Fetch cart error:", error);
        navigate("/login");
      }
    };

    fetchCart();
  }, [navigate, token]);

  const handleRemove = async (cartItemId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Item removed from cart");
        setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
        setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQtyChange = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, qty: Math.max(1, qty) } : item))
    );
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item._id));
  const total = selectedCartItems.reduce(
    (sum, item) => sum + (item.productId.price || 0) * item.qty,
    0
  );

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast.error("Select at least one item to checkout");
      return;
    }
    navigate("/checkout", { state: { cartItems: selectedCartItems } });
  };

  if (loading) return <GemLoader />;

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Cart Items */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <FiShoppingCart size={60} className="mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400">Start shopping to fill your cart.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Shop Now
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center border rounded-lg p-4 mb-4 shadow-sm"
            >
              <Checkbox
                checked={selectedItems.includes(item._id)}
                onChange={() => toggleSelect(item._id)}
              />
              <img
                src={item.productId.images?.[0]?.url}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.productId.name}</h2>
                <p className="text-gray-600 text-sm">
                  Type: {item.productType.toUpperCase()}
                </p>
                <p className="text-gray-800 font-medium">
                  Price: LKR {item.productId.price?.toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleQtyChange(item._id, Number(e.target.value))
                    }
                    className="w-16 border rounded text-center py-1"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center ml-4">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove"
                >
                  <FiTrash2 size={22} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="w-full max-w-md border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Selected Items</span>
            <span>{selectedCartItems.length}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-bold">LKR {total.toFixed(2)}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            fullWidth
            disabled={selectedCartItems.length === 0}
            className="mt-4"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
