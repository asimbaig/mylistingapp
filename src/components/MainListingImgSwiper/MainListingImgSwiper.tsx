import React, { useState, useRef, useEffect } from 'react';
import {
  IonModal
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './MainListingImgSwiper.scss';
import "swiper/swiper.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCube, Scrollbar } from "swiper";
import { PhotoModel } from "../../redux/photoType";
import { imgBaseUrl } from "../../redux/api-ref";

type Props = {
  images: PhotoModel[]
}

const MainListingImgSwiper: React.FC<Props> = ({ images }) => {
  SwiperCore.use([EffectCube, Scrollbar]);
  const [loadSwiper, setLoadSwiper] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadSwiper(!loadSwiper);
    }, 300);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (images.length === 0) return null;

  return (
    <div className="profile-image-slides">
      <Swiper 
        effect="cube" 
        loop={true} 
        grabCursor={true} 
        preloadImages={true} 
        scrollbar
        >
        {loadSwiper && images &&
          images.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={ imgBaseUrl+img.filename } alt="" height="250px"></img>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MainListingImgSwiper;
