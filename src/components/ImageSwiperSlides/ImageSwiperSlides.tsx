import React, { useState, useRef, useEffect } from 'react';
import { TapticEngine } from '@ionic-native/taptic-engine';
import {
  IonImg, IonModal, IonToolbar,IonButtons, IonButton
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
                // style={{ backgroundColor: `${randomColor()}` }}
                onClick={() => {
                  // setOpenActionSheet(!openActionSheet);
                  // // setPhotoToDelete(photo)
                  setSelectedPhoto(imgUrl);
                  setShowModal(true);
                }}
              >
                <div className="slide-img background-img" style={{ backgroundImage: `url('${ imgUrl }')` }} />
                {/* <IonImg src={imgUrl} style={{ maxHeight: "500px" }} /> */}
                {/* <img src={img} alt={" : "+index}></img> */}
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* <IonSlides
        className="slides"
        ref={ ionSlidesRef }
        onIonSlidesDidLoad={ handleSlideLoaded }
        onIonSlideDidChange={ handleSlideChange }
        onIonSlideReachStart={ handleReachStart }
        onIonSlideReachEnd={ handleReachEnd }
      >
        {
          images.map(item => (
            <IonSlide key={ item.id }>
              <div className="slide-img background-img" style={{ backgroundImage: `url('${ item.imageUrl }')` }} />
            </IonSlide>
          ))
        }
      </IonSlides> */}
      {/* <div className="custom-pagination">
        {
          images?.map((item, index) => (
            <div key={ item.id } className={ `pagination-bullet${ activeIndex === index ? ' pagination-bullet-active' : '' }` } />
          ))
        }
      </div> */}

      {/* {
        isClickable &&
        <div className="overlay-navigation">
          <div className="navi navi-left" onClick={ () => handleMoveSlide(-1) }></div>
          <div className="navi navi-right" onClick={ () => handleMoveSlide(1) }></div>
        </div>
      } */}
      {/* <IonModal isOpen={showModal} swipeToClose cssClass="fullscreen">
      <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
          {selectedPhoto && (
            <div style={{ display: "relative", top: "20%" }}>
              <IonImg src={selectedPhoto} />
            </div>
          )}
      </IonModal>  */}
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

// ImageSwiperSlides.defaultProps = {
//   isClickable: false,
//   onNoMoreSlide: () => {},
//   onChange: () => {},
// }

export default ImageSwiperSlides;
