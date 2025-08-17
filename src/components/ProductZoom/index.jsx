import React, { useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

const ProductZoom = ({ images = [] }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current?.swiper?.slideTo(index);
    zoomSliderBig.current?.swiper?.slideTo(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {/* Thumbnails */}
      <div className={`slider ${isMobile ? 'w-full' : 'w-[15%]'} overflow-hidden`}>
        <Swiper
          ref={zoomSliderSml}
          direction={isMobile ? 'horizontal' : 'vertical'}
          slidesPerView={isMobile ? 4 : 4}
          navigation={!isMobile}
          spaceBetween={10}
          modules={[Navigation]}
          className={`zoomProductSliderThumbs ${isMobile ? 'h-auto' : 'h-[500px]'}`}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  slideIndex === index
                    ? 'border-primary shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
                onClick={() => goto(index)}
              >
                <img
                  src={img.url}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  alt={`Product thumbnail ${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Zoom Image */}
      <div className={`${isMobile ? 'w-full' : 'w-[85%]'} overflow-hidden rounded-xl shadow-md bg-white`}>
        <Swiper
          ref={zoomSliderBig}
          slidesPerView={1}
          navigation={false}
          spaceBetween={0}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className={`${isMobile ? 'h-[300px]' : 'h-[500px]'} w-full`}>
                <InnerImageZoom
                  zoomType={isMobile ? 'click' : 'hover'}
                  zoomPreload={true}
                  zoomSrc={img.url}
                  src={img.url}
                  className="w-full h-full object-contain"
                  hideHint={false}
                  zoomLensStyle={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
