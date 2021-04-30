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
  IonText,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { reload, options, search, close } from "ionicons/icons";
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
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";
import { setIsLoading } from "../../redux/appSlice";
import Countdown from "react-countdown";
import TopPicksItems from "../../components/TopPicksItems/TopPicksItems";
import { imgBaseUrl } from "../../redux/api-ref";
import { createGroups } from "../../utils/utils";

type Props = {
  history: any;
};

const MainListings: React.FC<Props> = ({ history }) => {
  const windowWidth = window.innerWidth;
  const [itemsGroups, setItemsGroups] = useState<Item[][]>();
  const [cardWidth, setCardWidth] = useState(200);
  const [favItems, setFavItems] = useState<Item[]>();
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
  const filterArray = (items: Item[], favoriteIds: string[]) => {
    const filteredItems = items.filter((i) => favoriteIds.indexOf(i._id!) > -1);
    return filteredItems;
  };
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  useEffect(() => {
    if (windowWidth <= 375) {
      setCardWidth(160);
    } else {
      setCardWidth(200);
    }
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    //if (listings.length > 0) {
      setItemsGroups(createGroups(listings, Math.ceil(listings.length / 4)));
    //}
  }, [listings]);

  useEffect(() => {
    if (listings && userFavourites) {
      setFavItems(filterArray(listings, userFavourites));
    }
  }, [listings, userFavourites]);

  // Random component
  const Completionist = () => <span>Expired!!</span>;

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
      <IonContent className="">
      <IonSearchbar
            showCancelButton="always"
            placeholder="Search"
            onIonChange={(e: CustomEvent) => {
              var parenrRow = document.getElementById("slides");
              parenrRow!.remove();
              dispatch(setSearchText(e.detail.value));
              dispatch(loadItems());
            }}
            onIonCancel={() => setShowSearchbar(false)}
          ></IonSearchbar>
        <div id="slides">
        {itemsGroups && itemsGroups.length > 0 && (
          <IonSlides pager={true} options={slideOpts}>
            {itemsGroups.map((itemsGroup, groupIndex) => {
              return (
                <IonSlide key={"slide" + groupIndex}>
                  <IonGrid>
                    <IonRow>
                      {itemsGroup.map((item: Item, itemIndex: number) => (
                        <IonCol key={itemIndex} id={"card" + itemIndex}>
                          <IonCard
                            style={{
                              width: `${cardWidth}px`,
                              height: "250px",
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
                              {item.item_images &&
                              item.item_images.length > 0 ? (
                                <img
                                  src={
                                    imgBaseUrl + item.item_images[0].filename
                                  }
                                  alt=""
                                  style={{
                                    width: `${cardWidth}px`,
                                    height: "180px",
                                  }}
                                />
                              ) : (
                                <img
                                  src={
                                    imgBaseUrl +
                                    "86b27f95d6f85147e8ac12616f841238.jpg"
                                  }
                                  alt=""
                                  style={{
                                    width: `${cardWidth}px`,
                                    height: "180px",
                                  }}
                                />
                              )}

                              <div>
                                <IonLabel>{item.title}</IonLabel>
                                <IonGrid>
                                  <IonRow>
                                    <IonCol>
                                      <IonNote>
                                        Exp:
                                        <Countdown
                                          date={item.enddate}
                                          renderer={renderer}
                                        />
                                      </IonNote>
                                    </IonCol>
                                    <IonCol>
                                      <IonNote>£{item.price}</IonNote>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </div>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </IonSlide>
              );
            })}
          </IonSlides>
        )}
        </div>

        {/* <IonButtons slot="end">
          
            <IonButton onClick={() => setShowSearchbar(true)}>
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
            <IonButton onClick={() => setShowFilterModal(true)}>
              <IonIcon icon={options} slot="icon-only" />
            </IonButton>
        </IonButtons>
        */}
        {/* <IonGrid>
                <IonRow id="cards">
                  {listings.map((item: Item, itemIndex: number) => (
                    <IonCol key={itemIndex} id={"card" + itemIndex}>
                      <IonCard
                        style={{
                          width: `${cardWidth}px`,
                          height: "250px",
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
                          {item.item_images && item.item_images.length > 0 ? (
                            <img
                              src={imgBaseUrl + item.item_images[0].filename}
                              alt=""
                              style={{
                                width: `${cardWidth}px`,
                                height: "180px",
                              }}
                            />
                          ) : (
                            <img
                              src={imgBaseUrl+"86b27f95d6f85147e8ac12616f841238.jpg"}
                              alt=""
                              style={{
                                width: `${cardWidth}px`,
                                height: "180px",
                              }}
                            />
                          )}

                          <div>
                            <IonLabel>{item.title}</IonLabel>
                            <IonGrid>
                                <IonRow>
                                  <IonCol>
                                    <IonNote>
                                      Exp:
                                      <Countdown
                                        date={item.enddate}
                                        renderer={renderer}
                                      />
                                    </IonNote>
                                  </IonCol>
                                  <IonCol>
                                    <IonNote>£{item.price}</IonNote>
                                  </IonCol>
                                </IonRow>
                              </IonGrid>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
       */}
      </IonContent>
      <IonModal
        swipeToClose
        isOpen={showFilterModal}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <IonContent>
          <div style={{ textAlign: "center" }}>
            <h1>Filter</h1>
          </div>

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

MainListings.defaultProps = {};

export default MainListings;
