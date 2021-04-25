import React, { useState } from "react";
import {
  IonContent,
  IonToolbar,
  IonInput,
  IonButtons,
  IonButton,
} from "@ionic/react";
import {} from "ionicons/icons";
import LabelMatched from "../../components/SendMsgHeader/SendMsgHeader";
import "./SendMsg.scss";
import { UserModel } from "../../redux/userType";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { sendMsg } from "../../redux/authSlice";
import { MsgModel } from "../../redux/MsgType";

type Props = {
  itemImage: string;
  onClose: () => void;
  itemUser: UserModel;
};

const SendMsg: React.FC<Props> = ({ onClose, itemImage, itemUser }) => {
  const dispatch = useDispatch();
  const [msgText, setMsgText] = useState("");
  const CurrentUser = useSelector((state: RootState) => state.auth.user);

  const _sendMsg = () => {
    const msg: MsgModel = {
      text: msgText,
      fromUser: CurrentUser._id,
      fromUserImg: CurrentUser.profileImages[0].filename!,
      dateTime: new Date(),
      isRead: false,
    };
    dispatch(sendMsg(msg, itemUser._id, false));
    onClose();
  };

  return (
    <IonContent force-overscroll="false" className="matched-modal-page">
      <div className="matched-container">
        <div
          style={{ backgroundImage: `url('${itemImage}')` }}
          className="background-img full-height"
        />
        <div className="matched-overlay">
          <LabelMatched itemUser={itemUser} />
          <div className="matched-input">
            <div className="ion-padding">
              <IonToolbar>
                <IonInput
                  name="msgText"
                  type="text"
                  value={msgText}
                  placeholder="Is it still available?"
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setMsgText(e.detail.value!)}
                  required
                ></IonInput>
                <IonButtons slot="end">
                  <IonButton
                    type="submit"
                    fill="clear"
                    size="small"
                    color="primary"
                    onClick={() => {
                      _sendMsg();
                    }}
                  >
                    SEND
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </div>
          </div>

          <IonButton fill="clear" color="primary" onClick={onClose}>
            Back to Item
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

SendMsg.defaultProps = {};

export default SendMsg;
