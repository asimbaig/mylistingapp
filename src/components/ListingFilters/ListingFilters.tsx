import React from 'react';
import {
    IonLabel,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonFab,
    IonList,
    IonItemDivider,
    IonCheckbox,
  } from "@ionic/react";
  import { listingFilter } from "../../utils/utils";
  import {
    close
  } from "ionicons/icons";
  
  type Props = {
    // onClose: ()=>void;
  };
  
const ListingFilters: React.FC<Props> = () => {
 
    return (
        <IonContent>
          {/* <div style={{ textAlign: "center" }}>
            <h1>Filter</h1>
          </div> */}

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
          {/* <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonButton
              color="white"
              className="button-custom button-icon button-sm button-brand"
              onClick={() => onClose()}
            >
              <IonIcon icon={close} slot="icon-only" />
            </IonButton>
          </IonFab> */}
        </IonContent>
    )
}
export default ListingFilters;