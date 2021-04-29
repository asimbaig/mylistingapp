import React from "react";
import {
  IonAvatar,
  IonPage,
  IonContent,
  IonText,
  IonRow,
  IonCol,
} from "@ionic/react";
import {} from "ionicons/icons";
import "./ChatStreams.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { imgBaseUrl } from "../../redux/api-ref";
import { FromUsersMsgs, setSelectedChatUser } from "../../redux/authSlice";

type Props = {
  history: any;
};

const ChatStreams: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const msgFromUserProfiles = useSelector(
    (state: RootState) => state.auth.msgFromUserProfiles
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const goToChat = (otherUserId: string) => {
    // console.log("gotochat");
    dispatch(FromUsersMsgs(currentUser, otherUserId));
    history.push("/chat");
  };

  return (
    <IonPage>
      <IonContent className="matches-page">
        {isAuthenticated &&
          <div className="safe-area-bottom">
          <div className="list-header">
            <IonText color="primary">
              <strong>Messages</strong>
            </IonText>
          </div>
          <div className="message-list">
            {msgFromUserProfiles.map((user, index) => (
              <IonRow
                className="ion-align-items-center"
                key={user._id + index}
                onClick={() => {
                  dispatch(setSelectedChatUser(user));
                  goToChat(user._id);
                }}
                style={{ cursor: "pointer" }}
              >
                <IonCol size="auto">
                  <IonAvatar>
                    <img
                      src={imgBaseUrl + user.profileImages[0].filename}
                      alt=""
                    />
                  </IonAvatar>
                </IonCol>
                <IonCol className="message-item-text">
                  <div>
                    <div className="user-name">{user.displayname}</div>
                  </div>
                </IonCol>
              </IonRow>
            ))}
          </div>
        </div>
      
        }
        {!isAuthenticated && 
          <div className="login-heading">PLEASE LOGIN</div>
        }
        
      </IonContent>
    </IonPage>
  );
};

ChatStreams.defaultProps = {};

export default ChatStreams;
