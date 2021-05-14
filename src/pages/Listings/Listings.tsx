/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
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
  IonNote,
  IonButtons,
  IonModal,
  IonText,
  IonRefresher,
  IonRefresherContent,IonPopover, createGesture,IonCardHeader
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import {
  chevronUp,
  chevronDown,
  options,
  search,
  checkmarkDone,
  chevronDownCircleOutline,mail
} from "ionicons/icons";
import "./Listings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import {
  setSelectItem,
  setSearchText,
  loadItems,
  updateItemViews,
} from "../../redux/itemSlice";
import { toggleFavourite } from "../../redux/authSlice";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";
import { setIsLoading } from "../../redux/appSlice";
import Countdown from "react-countdown";
import TopPicksItems from "../../components/TopPicksItems/TopPicksItems";
import MainListingImgSwiper from "../../components/MainListingImgSwiper/MainListingImgSwiper";
import ListingFilters from "../../components/ListingFilters/ListingFilters";
import ListingDetails from "./ListingDetails";

type Props = {
  history: any;
};

const Listings: React.FC<Props> = ({ history }) => {
  const drawerRef = useRef();
  const windowWidth = window.innerWidth;
  const [segmentView, setSegmentView] = useState<string>("LIST");
  const [cardWidth, setCardWidth] = useState(200);
  const [favItems, setFavItems] = useState<Item[]>();
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isListingDetailOpen, setIsListingDetailOpen] = useState<boolean>(false);
  const [drawerPosition, setDrawerPosition] = useState<boolean>(true);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const listings = useSelector((state: RootState) => state.listings.items);
  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const userFavourites = useSelector(
    (state: RootState) => state.auth.user?.favourites
  );
  const filterArray = (items: Item[], favoriteIds: string[]) => {
    const filteredItems = items.filter((i) => favoriteIds.indexOf(i._id!) > -1);
    return filteredItems;
  };

  useEffect(() => {
    if (windowWidth <= 360) {
      setCardWidth(170);
    } else if (windowWidth <= 450) {
      setCardWidth(180);
    } else {
      setCardWidth(200);
    }
  }, []);

  useEffect(() => {
    const card = document.getElementById("bottomUpCard");
    const gesture = createGesture({
      el: card!,
      gestureName: "my-swipe",
      direction: "y",
      /**
       * when moving, we start to show more of the drawer
       */
      onMove: event => {
        if (event.deltaY < -730) return;

        // closing with a downward swipe
        if (event.deltaY > 30) {
          card!.style.transform = "";
          card!.dataset!.open = "false";
          return;
        }

        card!.style.transform = `translateY(${event.deltaY}px)`;
      },
      /**
       * when the moving is done, based on a specific delta in the movement; in this
       * case that value is -150, we determing the user wants to open the drawer.
       *
       * if not we just reset the drawer state to closed
       */
      onEnd: event => {
        card!.style.transition = ".3s ease-out";

        if (event.deltaY < -30 && card!.dataset.open !== "true") {
          card!.style.transform = `translateY(${-680}px) `;
          card!.dataset.open = "true";
          console.log("in on end");
        }
      }
    });

    // enable the gesture for the item
    gesture.enable(true);
  }, []);

  // useEffect(() => {
  //   dispatch(setIsLoading(true));
  //   setTimeout(() => {
  //     dispatch(setIsLoading(false));
  //   }, 1500);
  // }, [listings]);

  useEffect(() => {
    if (listings && userFavourites) {
      setFavItems(filterArray(listings, userFavourites));
    }
  }, [listings, userFavourites]);

  // Random component
  const Completionist = () => <span>Expired</span>;

  // Renderer callback with condition
  const renderer = (props: any) => {
    if (props.completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {props.days > 0 ? props.days + "d:" : ""}
          {props.hours}:{props.minutes}:{props.seconds}
        </span>
      );
    }
  };
  const toggleDrawer = () => {
    //let c = drawerRef.current;
    const c = document.getElementById("bottomUpCard");
    if (c?.dataset.open === "true") {
      c.style.transition = ".3s ease-out";
      c.style.transform = "";
      c.dataset.open = "false";
      setDrawerPosition(true);
    } else {
      c!.style.transition = ".3s ease-in";
      c!.style.transform = `translateY(${-680}px) `;
      c!.dataset.open = "true";
      setDrawerPosition(false);
    }
  };
  const onClickItem = (item: Item) => {
    // setIsLoading(true);
    dispatch(setSelectItem(item));
    setIsListingDetailOpen(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   history.push("/listingdetails");
    // }, 1000);
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
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    window.location.reload();
  }
  return (
    <IonPage>
      <IonHeader className="header-custom" translucent>
        <IonToolbar className="toolbar-no-border toolbar-no-safe-area">
          <IonSegment
            className="segment-custom"
            value={segmentView}
            onIonChange={(e) => setSegmentView(e.detail.value as string)}
            mode="md"
          >
            <IonSegmentButton value="LIST">
              <IonLabel>Listings</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FAVS">
              <IonLabel>Watching</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="matches-page">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            refreshingSpinner="circles"
            refreshingText="Reloading Listings.."
          ></IonRefresherContent>
        </IonRefresher>

        <div>
          <div className="list-header">
            <IonText color="primary">
              <strong>Top picks</strong>
            </IonText>
          </div>

          <div className="scroll-horizontal matches-list">
            {listings.map((item) => (
              <div
                className="scroll-item matches-item"
                key={item._id + "toppicks"}
                onClick={() => {
                  dispatch(updateItemViews(item._id!));
                  onClickItem(item);
                }}
              >
                <TopPicksItems size="lg" item={item} />
                <div className="scroll-item-title text-ellipsis">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        {!isLoading && (
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
                  {/* {!showSearchbar && (
                    <IonButton onClick={() => setShowFilterModal(true)}>
                      <IonIcon icon={options} slot="icon-only" />
                    </IonButton>
                  )} */}
                </IonButtons>

                <IonGrid>
                  <IonRow id="cards">
                    {listings.map((item: Item, itemIndex: number) => (
                      <IonCol key={itemIndex} id={"card" + itemIndex}>
                        <IonCard
                          style={{
                            width: `${cardWidth}px`,
                            height: "230px",
                            margin: "auto",
                          }}
                        >
                          <IonCardContent
                            onClick={() => {
                              dispatch(updateItemViews(item._id!));
                              onClickItem(item);
                            }}
                            style={{
                              padding: "0",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            {item && item.item_images && (
                              <MainListingImgSwiper images={item.item_images} />
                            )}
                            {isAuthenticated && (
                              <span
                                className={
                                  isFavourite(item._id!)
                                    ? "verified-button"
                                    : "not-verified-button"
                                }
                              >
                                <IonIcon
                                  icon={checkmarkDone}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(
                                      toggleFavourite(
                                        item._id!,
                                        CurrentUser._id
                                      )
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                />
                              </span>
                            )}
                            <div className="listing-card-caption">
                              <IonRow className="ion-justify-content-center ion-align-items-center">
                                <IonCol>
                                  <div>
                                    <IonLabel>{item.title}</IonLabel>
                                    <IonGrid style={{ color: "#fff" }}>
                                      <IonRow>
                                        <IonCol>
                                        <IonText>
                                            Expire
                                          </IonText>
                                        </IonCol>
                                        <IonCol>
                                        <IonText>
                                            Price
                                          </IonText>
                                        </IonCol>
                                      </IonRow>
                                      <IonRow>
                                        <IonCol>
                                          <IonText>
                                            <Countdown
                                              date={item.enddate}
                                              renderer={renderer}
                                            />
                                          </IonText>
                                        </IonCol>
                                        <IonCol>
                                          <IonText>
                                            £{item.price}
                                          </IonText>
                                        </IonCol>
                                      </IonRow>
                                    </IonGrid>
                                  </div>
                                </IonCol>
                              </IonRow>
                            </div>
                            {item.status && item.status === "sold" && (
                              <div className="stamp stamp-sold">SOLD</div>
                            )}
                            {item.status && item.status === "pending" && (
                              <div className="stamp stamp-pending">PENDING</div>
                            )}
                          </IonCardContent>
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
                              width: `${cardWidth}px`,
                              height: "230px",
                              margin: "auto",
                            }}
                          >
                            <IonCardContent
                              onClick={() => {
                                dispatch(updateItemViews(item._id!));
                                onClickItem(item);
                              }}
                              style={{
                                padding: "0",
                                cursor: "pointer",
                                textAlign: "center",
                              }}
                            >
                              {item && item.item_images && (
                                <MainListingImgSwiper
                                  images={item.item_images}
                                />
                              )}
                              {isAuthenticated && (
                                <span
                                  className={
                                    isFavourite(item._id!)
                                      ? "verified-button"
                                      : "not-verified-button"
                                  }
                                >
                                  <IonIcon
                                    icon={checkmarkDone}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      dispatch(
                                        toggleFavourite(
                                          item._id!,
                                          CurrentUser._id
                                        )
                                      );
                                    }}
                                    style={{ cursor: "pointer" }}
                                  />
                                </span>
                              )}
                              <div className="listing-card-caption">
                                <IonRow className="ion-justify-content-center ion-align-items-center">
                                  <IonCol>
                                    <div>
                                      <IonLabel>{item.title}</IonLabel>
                                      <IonGrid>
                                        <IonRow>
                                          <IonCol>
                                            <IonNote style={{ color: "#fff" }}>
                                              Exp:
                                              <Countdown
                                                date={item.enddate}
                                                renderer={renderer}
                                              />
                                            </IonNote>
                                          </IonCol>
                                          <IonCol>
                                            <IonNote style={{ color: "#fff" }}>
                                              £{item.price}
                                            </IonNote>
                                          </IonCol>
                                        </IonRow>
                                      </IonGrid>
                                    </div>
                                  </IonCol>
                                </IonRow>
                              </div>
                              {item.status && item.status === "sold" && (
                                <div className="stamp stamp-sold">SOLD</div>
                              )}
                              {item.status && item.status === "pending" && (
                                <div className="stamp stamp-pending">
                                  PENDING
                                </div>
                              )}
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      ))}
                  </IonRow>
                </IonGrid>
              </div>
            )}
          </div>
        )}
        
      </IonContent>
      <IonCard className="bottom-drawer" id="bottomUpCard">
          <div style={{ textAlign: "right" }}>
            <IonButton
              // expand="full"
              size="small"
              fill="clear"
              slot="end"
              style={{ height: 20 }}
              onClick={toggleDrawer}
            >
             Filters <IonIcon slot="end" icon={drawerPosition ? chevronUp: chevronDown}></IonIcon>
            </IonButton>
          </div>
          {/* <IonCardHeader>Filters</IonCardHeader> */}
          <ListingFilters />
        </IonCard>                            
      {/* <IonModal
        swipeToClose
        isOpen={showFilterModal}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <ListingFilters onClose={() => setShowFilterModal(false)} />
      </IonModal> */}
       {/* <IonPopover
        cssClass='my-custom-class'
        isOpen={showFilterModal}
        // onDidDismiss={() => setShowFilterModal(false)}
      >
        <ListingFilters onClose={() => setShowFilterModal(false)} />
      </IonPopover>
  */}
      <IonModal 
        isOpen={isListingDetailOpen}
        backdropDismiss={false}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <ListingDetails
          onClose={() => setIsListingDetailOpen(false)}
        />
      </IonModal>
    </IonPage>
  );
};

Listings.defaultProps = {};

export default Listings;
