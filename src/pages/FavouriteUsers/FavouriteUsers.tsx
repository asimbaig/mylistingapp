/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  IonPage,
  // IonHeader,
  // IonToolbar,
  // IonSegment,
  // IonSegmentButton,
  // IonLabel,
  IonContent,
  // IonSearchbar,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonCard,
  IonCardContent,
  // IonItem,
  // IonNote,
  createGesture,
  IonFab,
  IonModal,
  // IonButtons,
  // IonModal,
  // IonList,
  // IonItemDivider,
  // IonCheckbox,
} from "@ionic/react";
import {
  //shareSocial,
  ellipse,
  briefcaseOutline,
  locationOutline,
  // chevronBack,
  // chevronForward,
  // starOutline,
  // star,
  reload,
  // options,
  // search,
  // close,
  informationCircle,checkmarkOutline,
  closeCircle,
} from "ionicons/icons";
import "./Listings.scss";
import "./FavouriteUsers.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
//import { Item } from "../../redux/itemType";
import { UserModel } from "../../redux/userType";
//import { setSelectItem, setSearchText, loadItems } from "../../redux/itemSlice";
import { loadUserOtherItems } from "../../redux/itemSlice";
import // modalEnterZoomOut,
// modalLeaveZoomIn,
"../../animations/animations";
import { setIsLoading } from "../../redux/appSlice";
import Profile from "../Profile/Profile";
import {imgBaseUrl} from "../../redux/api-ref"; 

type Props = {
  history: any;
};

