import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";
import {
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";

export default function AddTodo(): JSX.Element {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    dispatch(addTodo(text));
    setText("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Write a todo ....</IonLabel>
            <IonInput
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton type="submit">
          <IonIcon slot="start" icon={addCircle} />
          Add Todo
        </IonButton>
      </form>
    </div>
  );
}
