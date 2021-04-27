import React, { useEffect, useState, useRef } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonLabel,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonToggle,
  IonTextarea,
  IonNote,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonPicker,
} from "@ionic/react";
import { add } from "ionicons/icons";
import "./ItemInputForm.scss";
import { rangeArray } from "../../utils/utils";
import { usePhotoGallery, Photo } from "../../hooks/usePhotoGallery";
import { ItemModel } from "../../redux/itemType";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { updateUserImages, deleteUserImage } from "../../redux/authSlice";
import { imgBaseUrl } from "../../redux/api-ref";
import { deletePhotoById } from "../../services/photoService";
import { useForm } from "react-hook-form";
import { PickerColumn } from "@ionic/core";

type Props = {
  onClose: () => void;
};
const DayColumn = {
  name: "Day",
  options: [
    { text: "Monday", value: "Monday" },
    { text: "Tuesday", value: "Tuesday" },
    { text: "Wednesday", value: "Wednesday" },
    { text: "Thursday", value: "Thursday" },
    { text: "Friday", value: "Friday" },
  ],
} as PickerColumn;
let TotalImageSlots = 3;
const customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];

const ItemInputForm: React.FC<Props> = ({ onClose }) => {
  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  const { photos, takePhoto, deletePhoto, returnPhoto } = usePhotoGallery();
  const [imageSlotsAvailable, setImageSlotsAvailable] = useState(
    TotalImageSlots - CurrentUser.profileImages.length
  );
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<string>(
    "2012-12-15T13:47:20.789"
  );
  const [aboutMe, setAboutMe] = useState<string>("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    if (returnPhoto) {
      dispatch(updateUserImages(returnPhoto, CurrentUser._id));
    }
  }, [returnPhoto]);

  useEffect(() => {
    setImageSlotsAvailable(TotalImageSlots - CurrentUser.profileImages.length);
  }, [CurrentUser.profileImages.length]);

  return (
    <>
      <IonHeader className="header-custom">
        <IonToolbar>
          <IonTitle>Create Listing</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={() => onClose()}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-edit-page bg-light">
        <div className="full-height">
          <div className="segment-view">
            <div className="photos-edit">
              <IonGrid>
                <IonRow>
                  {/* {CurrentUser && (CurrentUser.profileImages.length> 0) &&
                      CurrentUser.profileImages.map((photo, index) => (
                      <IonCol
                        size="4"
                        className="photo-item"
                        key={"photo" + index}
                      >
                        <div
                          className="photo-image background-img"
                          style={{
                            backgroundImage: `url(${imgBaseUrl + photo.filename})`,
                          }}
                        />
                        <div className="photo-button">
                          <IonIcon
                            icon={close}
                            onClick={() => {
                              deletePhotoById(photo.file_id!).then((res)=>{
                                dispatch(deleteUserImage(photo, CurrentUser._id));
                              }).catch(err=>console.log(err));
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </IonCol>
                    ))} */}
                  {[1, 2, 3].map((i) => (
                    <IonCol size="4" className="photo-item no-photo" key={i}>
                      <div className="photo-image background-img" />
                      <div className="photo-button photo-button-invert">
                        <IonIcon
                          icon={add}
                          onClick={() => {
                            takePhoto();
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>CATEGORY</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonSelect
                  okText="Okay"
                  cancelText="Dismiss"
                  name="start"
                  // ref={register}
                  onIonChange={(e) => {
                    console.log(parseInt(e.detail.value));
                  }}
                >
                  <IonSelectOption value="0">00</IonSelectOption>
                  <IonSelectOption value="1">01</IonSelectOption>
                  <IonSelectOption value="2">02</IonSelectOption>
                  <IonSelectOption value="3">03</IonSelectOption>
                  <IonSelectOption value="4">04</IonSelectOption>
                  <IonSelectOption value="5">05</IonSelectOption>
                  <IonSelectOption value="6">06</IonSelectOption>
                  <IonSelectOption value="7">07</IonSelectOption>
                  <IonSelectOption value="8">08</IonSelectOption>
                  <IonSelectOption value="9">09</IonSelectOption>
                  <IonSelectOption value="10">10</IonSelectOption>
                  <IonSelectOption value="11">11</IonSelectOption>
                  <IonSelectOption value="12">12</IonSelectOption>
                  <IonSelectOption value="13">13</IonSelectOption>
                  <IonSelectOption value="14">14</IonSelectOption>
                  <IonSelectOption value="15">15</IonSelectOption>
                  <IonSelectOption value="16">16</IonSelectOption>
                  <IonSelectOption value="17">17</IonSelectOption>
                  <IonSelectOption value="18">18</IonSelectOption>
                  <IonSelectOption value="19">19</IonSelectOption>
                  <IonSelectOption value="20">20</IonSelectOption>
                  <IonSelectOption value="21">21</IonSelectOption>
                  <IonSelectOption value="22">22</IonSelectOption>
                  <IonSelectOption value="23">23</IonSelectOption>
                  <IonSelectOption value="24">24</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>CATEGORY</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonButton
                  onClick={() => {
                    setIsCategoryOpen(true);
                  }}
                >
                  Select Session
                </IonButton>
                <IonPicker
                  isOpen={isCategoryOpen}
                  columns={[DayColumn]}
                  buttons={[
                    {
                      text: "Cancel",
                      role: "cancel",
                      handler: (value) => {
                        setIsCategoryOpen(true);
                      },
                    },
                    {
                      text: "Confirm",
                      handler: (value) => {
                        //onSave(value)
                      },
                    },
                  ]}
                ></IonPicker>
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>TITLE</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonInput />
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>DESCRIPTION</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonTextarea
                  rows={3}
                  onIonChange={(e) => setAboutMe(e.detail.value as string)}
                />
              </IonItem>
              <IonItem lines="none">
                <IonNote slot="end">{500 - aboutMe!.length}</IonNote>
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>PRICE</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonInput />
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>START</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonDatetime
                  displayFormat="D MMM YYYY H:mm"
                  min="1997"
                  max="2030"
                  value={new Date().toString()}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                ></IonDatetime>
                <IonNote slot="end">Will be listed for 7 days</IonNote>
              </IonItem>
            </IonList>

            <div className="safe-area-bottom">
              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>CONTROL YOUR PROFILE </IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonLabel>Don't Show My Distance</IonLabel>
                  <IonToggle color="primary" checked={false} />
                </IonItem>
              </IonList>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
};

ItemInputForm.defaultProps = {};

export default ItemInputForm;
