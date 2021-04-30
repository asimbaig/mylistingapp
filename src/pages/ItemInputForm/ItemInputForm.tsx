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
  IonText,
  IonRadioGroup,
  IonRadio,
  IonItemDivider,
  IonToast,
} from "@ionic/react";
import { add, close } from "ionicons/icons";
import "./ItemInputForm.scss";
import { rangeArray } from "../../utils/utils";
import { usePhotoGallery, Photo } from "../../hooks/usePhotoGallery";
import { Item } from "../../redux/itemType";
import { PhotoModel } from "../../redux/photoType";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { imgBaseUrl } from "../../redux/api-ref";
import { deletePhotoById } from "../../services/photoService";
import { PickerColumn } from "@ionic/core";
import { addItem } from "../../redux/itemSlice";
import { addDays } from "../../utils/utils";

type Props = {
  onClose: () => void;
};
const DayColumn = {
  name: "Category",
  options: [
    { text: "Services", value: 0 },
    { text: "Home", value: 1 },
    { text: "Jobs", value: 2 },
    { text: "Property", value: 3 },
    { text: "Pets", value: 4 },
  ],
} as PickerColumn;

const SubDayColumn = [
  {
    name: "SubCategory",
    options: [
      { text: "Plumber", value: "Plumber" },
      { text: "Electrician", value: "Electrician" },
      { text: "FoodDrink", value: "FoodDrink" },
      { text: "Transport", value: "Transport" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Appliances", value: "Appliances" },
      { text: "Tools", value: "Tools" },
      { text: "Furniture", value: "Furniture" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "IT", value: "IT" },
      { text: "Marketing", value: "Marketing" },
      { text: "Management", value: "Management" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Land", value: "Land" },
      { text: "Domestic", value: "Domestic" },
      { text: "Commercial", value: "Commercial" },
    ],
  },
  {
    name: "SubCategory",
    options: [
      { text: "Animal", value: "Animal" },
      { text: "Bird", value: "Bird" },
    ],
  },
] as PickerColumn[];

let TotalImageSlots = 3;

const ItemInputForm: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const CurrentUser = useSelector((state: RootState) => state.auth.user);
  const { takePhoto, returnPhoto } = usePhotoGallery();
  const [itemPhotos, setItemPhotos] = useState<PhotoModel[]>([]);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [condition, setCondition] = useState<string>();
  const [status, setStatus] = useState<string>("active");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState<number | undefined>();
  const [categoryText, setCategoryText] = useState<string | undefined>();
  const [subCategoryValue, setSubCategoryValue] = useState<
    string | undefined
  >();
  const [subCategoryText, setSubCategoryText] = useState<string | undefined>();
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [subCategory, setSubCategory] = useState<PickerColumn>();
  const [imageSlotsAvailable, setImageSlotsAvailable] = useState(
    TotalImageSlots - (itemPhotos ? itemPhotos?.length! : 0)
  );
  const [startDate, setStartDate] = useState<string>();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (returnPhoto) {
      setItemPhotos([...itemPhotos!, returnPhoto]);
    }
  }, [returnPhoto]);

  useEffect(() => {
    setSubCategoryValue(undefined);
    setSubCategoryText(undefined);
    if (categoryValue) {
      setSubCategory(SubDayColumn[categoryValue]);
    }
  }, [categoryValue]);

  useEffect(() => {
    setImageSlotsAvailable(
      TotalImageSlots - (itemPhotos ? itemPhotos?.length! : 0)
    );
  }, [itemPhotos]);

  const onSave = () => {
    if (formsValidationCheck()) {
      let newItem: Item = {
        title: title!,
        description: description!,
        category: categoryText!,
        subcategory: subCategoryValue!,
        price: price!,
        condition: condition!,
        item_images: itemPhotos!,
        startdate: startDate!,
        enddate: addDays(startDate!, 7).toString(),
        isactive: true,
        isapproved: false,
        views: 0,
        likes: [],
        location: { latitude: 0, longitude: 0 },
        relist_count: 0,
        userId: CurrentUser._id,
        status: status,
      };
      dispatch(addItem(newItem));
      onClose();
    } else {
      return;
    }
  };
  const formsValidationCheck = () => {
    if (!itemPhotos || itemPhotos.length === 0) {
      setToastMsg("Please upload atleast one image!!");
      setShowToast(true);
      return false;
    }
    if (!categoryValue) {
      setToastMsg("Please select a category for this listing");
      setShowToast(true);
      return false;
    }
    if (!subCategoryValue) {
      setToastMsg("Please select a sub category for this listing");
      setShowToast(true);
      return false;
    }
    if (!title) {
      setToastMsg("Please provide title for this listing");
      setShowToast(true);
      return false;
    }
    if (!description) {
      setToastMsg("Please provide description for this listing");
      setShowToast(true);
      return false;
    }
    if (!price) {
      setToastMsg("Please provide price for this listing");
      setShowToast(true);
      return false;
    }
    if (!condition) {
      setToastMsg("Please select condition for this listing");
      setShowToast(true);
      return false;
    }
    if (!startDate) {
      setToastMsg("Please select start date for this listing");
      setShowToast(true);
      return false;
    }
    return true;
  };
  return (
    <>
      <IonHeader className="header-custom">
        <IonToolbar>
          <IonTitle>Create Listing</IonTitle>
          <IonButtons slot="start">
            <IonButton color="primary" onClick={() => onClose()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              color="primary"
              onClick={() => {
                onSave();
                //onClose()
              }}
            >
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
                  {itemPhotos &&
                    itemPhotos.length > 0 &&
                    itemPhotos.map((photo, index) => (
                      <IonCol
                        size="4"
                        className="photo-item"
                        key={"photo" + index}
                      >
                        <div
                          className="photo-image background-img"
                          style={{
                            backgroundImage: `url(${
                              imgBaseUrl + photo.filename
                            })`,
                          }}
                        />
                        <div className="photo-button">
                          <IonIcon
                            icon={close}
                            onClick={() => {
                              deletePhotoById(photo.file_id!)
                                .then((res) => {
                                  // dispatch(
                                  //   deleteUserImage(photo, CurrentUser._id)
                                  // );
                                })
                                .catch((err) => console.log(err));
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </IonCol>
                    ))}
                  {rangeArray(1, imageSlotsAvailable).map((i) => (
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
              <IonItem
                lines="none"
                onClick={() => {
                  setIsCategoryOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <IonNote>
                  {" "}
                  Select {categoryText ? ": " + categoryText : ""}
                </IonNote>
                <IonPicker
                  isOpen={isCategoryOpen}
                  columns={[DayColumn]}
                  buttons={[
                    {
                      text: "Cancel",
                      role: "cancel",
                      handler: (value) => {
                        setIsCategoryOpen(false);
                      },
                    },
                    {
                      text: "Confirm",
                      handler: (category) => {
                        setCategoryValue(category.Category.value);
                        setCategoryText(category.Category.text);
                        setIsCategoryOpen(false);
                      },
                    },
                  ]}
                ></IonPicker>
              </IonItem>
            </IonList>
            {subCategory && (
              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>SUB CATEGORY</IonLabel>
                </IonListHeader>
                <IonItem
                  lines="none"
                  onClick={() => {
                    setIsSubCategoryOpen(true);
                  }}
                >
                  <IonNote>
                    {" "}
                    Select {subCategoryText ? ": " + subCategoryText : ""}
                  </IonNote>
                  <IonPicker
                    isOpen={isSubCategoryOpen}
                    columns={[subCategory!]}
                    buttons={[
                      {
                        text: "Cancel",
                        role: "cancel",
                        handler: (subCategory) => {
                          setIsSubCategoryOpen(false);
                        },
                      },
                      {
                        text: "Confirm",
                        handler: (subCategory) => {
                          setSubCategoryValue(subCategory.SubCategory.value);
                          setSubCategoryText(subCategory.SubCategory.text);
                          setIsSubCategoryOpen(false);
                          //onSave(value)
                        },
                      },
                    ]}
                  ></IonPicker>
                </IonItem>
              </IonList>
            )}
            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>TITLE</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonInput
                  onIonChange={(e) => setTitle(e.detail.value as string)}
                  maxlength={100}
                />
                <IonNote slot="end">
                  {100 - (title ? title.length! : 0)}
                </IonNote>
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>DESCRIPTION</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonTextarea
                  rows={3}
                  onIonChange={(e) => setDescription(e.detail.value as string)}
                  maxlength={500}
                />
              </IonItem>
              <IonItem lines="none">
                <IonNote slot="end">
                  {500 - (description ? description.length! : 0)}
                </IonNote>
              </IonItem>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>PRICE</IonLabel>
              </IonListHeader>
              <IonItem lines="none">
                <IonInput
                  type="number"
                  onIonChange={(e) =>
                    setPrice(e.detail.value ? parseInt(e.detail.value!) : 0)
                  }
                />
              </IonItem>
            </IonList>
            <IonList>
              <IonRadioGroup
                value={condition}
                onIonChange={(e) => setCondition(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>CONDITION</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Used</IonLabel>
                  <IonRadio slot="start" value="used" />
                </IonItem>

                <IonItem>
                  <IonLabel>New</IonLabel>
                  <IonRadio slot="start" value="new" />
                </IonItem>

                <IonItem>
                  <IonLabel>None</IonLabel>
                  <IonRadio slot="start" value="none" />
                </IonItem>
              </IonRadioGroup>
            </IonList>

            <IonList className="list-custom">
              <IonListHeader>
                <IonLabel>START</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonDatetime
                  displayFormat="D MMM YYYY H:mm"
                  min={new Date().getFullYear().toString()}
                  max={(new Date().getFullYear() + 1).toString()}
                  onIonChange={(e) => setStartDate(e.detail.value!)}
                ></IonDatetime>
                <IonNote slot="end">Will be listed for 7 days</IonNote>
              </IonItem>
            </IonList>
            <IonList>
              <IonRadioGroup
                value={status}
                onIonChange={(e) => setStatus(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>STATUS</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Active</IonLabel>
                  <IonRadio slot="start" value="active" />
                </IonItem>

                <IonItem>
                  <IonLabel>Pending</IonLabel>
                  <IonRadio slot="start" value="pending" />
                </IonItem>

                <IonItem>
                  <IonLabel>Sold</IonLabel>
                  <IonRadio slot="start" value="sold" />
                </IonItem>
              </IonRadioGroup>
            </IonList>
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={1000}
        />
      </IonContent>
    </>
  );
};

ItemInputForm.defaultProps = {};

export default ItemInputForm;
