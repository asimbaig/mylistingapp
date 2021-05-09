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
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
} from "@ionic/react";
import {
  arrowBack,
  thumbsUp,
  thumbsUpOutline,
  mail,
  shareSocial,
} from "ionicons/icons";
import ImageSwiperSlides from "../../components/ImageSwiperSlides/ImageSwiperSlides";
import "./Profile.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import { Item } from "../../redux/itemType";
import { PhotoModel } from "../../redux/photoType";
import { setSelectItem } from "../../redux/itemSlice";
import { toggleFavUsers, toggleFavourite } from "../../redux/authSlice";
import { imgBaseUrl } from "../../redux/api-ref";
import SendMsg from "../SendMsg/SendMsg";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";
import GMap from "../../components/GMap/GMap";

let placeHolderItemPhoto: PhotoModel = {
  file_id: "60887ac4014be60015d3c9c1",
  filename: "86b27f95d6f85147e8ac12616f841238.jpg",
  uploadDate: new Date("2021-04-27T20:57:40.930Z"),
};

type Props = {
  history: any;
};
const ListingDetails: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [slideImages, setSlideImages] = useState<PhotoModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemUserImage, setItemUserImage] = useState("");

  const [isSendMsgOpen, setIsSendMsgOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const selectedItem = useSelector(
    (state: RootState) => state.listings.selectedItem
  );
  const ItemUser = useSelector((state: RootState) => state.listings.itemUser);
  const OtherUserItems = useSelector(
    (state: RootState) => state.listings.userOtherItems
  );
  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  const favUsers = useSelector((state: RootState) => state.auth.user?.favUsers);
  const userFavourites = useSelector(
    (state: RootState) => state.auth.user?.favourites
  );
  useEffect(() => {
    if (ItemUser?.mainImage) {
      setItemUserImage(ItemUser?.mainImage!);
    } else if (ItemUser?.profileImages && ItemUser?.profileImages.length > 0) {
      setItemUserImage(ItemUser?.profileImages[0].filename!);
    } else {
      setItemUserImage("9407f5725354bc7c651f916351f836fc.jpg");
    }
  }, [ItemUser]);
  
  // useEffect(() => {
  //   if (selectedItem?.item_images.length === 0) {
  //     setSlideImages([placeHolderItemPhoto, placeHolderItemPhoto].reverse());
  //   } else if (selectedItem?.item_images.length === 1) {
  //     setSlideImages(
  //       [...selectedItem.item_images, placeHolderItemPhoto].reverse()
  //     );
  //   } else {
  //     setSlideImages([...selectedItem?.item_images!].reverse());
  //   }
  // }, [selectedItem]);

  const isFavUser = (currentfavuserId: string) => {
    if (favUsers) {
      var index = favUsers.findIndex((fuid) => fuid === currentfavuserId);
      if (index > -1) {
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
  const isFavourite = (currentItemId: string) => {
    if (userFavourites) {
      var index = userFavourites.findIndex((fid) => fid === currentItemId);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
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
              {selectedItem && selectedItem.item_images && (
                <ImageSwiperSlides images={selectedItem?.item_images} />
              )}
              {selectedItem.status && selectedItem.status === "sold" && (
                <div className="stamp stamp-sold">SOLD</div>
              )}
              {selectedItem.status && selectedItem.status === "pending" && (
                <div className="stamp stamp-pending">PENDING</div>
              )}
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
              {selectedItem.views > 0 && (
                <IonNote>
                  <i>Views: {selectedItem.views}</i>
                </IonNote>
              )}
              <IonGrid>
                <IonRow>
                  {isAuthenticated && (
                    <IonCol>
                      <IonButton
                        expand="full"
                        fill="clear"
                        color="danger"
                        size="small"
                        onClick={() => {
                          setIsSendMsgOpen(true);
                        }}
                      >
                        <IonIcon slot="start" icon={mail}></IonIcon>
                      </IonButton>
                    </IonCol>
                  )}
                  {isAuthenticated && (
                    <IonCol>
                      {isFavourite(selectedItem._id!) ? (
                        <IonButton
                          expand="full"
                          fill="clear"
                          color="danger"
                          size="small"
                          onClick={() => {
                            dispatch(
                              toggleFavourite(
                                selectedItem._id!,
                                CurrentUser._id
                              )
                            );
                          }}
                        >
                          <IonIcon slot="start" icon={thumbsUp}></IonIcon>
                        </IonButton>
                      ) : (
                        <IonButton
                          expand="full"
                          fill="clear"
                          color="danger"
                          size="small"
                          onClick={() => {
                            dispatch(
                              toggleFavourite(
                                selectedItem._id!,
                                CurrentUser._id
                              )
                            );
                          }}
                        >
                          <IonIcon
                            slot="start"
                            icon={thumbsUpOutline}
                          ></IonIcon>
                        </IonButton>
                      )}
                    </IonCol>
                  )}
                  <IonCol>
                    <IonButton
                      expand="full"
                      fill="clear"
                      color="danger"
                      size="small"
                    >
                      <IonIcon slot="end" icon={shareSocial}></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div className="ion-padding">
              <div className="profile-user-info">
                <div className="info-item">{selectedItem?.description}</div>
              </div>
              <hr/>
              {/* {console.log(selectedItem?.location)} */}
              {selectedItem && selectedItem.location &&
                <GMap distanceCover={20} point={{lat:selectedItem?.location.latitude!, lng:selectedItem?.location.longitude!}}/>
              }
              <hr />
              {ItemUser && (
                <IonCard>
                  <IonCardHeader>
                    <IonGrid>
                      <IonRow>
                        <IonCol style={{textAlign:"center"}}>
                        <IonAvatar style={{margin:"auto"}}>
                      {itemUserImage && (
                        <img src={imgBaseUrl + itemUserImage} alt="" />
                      )}
                    </IonAvatar>
                    <IonNote color="primary">{ItemUser?.displayname}</IonNote>
                        </IonCol>
                        
                      </IonRow>
                      <IonRow>
                      <IonCol>
                        {isAuthenticated &&
                      (isFavUser(ItemUser._id) ? (
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
                          <IonIcon slot="start" icon={thumbsUp}></IonIcon>
                        </IonButton>
                      ) : (
                        <IonButton
                          expand="full"
                          fill="clear"
                          color="danger"
                          size="small"
                          onClick={(event) => {
                            dispatch(
                              toggleFavUsers(ItemUser._id, CurrentUser._id)
                            );
                          }}
                        >
                          <IonIcon
                            slot="start"
                            icon={thumbsUpOutline}
                          ></IonIcon>
                        </IonButton>
                      ))}
                        </IonCol>   
                      </IonRow>
                    </IonGrid>
                    
                    
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
                            {/* <IonAvatar>
                              {otherItem.item_images &&
                              otherItem.item_images.length > 0 ? (
                                <img
                                  src={
                                    imgBaseUrl +
                                    otherItem.item_images[0].filename
                                  }
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={
                                    imgBaseUrl +
                                    "86b27f95d6f85147e8ac12616f841238.jpg"
                                  }
                                  alt=""
                                />
                              )}
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
      <IonModal
        swipeToClose
        isOpen={isSendMsgOpen}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <SendMsg
          onClose={() => setIsSendMsgOpen(false)}
          itemImage={
            selectedItem!.item_images.length > 0
              ? selectedItem!.item_images[0].filename!
              : "./assets/images/itemnophoto.jpg"
          }
          itemUser={ItemUser!}
        />
      </IonModal>
    </IonPage>
  );
};

export default ListingDetails;
