import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from "@ionic/react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "./authSlice";
// import { loadTasks } from "../../pages/calendar/calendarSlice";
import { RootState } from "../../app/rootReducer";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  // const currentDate = useSelector(
  //   (state: RootState) => state.global.currentDate
  // );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const Login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      dispatch(login(email, password, isSignup));
      // dispatch(loadTasks(currentDate.year, currentDate.month));
      if(!isAuthenticated){
        history.push("/");   
      }
    }
  };
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };
  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={Login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Email
              </IonLabel>
              <IonInput
                name="email"
                type="text"
                value={email}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && emailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Email is required</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                SUBMIT
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={switchAuthModeHandler}
                color="light"
                expand="block"
              >
                SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
