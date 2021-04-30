import React, { useState } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import "./Landing.scss";
import { signup } from "../../redux/authSlice";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";

type Props = {
  history: any;
};
const Signup: React.FC<Props> = ({history}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const SignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!email) {
      setEmailError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    dispatch(signup(email, password));
    if(email && password && isAuthenticated) {
      history.push('/');
    }
  };

  return (
    <IonPage id="signup-page">
      <IonContent forceOverscroll={false} className="landing-page bg-gradient">
        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={SignupSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="username" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setEmail(e.detail.value!);
                setEmailError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                Email is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
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
              <IonButton
              type="submit"
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-facebook button-landing"
            >
              SIGNUP
            </IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default Signup;
