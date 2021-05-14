import React, { useRef } from 'react';
import {
  IonSlides, IonSlide, IonIcon
} from '@ionic/react';
import {
  flameSharp, flashSharp, starSharp, locationSharp, keySharp
} from 'ionicons/icons';
import './PlusIntro.scss';

type Props = {

}

const PlusIntro: React.FC<Props> = () => {
  const ionSlidesRef = useRef<HTMLIonSlidesElement>(null);
  const items = [
    {
      icon: flameSharp,
      title: 'Slide 1',
      body: 'Information on slide 1'
    },
    {
      icon: flashSharp,
      title: 'Slide 2',
      body: 'Information on slide 2'
    },
    {
      icon: starSharp,
      title: 'Slide 3',
      body: `Information on slide 3`
    },
    {
      icon: locationSharp,
      title: 'Slide 4',
      body: 'Information on slide 4'
    },
    {
      icon: keySharp,
      title: 'Slide 5',
      body: 'Information on slide 5'
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
