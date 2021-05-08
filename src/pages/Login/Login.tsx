/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons,IonIcon,IonToast,
  IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
  import {  logInOutline, personAddOutline, eyeOff, eye } from "ionicons/icons";
  import './Login.scss';
import "./Landing.scss";

// import { login } from '../data/auth/auth.actions';
// import { connect } from '../data/connect';
// import { RouteComponentProps } from 'react-router';
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { setShowToast, setToastMsg, setIsLoading } from "../../redux/appSlice";

type Props = {
  history: any;
};

// interface DispatchProps {
//   login: typeof login;
// }

// interface LoginProps extends OwnProps,  StateProps, DispatchProps { }

const Login: React.FC<Props> = ({history}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showHidePassword, setShowHidePassword] = useState(true);
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isError = useSelector((state: RootState) => state.auth.error.isError);
  const errorMsg = useSelector((state: RootState) => state.auth.error.errorMsg);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(setIsLoading(false));
      history.push('/', {direction: 'none'});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(isError) {
      dispatch(setIsLoading(false));
      dispatch(setToastMsg(errorMsg));
      dispatch(setShowToast(true));
    }
  }, [isError]);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!email) {
      setEmailError(true);
    }
    if(!password) {
      setPasswordError(true);
    }
    dispatch(setIsLoading(true));
    dispatch(login(email, password));
    if(email && password && isAuthenticated) {
      history.push('/');
    }
  };
  const signup = ()=>{
      history.push("/signup");
  };
  const toggleShowHidePassword = ()=> {
    setShowHidePassword(!showHidePassword);
  }

  return (
    <IonPage id="login-page">
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent  forceOverscroll={false} className="landing-page bg-gradient">

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={loginUser}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => setEmail(e.detail.value!)}
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
              <IonInput name="password" type={showHidePassword ?"password":"text"} value={password} onIonChange={e => setPassword(e.detail.value!)}/>
              <IonIcon slot="end" icon={showHidePassword ? eye : eyeOff} onClick={toggleShowHidePassword}/>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              {/* <IonButton type="submit" expand="block">Login</IonButton> */}
              <IonButton
              type="submit"
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-facebook button-landing"
            >
              <IonIcon slot="start" icon={logInOutline} size="small" />
              LOGIN
            </IonButton>
            </IonCol>
            <IonCol>
              {!isAuthenticated && 
              // <IonButton color="light" expand="block" onClick={()=>{signup()}}>Signup</IonButton>
              <IonButton
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-facebook button-landing"
              onClick={()=>{signup()}}
            >
              <IonIcon slot="start" icon={personAddOutline} size="small" />
              SIGNUP
            </IonButton>
              }
            </IonCol>
          </IonRow>
        </form>

      </IonContent>
              
    </IonPage>
  );
};

export default Login;
// connect<OwnProps, StateProps, DispatchProps>({
//   mapStateToProps: (state) => ({
//     isAuthenticated: state.auth.isAuthenticated
//   }),
//   mapDispatchToProps: {
//     login
//   },
//   component: Login
// })
