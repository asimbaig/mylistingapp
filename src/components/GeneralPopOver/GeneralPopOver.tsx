import React from "react";
import { IonContent } from "@ionic/react";
import {} from "ionicons/icons";

import "./GeneralPopOver.scss";

type Props = {
  msg: String;
  imgurl?: string;
  onClose: () => void;
};

const GeneralPopOver: React.FC<Props> = ({ msg, imgurl, onClose }) => {
  return (
    <IonContent
      force-overscroll="false"
      className="matched-modal-page"
      onClick={onClose}
    >
      <div className="matched-container">
        <div style={{ textAlign: "center", position: "relative", top: "20%" }}>
          {imgurl && <img src={imgurl} alt="" />}
          <h3>{msg}</h3>
        </div>
      </div>
    </IonContent>
  );
};
GeneralPopOver.defaultProps = {};
export default GeneralPopOver;
