import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeCatSlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gemCat`);
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const preciousGems = categories.filter(cat => cat.catName === "Precious");
  const semiPreciousGems = categories.filter(cat => cat.catName === "Semi-Precious");

  // For "Jewellery" categories, call your jewellery API endpoint:
  const [jewelleryGems, setJewelleryGems] = useState([]);
  useEffect(() => {
    const fetchJewelleryCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jewelleryCat`);
        setJewelleryGems(res.data.categories);
      } catch (err) {
        console.error("Failed to fetch jewellery categories:", err);
      }
    };
    fetchJewelleryCategories();
  }, []);

  const renderCategorySlider = (title, categoryList) => (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <Swiper
        navigation={true}
        spaceBetween={15}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 7 },
        }}
        className="mySwiper"
      >
        {categoryList.length > 0 ? (
          categoryList.map(category => (
            <SwiperSlide key={category._id}>
            <Link to="/">
            <div className="item py-7 px-3 bg-white text-center flex items-center justify-center flex-col rounded-full">
                <img 
                src={category.images[0]?.url || "/default.png"}
                alt={category.catName} className="w-[60px] transition-all"/>
                <h3 className="text-[15px] font-[500] mt-3">{category.catName}</h3>
            </div>
            </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="text-center text-gray-500 py-8 text-sm">No categories available</div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );

  return (
    <div className="homeCatSlider bg-gradient-to-b from-white to-gray-50 py-6">
      {renderCategorySlider("Shop by Precious Gems", preciousGems)}
      {renderCategorySlider("Shop by Semi-Precious Gems", semiPreciousGems)}
      {renderCategorySlider("Shop by Jewellery", jewelleryGems)}
    </div>
  );
};

export default HomeCatSlider;
