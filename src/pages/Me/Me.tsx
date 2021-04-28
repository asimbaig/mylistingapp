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
  logOut,
} from "ionicons/icons";
import PlusIntro from "../../components/PlusIntro/PlusIntro";
import Settings from "../Settings/Settings";
import Profile from "../Profile/Profile";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import SpecialModel from "../SpecialModel/SpecialModel";
import "./Me.scss";
import USERS from "../FavouriteUsers/users.dummy";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { sendMsg } from "../../redux/authSlice";
import { MsgModel } from "../../redux/MsgType";
import { imgBaseUrl } from "../../redux/api-ref";
import { logout } from "../../redux/authSlice";

type Props = {
  history: any;
};

const Me: React.FC<Props> = ({ history }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState<boolean>(false);
  const [isSpecialModelOpen, setIsSpecialModelOpen] = useState<boolean>(false);
  const [mainProfileImage, setMainProfileImage] = useState<string>();
  const user = USERS[3];
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const loggedin_User = useSelector((state: RootState) => state.auth.user);

  useEffect(()=>{
    if(loggedin_User.mainImage){
      setMainProfileImage(loggedin_User.mainImage);
    }else if(loggedin_User?.profileImages && loggedin_User?.profileImages.length > 0){
      setMainProfileImage(loggedin_User?.profileImages[0].filename);
    }else{
      setMainProfileImage("9407f5725354bc7c651f916351f836fc.jpg");
    }
  },[loggedin_User]);
  
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
  if (!isAuthenticated) {
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
                {mainProfileImage &&
                  <img
                  src={imgBaseUrl + mainProfileImage}
                  alt=""
                />
                }
                {/* {loggedin_User.mainImage && 
                  <img
                  src={imgBaseUrl + loggedin_User.mainImage}
                  alt=""
                />
                }
                {!loggedin_User.mainImage && loggedin_User?.profileImages &&
                loggedin_User?.profileImages.length > 0 ? (
                  <img
                    src={imgBaseUrl + loggedin_User?.profileImages[0].filename}
                    alt=""
                  />
                ) : (
                  <img src="./assets/images/usernophoto.jpg" alt="" />
                )} */}
              </IonAvatar>
              <div>
                <span className="me-title">{loggedin_User?.displayname}</span>
                <span className="icon-verified">
                  <IonIcon icon={checkmarkOutline} />
                </span>
              </div>
              <div className="me-level">
                Joined : {loggedin_User?.joinDate.substring(0, 10)}
              </div>
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
                      onClick={() => {
                        dispatch(logout());
                        console.log("after logout...");
                        window.location.reload();
                        //history.push("/listings");
                      }}
                    >
                      <IonIcon icon={logOut} slot="icon-only" />
                    </IonButton>
                    <div className="button-label">Logout</div>
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
              {/* <IonButton
                color="white"
                className="button-custom text-primary button-tinder-plus"
                onClick={()=>{dispatch(sendMsg(msg,"607616ba908e524b6cc195e7"))}}
              >
                Send Msg
              </IonButton> */}
            </div>
          </div>
        </div>
      </IonContent>

      <IonModal isOpen={isSettingsOpen}>
        <Settings
          onClose={() => {
            setIsSettingsOpen(false);
          }}
        />
      </IonModal>

      {/* <IonModal isOpen={isProfileOpen} swipeToClose>
        <Profile user={user} onClose={() => setIsProfileOpen(false)} />
      </IonModal> */}

      <IonModal isOpen={isProfileEditOpen}>
        <ProfileEdit
          user={loggedin_User}
          onClose={() => setIsProfileEditOpen(false)}
        />
      </IonModal>

      <IonModal isOpen={isSpecialModelOpen} cssClass="custom-modal-small">
        <SpecialModel onClose={() => setIsSpecialModelOpen(false)} />
      </IonModal>
    </IonPage>
  );
};

Me.defaultProps = {};

export default Me;
