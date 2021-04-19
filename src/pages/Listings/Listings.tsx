/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonSearchbar,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonCard,
  IonCardContent,
  IonItem,
  IonNote,
  createGesture,
  IonFab,
  IonButtons,
  IonModal,
  IonList,
  IonItemDivider,
  IonCheckbox,
} from "@ionic/react";
import {
  shareSocial,
  starOutline,
  star,
  reload,
  options,
  search,
  close,
} from "ionicons/icons";
import "./Listings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { setSelectItem, setSearchText, loadItems } from "../../redux/itemSlice";
import { toggleFavourite } from "../../redux/authSlice";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";
import { setIsLoading } from "../../redux/appSlice";
import Countdown from "react-countdown";

type Props = {
  history: any;
};

const Listings: React.FC<Props> = ({ history }) => {
  const windowWidth = window.innerWidth;
  // const [isLoading, setIsLoading] = useState(false);
  const [segmentView, setSegmentView] = useState<string>("LIST");
  const [favItems, setFavItems] = useState<Item[]>();
  // const [searchedItems, setSearchedItems] = useState<Item[]>();
  //const [searchText, setSearchText] = useState("");
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  // const [checked, setChecked] = useState(false);
  var listingFilter = {
    Services: {
      Plumber: true,
      Electrician: true,
      FoodDrink: true,
      Transport: true,
    },
    Home: {
      Appliances: true,
      Tools: true,
      Furniture: true,
    },
    Jobs: {
      IT: true,
      Marketing: true,
      Management: true,
    },
    Property: {
      Land: true,
      Domestic: true,
      Commercial: true,
    },
  };
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const listings = useSelector((state: RootState) => state.listings.items);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const userFavourites = useSelector(
    (state: RootState) => state.auth.user?.favourites
  );
  const CurrentUser = useSelector((state: RootState) => state.auth.user);

  const isFavourite = (currentItemId: string) => {
    if (userFavourites) {
      var index = userFavourites.findIndex((fid) => fid === currentItemId);
      if (index && index > -1) {
        return true;
      } else {
        return false;
      }
    }
  };
  const filterArray = (items: Item[], favoriteIds: string[]) => {
    const filteredItems = items.filter((i) => favoriteIds.indexOf(i._id) > -1);
    return filteredItems;
  };
  const getSearchedItems = (items: Item[], searchText: string) => {
    if (!searchText) {
      return items;
    }
    const _items = items.filter(
      (s) => s.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );

    return _items as Item[];
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
        dispatch(setIsLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      for (let i = 0; i < listings.length; i++) {
        const card = document.getElementById("card" + i); //drawerRef.current[i];
        const gesture = createGesture({
          el: card!,
          gestureName: "swipeout",
          onStart: (ev) => {
            card!.style.transition = "none";
          },
          onMove: (ev) => {
            card!.style.transform = `translateX(${ev.deltaX}px) rotate(${
              ev.deltaX / 20
            }deg)`;
          },
          onEnd: (ev) => {
            var parenrRow = document.getElementById("cards");
            card!.style.transition = ".5s east-out";
            if (ev.deltaX > windowWidth / 3) {
              parenrRow!.removeChild(card!);
            } else if (ev.deltaX < -windowWidth / 3) {
              parenrRow!.removeChild(card!);
            } else {
              card!.style.transform = ``;
            }
          },
        });
        gesture.enable(true);
      }
    }
  }, [listings]);
  

  useEffect(() => {
    if (listings && userFavourites) {
      setFavItems(filterArray(listings, userFavourites));
    }
  }, [userFavourites]);

  // useEffect(() => {
  //   if (searchText && listings) {
  //     var SItems = getSearchedItems(listings, searchText);
  //     // console.log("SItems", SItems);
  //   }
  // }, [searchText]);

  // Random component
  const Completionist = () => <span>Listing expired!!</span>;

  // Renderer callback with condition
  const renderer = (props: any) => {
    if (props.completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {props.days * 24 + props.hours}:{props.minutes}:{props.seconds}
        </span>
      );
    }
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
      
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border toolbar-no-safe-area">
          <IonSegment
            className="segment-custom"
            value={segmentView}
            onIonChange={(e) => setSegmentView(e.detail.value as string)}
            mode="md"
          >
            <IonSegmentButton value="LIST">
              <IonLabel>
                Listings
                {/* <div className="segment-badge">6</div> */}
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FAVS">
              <IonLabel>
                Favourites
                {/* <div className="segment-badge">3</div> */}
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="matches-page">
        
        <div className="safe-area-bottom">
          {segmentView === "LIST" && (
            <div>
              {showSearchbar && (
                <IonSearchbar
                  showCancelButton="always"
                  placeholder="Search"
                  onIonChange={(e: CustomEvent) => {
                    dispatch(setSearchText(e.detail.value));
                    dispatch(loadItems());
                  }}
                  onIonCancel={() => setShowSearchbar(false)}
                ></IonSearchbar>
              )}

              <IonButtons slot="end">
                {!showSearchbar && (
                  <IonButton onClick={() => setShowSearchbar(true)}>
                    <IonIcon slot="icon-only" icon={search}></IonIcon>
                  </IonButton>
                )}
                {!showSearchbar && (
                  <IonButton onClick={() => setShowFilterModal(true)}>
                    <IonIcon icon={options} slot="icon-only" />
                  </IonButton>
                )}
              </IonButtons>
              {/* <div className="border-bottom">
              <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
              </div> */}
              <IonGrid>
                <IonRow id="cards">
                  {listings.map((item: Item, itemIndex: number) => (
                    <IonCol key={itemIndex} id={"card" + itemIndex}>
                      <IonCard
                        style={{
                          width: "200px",
                          height: "280px",
                          margin: "auto",
                        }}
                      >
                        <IonCardContent
                          onClick={() => onClickItem(item)}
                          style={{ padding: "0", cursor: "pointer" }}
                        >
                          <img
                            src={item.item_images[0]}
                            alt=""
                            style={{ width: "200px", height: "180px" }}
                          />

                          <div>
                            <IonLabel>{item.title}</IonLabel>
                            <br />
                            <IonNote>
                              Expire: <Countdown date={item.enddate} renderer={renderer} />
                            </IonNote>
                          </div>
                        </IonCardContent>
                        <IonRow no-padding>
                          <IonCol>
                            {isAuthenticated &&
                              (isFavourite(item._id) ? (
                                <IonButton
                                  expand="full"
                                  fill="clear"
                                  color="danger"
                                  size="small"
                                  onClick={() => {
                                    dispatch(toggleFavourite(item._id, CurrentUser._id));
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
                                    event.stopPropagation();
                                    dispatch(toggleFavourite(item._id,CurrentUser._id));
                                  }}
                                >
                                  <IonIcon
                                    slot="start"
                                    icon={starOutline}
                                  ></IonIcon>
                                </IonButton>
                              ))}
                          </IonCol>
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
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            
            </div>
          )}

          {segmentView === "FAVS" && (
            <div>
              <IonGrid>
                <IonRow>
                  {favItems &&
                    favItems!.map((item: Item, itemIndex: number) => (
                      <IonCol key={itemIndex}>
                        <IonCard
                          style={{
                            width: "250px",
                            height: "280px",
                            margin: "auto",
                          }}
                        >
                          <IonCardContent
                            onClick={() => onClickItem(item)}
                            style={{ padding: "0", cursor: "pointer" }}
                          >
                            <img
                              src={item.item_images[0]}
                              alt=""
                              style={{ width: "250px", height: "180px" }}
                            />
                            <IonItem>
                              <IonLabel>{item.title}</IonLabel>
                              <IonNote>
                                Expire: {item.enddate.substr(0, 10)}
                              </IonNote>
                            </IonItem>
                          </IonCardContent>
                          <IonRow no-padding>
                            <IonCol>
                              {isAuthenticated &&
                                (isFavourite(item._id) ? (
                                  <IonButton
                                    expand="full"
                                    fill="clear"
                                    color="danger"
                                    size="small"
                                    onClick={() => {
                                      dispatch(toggleFavourite(item._id,CurrentUser._id));
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
                                      event.stopPropagation();
                                      dispatch(toggleFavourite(item._id,CurrentUser._id));
                                    }}
                                  >
                                    <IonIcon
                                      slot="start"
                                      icon={starOutline}
                                    ></IonIcon>
                                  </IonButton>
                                ))}
                            </IonCol>
                            <IonCol>
                              <IonButton
                                expand="full"
                                fill="clear"
                                color="danger"
                                size="small"
                              >
                                <IonIcon
                                  slot="end"
                                  icon={shareSocial}
                                ></IonIcon>
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonCard>
                      </IonCol>
                    ))}
                </IonRow>
              </IonGrid>
            </div>
          )}
        </div>
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
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
      </IonContent>
      
      <IonModal
        swipeToClose
        isOpen={showFilterModal}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <IonContent>
          <div style={{textAlign:"center"}}><h1>Filter</h1></div>
          
          <IonList>
            <IonItemDivider>Services</IonItemDivider>
            <IonItem>
              <IonLabel>Plumber</IonLabel>
              <IonCheckbox
                checked={listingFilter.Services.Plumber}
                slot="end"
                color="primary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Electrician</IonLabel>
              <IonCheckbox
                checked={listingFilter.Services.Electrician}
                slot="end"
                color="secondary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Food Drink</IonLabel>
              <IonCheckbox
                checked={listingFilter.Services.FoodDrink}
                slot="end"
                color="danger"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Transport</IonLabel>
              <IonCheckbox
                checked={listingFilter.Services.Transport}
                slot="end"
                color="success"
              />
            </IonItem>
            <IonItemDivider>Home</IonItemDivider>
            <IonItem>
              <IonLabel>Appliances</IonLabel>
              <IonCheckbox
                checked={listingFilter.Home.Appliances}
                slot="end"
                color="primary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Tools</IonLabel>
              <IonCheckbox
                checked={listingFilter.Home.Tools}
                slot="end"
                color="secondary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Furniture</IonLabel>
              <IonCheckbox
                checked={listingFilter.Home.Furniture}
                slot="end"
                color="danger"
              />
            </IonItem>
            <IonItemDivider>Jobs</IonItemDivider>
            <IonItem>
              <IonLabel>IT</IonLabel>
              <IonCheckbox
                checked={listingFilter.Jobs.IT}
                slot="end"
                color="primary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Marketing</IonLabel>
              <IonCheckbox
                checked={listingFilter.Jobs.Marketing}
                slot="end"
                color="secondary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Management</IonLabel>
              <IonCheckbox
                checked={listingFilter.Jobs.Management}
                slot="end"
                color="danger"
              />
            </IonItem>
            <IonItemDivider>Property</IonItemDivider>
            <IonItem>
              <IonLabel>Land</IonLabel>
              <IonCheckbox
                checked={listingFilter.Property.Land}
                slot="end"
                color="primary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Domestic</IonLabel>
              <IonCheckbox
                checked={listingFilter.Property.Domestic}
                slot="end"
                color="secondary"
              />
            </IonItem>
            <IonItem>
              <IonLabel>Commercial</IonLabel>
              <IonCheckbox
                checked={listingFilter.Property.Commercial}
                slot="end"
                color="danger"
              />
            </IonItem>
          </IonList>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonButton
              color="white"
              className="button-custom button-icon button-sm button-brand"
              onClick={() => setShowFilterModal(false)}
            >
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonFab>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

Listings.defaultProps = {};

export default Listings;
