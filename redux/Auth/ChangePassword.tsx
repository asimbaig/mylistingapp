import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons,
  IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { changePassword } from "./authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const changPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!password) {
      setPasswordError(true);
    }

    if(password) {
      let email: string = localStorage.getItem('email') ?? "";
      dispatch(changePassword(email, password));
      history.push('/');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Change Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={changPassword}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} spellCheck={false} autocapitalize="off" onIonChange={e => setPassword(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">SUBMIT</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default ChangePassword;
