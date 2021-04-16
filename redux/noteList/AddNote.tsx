import React from "react";
import { useDispatch } from "react-redux";
import { addNote } from "./noteSlice";
import {
  IonTextarea,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonItemDivider,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";

export default function AddNote(): JSX.Element {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    dispatch(addNote(text));
    setText("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItemDivider>Write new note</IonItemDivider>
          <IonItem>
            <IonTextarea
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>
        <IonButton type="submit">
          <IonIcon slot="start" icon={addCircle} />
          Add Note
        </IonButton>
      </form>
    </div>
  );
}
