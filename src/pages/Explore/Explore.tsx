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
  chevronBack,
  chevronForward,
  // starOutline,
  // star,
  reload,
  // options,
  // search,
  // close,
  informationCircle,
  closeCircle,
} from "ionicons/icons";
import "./Listings.scss";
import "./Explore.scss";
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
// import { isPlatform } from "@ionic/react";

type Props = {
  history: any;
};

const Explore: React.FC<Props> = ({ history }) => {
  const windowWidth = window.innerWidth;
  const dispatch = useDispatch();
  //const isLoading = useSelector((state: RootState) => state.app.isLoading);
  // const listings = useSelector((state: RootState) => state.listings.items);
  const favUsers = useSelector(
    (state: RootState) => state.auth.favUserProfiles
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

  // useEffect(() => {
  //   console.log("totalUsers:** " + totalUsers);
  // }, [totalUsers]);

  useEffect(() => {
    console.log("In Gesture...");
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
            card!.style.transform = `translateX(${ev.deltaX}px) rotate(${
              ev.deltaX / 30
            }deg)`;
          },
          onEnd: (ev) => {
            //console.log(">>>>>> "+ev.deltaX);
            // var parenrRow = document.getElementById("profilecards");
            card!.style.transition = ".5s east-out";
            if (ev.deltaX > windowWidth) {
              // console.log("R:" + ev.deltaX);
              // parenrRow!.removeChild(card!);
              // console.log("totalUsers: " + totalUsers);
              // setTotalUsers(totalUsers - 1);
              handleRemoveUser(0, "profilecard" + i);
            } else if (ev.deltaX < -windowWidth) {
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
                              ? user.profileImages[0]
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
                              {/* <span className="icon-verified">
                <IonIcon icon={checkmarkOutline} />
              </span> */}
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
        {
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
Explore.defaultProps = {};

export default Explore;

// import React from "react";
// import {
//   IonPage,
//   IonContent,
//   IonRow,
//   IonGrid,
//   IonCol,
//   IonButton,
//   IonIcon,
//   IonModal,
// } from "@ionic/react";
// import { refresh, closeSharp, star, heartSharp, flash } from "ionicons/icons";
// import * as swing from "swing";
// import ReactSwing from "react-swing";
// import "./Explore.scss";
// import RippleLoader from "../../components/RippleLoader/RippleLoader";
// import SwipeCard from "../../components/SwipeCard/SwipeCard";
// import MatchedModal from "../MatchedModal/MatchedModal";
// import Profile from "../Profile/Profile";
// import {
//   modalEnterZoomOut,
//   modalLeaveZoomIn,
// } from "../../animations/animations";
// import USERS from "./users.dummy";

// type Props = {};

// type User = {
//   id: number;
//   name: string;
//   age: number;
//   job_title: string;
//   profile_image_url: string;
//   images: any[];
// };

// type State = {
//   isLoading: boolean;
//   isLocked: boolean;
//   isMatchModalOpen: boolean;
//   isProfileOpen: boolean;
//   currentProfile: User | null;
//   cards: User[];
//   stack: swing.Stack | null;
// };

// class Explore extends React.Component<Props, State> {
//   state = {
//     isLoading: false,
//     isLocked: false,
//     isMatchModalOpen: false,
//     isProfileOpen: false,
//     currentProfile: null,
//     cards: [],
//     stack: null,
//   };

//   constructor(props: Props) {
//     super(props);

//     this.stackRef = React.createRef();
//     this.nopeEl = null;
//     this.likeEl = null;
//     this.nextCardEl = null;
//   }

//   componentDidMount() {
//     this.getData();
//   }

//   getData = () => {
//     // API call goes here
//     this.setState({ isLoading: true });

//     setTimeout(() => {
//       this.setState({
//         isLoading: false,
//         cards: [...USERS],
//       });
//     }, 3000);
//   };
//   getTopCardEl = () => {
//     if (this.stackRef) {
//       // @ts-ignore
//       const { children } = this.stackRef.current;
//       let targetEl;

//       if (children.length >= 1) {
//         targetEl = children[children.length - 1];
//       }

//       if (targetEl) return targetEl;
//     }

//     return null;
//   };
//   getNextCardEl = () => {
//     if (this.stackRef) {
//       // @ts-ignore
//       const { children } = this.stackRef.current;
//       let targetEl;

//       if (children.length >= 2) {
//         targetEl = children[children.length - 2];
//       }

//       if (targetEl) return targetEl;
//     }

//     return null;
//   };
//   checkMatching = (card: any) => {
//     if (card.name === "Hieu Pham") {
//       console.info("MATCHED!!!");

//       this.handleToggleMatchModal();
//     }
//   };
//   handleSetStack = (swingStack: any) => {
//     this.setState({ stack: swingStack });

//     const topCardEl = this.getTopCardEl();

//     if (topCardEl) {
//       this.nopeEl = topCardEl.querySelector(".stamp-nope");
//       this.likeEl = topCardEl.querySelector(".stamp-like");
//     }

//     this.nextCardEl = this.getNextCardEl();
//   };
//   handleButtonClicked = (type: string = "NOPE") => {
//     if (this.state.isLocked) return false;

//     const { stack } = this.state;

//     if (this.stackRef && stack) {
//       const topCardEl = this.getTopCardEl();

//       if (topCardEl) {
//         if (type === "NOPE") {
//           if (this.nopeEl) this.nopeEl.style.opacity = "1";
//         } else {
//           if (this.likeEl) this.likeEl.style.opacity = "1";
//         }

//         setTimeout(() => {
//           // @ts-ignore
//           const card = stack.getCard(topCardEl);
//           const throwX =
//             type === "NOPE"
//               ? -0.5 * topCardEl.offsetWidth
//               : 0.5 * topCardEl.offsetWidth;
//           card.throwOut(
//             throwX,
//             20,
//             type === "NOPE"
//               ? ReactSwing.DIRECTION.LEFT
//               : ReactSwing.DIRECTION.RIGHT
//           );
//         }, 500);
//       }
//     }
//   };
//   handleClickNope = () => {
//     this.handleButtonClicked("NOPE");
//   };
//   handleClickLike = () => {
//     this.handleButtonClicked("LIKE");
//   };
//   handleGetMoreCards = () => {
//     if (this.state.isLocked) return false;

//     this.getData();
//   };
//   // Called whenever we drag an element
//   handleCardDragging = (
//     element: HTMLElement,
//     x: number,
//     y: number,
//     r: number
//   ) => {
//     const calculatedValue = Math.min(100, Math.abs(x) - 20) / 100; // 0 <-> 1 for Opacity

//     window.requestAnimationFrame(() => {
//       element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
//     });

//     if (Math.abs(x) > 20 && Math.abs(x) <= element.offsetWidth / 2) {
//       window.requestAnimationFrame(() => {
//         // @ts-ignore
//         this.nopeEl.style.opacity = x < 0 ? calculatedValue : 0;
//         // @ts-ignore
//         this.likeEl.style.opacity = x < 0 ? 0 : calculatedValue;
//       });

//       // Zoom effect for the card behind the current one
//       window.requestAnimationFrame(() => {
//         if (this.nextCardEl) {
//           this.nextCardEl.style.transform = `translate3d(0,0,0) scale(${
//             0.94 + 0.06 * calculatedValue
//           }, ${0.94 + 0.06 * calculatedValue})`;
//         }
//       });
//     } else if (x === 0) {
//       window.requestAnimationFrame(() => {
//         // @ts-ignore
//         this.likeEl.style.opacity = 0;
//         // @ts-ignore
//         this.nopeEl.style.opacity = 0;
//       });
//     }
//   };
//   handleCardThrowOut = (e: any, direction = ReactSwing.DIRECTION.LEFT) => {
//     this.setState({ isLocked: true });

//     const removedCard: User = this.state.cards[this.state.cards.length - 1];

//     if (direction === ReactSwing.DIRECTION.RIGHT) {
//       this.checkMatching(removedCard);
//     }

//     console.log(
//       `${
//         direction === ReactSwing.DIRECTION.LEFT ? "SWIPED LEFT" : "SWIPED RIGHT"
//       }: ${removedCard.name}`
//     );
//   };
//   handleThrowIn = () => {
//     this.setState({ isLocked: false });
//   };
//   handleCardThrowOutEnd = () => {
//     let { cards: cardList } = this.state;

//     // Remove the last element
//     cardList.pop();

//     this.setState(
//       {
//         cards: cardList,
//       },
//       () => {
//         // Scale the top card to its full size
//         const topCardEl = this.getTopCardEl();

//         if (topCardEl) {
//           topCardEl.style.transform = "scale(1, 1)";
//         }

//         this.setState({ isLocked: false });

//         // If there's no more cards left, show Loading screen and load more
//         if (this.state.cards.length === 0) {
//           this.getData();
//         }
//       }
//     );
//   };
//   handleToggleMatchModal = () => {
//     this.setState({
//       isMatchModalOpen: !this.state.isMatchModalOpen,
//     });
//   };
//   handleNoMoreSlide = (isOnTheLeft: boolean) => {
//     if (this.stackRef && this.stackRef.current) {
//       const className = isOnTheLeft ? "rotate-left" : "rotate-right";

//       // @ts-ignore
//       this.stackRef.current.classList.add(className);
//       setTimeout(() => {
//         // @ts-ignore
//         this.stackRef.current.classList.remove(className);
//       }, 250);
//     }
//   };
//   handleOpenProfile = (user: User) => {
//     this.setState({
//       isProfileOpen: !this.state.isProfileOpen,
//       currentProfile: user,
//     });
//   };
//   handleToggleProfile = () => {
//     this.setState({
//       isProfileOpen: !this.state.isProfileOpen,
//     });
//   };
//   stackConfig = {
//     // Default setting only allows UP, LEFT and RIGHT so you can override this as below
//     allowedDirections: [ReactSwing.DIRECTION.LEFT, ReactSwing.DIRECTION.RIGHT],
//     throwOutConfidence: (
//       offsetX: number,
//       _offsetY: number,
//       element: HTMLElement
//     ) => {
//       return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
//     },
//     transform: (element: HTMLElement, x: number, y: number, r: number) => {
//       this.handleCardDragging(element, x, y, r);
//     },
//     throwOutDistance: () => {
//       return window.outerWidth * 1.5;
//     },
//   };

//   stackRef: React.RefObject<HTMLDivElement>;
//   nopeEl: HTMLElement | null;
//   likeEl: HTMLElement | null;
//   nextCardEl: HTMLElement | null;

//   render() {
//     const {
//       isLoading,
//       cards,
//       isMatchModalOpen,
//       isProfileOpen,
//       currentProfile,
//     } = this.state;

//     return (
//       <IonPage>
//         <IonContent className="explore-bg explore-page" forceOverscroll={false}>
//           {isLoading && (
//             <div className="full-height safe-area-bottom">
//               <IonRow className="full-height ion-justify-content-center ion-align-items-center">
//                 <RippleLoader imageUrl="assets/img/avatars/hieu.png" />
//               </IonRow>
//             </div>
//           )}

//           {!isLoading && (
//             <div className="cards-container safe-area-bottom">
//               {/* @ts-ignore: TS2739 */}
//               <ReactSwing
//                 ref={this.stackRef}
//                 className="card-stack"
//                 setStack={this.handleSetStack}
//                 config={this.stackConfig}
//                 throwin={this.handleThrowIn}
//                 throwoutleft={(e: any) =>
//                   this.handleCardThrowOut(e, ReactSwing.DIRECTION.LEFT)
//                 }
//                 throwoutright={(e: any) =>
//                   this.handleCardThrowOut(e, ReactSwing.DIRECTION.RIGHT)
//                 }
//                 throwoutend={this.handleCardThrowOutEnd}
//               >
//                 {cards.map((item: User, index) => (
//                   <div
//                     className={`card-item${
//                       index < cards.length - 2 ? " ion-hide" : ""
//                     }`}
//                     key={item.id}
//                     data-card-id={item.id}
//                   >
//                     <SwipeCard
//                       user={item}
//                       onNoMoreSlide={this.handleNoMoreSlide}
//                       onViewInfo={() => this.handleOpenProfile(item)}
//                     />

//                     <div className="stamp stamp-like">Like</div>
//                     <div className="stamp stamp-nope">Nope</div>
//                   </div>
//                 ))}
//               </ReactSwing>

//               <div className="card-actions">
//                 <IonGrid>
//                   <IonRow className="ion-justify-content-center ion-align-items-center">
//                     <IonCol size="auto">
//                       <IonButton
//                         color="white"
//                         className="button-custom button-icon button-revert"
//                         onClick={this.handleGetMoreCards}
//                       >
//                         <IonIcon slot="icon-only" icon={refresh} />
//                       </IonButton>
//                     </IonCol>
//                     <IonCol size="auto">
//                       <IonButton
//                         color="white"
//                         className="button-custom button-icon button-dislike button-lg"
//                         onClick={this.handleClickNope}
//                       >
//                         <IonIcon slot="icon-only" icon={closeSharp} />
//                       </IonButton>
//                     </IonCol>
//                     <IonCol size="auto">
//                       <IonButton
//                         color="white"
//                         className="button-custom button-icon button-star"
//                       >
//                         <IonIcon slot="icon-only" icon={star} />
//                       </IonButton>
//                     </IonCol>
//                     <IonCol size="auto">
//                       <IonButton
//                         color="white"
//                         className="button-custom button-icon button-like button-lg"
//                         onClick={this.handleClickLike}
//                       >
//                         <IonIcon slot="icon-only" icon={heartSharp} />
//                       </IonButton>
//                     </IonCol>
//                     <IonCol size="auto">
//                       <IonButton
//                         color="white"
//                         className="button-custom button-icon button-boost"
//                       >
//                         <IonIcon slot="icon-only" icon={flash} />
//                       </IonButton>
//                     </IonCol>
//                   </IonRow>
//                 </IonGrid>
//               </div>
//             </div>
//           )}
//         </IonContent>

//         <IonModal
//           swipeToClose
//           isOpen={isMatchModalOpen}
//           enterAnimation={modalEnterZoomOut}
//           leaveAnimation={modalLeaveZoomIn}
//         >
//           <MatchedModal onClose={this.handleToggleMatchModal} />
//         </IonModal>

//         <IonModal isOpen={isProfileOpen} swipeToClose>
//           <Profile user={currentProfile} onClose={this.handleToggleProfile} />
//         </IonModal>
//       </IonPage>
//     );
//   }

// }

// export default Explore;
