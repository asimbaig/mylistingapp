import React, { useEffect, useState } from "react";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { removeNote, loadNotes } from "./noteSlice";
import { Note } from "./types";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
  IonButton,
  IonButtons,
  IonContent, IonText
} from "@ionic/react";
import { trash } from "ionicons/icons";

const getVisibleNotes = (notes: Note[]) => {
  return notes;
};
function NoteList(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => getVisibleNotes(state.notes));
  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  return (
    <div>
      {notes.map((note, index) => (
        <IonCard key={index}>
          <IonItem
            className="ion-activated"
            onClick={() => dispatch(removeNote(note.id!))}
          >
            <IonIcon color="danger" icon={trash} slot="end" />
          </IonItem>
          <IonCardContent
            onClick={() => {
              setSelectedNote(note);
              setShowModal(true);
            }}
          >
            {note.text}
          </IonCardContent>
          <IonItem className="ion-activated">
            <IonNote slot="end">{note.dated}</IonNote>
          </IonItem>
        </IonCard>
      ))}
      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Note Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedNote && 
            <div style={{margin: "20px"}}>
              {selectedNote.text}
            </div>
          }
        </IonContent>
      </IonModal>
    </div>
  );
}
export default NoteList;
