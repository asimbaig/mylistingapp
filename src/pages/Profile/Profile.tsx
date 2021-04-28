import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonFab,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonAvatar,
  IonNote,
  IonLabel,
} from "@ionic/react";
import {
  arrowDown,
  checkmarkOutline,
  briefcaseOutline,
  locationOutline,
} from "ionicons/icons";
import ProfileImageSlides from "../../components/ProfileImageSlides/ProfileImageSlides";
import "./Profile.scss";
import { UserModel } from "../../redux/userType";
import { Item } from "../../redux/itemType";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../redux/api-ref";

type Props = {
  user: UserModel;
  onClose: () => void;
};

const Profile: React.FC<Props> = ({ user, onClose }) => {
  const OtherUserItems = useSelector(
    (state: RootState) => state.listings.userOtherItems
  );
  if (!user) return null;

  return (
    <>
      <IonHeader>
        <IonToolbar
          className="toolbar-reduced toolbar-no-border"
          color="light"
        />
      </IonHeader>

      <IonContent className="profile-page">
        <div className="profile-header">
          {user.profileImages && user.profileImages.length > 0 && (
            <ProfileImageSlides images={user.profileImages} />
          )}

          <IonFab vertical="bottom" horizontal="end" edge slot="fixed">
            <IonButton
              color="white"
              className="button-custom button-icon button-sm button-brand"
              onClick={onClose}
            >
              <IonIcon icon={arrowDown} slot="icon-only" />
            </IonButton>
          </IonFab>
        </div>

        <div className="profile-info border-bottom">
          <div className="profile-title">
            <span className="profile-user-name">{user.displayname}</span>
            <span className="icon-verified">
              <IonIcon icon={checkmarkOutline} />
            </span>
            <div className="profile-user-age">
              Last Active : {user.lastActive.substring(0, 10)}
            </div>
          </div>

          <div className="profile-user-info">
            <div className="info-item">
              <IonIcon icon={briefcaseOutline} />
              Rating: {user.rating}
            </div>
            <div className="info-item">
              <IonIcon icon={locationOutline} />
              10 Miles away
            </div>
          </div>
        </div>

        <div className="profile-intro border-bottom">
          <p>Grew up on Earth. Want to dance on Mars.</p>
          <p>
            Deeply in love with making Ionic prototypes, in my spare time.
            Always challenge myself to replicate the look and feel of native
            mobile apps on hybrid apps.
          </p>
        </div>

        <div className="profile-anthem border-bottom">
          <div className="section-title">My Listings</div>
          {OtherUserItems && OtherUserItems.length > 0 && (
            <IonList>
              {OtherUserItems.map((otherItem: Item, index: number) => (
                <IonItem
                  key={index}
                  // onClick={() => onClickItem(otherItem)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <IonAvatar>
                    {otherItem && otherItem.item_images.length > 0 && 
                    <img src={imgBaseUrl+otherItem.item_images[0]!.filename} alt="" />
                    }
                    {otherItem && otherItem.item_images.length===0 && 
                    <img src={imgBaseUrl+"86b27f95d6f85147e8ac12616f841238.jpg"} alt="" />
                    }
                  </IonAvatar> */}
                  <div
                              className="sideitem"
                              style={{
                                backgroundImage: `url(${
                                  imgBaseUrl +
                                  (otherItem.item_images &&
                                  otherItem.item_images.length > 0
                                    ? otherItem.item_images[0].filename
                                    : "86b27f95d6f85147e8ac12616f841238.jpg")
                                })`,
                                cursor: "pointer",
                              }}
                            />
                  <IonLabel>
                    <h2>{otherItem.title}</h2>
                    <IonNote>Expires: {otherItem.enddate}</IonNote>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>

        <div className="profile-footer border-bottom">
          <IonButton fill="clear" expand="block" color="medium" size="small">
            <div className="button-label">REPORT THIS PROFILE</div>
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

Profile.defaultProps = {};

export default Profile;
