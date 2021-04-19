import React from 'react';
import {
  IonContent, IonIcon, IonToolbar, IonInput, IonButtons, IonButton,IonFab
} from '@ionic/react';
import {
  heart, close
} from 'ionicons/icons';

// import './FullScreenModal.scss';

type Props = {
  image: String,
  onClose: () => void,
}

const FullScreenModal: React.FC<Props> = ({ image, onClose }) => {
  return (
    <IonContent force-overscroll="false" className="matched-modal-page">
      <div className="matched-container">
        <div style={{ backgroundImage: `url('${ image }')` }} className="background-img full-height" />
        {/* <div className="matched-overlay"> */}
          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonButton
              color="white"
              className="button-custom button-icon button-sm button-brand"
              onClick={onClose}>
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonFab>
        {/* </div> */}

      </div>
    </IonContent>
  );
};
FullScreenModal.defaultProps = {}
export default FullScreenModal;