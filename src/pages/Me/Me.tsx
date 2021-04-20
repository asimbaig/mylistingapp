import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
} from "@ionic/react";
import {
  checkmarkOutline,
  settingsSharp,
  camera,
  add,
  pencilSharp,
} from "ionicons/icons";
import PlusIntro from "../../components/PlusIntro/PlusIntro";
import Settings from "../Settings/Settings";
import Profile from "../Profile/Profile";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import SpecialModel from "../SpecialModel/SpecialModel";
import "./Me.scss";
import USERS from "../Explore/users.dummy";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {sendMsg} from "../../redux/authSlice"; 
import {MsgModel} from "../../redux/MsgType"; 

type Props = {
  history: any;
};

const Me: React.FC<Props> = ({ history }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState<boolean>(false);
  const [isSpecialModelOpen, setIsSpecialModelOpen] = useState<boolean>(false);
  const user = USERS[3];
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loggedin_User = useSelector((state: RootState) => state.auth.user);
  const msg: MsgModel = {
    text: "My Message 2",
    fromUser: "607616f3908e524b6cc195e8", 
    fromUserImg: "./assets/images/user1.jpg",
    dateTime: new Date(),
    isRead: false
  };
  // useEffect(() => {
  //   //console.log(JSON.stringify(loggedin_User));
  // }, []);
  //const logout = () => {}
  const handleViewSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleViewProfile = () => {
    setIsProfileOpen(true);
  };

  const handleViewEditProfile = () => {
    setIsProfileEditOpen(true);
  };

  const handleViewSpecialModel = () => {
    setIsSpecialModelOpen(true);
  };
  if(!isAuthenticated){
    history.push("/");
    return null;
  }
  return (
    <IonPage>
      <IonContent force-overscroll="false" className="me-page bg-light">
        <div className="vertical-layout safe-area-bottom">
          <div className="section-upper">
            <div className="me-header" onClick={handleViewProfile}>
              <IonAvatar className="avatar">
                <img src={loggedin_User?.profileImages[0]} alt="" />
              </IonAvatar>
              <div>
                <span className="me-title">{loggedin_User?.displayname}</span>
                <span className="icon-verified">
                  <IonIcon icon={checkmarkOutline} />
                </span>
              </div>
              <div className="me-level">Joined : {loggedin_User?.joinDate}</div>
            </div>

            <IonRow className="ion-justify-content-center ion-align-items-center">
              <IonCol size="auto">
                <IonRow className="me-button-group">
                  <IonCol className="ion-text-center">
                    <IonButton
                      color="white"
                      className="button-custom button-icon"
                      onClick={handleViewSettings}
                    >
                      <IonIcon icon={settingsSharp} slot="icon-only" />
                    </IonButton>
                    <div className="button-label">SETTINGS</div>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <div className="button-stack primary">
                      <IonButton
                        color="white"
                        className="button-custom button-lg button-icon button-brand"
                        onClick={handleViewEditProfile}
                      >
                        <IonIcon icon={camera} slot="icon-only" />
                      </IonButton>
                      <div className="button-addon add-icon">
                        <IonIcon icon={add} />
                      </div>
                    </div>
                    <div className="button-label">ADD MEDIA</div>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton
                      color="white"
                      className="button-custom button-icon"
                      onClick={handleViewEditProfile}
                    >
                      <IonIcon icon={pencilSharp} slot="icon-only" />
                    </IonButton>
                    <div className="button-label">EDIT INFO</div>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </div>

          <div className="section-lower has-oval">
            <div className="slide-intro">
              <PlusIntro />
            </div>
            <div className="ion-text-center">
              <IonButton
                color="white"
                className="button-custom text-primary button-tinder-plus"
                onClick={handleViewSpecialModel}
              >
                SPECIAL MODEL
              </IonButton>
              <IonButton
                color="white"
                className="button-custom text-primary button-tinder-plus"
                onClick={()=>{dispatch(sendMsg(msg,"607616ba908e524b6cc195e7"))}}
              >
                Send Msg
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>

      <IonModal isOpen={isSettingsOpen}>
        <Settings onClose={() => {
          setIsSettingsOpen(false);
        }} />
      </IonModal>

      {/* <IonModal isOpen={isProfileOpen} swipeToClose>
        <Profile user={user} onClose={() => setIsProfileOpen(false)} />
      </IonModal> */}

      <IonModal isOpen={isProfileEditOpen}>
        <ProfileEdit user={user} onClose={() => setIsProfileEditOpen(false)} />
      </IonModal>

      <IonModal isOpen={isSpecialModelOpen} cssClass="custom-modal-small">
        <SpecialModel onClose={() => setIsSpecialModelOpen(false)} />
      </IonModal>
    </IonPage>
  );
};

Me.defaultProps = {};

export default Me;
