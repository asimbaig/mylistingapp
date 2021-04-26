import React, { useState, useRef, useEffect } from 'react';
import {
  IonModal
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './ImageSwiperSlides.scss';
import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import FullScreenModal from "../FullScreenModal/FullScreenModal";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFlip, Scrollbar } from "swiper";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";

type Props = {
  images: any[]
}

const ImageSwiperSlides: React.FC<Props> = ({ images }) => {
  SwiperCore.use([EffectFlip, Scrollbar]);
  const [loadSwiper, setLoadSwiper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadSwiper(!loadSwiper);
    }, 500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (images.length === 0) return null;

  return (
    <div className="profile-image-slides">
      <Swiper 
        effect="flip" 
        loop={true} 
        grabCursor={true} 
        preloadImages={true} 
        scrollbar
        className="slides"
        >
        {loadSwiper && images &&
          images.map((imgUrl, index) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setSelectedPhoto(imgUrl);
                  setShowModal(true);
                }}
              >
                <div className="slide-img background-img" style={{ backgroundImage: `url('${ imgUrl }')` }} />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <IonModal
          swipeToClose
          isOpen={showModal}
          enterAnimation={modalEnterZoomOut}
          leaveAnimation={modalLeaveZoomIn}
          cssClass="fullscreen"
        >
          <FullScreenModal image={selectedPhoto} onClose={()=>setShowModal(false)} />
        </IonModal>
    </div>
  );
};

export default ImageSwiperSlides;
