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
import { guid } from "../../utils/utils";
type Props = {
  images: PhotoModel[]
}

const MainListingImgSwiper: React.FC<Props> = ({ images }) => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    scrollbar: true
  };
  
  if (images.length === 0) return null;

  return (
    // <div className="profile-image-slides">
      <IonSlides pager={true} options={slideOpts} key={guid()}>
        {images &&
          images.map((img, index) => {
            return (
              <IonSlide key={guid()+"-"+index}>
                <div style={{height:"230px"}}>
                  <img src={ imgBaseUrl+img.filename } alt="" height="230px"></img>
                </div>
              </IonSlide>
            );
          })}
      </IonSlides>
    // </div>
  );
};

export default MainListingImgSwiper;
