import React from 'react';
import {
  IonContent, IonIcon, IonToolbar, IonInput, IonButtons, IonButton
} from '@ionic/react';
import {
  heart
} from 'ionicons/icons';
import LabelMatched from '../../components/LabelMatched/LabelMatched';
import './MatchedModal.scss';

type Props = {
  onClose: () => void,
}

const MatchedModal: React.FC<Props> = ({ onClose }) => {
  const user = {
    profile_image_url: 'assets/img/people/ironman.png',
  }

  return (
    <IonContent force-overscroll="false" className="matched-modal-page">
      <div className="matched-container">
        <div style={{ backgroundImage: `url('${ user.profile_image_url }')` }} className="background-img full-height" />
        <div className="matched-overlay">
          <LabelMatched />

          <div className="matched-input">
            <div className="label">
              <IonIcon icon={heart} />
              <div>
                Ionic Tinder likes you too!
              </div>
            </div>

            <div className="ion-padding">
              <IonToolbar>
                <IonInput placeholder="Say something nice"></IonInput>
                <IonButtons slot="end">
                  <IonButton type="submit" fill="clear" size="small" color="primary" onClick={ onClose }>
                    SEND
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </div>
          </div>

          <IonButton fill="clear" color="primary" onClick={ onClose }>
            Back to Tinder
          </IonButton>
        </div>

      </div>
    </IonContent>
  );
};

MatchedModal.defaultProps = {

}

export default MatchedModal;
