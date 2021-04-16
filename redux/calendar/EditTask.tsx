import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { range } from "../../utils/utils";
import {
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { closeCircle, save } from "ionicons/icons";

type FormValues = {
  start: string;
  end: string;
  startMin: string;
  endMin: string;
  details: string;
  priority: string;
  day: number;
  month: number;
  year: number;
  location: string;
};

function EditTask(props: any) {
  const { register, handleSubmit, errors, setValue } = useForm<FormValues>();
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // console.log("--->> "+JSON.stringify(props.task));
    setValue("details", props.task.details);
    setValue("priority", props.task.priority);
    setValue("start", props.task.start.toString());
    setValue("startMin", props.task.startMin.toString());
    setValue("end", props.task.end.toString());
    setValue("endMin", props.task.endMin.toString());
    setValue("location", props.task.location);
  },[]);
  const onSubmit = (data: FormValues) => {
    var EditTask = {
      id: props.task.id,
      start: parseInt(data.start),
      end: parseInt(data.end),
      startMin: parseInt(data.startMin),
      endMin: parseInt(data.endMin),
      details: data.details,
      priority: data.priority,
      day: props.task.day,
      month: props.task.month,
      year: props.task.year,
      location: data.location,
    };
    if (
      EditTask.start === EditTask.end &&
      EditTask.endMin <= EditTask.startMin
    ) {
      alert("Please select right start and end time values");
    } else {
      props.handleEditTask(EditTask);
    }
  };
  return (
    <IonCard  style={{width:"90%"}}>
      <IonCardHeader>
        <IonCardTitle>Edit Task</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Details</IonLabel>
              <IonInput type="text" name="details" ref={register}></IonInput>
              {errors.details && (
                <p style={{ color: "red" }}>
                  This Field is required & must less than 100 characters
                </p>
              )}
            </IonItem>
          </IonList>
          <div className="row">
            <label className="col-form-label col-sm-2 pt-0">Priority</label>
            <div className="col-sm-10">
              <div className="form-check bg-primary text-white mb-1">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="primary"
                    ref={register}
                  />
                  Low
                </label>
              </div>
              <div className="form-check bg-warning text-white mb-1">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="warning"
                    ref={register}
                  />
                  Medium
                </label>
              </div>
              <div className="form-check bg-danger text-white mb-1">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value="danger"
                    ref={register}
                  />
                  High
                </label>
              </div>
            </div>
          </div>

          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonItem>
                  <IonLabel>Start</IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem>
                  <IonSelect
                    okText="Okay"
                    cancelText="Dismiss"
                    name="start"
                    ref={register}
                    onIonChange={(e) => {
                      setStartIndex(parseInt(e.detail.value));
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
              </IonCol>
              <IonCol size="4">
                <IonItem>
                  <IonSelect
                    okText="Okay"
                    cancelText="Dismiss"
                    name="startMin"
                    ref={register}
                    onIonChange={(e) => {
                      setStartIndex(parseInt(e.detail.value));
                    }}
                  >
                    <IonSelectOption value="0">00</IonSelectOption>
                    <IonSelectOption value="15">15</IonSelectOption>
                    <IonSelectOption value="30">30</IonSelectOption>
                    <IonSelectOption value="45">45</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <IonItem>
                  <IonLabel>End</IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem>
                  <IonSelect
                    okText="Okay"
                    cancelText="Dismiss"
                    name="end"
                    ref={register}
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
                    {/* {range(startIndex, 24).length > 0 &&
                      range(startIndex, 24).map((index) => {
                        return (
                          <IonSelectOption key={index} value={index}>
                            {index}
                          </IonSelectOption>
                        );
                      })} */}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem>
                  <IonSelect
                    okText="Okay"
                    cancelText="Dismiss"
                    name="endMin"
                    ref={register}
                  >
                    <IonSelectOption value="0">00</IonSelectOption>
                    <IonSelectOption value="15">15</IonSelectOption>
                    <IonSelectOption value="30">30</IonSelectOption>
                    <IonSelectOption value="45">45</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonList>
            <IonItem>
              <IonLabel position="floating">Location</IonLabel>
              <IonInput type="text" name="location" ref={register}></IonInput>
              {errors.location && (
                <p style={{ color: "red" }}>
                  This Field is required & must less than 100 characters
                </p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonButton
              slot="start"
              onClick={() => props.handleCancelEditTask()}
            >
              <IonIcon slot="start" icon={closeCircle} />
              Close
            </IonButton>
            <IonButton slot="end" type="submit">
              <IonIcon slot="end" icon={save} />
              Save
            </IonButton>
          </IonList>
        </form>
      </IonCardContent>
    </IonCard>
  );
}
export default EditTask;