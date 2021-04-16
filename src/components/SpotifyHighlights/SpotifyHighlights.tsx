import React, { useState, useRef } from 'react';
import {
  IonSlides, IonSlide, IonRow, IonCol, IonButton, IonIcon, IonText
} from '@ionic/react';
import {
  play
} from 'ionicons/icons';
import './SpotifyHighlights.scss';

type Props = {

}

const SpotifyHighlights: React.FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const ionSlidesRef = useRef<HTMLIonSlidesElement>(null);
  const items: number[] = [0,1,2,3];

  // Known issue of IonSlides: https://forum.ionicframework.com/t/slides-in-modal-v5/185301/5?u=mrhieu
  const handleLoaded = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.update();
    }
  }

  const handleSlideChange = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.getActiveIndex()
        .then((index: number) => {
          setActiveIndex(index);
        })
    }
  }

  return (
    <div className="spotify-highlights">
      <div className="section-title">
        My Top Spotify Artists
      </div>

      <div className="custom-pagination">
        {
          items.map(bullet => (
            <div key={ bullet } className={ `pagination-bullet${ activeIndex === bullet ? ' pagination-bullet-active' : '' }` } />
          ))
        }
      </div>

      <IonSlides
        ref={ ionSlidesRef }
        onIonSlidesDidLoad={ handleLoaded }
        onIonSlideDidChange={ handleSlideChange }
      >
        {
          items.map(item => (
            <IonSlide key={ item }>
              <IonRow className="highlight-slide">
                <IonCol>
                  <div className="highlight-item">
                    <div className="album-artwork-fluid">
                      <div className="album-cover background-img" style={{ backgroundImage: 'url(assets/img/album.png)' }} />
                      <IonRow className="ion-justify-content-center ion-align-items-center">
                        <div className="album-artwork-overlay">
                          <IonButton color="white" className="button-custom button-icon text-primary">
                            <IonIcon slot="icon-only" icon={play} />
                          </IonButton>
                        </div>
                      </IonRow>
                    </div>
                    <div className="item-caption">
                      <div className="item-artist">
                        <div>Red Hot Chili Peppers</div>
                      </div>
                      <div className="item-title">
                        <IonText color="medium">Californication</IonText>
                      </div>
                    </div>
                  </div>
                </IonCol>
                <IonCol>
                  <div className="highlight-item">
                    <div className="album-artwork-fluid">
                      <div className="album-cover background-img" style={{ backgroundImage: 'url(assets/img/album2.png)' }} />
                      <IonRow className="ion-justify-content-center ion-align-items-center">
                        <div className="album-artwork-overlay">
                          <IonButton color="white" className="button-custom button-icon text-primary">
                            <IonIcon slot="icon-only" icon={play} />
                          </IonButton>
                        </div>
                      </IonRow>
                    </div>
                    <div className="item-caption">
                      <div className="item-artist">
                        <div>Green Day</div>
                      </div>
                      <div className="item-title">
                        <IonText color="medium">Basket Case</IonText>
                      </div>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonSlide>
          ))
        }
      </IonSlides>

      <div className="spotify-connect">
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>
            <IonText color="medium">Share your Spotify Music Interests</IonText>
          </IonCol>
          <IonCol size="auto">
            <IonButton color="success" size="small">
              LINK SPOTIFY
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </div>
  );
};

SpotifyHighlights.defaultProps = {

}

export default SpotifyHighlights;
