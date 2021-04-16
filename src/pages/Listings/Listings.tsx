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
  IonText,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonCard,
  IonCardContent,
  IonItem,
  IonNote,
  IonLoading,
} from "@ionic/react";
import {
  heart,
  ellipsisHorizontal,
  chatbubbles,
  briefcaseOutline,
  locationOutline,
  shareSocial,
  starOutline,
  star,
} from "ionicons/icons";
import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";
import LabelMatched from "../../components/LabelMatched/LabelMatched";
import "./Listings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { loadItems, setSelectItem } from "../../redux/itemSlice";

type Props = {
  history: any;
};

const Listings: React.FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [segmentView, setSegmentView] = useState<string>("LIST");
  const dispatch = useDispatch();
  const listings = useSelector((state: RootState) => state.listings.items);

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const onClickItem = (item: Item) => {
    setIsLoading(true);
    dispatch(setSelectItem(item));
    setTimeout(() => {
      setIsLoading(false);
      history.push("/listingdetails");
    }, 1000);
  };

  const feedItems: any[] = [
    { url: "assets/img/avatars/hieu.png" },
    { url: "assets/img/avatars/thor.png" },
    { url: "assets/img/avatars/blackpanther.png" },
  ];

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
        <IonLoading
          isOpen={isLoading}
          message={"Logging in..."}
          duration={1000}
        />
        <div className="safe-area-bottom">
          {segmentView === "LIST" && (
            <div>
              <div className="border-bottom">
                <IonSearchbar
                  placeholder="Search Listings"
                  className="search-bar"
                ></IonSearchbar>
              </div>
              <IonGrid>
                <IonRow>
                  {listings.map((item: Item, itemIndex: number) => (
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
                            <IonNote>Expire: {item.enddate}</IonNote>
                          </IonItem>
                        </IonCardContent>
                        <IonRow no-padding>
                          <IonCol>
                            {
                              <IonButton
                                expand="full"
                                fill="clear"
                                color="danger"
                                size="small"
                                onClick={() => {
                                  // removeFavoriteItem();
                                }}
                              >
                                <IonIcon slot="start" icon={star}></IonIcon>
                              </IonButton>
                              // :
                              // <IonButton expand="full" fill="clear" color="danger" size="small"
                              //   onClick={(event) => {
                              //     event.stopPropagation();
                              //     addFavoriteItem();
                              //   }}>
                              //   <IonIcon slot="start" icon={starOutline}></IonIcon>
                              // </IonButton>
                            }
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
              {/* <div>
                <div className="list-header">
                  <IonText color="primary">
                    <strong>New matches</strong>
                  </IonText>
                </div>

                <div className="scroll-horizontal matches-list">
                  <div className="scroll-item matches-item matches-item-likes">
                    <div className="profile-image">
                      <div className="profile-image-inner">
                        <RandomAvatar size="lg" />
                      </div>

                      <div className="likes-count">99+</div>
                      <div className="like-gold">
                        <IonIcon icon={heart} />
                      </div>
                    </div>
                    <div className="scroll-item-title text-ellipsis">Likes</div>
                  </div>
                  {messages.map((name) => (
                    <div
                      className="scroll-item matches-item"
                      key={name}
                      onClick={goToChat}
                    >
                      <div className="profile-image">
                        <RandomAvatar size="lg" />
                        <div className="online-status" />
                      </div>
                      <div className="scroll-item-title text-ellipsis">
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              <div>
                {/* <div className="list-header">
                  <IonText color="secondary">
                    <strong>Messages</strong>
                  </IonText>
                </div> */}
                {/* <div className="message-list">
                  {messages.map((name) => (
                    <IonRow
                      className="ion-align-items-center"
                      key={name}
                      onClick={goToChat}
                    >
                      <IonCol size="auto">
                        <RandomAvatar size="lg" />
                      </IonCol>
                      <IonCol className="message-item-text">
                        <div>
                          <div className="user-name">{name}</div>
                          <IonText color="medium">Sent you a GIPHY</IonText>
                        </div>
                      </IonCol>
                    </IonRow>
                  ))}
                </div> */}
              </div>
            </div>
          )}

          {segmentView === "FAVS" && (
            <div>
              {feedItems.map((item) => (
                <div className="feed-item" key={item.url}>
                  <IonRow className="feed-item-header ion-align-items-center">
                    <IonCol size="auto">
                      <RandomAvatar size="md" />
                    </IonCol>
                    <IonCol>
                      <div>
                        <div className="user-name">Tinder Man</div>
                        <div className="secondary-info">New match!</div>
                      </div>
                    </IonCol>
                    <IonCol size="auto">
                      <IonIcon icon={ellipsisHorizontal} color="medium" />
                    </IonCol>
                  </IonRow>

                  <div className="feed-item-cover">
                    <div
                      style={{ backgroundImage: `url(${item.url})` }}
                      className="background-img"
                    />

                    {/* <div className="matched-overlay">
                      <LabelMatched />
                    </div> */}
                  </div>

                  <div className="feed-item-footer">
                    {/* <div className="feed-item-buttons">
                      <IonButton
                        color="white"
                        className="button-custom button-icon button-xs"
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={heart}
                          className="color-green"
                        />
                      </IonButton>
                      <IonButton
                        color="white"
                        className="button-custom button-icon button-xs"
                      >
                        <IonIcon
                          slot="icon-only"
                          icon={chatbubbles}
                          className="color-blue"
                        />
                      </IonButton>
                    </div> */}
                    {/* <div className="profile-user-info">
                      <div className="info-item">
                        <IonIcon icon={briefcaseOutline} />
                        Front-End, UX/UI lover
                      </div>
                      <div className="info-item">
                        <IonIcon icon={locationOutline} />
                        less than a kilometer away
                      </div>
                      <div className="secondary-info">February 14</div>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

Listings.defaultProps = {};

export default Listings;
