import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem";
import GemLoader from "../LoadingEffect";

const ProductSlider = ({ items = 4, products = [], loading = false }) => {
  if (loading) {
    return (
      <GemLoader />
    );
  }

  return (
    <div className="productsSlider py-5">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={items}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 15},
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: items, spaceBetween: 25 },
        }}
        className="mySwiper"
      >
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide key={product._id || product.id}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="text-center py-10 text-gray-500">
              No products found.
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
