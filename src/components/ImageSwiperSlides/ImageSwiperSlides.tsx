import React, { useState, useEffect } from "react";
import { IonModal } from "@ionic/react";
import {} from "ionicons/icons";
import "./ImageSwiperSlides.scss";
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
import { PhotoModel } from "../../redux/photoType";
import { imgBaseUrl } from "../../redux/api-ref";
import { guid } from "../../utils/utils";

type Props = {
  images: PhotoModel[];
};

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
        key={guid()}
        effect="flip"
        loop={true}
        grabCursor={true}
        preloadImages={true}
        scrollbar
        className="slides"
      >
        {loadSwiper &&
          images &&
          images.map((img, index) => {
            return (
              <SwiperSlide
                key={guid() + index}
                onClick={() => {
                  setSelectedPhoto(imgBaseUrl + img.filename);
                  setShowModal(true);
                }}
              >
                <img src={imgBaseUrl + img.filename} alt=""></img>
                {/* <div className="slide-img background-img" style={{ backgroundImage: `url('${ imgBaseUrl+img.filename }')` }} /> */}
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
        <FullScreenModal
          image={selectedPhoto}
          onClose={() => setShowModal(false)}
        />
      </IonModal>
    </div>
  );
};

export default ImageSwiperSlides;
