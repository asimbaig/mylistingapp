import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonLoading,
} from "@ionic/react";
import { logoApple, logoFacebook, chatbubble } from "ionicons/icons";
import "./Landing.scss";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import { login } from "../../redux/authSlice";

type Props = {
  history: any;
};

const Landing: React.FC<Props> = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const goToExplore = () => {
    setIsLoading(true);
    dispatch(login("user1@test.com","password1"));
    setTimeout(() => {
      setIsLoading(false);
      history.push("/listings");
    }, 1000); // dummy loader for Loggin In
  };

  return (
    <IonPage>
      <IonContent forceOverscroll={false} className="landing-page bg-gradient">
        <IonLoading
          isOpen={isLoading}
          message={"Logging in..."}
          duration={5000}
        />

        <div className="vertical-layout safe-area-bottom">
          <div className="section-brand">
            <div className="logo">
              <img
                className="logo-icon"
                src="assets/img/logo_small_w.png"
                alt=""
              />
              <span className="logo-text">tnder</span>
            </div>
          </div>

          <div className="section-buttons ion-padding">
            <div className="ion-padding">
              By tapping "Create account" or "Sign in", you agree to our{" "}
              <div className="text-underline inline">Terms</div>. Learn how we
              process your data in our{" "}
              <div className="text-underline inline">Privacy Policy</div>
              and <div className="text-underline inline">Cookies Policy</div>
            </div>

            <IonButton
              fill="clear"
              color="white"
              className="button-clear text-underline"
            >
              Create a new account
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-facebook button-landing"
              onClick={goToExplore}
            >
              <IonIcon slot="start" icon={logoApple} size="small" />
              SIGN IN WITH APPLE
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-facebook button-landing"
              onClick={goToExplore}
            >
              <IonIcon slot="start" icon={logoFacebook} size="small" />
              SIGN IN WITH FACEBOOK
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              color="white"
              shape="round"
              className="button-landing ion-margin-bottom"
              onClick={goToExplore}
            >
              <IonIcon slot="start" icon={chatbubble} size="small" />
              SIGN IN WITH PHONE NUMBER
            </IonButton>

            <IonButton fill="clear" color="white" className="button-clear">
              Trouble logging in?
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

Landing.defaultProps = {};

export default Landing;
