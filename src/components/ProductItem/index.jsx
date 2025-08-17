import React from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { TbZoomScan } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";

const ProductItem = ({ product }) => {
  if (!product) return null;

  const discountPercent = 10;

  

  return (
    <div className="productItem bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col max-w-xs mx-auto sm:max-w-full">
      {/* Image Section */}
      <div className="relative group cursor-pointer overflow-hidden rounded-t-lg">
        <Link to={`/productDetails/${product._id}`}>
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.images?.[1]?.url && (
            <img
              src={product.images[1].url}
              alt={`${product.name} alternate`}
              className="w-full h-40 sm:h-48 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold rounded-full px-2.5 py-0.5 z-10 shadow-lg">
            -{discountPercent}%
          </span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Tooltip title="Zoom" placement="left">
            <Button
              aria-label="Zoom product image"
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-red-500 !text-gray-200 hover:!bg-primary hover:text-white"
              size="small"
            >
              <TbZoomScan className="text-base" />
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left">
            <Button
              aria-label="Compare product"
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-red-500 !text-gray-200 hover:!bg-primary hover:text-white"
              size="small"
            >
              <IoGitCompareOutline className="text-base" />
            </Button>
          </Tooltip>

        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link
          to={`/productDetails/${product._id}`}
          className="text-gray-600 text-xs sm:text-sm font-medium hover:text-primary transition-colors"
          aria-label={`View details of ${product.name}`}
        >
          {product.category?.catName || "Category"}
        </Link>

        <Link
          to={`/productDetails/${product._id}`}
          className="text-sm sm:text-lg font-semibold text-gray-900 mt-1 hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        {/* You can add rating if available */}
        {product.rating && (
          <div className="mt-2 flex items-center gap-2">
            <Rating
              name="read-only-rating"
              value={product.rating}
              size="small"
              precision={0.5}
              readOnly
              sx={{ color: "#f59e0b" }}
            />
            <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
          </div>
        )}

        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
          <span className="text-red-500 font-bold text-base sm:text-lg">
            LKR {product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
