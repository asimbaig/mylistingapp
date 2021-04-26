import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonGrid,
  IonCardContent,
  IonCard,
  IonNote,
  IonLabel,
  IonContent,
  IonIcon,
  IonButton,
  IonRow,
  IonCol,
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import {
  ellipsisHorizontal,
  heart,
  chatbubbles,
  briefcaseOutline,
  locationOutline,
  arrowRedo,
  arrowUndo,
  thumbsUp,
  trash,
  reloadCircle,
} from "ionicons/icons";
import "./MyListings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { setIsLoading } from "../../redux/appSlice";

type Props = {};

const MyListings: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const mylistings = useSelector((state: RootState) => state.listings.myItems);

  useEffect(() => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1500);
  }, []);

  return (
    <IonPage>
      <IonContent className="highlights-page">
        <div className="boost-promotion">MY LISTINGS</div>

        <IonList>
          {!isLoading &&
            mylistings &&
            mylistings.map((item, index) => (
              <IonItemSliding key={index} style={{ marginBottom: "5px" }}>
                <IonItem
                  onClick={() => {}}
                >
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                    {item.item_images && item.item_images.length > 0 ? (
                      // <img
                      //   src={item.item_images[0]}
                      //   alt=""
                      //   style={{ width: "100%", height: "220px" }}
                      // />
                      <div className="slide-img background-img" style={{ backgroundImage: `url('${ item.item_images[0] }')`, height: "200px" }} />
                    ) : (
                      // <img
                      //   src="./assets/images/itemnophoto.jpg"
                      //   alt=""
                      //   style={{ width: "100%", height: "220px" }}
                      // />
                      <div className="slide-img background-img" style={{ backgroundImage: `url("./assets/images/itemnophoto.jpg")` }} />
                    )}
                    </IonCol>
                    <IonCol>
                      <h3>{item.title}</h3>

                      <p>£{item.price}</p>

                      <p>{item.enddate.substring(0,16)}</p>
                      
                      <p>Views: {item.views}</p>
                    </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>

                <IonItemOptions side="start">
                  <IonItemOption
                    color="success"
                    onClick={() => console.log("item 1")}
                  >
                    <IonIcon slot="icon-only" icon={reloadCircle} />
                  </IonItemOption>
                </IonItemOptions>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => console.log("item 2")}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

MyListings.defaultProps = {};

export default MyListings;
