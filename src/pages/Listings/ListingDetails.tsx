import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFab,
  IonButton,
  IonIcon,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonCardContent,
  IonNote,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  arrowBack,
  checkmarkOutline,
  briefcaseOutline,
  locationOutline,
  musicalNote,
  play,
  closeSharp,
  star,
  starOutline,
  heartSharp,
} from "ionicons/icons";
import ImageSwiperSlides from "../../components/ImageSwiperSlides/ImageSwiperSlides";
import "./Profile.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import { Item } from "../../redux/itemType";
import { setSelectItem } from "../../redux/itemSlice";
import { toggleFavUsers } from "../../redux/authSlice";

type Props = {
  history: any;
};
const ListingDetails: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const selectedItem = useSelector(
    (state: RootState) => state.listings.selectedItem
  );
  const ItemUser = useSelector((state: RootState) => state.listings.itemUser);
  const OtherUserItems = useSelector(
    (state: RootState) => state.listings.userOtherItems
  );
  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  const favUsers = useSelector((state: RootState) => state.auth.user?.favUsers);

  const isFavUser = (currentfavuserId: string) => {
    if (favUsers) {
      var index = favUsers.findIndex((fuid) => fuid === currentfavuserId);
      if (index && index > -1) {
        return true;
      } else {
        return false;
      }
    }
  };
  const onClose = () => {
    history.push("/listings");
  };
  const onClickItem = (item: Item) => {
    setIsLoading(true);
    dispatch(setSelectItem(item));
    setTimeout(() => {
      setIsLoading(false);
      history.push("/listingdetails");
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          className="toolbar-reduced toolbar-no-border"
          color="light"
        />
      </IonHeader>

      <IonContent className="profile-page">
        <IonLoading
          isOpen={isLoading}
          message={"Loading details..."}
          duration={1000}
        />
        {selectedItem && (
          <div>
            <div className="profile-header">
              {
                (selectedItem && selectedItem.item_images && selectedItem.item_images.length > 0) ?
                (<ImageSwiperSlides images={selectedItem?.item_images!}/>) :
                (<ImageSwiperSlides images={["./assets/images/itemnophoto.jpg"]}/>)
              }
              

              <IonFab vertical="bottom" horizontal="end" edge slot="fixed">
                <IonButton
                  color="white"
                  className="button-custom button-icon button-sm button-brand"
                  onClick={onClose}
                >
                  <IonIcon icon={arrowBack} slot="icon-only" />
                </IonButton>
              </IonFab>
            </div>

            <div className="profile-info border-bottom">
              <div className="profile-title">
                <span className="profile-user-name">{selectedItem?.title}</span>
                <div className="profile-user-age">£{selectedItem?.price}</div>
              </div>
            </div>

            <div className="ion-padding">
              <div className="profile-user-info">
                <div className="info-item">{selectedItem?.description}</div>
              </div>

              <hr />
              {ItemUser && (
                <IonCard>
                  <IonCardHeader>
                    <IonAvatar>
                      {/* <img src={ItemUser.profileImages[0]} alt="" /> */}
                      {(ItemUser.profileImages && ItemUser.profileImages.length>0) ?
                              (<img src={ItemUser.profileImages[0]} alt="" />):
                              (<img src="./assets/images/usernophoto.jpg" alt="" />)}
                    </IonAvatar>
                    <IonNote color="primary">{ItemUser?.displayname}</IonNote>
                    {/* <IonButton
                      expand="full"
                      fill="clear"
                      color="danger"
                      size="small"
                      onClick={() => {
                        dispatch(toggleFavUsers(ItemUser._id, CurrentUser._id));
                      }}
                    >
                      <IonIcon slot="start" icon={star}></IonIcon>
                    </IonButton> */}
                    {isFavUser(ItemUser._id) ? (
                      <IonButton
                        expand="full"
                        fill="clear"
                        color="danger"
                        size="small"
                        onClick={() => {
                          dispatch(
                            toggleFavUsers(ItemUser._id, CurrentUser._id)
                          );
                        }}
                      >
                        <IonIcon slot="start" icon={star}></IonIcon>
                      </IonButton>
                    ) : (
                      <IonButton
                        expand="full"
                        fill="clear"
                        color="danger"
                        size="small"
                        onClick={(event) => {
                          // event.stopPropagation();
                          dispatch(
                            toggleFavUsers(ItemUser._id, CurrentUser._id)
                          );
                        }}
                      >
                        <IonIcon slot="start" icon={starOutline}></IonIcon>
                      </IonButton>
                    )}
                  </IonCardHeader>
                  <IonCardContent>
                    {OtherUserItems && OtherUserItems.length > 0 && (
                      <IonList>
                        {OtherUserItems.filter(
                          (x) => x._id !== selectedItem._id
                        ).map((otherItem: Item, index: number) => (
                          <IonItem
                            key={index}
                            onClick={() => onClickItem(otherItem)}
                            style={{ cursor: "pointer" }}
                          >
                            <IonAvatar>
                              {(otherItem.item_images && otherItem.item_images.length>0) ?
                              (<img src={otherItem.item_images[0]} alt="" />):
                              (<img src="./assets/images/itemnophoto.jpg" alt="" />)}
                            </IonAvatar>
                            <IonLabel>
                              <h2>{otherItem.title}</h2>
                              <IonNote>Expires: {otherItem.enddate}</IonNote>
                            </IonLabel>
                          </IonItem>
                        ))}
                      </IonList>
                    )}
                  </IonCardContent>
                </IonCard>
              )}
            </div>
            <div className="profile-footer border-bottom">
              <IonButton
                fill="clear"
                expand="block"
                color="medium"
                size="small"
              >
                <div className="button-label">REPORT THIS ITEM</div>
              </IonButton>
            </div>
          </div>
        )}
        {!selectedItem && (
          <div style={{ textAlign: "center" }}>
            No content available
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonButton
                color="white"
                className="button-custom button-icon button-sm button-brand"
                onClick={onClose}
              >
                <IonIcon icon={arrowBack} slot="icon-only" />
              </IonButton>
            </IonFab>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ListingDetails;
