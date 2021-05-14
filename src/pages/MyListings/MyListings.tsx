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
  IonModal,IonText,IonAlert
} from "@ionic/react";
import { trash, create, add } from "ionicons/icons";
import "./MyListings.scss";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Item } from "../../redux/itemType";
import { setIsLoading } from "../../redux/appSlice";
import { deleteItem } from "../../redux/itemSlice";
import ItemInputForm from "../ItemInputForm/ItemInputForm";
import ItemEditForm from "../ItemEditForm/ItemEditForm";
import { imgBaseUrl } from "../../redux/api-ref";
import {
  modalEnterZoomOut,
  modalLeaveZoomIn,
} from "../../animations/animations";
import GeneralPopOver from "../../components/GeneralPopOver/GeneralPopOver";

type Props = {};

const MyListings: React.FC<Props> = () => {
  const [isInputFormOpen, setIsInputFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [confirmDeleteAlert, setConfirmDeleteAlert] =useState(false);
  const [selectToDel, setSelectToDel] = useState<Item>();
  const [editItem, setEditItem] = useState<Item | undefined>();
  const [showPopOver, setShowPopOver] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const mylistings = useSelector((state: RootState) => state.listings.myItems);
  const showAppHint = useSelector((state: RootState) => state.auth.user.showAppHint);
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
                        <div
                          style={{
                            marginLeft: "5px",
                            borderRadius: "25px",
                            background: "#A9A9A9",
                            padding: "10px",
                            height: "100%",
                            textAlign: "center",
                            border: "5px dashed grey"
                          }}
                        >
                          <IonText>{item.title}</IonText>
                          <br/>
                          <IonText>Price : £{item.price}</IonText>
                          <br/>
                          <IonText>Expires on :{item.enddate.substring(0, 16)}</IonText>
                          <br/>
                          <div>Views : {item.views}</div>
                        </div>
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
                    onClick={() => {
                      setSelectToDel(item);
                      setConfirmDeleteAlert(true);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          {!isAuthenticated && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <div>Please Login to view this content</div>
              <div>
                <a href="/login">Login</a>
              </div>
            </div>
          )}
        </IonList>
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
          style={{ marginRight: "30px" }}
        >
          <IonButton
            color="white"
            className="button-custom button-icon button-sm button-brand"
            onClick={() => setIsInputFormOpen(true)}
          >
            <IonIcon icon={add} slot="icon-only" />
          </IonButton>
        </IonFab>
      </IonContent>
      <IonModal
        isOpen={isInputFormOpen}
        backdropDismiss={false}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <ItemInputForm onClose={() => setIsInputFormOpen(false)} />
      </IonModal>
      <IonModal
        isOpen={isEditFormOpen}
        backdropDismiss={false}
        enterAnimation={modalEnterZoomOut}
        leaveAnimation={modalLeaveZoomIn}
      >
        <ItemEditForm
          currentItem={editItem!}
          onClose={() => {
            setIsEditFormOpen(false);
            //setEditItem(undefined);
          }}
        />
      </IonModal>
      {showAppHint && isAuthenticated &&
      <IonModal
          swipeToClose
          isOpen={showPopOver}
          enterAnimation={modalEnterZoomOut}
          leaveAnimation={modalLeaveZoomIn}
          cssClass="fullscreen popover"
        >
          <GeneralPopOver 
          msg="Swipe Left or Right, For delete or edit options"
          imgurl="./assets/img/swipe.gif"
          onClose={()=>setShowPopOver(false)} />
        </IonModal>}
      <IonAlert
          isOpen={confirmDeleteAlert}
          header={'Please Confirm!'}
          message={'Do you really want to delete this item? (This functionality temporarily disabled)'}
          buttons={[
            {
              text: 'Nope',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {}
            },
            {
              text: 'Yeah',
              handler: () => {
                // dispatch(deleteItem(selectToDel!))
              }
            }
          ]}
          onDidDismiss={() => setConfirmDeleteAlert(false)}
          cssClass='my-custom-class'
        />
    </IonPage>
  );
};

MyListings.defaultProps = {};

export default MyListings;
