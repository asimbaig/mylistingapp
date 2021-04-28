import React, { useEffect, useState, useRef } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonToggle,
  IonTextarea,
  IonNote,
  IonInput,
  IonText,
  IonModal,
} from "@ionic/react";
import {
  close,
  add,checkmarkOutline,
  logoSnapchat,
  logoInstagram,
  logoRss,
} from "ionicons/icons";
import SwipeCard from "../../components/SwipeCard/SwipeCard";
import Passions from "../Passions/Passions";
import "./ProfileEdit.scss";
import { rangeArray } from "../../utils/utils";
import { usePhotoGallery, Photo } from "../../hooks/usePhotoGallery";
import { UserModel } from "../../redux/userType";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { updateUserImages, deleteUserImage, updateMainImage } from "../../redux/authSlice";
import {imgBaseUrl} from "../../redux/api-ref"; 
import { deletePhotoById } from "../../services/photoService";

type Props = {
  user: UserModel;
  onClose: () => void;
};
let TotalImageSlots = 6;
let userImages: Photo[] = [
  //"assets/img/people/hieu.png",
  //"assets/img/people/ironman.png",
  //"assets/img/people/hulk.png",
];

const ProfileEdit: React.FC<Props> = ({ user, onClose }) => {
  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  //const [photoToDeleteId, setPhotoToDeleteId] = useState<string | undefined>();
  const { photos, takePhoto, deletePhoto, returnPhoto } = usePhotoGallery();
  const [imageSlotsAvailable, setImageSlotsAvailable] = useState(
    TotalImageSlots - CurrentUser.profileImages.length
  );
  const dispatch = useDispatch();
  const [segmentView, setSegmentView] = useState<string>("EDIT");
  const [isPassionsOpen, setIsPassionsOpen] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<string>(
    `I'm obsessed with building mobile apps with Ionic Framework. What about you?`
  );
  ;
  const stackRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (photoToDeleteId){
  //     dispatch(deleteUserImage(returnPhoto, CurrentUser._id));
  //   } 
  // }, [photoToDeleteId]);
  useEffect(() => {
    if (returnPhoto){
      // console.log("returnPhoto: >>>> " +JSON.stringify(returnPhoto));
      dispatch(updateUserImages(returnPhoto, CurrentUser._id));
    } 
  }, [returnPhoto]);

  useEffect(() => {
    //user.images =
    setImageSlotsAvailable(TotalImageSlots - CurrentUser.profileImages.length);
  }, [CurrentUser.profileImages.length]);

  const handleNoMoreSlide = (isOnTheLeft: boolean = true) => {
    if (stackRef && stackRef.current) {
      const className = isOnTheLeft ? "rotate-left" : "rotate-right";

      // @ts-ignore
      stackRef.current.classList.add(className);
      setTimeout(() => {
        // @ts-ignore
        stackRef.current.classList.remove(className);
      }, 250);
    }
  };

  const handleOpenPassions = () => {
    setIsPassionsOpen(true);
  };

  return (
    <>
      <IonHeader className="header-custom">
        <IonToolbar>
          <IonTitle>Edit Info</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={onClose}>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className="toolbar-no-border">
          <IonSegment
            className="segment-custom"
            value={segmentView}
            onIonChange={(e) => setSegmentView(e.detail.value as string)}
            mode="md"
          >
            <IonSegmentButton value="EDIT">
              <IonLabel>Edit</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="PREVIEW">
              <IonLabel>Preview</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-edit-page bg-light">
        <div className="full-height">
          {segmentView === "EDIT" && (
            <div className="segment-view">
              <div className="photos-edit">
                <IonGrid>
                  <IonRow>
                    {CurrentUser && (CurrentUser.profileImages.length> 0) &&
                      CurrentUser.profileImages.map((photo, index) => (
                      <IonCol
                        size="4"
                        className="photo-item"
                        key={"photo" + index}
                      >
                        <div
                          className="photo-image background-img"
                          style={{
                            backgroundImage: `url(${imgBaseUrl + photo.filename})`,
                          }}
                        />
                        <span className={(photo.filename===CurrentUser.mainImage) ? "verified-button": "not-verified-button"}>
                          <IonIcon 
                            icon={checkmarkOutline} 
                            onClick={() => {
                              dispatch(updateMainImage(photo.filename!, CurrentUser._id));
                            }}
                            style={{ cursor: "pointer" }}
                            />
                        </span>
                        <div className="photo-button">
                          <IonIcon
                            icon={close}
                            onClick={() => {
                              deletePhotoById(photo.file_id!).then((res)=>{
                                dispatch(deleteUserImage(photo, CurrentUser._id));
                              }).catch(err=>console.log(err));
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </IonCol>
                    ))}
                    {rangeArray(1, imageSlotsAvailable).map((i) => (
                      <IonCol size="4" className="photo-item no-photo" key={i}>
                        <div className="photo-image background-img" />
                        <div className="photo-button photo-button-invert">
                          <IonIcon
                            icon={add}
                            onClick={() => {
                              takePhoto();
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </div>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>PHOTO OPTIONS</IonLabel>
                </IonListHeader>
                {/* <IonItem lines="none">
                  <IonLabel>Smart Photos</IonLabel>
                  <IonToggle color="primary" checked></IonToggle>
                </IonItem>
                <IonListHeader className="help-block">
                  <IonLabel color="medium">
                    Smart Photos continuously tests all your profile photos and picks the best one to show first.
                  </IonLabel>
                </IonListHeader> */}
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>ABOUT ME</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonTextarea
                    rows={3}
                    value={aboutMe}
                    onIonChange={(e) => setAboutMe(e.detail.value as string)}
                  />
                </IonItem>
                <IonItem lines="none">
                  <IonNote slot="end">{500 - aboutMe.length}</IonNote>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>PASSIONS</IonLabel>
                </IonListHeader>
                <IonItem lines="none" detail onClick={handleOpenPassions}>
                  <IonLabel>Travel, Instagram, Music</IonLabel>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>JOB TITLE</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonInput value="Developer" />
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>COMPANY</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonInput value="My Company" />
                </IonItem>
              </IonList>

              {/* <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>SCHOOL</IonLabel>
                </IonListHeader>
                <IonItem detail lines="none">
                  <IonLabel>Add School</IonLabel>
                </IonItem>
              </IonList> */}

              
              <div className="safe-area-bottom">
                <IonList className="list-custom">
                  <IonListHeader>
                    <IonLabel>
                      CONTROL YOUR PROFILE{" "}
                    </IonLabel>
                  </IonListHeader>
                  {/* <IonItem>
                    <IonLabel>Don't Show My Age</IonLabel>
                    <IonToggle color="primary" checked={false} />
                  </IonItem> */}
                  <IonItem lines="none">
                    <IonLabel>Don't Show My Distance</IonLabel>
                    <IonToggle color="primary" checked={false} />
                  </IonItem>
                </IonList>
              </div>
            </div>
          )}

          {segmentView === "PREVIEW" && (
            <div className="segment-view preview-container full-height">
              <div className="card-border full-height" ref={stackRef}>
                <SwipeCard
                  user={user}
                  isPreview
                  onNoMoreSlide={handleNoMoreSlide}
                />
              </div>
            </div>
          )}
        </div>

        <IonModal isOpen={isPassionsOpen}>
          <Passions onClose={() => setIsPassionsOpen(false)} />
        </IonModal>
      </IonContent>
    </>
  );
};

ProfileEdit.defaultProps = {};

export default ProfileEdit;
