import React from 'react'
import FilterButton from './FilterButton'
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { setVisibilityFilter, VisibilityFilter } from './visibilityFilterSlice';
import { useDispatch } from 'react-redux';

export default function TodoFilter(): JSX.Element {
  const dispatch = useDispatch();
  
  const getVisibilityFilter = (value: string) =>{
    switch(value){
      case "SHOW_ALL":
        return VisibilityFilter.ShowAll;
      case "SHOW_COMPLETED":
        return VisibilityFilter.ShowCompleted;
      case "SHOW_ACTIVE":
        return VisibilityFilter.ShowActive;
      default:
        return VisibilityFilter.ShowAll;
    }
  };  
  return (
    <div>
      <IonSegment onIonChange={e => dispatch(setVisibilityFilter(getVisibilityFilter(e.detail.value!)))}>
          <IonSegmentButton value="SHOW_ALL">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="SHOW_ACTIVE">
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="SHOW_COMPLETED">
            <IonLabel>Completed</IonLabel>
          </IonSegmentButton>
      </IonSegment>
      {/* <span>Show: </span>
      <FilterButton visibilityFilter={VisibilityFilter.ShowAll} text={"All"} />
      <FilterButton visibilityFilter={VisibilityFilter.ShowActive} text={"Active"} />
      <FilterButton visibilityFilter={VisibilityFilter.ShowCompleted} text={"Completed"} /> */}
    </div>
  );
}