/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon, IonChip, IonLabel
} from "@ionic/react";

import { add } from "ionicons/icons";
import { loadTasks, addTask, editTask, deleteTask } from "./calendarSlice";

import { DateOutTime } from "../../utils/utils";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import { RootState } from "../../app/rootReducer";
import { Task } from "./types";

const DateDetails = (props: any): JSX.Element => {
  const [selectedTask, setSelectedTask] = useState({});
  const [cellData] = useState(props.location.state);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  const [allowAddEdit, setAllowAddEdit] = useState(false);
  const [months] = useState([
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUEST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]);
  const dispatch = useDispatch();
  const monthTasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(loadTasks(cellData.year, cellData.month));
    setAllowAddEdit(
      DateOutTime(
        new Date(cellData.year + "/" + cellData.month + "/" + cellData.day)
      ) < DateOutTime(new Date())
    );
  }, []);
  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
    setShowAddTask(false);
  };
  const handleCancelAddTask = () => {
    setShowAddTask(false);
  };
  const handleEditTask = (task: Task) => {
    dispatch(editTask(task));
    setShowEditTask(false);
    dispatch(loadTasks(cellData.year, cellData.month));
  };
  const handleCancelEditTask = () => {
    setShowEditTask(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" size-sm>
              <IonCard style={{ width: "15rem" }} className="ion-text-center">
                <IonCardHeader>
                  <IonCardTitle>{months[cellData.month - 1]}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <h1>{cellData.day}</h1>
                  <IonChip>
                    <IonLabel><h2>{cellData.dayOfWeek}</h2></IonLabel>
                  </IonChip>
                  
                  <h1>{cellData.year}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br/>

        <div>
          {monthTasks &&
            monthTasks.length > 0 &&
            monthTasks
              .filter((t) => t.day === cellData.day)
              .map((task, index) => (
                <div key={"col" + task.id + "" + index} style={{ margin: "15px" }}>
                  <IonCard
                    style={{ width: "22rem" }}
                    className="ion-text-center"
                    color= {task.priority}
                  >
                    <IonCardHeader>
                      <IonCardTitle>
                        {task.day < 10 ? "0" + task.day : task.day} .{" "}
                        {task.month < 10 ? "0" + task.month : task.month} .{" "}
                        {task.year}
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                      Start: {task.start}:
                      {task.startMin < 10 ? "0" + task.startMin : task.startMin}{" "}
                      - End: {task.end}:
                      {task.endMin < 10 ? "0" + task.endMin : task.endMin}
                      <br />
                      {task.details}
                      <br />
                      <strong>{task.location}</strong>
                      <hr />
                      <IonGrid>
                        <IonRow className="ion-justify-content-center">
                          <IonCol>
                            <IonButton
                              expand="full"
                              onClick={() => {
                                setSelectedTask(task);
                                setShowEditTask(true);
                                setShowAddTask(false);
                              }}
                              disabled={allowAddEdit}
                            >
                              Edit
                            </IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              expand="full"
                              onClick={() => {
                                dispatch(deleteTask(task));
                              }}
                            >
                              Delete
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </div>  
              ))}
        </div>
        
        <br/><br/>

        {showAddTask && (
          <AddTask
            handleAddTask={handleAddTask}
            handleCancelAddTask={handleCancelAddTask}
            task={selectedTask}
            date={cellData}
          />
        )}
        {showEditTask && (
          <EditTask
            handleEditTask={handleEditTask}
            handleCancelEditTask={handleCancelEditTask}
            task={selectedTask}
          />
        )}                              

        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={() => {
              setShowAddTask(true);
              setShowEditTask(false);
            }}
            disabled={allowAddEdit}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default DateDetails;
