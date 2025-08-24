import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { LuCodesandbox } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import QtyBox from "../QtyBox";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductDetailsComponent({ product }) {
  const [user, setUser] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user-details`,
          {
            headers: {
    Authorization: `Bearer ${token}`,
  },
            cache: "no-store",
          }
        );
        const data = await res.json();
        if (data.success) setUser(data.data);
      } catch (error) {
        console.error("Auth check error:", error);
      }
    }
    fetchUser();
  }, []);

  if (!product) return <p className="text-red-500">Product data is missing!</p>;

  const handleBuyNow = () => {
    if (!user) return setSnackOpen(true);
    navigate("/checkout", { state: { product, qty } });
  };

  const handleAddToCart = () => {
    if (!user) return setSnackOpen(true);
    // implement add to cart logic here
    console.log("Added to cart:", product.name, "Qty:", qty);
  };

  return (
    <div className="w-full">
      <h1 className="text-[20px] sm:text-[24px] font-[600] mb-2">{product.name}</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
        <span className="text-gray-400 text-[13px]">
          Category:{" "}
          <span className="font-[500] text-black opacity-75">
            {product?.category?.catName || "N/A"}
          </span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-3">
        <span className="text-primary text-[16px] sm:text-[18px] font-[600]">
          LKR.{product?.price?.toFixed(2) || "0.00"}
        </span>
        <span className="text-[13px] sm:text-[14px]">
          In Stock:{" "}
          <span className="text-green-600 font-bold">{product?.stock || 0} Items</span>
        </span>
      </div>

      <p className="mt-3 mb-4 text-[14px] sm:text-[15px]">{product?.description}</p>

      <p className="text-[13px] sm:text-[14px] mb-2 text-[#000]">
        Shipping (Est. Delivery Time 1–3 Days)
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        <div className="w-full sm:w-[100px]">
          <QtyBox onChange={(val) => setQty(val)} />
        </div>

        <Button
          onClick={handleAddToCart}
          className="btn-org !capitalize flex gap-2 w-full sm:w-auto justify-center"
        >
          <FaCartPlus className="text-[20px]" />
          Add To Cart
        </Button>

        <Button
          onClick={handleBuyNow}
          className="btn-buy !capitalize flex gap-2 w-full sm:w-auto justify-center"
        >
          <LuCodesandbox className="text-[20px]" />
          Buy Now
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
        <span className="flex items-center gap-2 text-[14px] cursor-pointer font-[500] link transition">
          <IoIosHeartEmpty className="text-[18px]" />
          Add to Wishlist
        </span>

        <span className="flex items-center gap-2 text-[14px] cursor-pointer font-[500] link transition">
          <IoGitCompareOutline className="text-[18px]" />
          Add to Compare
        </span>
      </div>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setSnackOpen(false)}>
          Please login to continue.
        </Alert>
      </Snackbar>
    </div>
  );
}
