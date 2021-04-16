import React, { useEffect, useState } from "react";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, removeTodo, loadTodos } from "./todoSlice";
import { VisibilityFilter } from "./visibilityFilter/visibilityFilterSlice";
import { Todo } from "./types";
import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonNote,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonModal,
  IonButton,
  IonButtons,
  IonContent, IonText
} from "@ionic/react";
import { trash, thumbsUp, arrowUndo, arrowRedo } from "ionicons/icons";

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilter) => {
  switch (filter) {
    case VisibilityFilter.ShowAll:
      return todos;
    case VisibilityFilter.ShowCompleted:
      return todos.filter((t) => t.completed);
    case VisibilityFilter.ShowActive:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};
function TodoList(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) =>
    getVisibleTodos(state.todos, state.visibilityFilter)
  );
  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleComplete = (todo: Todo) => {
    dispatch(toggleTodo(todo));
  };
  const handleDelete = (todo: Todo) => {
    dispatch(removeTodo(todo.id!));
  };
  return (
    <IonList>
      {todos.map((todo, index) => (
        <IonItemSliding key={index}>
          <IonItem
            onClick={() => {
              setSelectedTodo(todo);
              setShowModal(true);
            }}
          >
            <IonIcon slot="start" icon={arrowRedo} />
            <IonLabel>
              <h2
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </h2>
            </IonLabel>
            <IonNote slot="end">{todo.dated}</IonNote>
            <IonIcon slot="end" icon={arrowUndo} />
          </IonItem>

          <IonItemOptions side="start">
            <IonItemOption color="success" onClick={() => handleComplete(todo)}>
              <IonIcon slot="icon-only" icon={thumbsUp} />
            </IonItemOption>
          </IonItemOptions>

          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => handleDelete(todo)}>
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Todo Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedTodo && 
            <div style={{margin: "20px"}}>
              {selectedTodo.text}
            </div>
          }
        </IonContent>
      </IonModal>
    </IonList>
  );
}
export default TodoList;
