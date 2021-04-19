import React, { useState, useEffect } from 'react';
import {
  IonPage, IonGrid, IonCardContent, IonCard, IonNote, IonLabel, IonContent, IonText, IonButton, IonRow, IonCol
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './MyListings.scss';
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { setIsLoading } from "../../redux/appSlice";

type Props = {}

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
        <div className="boost-promotion">
            MY LISTINGS
        </div>
        <IonGrid>
                <IonRow id="cards">
                  {!isLoading && mylistings && mylistings.map((item: Item, itemIndex: number) => (
                    <IonCol key={itemIndex} id={"card" + itemIndex}>
                      <IonCard
                        style={{
                          width: "250px",
                          height: "240px",
                          margin: "auto",
                        }}
                      >
                        <IonCardContent
                          // onClick={() => onClickItem(item)}
                          style={{ padding: "0", cursor: "pointer" }}
                        >
                          <img
                            src={item.item_images[0]}
                            alt=""
                            style={{ width: "250px", height: "180px" }}
                          />

                          <div>
                            <IonLabel>{item.title}</IonLabel>
                            <br />
                            <IonNote>
                              Expire: {item.enddate.substr(0, 10)}
                            </IonNote>
                          </div>
                        </IonCardContent>
                        {/* <IonRow no-padding>
                          <IonCol>
                            {isAuthenticated &&
                              (isFavourite(item._id) ? (
                                <IonButton
                                  expand="full"
                                  fill="clear"
                                  color="danger"
                                  size="small"
                                  onClick={() => {
                                    dispatch(toggleFavourite(item._id));
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
                                    dispatch(toggleFavourite(item._id));
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
                        </IonRow> */}
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>



      </IonContent>
    </IonPage>
  );
};

MyListings.defaultProps = {

}

export default MyListings;
