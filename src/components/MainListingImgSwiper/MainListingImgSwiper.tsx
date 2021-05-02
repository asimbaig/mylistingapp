import React, { useState, useRef, useEffect } from 'react';
import {
  IonModal, IonSlides, IonSlide
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './MainListingImgSwiper.scss';
import "swiper/swiper.scss";
import "swiper/components/effect-cube/effect-cube.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { PhotoModel } from "../../redux/photoType";
import { imgBaseUrl } from "../../redux/api-ref";

type Props = {
  images: PhotoModel[]
}

const MainListingImgSwiper: React.FC<Props> = ({ images }) => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
    scrollbar: true
  };
  
  if (images.length === 0) return null;

  return (
    <div className="profile-image-slides">
      <IonSlides pager={true} options={slideOpts}>
        {images &&
          images.map((img, index) => {
            return (
              // <IonSlide key={index}>
              //   <div
              //     style={{ 
              //       height:"230px",
              //       backgroundImage: `url('${imgBaseUrl + img.filename}')`,
              //       backgroundPosition: "center",
              //       backgroundRepeat: "no-repeat",
              //       backgroundSize: "cover"
              //     }}
              //   />
              // </IonSlide>
              <IonSlide key={index}>
                <div style={{height:"230px"}}>
                  <img src={ imgBaseUrl+img.filename } alt="" height="230px"></img>
                </div>
              </IonSlide>
            );
          })}
      </IonSlides>
    </div>
  );
};

export default MainListingImgSwiper;
