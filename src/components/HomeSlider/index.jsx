import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation , Autoplay} from 'swiper/modules';

const HomeSlider = () => {
    return (
        <div className="homeSlider py-3">
            <div className="container">
                {/*Resulation want 1920 x 549*/}
        <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation,Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                className="sliderHome">
        <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
           <div className="item rounded-[20px] overflow-hidden"> 
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
            </SwiperSlide>
        <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
            <img src="https://www.aumcrystal.com/assets/slid1-Dkbt9wwy.jpg"/>
            </div>
        </SwiperSlide>
      </Swiper>
            </div>
        </div>
    )
}

export default HomeSlider;