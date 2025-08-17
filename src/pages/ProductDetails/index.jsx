import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import ProductSlider from "../../components/ProductSlider";
import ProductDetailsComponent from "../../components/ProductDetails";
import ProductZoom from "../../components/ProductZoom";
import axios from "axios";
import GemLoader from "../../components/LoadingEffect";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const gemRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gem/${id}`, {
          headers: { "cache-control": "no-cache" },
        });

        if (gemRes.data?.success) {
          setProduct(gemRes.data.gem);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Gem not found, trying jewellery...");
      }

      try {
        const jewelleryRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jewellery/${id}`, {
          headers: { "cache-control": "no-cache" },
        });

        if (jewelleryRes.data?.success) {
          setProduct(jewelleryRes.data.juwellery);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Product not found in both gem and jewellery:", err);
      }

      setNotFound(true);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <GemLoader />;
  if (notFound) return <p className="text-center py-10 text-red-500 text-base">Product not found!</p>;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="py-4 px-4 sm:px-6 md:px-0">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className="link transition text-sm text-blue-600 hover:underline">
              Home
            </Link>
            <span className="text-gray-500 text-sm truncate">{product?.name || "Product"}</span>
          </Breadcrumbs>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="bg-white py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Image Section */}
          <div className="w-full md:w-2/5">
            <ProductZoom images={product.images} />
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-3/5">
            <ProductDetailsComponent product={product} />
          </div>
        </div>

        {/* Tab Section */}
        <div className="max-w-7xl mx-auto pt-10">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-5 border-b pb-2">
            <span
              className={`text-sm sm:text-base font-medium cursor-pointer transition ${
                activeTab === 0 ? "text-primary border-b-2 border-primary pb-1" : "text-gray-700"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Description
            </span>
            {/* Add more tabs here if needed */}
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-4 sm:px-6 rounded-md bg-gray-50">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
