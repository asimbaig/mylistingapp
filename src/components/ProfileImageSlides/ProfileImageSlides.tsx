import React, { useState, useRef } from "react";
import { TapticEngine } from "@ionic-native/taptic-engine";
import { IonSlides, IonSlide } from "@ionic/react";
import {} from "ionicons/icons";
import "./ProfileImageSlides.scss";
import {PhotoModel} from "../../redux/photoType";
import {imgBaseUrl} from "../../redux/api-ref"; 

type Props = {
  images: PhotoModel[];
  isClickable?: boolean;
  onNoMoreSlide?: (l: boolean) => void;
  onChange?: (i: number) => void;
};

const ProfileImageSlides: React.FC<Props> = ({
  images,
  isClickable,
  onChange,
  onNoMoreSlide,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentEnd, setCurrentEnd] = useState<number>(-1);
  const ionSlidesRef = useRef<HTMLIonSlidesElement>(null);
  // images = [
  //   "https://mylisting-app-api.herokuapp.com/api/img/image/85333a5e892c504b237547446a2380f9.png",
  //   "https://mylisting-app-api.herokuapp.com/api/img/image/a542bb25988d648783a21c614f1aef6d.png",
  //   //"https://mylisting-app-api.herokuapp.com/api/img/image/30ece14e75220f3a9e010cf5e492267f.jpeg"
  // ]

  // Known issue of IonSlides: https://forum.ionicframework.com/t/slides-in-modal-v5/185301/5?u=mrhieu
  const handleSlideLoaded = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.update();
    }
  };

  const handleSlideChange = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.getActiveIndex().then((index: number) => {
        setActiveIndex(index);
        if (onChange) onChange(index);
      });
    }
  };

  const handleMoveSlide = (step: number = 1) => {
    if (ionSlidesRef && ionSlidesRef.current) {
      if (step === -1) {
        ionSlidesRef.current.slidePrev();
      } else if (step === 1) {
        ionSlidesRef.current.slideNext();
      }

      if (step === currentEnd) {
        // Could not go next or prev
        onNoMore(currentEnd === -1);
      } else {
        setCurrentEnd(0);
        TapticEngine.selection();
      }
    }
  };

  const onNoMore = (isOnTheLeft: boolean) => {
    if (onNoMoreSlide) onNoMoreSlide(isOnTheLeft);
    TapticEngine.notification({ type: "warning" });
  };

  const handleReachStart = () => {
    setCurrentEnd(-1);
  };
  const handleReachEnd = () => {
    setCurrentEnd(1);
  };

  if (images.length === 0) return null;

  return (
    <div className="profile-image-slides">
      <IonSlides
        className="slides"
        ref={ionSlidesRef}
        onIonSlidesDidLoad={handleSlideLoaded}
        onIonSlideDidChange={handleSlideChange}
        onIonSlideReachStart={handleReachStart}
        onIonSlideReachEnd={handleReachEnd}
      >
        {images.map((image, index) => (
          <IonSlide key={index}>
            <div
              className="slide-img background-img"
              style={{ backgroundImage: `url('${imgBaseUrl + image.filename}')` }}
            />
          </IonSlide>
        ))}
      </IonSlides>
      <div className="custom-pagination">
        {images?.map((item, index) => (
          <div
            key={index}
            className={`pagination-bullet${
              activeIndex === index ? " pagination-bullet-active" : ""
            }`}
          />
        ))}
      </div>

      {isClickable && (
        <div className="overlay-navigation">
          <div
            className="navi navi-left"
            onClick={() => handleMoveSlide(-1)}
          ></div>
          <div
            className="navi navi-right"
            onClick={() => handleMoveSlide(1)}
          ></div>
        </div>
      )}
    </div>
  );
};

ProfileImageSlides.defaultProps = {
  isClickable: false,
  onNoMoreSlide: () => {},
  onChange: () => {},
};

export default ProfileImageSlides;

// import React, { useState, useRef } from 'react';
// import { TapticEngine } from '@ionic-native/taptic-engine';
// import {
//   IonSlides, IonSlide
// } from '@ionic/react';
// import {

// } from 'ionicons/icons';
// import './ProfileImageSlides.scss';

// type Props = {
//   images: string[],
//   isClickable?: boolean,
//   onNoMoreSlide?: (l: boolean) => void,
//   onChange?: (i: number) => void,
// }

// const ProfileImageSlides: React.FC<Props> = ({ images, isClickable, onChange, onNoMoreSlide }) => {
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const [currentEnd, setCurrentEnd] = useState<number>(-1);
//   const ionSlidesRef = useRef<HTMLIonSlidesElement>(null);

//   // Known issue of IonSlides: https://forum.ionicframework.com/t/slides-in-modal-v5/185301/5?u=mrhieu
//   const handleSlideLoaded = () => {
//     if (ionSlidesRef && ionSlidesRef.current) {
//       ionSlidesRef.current.update();
//     }
//   }

//   const handleSlideChange = () => {
//     if (ionSlidesRef && ionSlidesRef.current) {
//       ionSlidesRef.current.getActiveIndex()
//         .then((index: number) => {
//           setActiveIndex(index);
//           if (onChange) onChange(index);
//         })
//     }
//   }

//   const handleMoveSlide = (step: number = 1) => {
//     if (ionSlidesRef && ionSlidesRef.current) {
//       if (step === -1) {
//         ionSlidesRef.current.slidePrev();
//       } else if (step === 1) {
//         ionSlidesRef.current.slideNext();
//       }

//       if (step === currentEnd) {
//         // Could not go next or prev
//         onNoMore(currentEnd === -1);
//       } else {
//         setCurrentEnd(0);
//         TapticEngine.selection();
//       }
//     }
//   }

//   const onNoMore = (isOnTheLeft: boolean) => {
//     if (onNoMoreSlide) onNoMoreSlide(isOnTheLeft);
//     TapticEngine.notification({type: 'warning'});
//   }

//   const handleReachStart = () => {
//     setCurrentEnd(-1);
//   }
//   const handleReachEnd = () => {
//     setCurrentEnd(1);
//   }

//   if (images.length === 0) return null;

//   return (
//     <div className="profile-image-slides">
//       <IonSlides
//         className="slides"
//         ref={ ionSlidesRef }
//         onIonSlidesDidLoad={ handleSlideLoaded }
//         onIonSlideDidChange={ handleSlideChange }
//         onIonSlideReachStart={ handleReachStart }
//         onIonSlideReachEnd={ handleReachEnd }
//       >
//         {
//           images.map((image,index) => (
//             <IonSlide key={ index }>
//               <div className="slide-img background-img" style={{ backgroundImage: `url('${ image }')` }} />
//             </IonSlide>
//           ))
//         }
//       </IonSlides>
//       <div className="custom-pagination">
//         {
//           images?.map((image, index) => (
//             <div key={ index} className={ `pagination-bullet${ activeIndex === index ? ' pagination-bullet-active' : '' }` } />
//           ))
//         }
//       </div>

//       {
//         isClickable &&
//         <div className="overlay-navigation">
//           <div className="navi navi-left" onClick={ () => handleMoveSlide(-1) }></div>
//           <div className="navi navi-right" onClick={ () => handleMoveSlide(1) }></div>
//         </div>
//       }
//     </div>
//   );
// };

// ProfileImageSlides.defaultProps = {
//   isClickable: false,
//   onNoMoreSlide: () => {},
//   onChange: () => {},
// }

// export default ProfileImageSlides;
