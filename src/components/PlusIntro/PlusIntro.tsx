import React, { useRef } from 'react';
import {
  IonSlides, IonSlide, IonIcon
} from '@ionic/react';
import {
  flameSharp, flashSharp, starSharp, locationSharp, keySharp, refreshCircleSharp, heartSharp,
} from 'ionicons/icons';
import './PlusIntro.scss';

type Props = {

}

const PlusIntro: React.FC<Props> = () => {
  const ionSlidesRef = useRef<HTMLIonSlidesElement>(null);
  const items = [
    {
      icon: flameSharp,
      title: 'Get Tinder Gold',
      body: 'See who Likes You & more!'
    },
    {
      icon: flashSharp,
      title: 'Get Matches Faster',
      body: 'Boost your profile once a month!'
    },
    {
      icon: starSharp,
      title: 'Stand Out With Super Likes',
      body: `You're 3x more likely to get a match!`
    },
    {
      icon: locationSharp,
      title: 'Swipe Around the World',
      body: 'Passport to anywhere with Tinder Plus!'
    },
    {
      icon: keySharp,
      title: 'Control Your Profile',
      body: 'Limit what others see with Tinder Plus.'
    },
    {
      icon: refreshCircleSharp,
      title: 'I Meant to Swipe Right',
      body: 'Get unlimited Rewinds with Tinder Plus!'
    },
    {
      icon: heartSharp,
      title: 'Increase Your Chances',
      body: 'Get unlimited Likes with Tinder Plus!'
    }
  ]

  const handleLoaded = (swiper: any) => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.update();
    }
  }

  return (
    <IonSlides
      className="plus-intro"
      pager
      ref={ ionSlidesRef }
      onIonSlidesDidLoad={ handleLoaded }
    >
      {
        items.map((item, index) => (
          <IonSlide key={ item.title }>
            <div>
              <div className="slide-title">
                <IonIcon icon={ item.icon } className={ `icon-slide-${index + 1}` } />
                { item.title }
              </div>
              <div className="slide-body">{ item.body }</div>
            </div>
          </IonSlide>
        ))
      }
    </IonSlides>
  );
};

PlusIntro.defaultProps = {

}

export default PlusIntro;