const FavouriteUsers: React.FC<Props> = ({ history }) => {
  const windowWidth = window.innerWidth;
  const dispatch = useDispatch();
  //const isLoading = useSelector((state: RootState) => state.app.isLoading);
  // const listings = useSelector((state: RootState) => state.listings.items);
  const favUsers = useSelector(
    (state: RootState) => state.auth.favUserProfiles
  );
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [cardHeight, setCardHeight] = useState(window.innerHeight);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserModel>();

  useEffect(() => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1500);
  }, []);

  // useEffect(() => {
  //   console.log("totalUsers:** " + totalUsers);
  // }, [totalUsers]);

  useEffect(() => {
    // console.log("In Gesture...");
    loadUser();
    // setTotalUsers(favUsers.length);
  }, [favUsers]);

  useEffect(() => {
    //console.log("Height: "+ (window.innerHeight - (window.innerHeight * .10)));
    setCardHeight(window.innerHeight - window.innerHeight * 0.1);
  }, [window.innerHeight]);

  const loadUser = () => {
    if (favUsers.length > 0) {
      for (let i = 0; i < favUsers.length; i++) {
        const card = document.getElementById("profilecard" + i); //drawerRef.current[i];
        const gesture = createGesture({
          el: card!,
          gestureName: "swipeoutprofile",
          onStart: (ev) => {
            card!.style.transition = "none";
          },
          onMove: (ev) => {
            // card!.style.transform = `translateX(${ev.deltaX}px) translateY(${ev.deltaY}px)`;
            card!.style.transform = `translateX(${ev.deltaX}px) translateY(${ev.deltaY}px) rotate(${
              ev.deltaX / 30
            }deg)`;
          },
          onEnd: (ev) => {
            //console.log(">>>>>> "+ev.deltaX);
            // var parenrRow = document.getElementById("profilecards");
            card!.style.transition = ".5s east-out";
            if (ev.deltaX > windowWidth/3) {
              // console.log("R:" + ev.deltaX);
              // parenrRow!.removeChild(card!);
              // console.log("totalUsers: " + totalUsers);
              // setTotalUsers(totalUsers - 1);
              handleRemoveUser(0, "profilecard" + i);
            } else if (ev.deltaX < -windowWidth/3) {
              // console.log("L:" + ev.deltaX);
              // console.log("totalUsers: " + totalUsers);
              // setTotalUsers(totalUsers - 1);
              handleRemoveUser(0, "profilecard" + i);
            } else {
              card!.style.transform = ``;
            }
          },
        });
        gesture.enable(true);
      }
    }
  };

  const handleRemoveUser = (pos: number, id: string) => {
    let parentRow = document.getElementById("profilecards");
    let card = document.getElementById(id);
    // card!.style.transition = ".5s east-out";
    // card!.style.transform = `translateX(${windowWidth}px) rotate(${(windowWidth)/30}deg)`;
    if (card) {
      parentRow!.removeChild(card!);
    }
  };
  // const   handleToggleProfile = () => {
  //     setIsProfileOpen(!isProfileOpen);
  // };
  return (
    <IonPage>
      <IonContent className="matches-page">
        {isAuthenticated &&
            <div className="safe-area-bottom">
            <IonGrid>
              <IonRow id="profilecards">
                {favUsers.map((user: UserModel, itemIndex: number) => (
                  <IonCol
                    key={itemIndex}
                    id={"profilecard" + itemIndex}
                    style={{ position: "absolute", top: "0", left: "0" }}
                  >
                    <IonCard
                      style={{
                        width: `100%`,
                        height: `${cardHeight}px`,
                        margin: "auto",
                      }}
                    >
                      <IonCardContent
                        // onClick={() => onClickItem(item)}
                        style={{
                          padding: "0",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: `url('${
                              user.profileImages.length > 0
                                ? (imgBaseUrl + user.profileImages[0].filename)
                                : "./assets/images/usernophoto.jpg"
                            }')`,
                            backgroundColor: "#cccccc",
                            height: `${cardHeight}px`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            // position: "relative"
                          }}
                        >
                          <div className="overlay-navigation">
                            <div
                              className="navi navi-left"
                              style={{
                                color: "#fff",
                                fontSize: "50px",
                                textAlign: "left",
                              }}
                              onClick={() => {
                                // setTotalUsers(totalUsers - 1);
                                handleRemoveUser(-1, "profilecard" + itemIndex);
                              }}
                            >
                              {/* <IonIcon slot="start" icon={chevronBack} /> */}
                            </div>
                            <div
                              className="navi navi-right"
                              style={{
                                color: "#fff",
                                fontSize: "30px",
                                textAlign: "right",
                              }}
                              onClick={() => {
                                // setTotalUsers(totalUsers - 1);
                                handleRemoveUser(1, "profilecard" + itemIndex);
                              }}
                            >
                              <IonIcon
                                slot="end"
                                style={{ color: "black" }}
                                icon={closeCircle}
                              />
                            </div>
                          </div>
                        </div>
  
                        <div className="card-caption">
                          <IonRow className="ion-justify-content-center ion-align-items-center">
                            <IonCol>
                              <div className="card-title">
                                <span className="card-user-name">
                                  {user.displayname}
                                </span>
                                <span className="icon-verified">
                                    <IonIcon icon={checkmarkOutline} />
                                </span>
                              </div>
  
                              {
                                <div className="card-user-info">
                                  <div>
                                    <IonIcon icon={ellipse} color="success" />
                                    Join: {user.joinDate.substring(0, 10)}
                                  </div>
                                  <div>
                                    <IonIcon icon={ellipse} color="success" />
                                    Last Active:{" "}
                                    {user.lastActive.substring(0, 10)}
                                  </div>
                                  <div>
                                    <IonIcon icon={briefcaseOutline} />
                                    Listed Items: {user.listedItems.length}
                                  </div>
                                  <div>
                                    <IonIcon icon={locationOutline} />
                                    21 miles away
                                  </div>
                                </div>
                              }
                            </IonCol>
                            <IonCol size="auto">
                              <IonIcon
                                className="button-info"
                                icon={informationCircle}
                                onClick={() => {
                                  dispatch(loadUserOtherItems(user.listedItems));
                                  setSelectedProfile(user);
                                  setIsProfileOpen(!isProfileOpen);
                                }}
                              />
                            </IonCol>
                          </IonRow>
                        </div>
  
                        {/* <img
                              src={item.item_images[0]}
                              alt=""
                              style={{ width: `100%`, height: `${cardHeight}px` }}
                              onClick={() => console.log("profilecard" + itemIndex)}
                            /> */}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        }
        {!isAuthenticated && <div style={{width:"100%", textAlign:"center"}}>Please Login to view this content</div>}
        
        {isAuthenticated && 
          <IonFab vertical="top" horizontal="start" slot="fixed">
          <IonButton
            color="white"
            className="button-custom button-icon button-sm button-brand"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            <IonIcon icon={reload} slot="icon-only" />
          </IonButton>
        </IonFab>
      
        }
          
      </IonContent>
      <IonModal isOpen={isProfileOpen} swipeToClose>
        <Profile
          user={selectedProfile!}
          onClose={() => setIsProfileOpen(!isProfileOpen)}
        />
      </IonModal>
    </IonPage>
  );
};
FavouriteUsers.defaultProps = {};

export default FavouriteUsers;