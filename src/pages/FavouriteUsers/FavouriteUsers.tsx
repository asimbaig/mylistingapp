/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonCard,
  IonCardContent,
  createGesture,
  IonFab,
  IonModal,
} from "@ionic/react";
import {
  ellipse,
  briefcaseOutline,
  locationOutline,
  reload,
  informationCircle,
  checkmarkOutline,
  // closeCircle,
} from "ionicons/icons";
import "./Listings.scss";
import "./FavouriteUsers.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { UserModel } from "../../redux/userType";
import { loadUserOtherItems } from "../../redux/itemSlice";
import { setIsLoading } from "../../redux/appSlice";
import Profile from "../Profile/Profile";
import { imgBaseUrl } from "../../redux/api-ref";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";

type Props = {
  history: any;
};

const FavouriteUsers: React.FC<Props> = ({ history }) => {
  const windowWidth = window.innerWidth;
  const dispatch = useDispatch();
  //const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const favUsers = useSelector(
    (state: RootState) => state.auth.favUserProfiles
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [cardHeight, setCardHeight] = useState(window.innerHeight);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserModel>();

  useEffect(() => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    loadUser();
  }, [favUsers]);

  useEffect(() => {
    setCardHeight(window.innerHeight - window.innerHeight * 0.1);
  }, [window.innerHeight]);

  const loadUser = () => {
    if (favUsers.length > 0) {
      for (let i = 0; i < favUsers.length; i++) {
        const card = document.getElementById("profilecard" + i);
        const gesture = createGesture({
          el: card!,
          gestureName: "swipeoutprofile",
          onStart: (ev) => {
            card!.style.transition = "none";
          },
          onMove: (ev) => {
            card!.style.transform = `translateX(${ev.deltaX}px) translateY(${
              ev.deltaY
            }px) rotate(${ev.deltaX / 30}deg)`;
          },
          onEnd: (ev) => {
            card!.style.transition = ".5s east-out";
            if (ev.deltaX > windowWidth / 3) {
              handleRemoveUser(0, "profilecard" + i);
            } else if (ev.deltaX < -windowWidth / 3) {
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
    if (card) {
      parentRow!.removeChild(card!);
    }
  };
  return (
    <IonPage>
      <IonContent className="matches-page">
        {isAuthenticated && (
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
                        style={{
                          padding: "0",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: `url('${
                              user.mainImage
                                ? imgBaseUrl + user.mainImage
                                : user.profileImages.length > 0
                                ? imgBaseUrl + user.profileImages[0].filename
                                : imgBaseUrl +
                                  "9407f5725354bc7c651f916351f836fc.jpg"
                            }')`,
                            backgroundColor: "#cccccc",
                            height: `${cardHeight}px`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
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
                                console.log("Left Click...");
                              }}
                            ></div>
                            <div
                              className="navi navi-right"
                              style={{
                                color: "#fff",
                                fontSize: "30px",
                                textAlign: "right",
                              }}
                              onClick={() => {
                                console.log("Right Click...");
                              }}
                            >
                              {/* <IonIcon
                                slot="end"
                                style={{ color: "red" }}
                                icon={closeCircle}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  console.log("Cross Click...");
                                  handleRemoveUser(
                                    -1,
                                    "profilecard" + itemIndex
                                  );
                                }}
                              /> */}
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
                                  dispatch(
                                    loadUserOtherItems(user.listedItems)
                                  );
                                  setSelectedProfile(user);
                                  setIsProfileOpen(!isProfileOpen);
                                }}
                              />
                            </IonCol>
                          </IonRow>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        )}
        {!isAuthenticated && (
          <div className="login-heading">
            <a href="/login">PLEASE LOGIN</a>
          </div>
        )}

        {isAuthenticated && (
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
        )}
      </IonContent>
      <IonModal
        isOpen={isProfileOpen}
        swipeToClose
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
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
