import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CAT } from '../../Api/Api';
import { Axios } from '../../Api/axios';




export default function Slides() {

  // Get All Gategory
  const [categories,setGategories]=useState([]) ;

  useEffect(()=>{
    Axios.get(`${CAT}`).then((res)=>{setGategories(res.data.slice(-10))})
  },[])

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
    
        {categories.map(card => (<SwiperSlide>
          <div className="slide-container">
            <div className="slide-content">
                <div className="card-wrapper">
                    <div className="card ">
                        <div className="image-content">
                            <span className="ovrelay"></span>
                            <div className="card-image">
                                <img src={card.image} alt="" className="card-img"/>
                            </div>
                        </div>
                        <div className="card-content">
                    <h2 className="name">{card.title}</h2>
                    
                        <button className="button">View Jobs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </SwiperSlide>
          
        )
        )}          
      </Swiper>
    </>
  );
}
