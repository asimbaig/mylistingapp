import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonIcon } from '@ionic/react';
import {  eyeOff, eye } from "ionicons/icons";
import './Login.scss';
import "./Landing.scss";
import { signup } from "../../redux/authSlice";
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { setShowToast, setToastMsg } from "../../redux/appSlice";

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
  const [showHidePassword, setShowHidePassword] = useState(true);
  const isError = useSelector((state: RootState) => state.auth.error.isError);
  const errorMsg = useSelector((state: RootState) => state.auth.error.errorMsg);
  useEffect(() => {
    if(isError) {
      dispatch(setToastMsg(errorMsg));
      dispatch(setShowToast(true));
    }
  }, [isError]);
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
  const toggleShowHidePassword = ()=> {
    setShowHidePassword(!showHidePassword);
  }
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
              <IonInput name="password" type={showHidePassword ?"password":"text"} value={password} 
                onIonChange={e => {setPassword(e.detail.value!);setPasswordError(false);}}/>
              <IonIcon slot="end" icon={showHidePassword ? eye : eyeOff} onClick={toggleShowHidePassword}/>
            </IonItem>   


            {/* <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem> */}

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
