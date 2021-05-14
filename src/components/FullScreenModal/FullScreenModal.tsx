import React from "react";
import { IonContent, IonIcon, IonButton, IonFab } from "@ionic/react";
import { close } from "ionicons/icons";

import "./FullScreenModal.scss";

type Props = {
  image: String;
  onClose: () => void;
};

const FullScreenModal: React.FC<Props> = ({ image, onClose }) => {
  return (
    <IonContent force-overscroll="false" className="matched-modal-page">
      <div className="matched-container">
        <div
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "contain",
          }}
          className="background-img full-height"
        />
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonButton
            color="white"
            className="button-custom button-icon button-sm button-brand"
            onClick={onClose}
          >
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>
        </IonFab>
      </div>
    </IonContent>
  );
};
FullScreenModal.defaultProps = {};
export default FullScreenModal;
