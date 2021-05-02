/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import ThemeService from "./services/theme.service";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/rootReducer";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// custom CSS
import "./sass/variables.override.scss";
import "./sass/helper.scss";
import "./sass/app.scss";
import "./sass/dark.scss";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonBadge,IonRow
} from "@ionic/react";
import {
  rose,
  chatbubbles,
  person,
  grid,
  logIn,heartCircle, logOut
} from "ionicons/icons";
import "./App.scss";
import FavouriteUsers from "./pages/FavouriteUsers/FavouriteUsers";
import Me from "../src/pages/Me/Me";
import MyListings from "../src/pages/MyListings/MyListings";
import ChatStreams from "./pages/ChatStreams/ChatStreams";
import Chat from "../src/pages/Chat/Chat";
import Listings from "../src/pages/Listings/Listings";
import ListingDetails from "../src/pages/Listings/ListingDetails";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Login/Signup";
import { loadItems } from "./redux/itemSlice";
import { authCheckState } from "./redux/authSlice";
import RippleLoader from "./components/RippleLoader/RippleLoader";
import RedirectToLogin from "./pages/Settings/RedirectToLogin";
import { IonAlert } from '@ionic/react';
import { Plugins, Capacitor } from "@capacitor/core";

// force the theme to iOS mode
setupConfig({
  mode: "ios",
  backButtonText: "",
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { App } = Plugins;
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  const [showBackAlert, setShowBackAlert] = useState(false);

  useEffect(() => {
    // Restore Dark Mode preference from LocalStorage
    ThemeService.restore();
  });

  useEffect(() => {
    dispatch(authCheckState());
    dispatch(loadItems());

    if (Capacitor.isNative) {
      App.addListener("backButton", (e) => {
        if (window.location.pathname === "/listings") {
          setShowBackAlert(true);
        } 
      });
    }
  }, []);

  return (
    <IonApp>
      {isLoading && (
            <div className="full-height safe-area-bottom">
              <IonRow className="full-height ion-justify-content-center ion-align-items-center">
                <RippleLoader imageUrl="assets/img/avatars/hieu.png" />
              </IonRow>
            </div>
            )}
      <IonReactRouter>
        <IonTabs className="tabs-top">
          <IonRouterOutlet>
            <Route path="/listings" component={Listings} exact />
            <Route path="/listingdetails" component={ListingDetails} exact />
            <Route path="/favouriteusers" component={FavouriteUsers} exact />
            <Route path="/me" component={Me} exact />
            <Route path="/mylistings" component={MyListings} exact />
            <Route path="/chatstreams" component={ChatStreams} exact />
            <Route path="/chat" component={Chat} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/logout" component={RedirectToLogin} exact />
            <Route exact path="/">
              <Redirect to="/listings" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="tabs-page tab-bar-no-border">

            <IonTabButton tab="listings" href="/listings">
              <IonIcon icon={grid} />
            </IonTabButton>

            <IonTabButton tab="favouriteusers" href="/favouriteusers">
              <IonIcon icon={heartCircle} />
            </IonTabButton>
            {isAuthenticated && <IonTabButton
              tab="mylistings"
              href="/mylistings"
              className="color-gold"
            >
              <IonIcon icon={rose} />
              <IonBadge color="primary">9</IonBadge>
            </IonTabButton>}
            <IonTabButton tab="chatstreams" href="/chatstreams">
              <IonIcon icon={chatbubbles} />
              <IonBadge color="primary">10</IonBadge>
            </IonTabButton>
            {isAuthenticated && 
              <IonTabButton tab="me" href="/me">
                <IonIcon icon={person} />
              </IonTabButton>
            }
            {/* {isAuthenticated && 
              <IonTabButton tab="logout" href="/logout">
                <IonIcon icon={logOut} />
              </IonTabButton>
            } */}
            {!isAuthenticated && 
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logIn} />
              </IonTabButton>
            }
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <IonAlert
          isOpen={showBackAlert}
          header={'Please Confirm!'}
          message={'Do you really want to exit our App?'}
          buttons={[
            {
              text: 'Nope',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {}
            },
            {
              text: 'Yeah',
              handler: () => {
                App.exitApp();
              }
            }
          ]}
          onDidDismiss={() => setShowBackAlert(false)}
          cssClass='my-custom-class'
        />
    </IonApp>
  );
};

export default App;
