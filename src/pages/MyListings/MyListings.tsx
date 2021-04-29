/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonGrid,
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
  IonFab,
  IonModal,
} from "@ionic/react";
import { trash, create, add } from "ionicons/icons";
import "./MyListings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { setIsLoading } from "../../redux/appSlice";
import ItemInputForm from "../ItemInputForm/ItemInputForm";
import ItemEditForm from "../ItemEditForm/ItemEditForm";
import { imgBaseUrl } from "../../redux/api-ref";

type Props = {};

const MyListings: React.FC<Props> = () => {
  const [isInputFormOpen, setIsInputFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | undefined>();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const mylistings = useSelector((state: RootState) => state.listings.myItems);

  useEffect(() => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 1500);
  }, []);
  // useEffect(() => {
  //   if(isEditFormOpen)
  //     setEditItem(undefined);
  // }, [isEditFormOpen]);

  return (
    <IonPage>
      <IonContent className="highlights-page">
        <div className="boost-promotion">MY LISTINGS</div>

        <IonList>
          {isAuthenticated &&
            !isLoading &&
            mylistings &&
            mylistings.map((item, index) => (
              <IonItemSliding key={index} style={{ marginBottom: "5px" }}>
                <IonItem onClick={() => {}}>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        {item.item_images && item.item_images.length > 0 ? (
                          <div
                            className="slide-img background-img"
                            style={{
                              backgroundImage: `url('${
                                imgBaseUrl + item.item_images[0].filename
                              }')`,
                              height: "200px",
                            }}
                          />
                        ) : (
                          <div
                            className="slide-img background-img"
                            style={{
                              backgroundImage: `url("./assets/images/itemnophoto.jpg")`,
                            }}
                          />
                        )}
                      </IonCol>
                      <IonCol>
                        <h3>{item.title}</h3>

                        <p>£{item.price}</p>

                        <p>{item.enddate.substring(0, 16)}</p>

                        <p>Views: {item.views}</p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>

                <IonItemOptions side="start">
                  <IonItemOption
                    color="success"
                    onClick={() => {
                      setEditItem(item);
                      setIsEditFormOpen(true);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={create} />
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
          {!isAuthenticated && (
            <div style={{ width: "100%", textAlign: "center" }}>
              Please Login to view this content
            </div>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton
            color="white"
            className="button-custom button-icon button-sm button-brand"
            onClick={() => setIsInputFormOpen(true)}
          >
            <IonIcon icon={add} slot="icon-only" />
          </IonButton>
        </IonFab>
      </IonContent>
      <IonModal isOpen={isInputFormOpen} backdropDismiss={false}>
        <ItemInputForm onClose={() => setIsInputFormOpen(false)} />
      </IonModal>
      <IonModal isOpen={isEditFormOpen} backdropDismiss={false}>
        <ItemEditForm
          currentItem={editItem!}
          onClose={() => {
            setIsEditFormOpen(false);
            //setEditItem(undefined);
          }}
        />
      </IonModal>
    </IonPage>
  );
};

MyListings.defaultProps = {};

export default MyListings;
