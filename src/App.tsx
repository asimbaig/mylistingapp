/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Landing from "./pages/Landing/Landing";
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
  stop,
  chatbubbles,
  person,
  listCircle,
  logIn
} from "ionicons/icons";
import "./Tabs.scss";
import Explore from "../src/pages/Explore/Explore";
import Me from "../src/pages/Me/Me";
import Highlights from "../src/pages/Highlights/Highlights";
import MyListings from "../src/pages/MyListings/MyListings";
import Matches from "../src/pages/Matches/Matches";
import Listings from "../src/pages/Listings/Listings";
import ListingDetails from "../src/pages/Listings/ListingDetails";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Login/Signup";
import { loadItems } from "./redux/itemSlice";
import { authCheckState } from "./redux/authSlice";
import RippleLoader from "./components/RippleLoader/RippleLoader";

// force the theme to iOS mode
setupConfig({
  mode: "ios",
  backButtonText: "",
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  useEffect(() => {
    // Restore Dark Mode preference from LocalStorage
    ThemeService.restore();
  });

  useEffect(() => {
    dispatch(authCheckState());
    dispatch(loadItems());
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
            <Route path="/explore" component={Explore} exact />
            <Route path="/me" component={Me} exact />
            <Route path="/highlights" component={Highlights} exact />
            <Route path="/mylistings" component={MyListings} exact />
            <Route path="/matches" component={Matches} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route exact path="/">
              <Redirect to="/listings" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="top" className="tabs-page tab-bar-no-border">

            <IonTabButton tab="listings" href="/listings">
              <IonIcon icon={listCircle} />
            </IonTabButton>

            <IonTabButton tab="explore" href="/explore">
              <img
                className="tab-icon-inactive"
                src="assets/img/logo_small_bw.png"
                width="24"
                alt=""
              />
              <img
                className="tab-icon-active"
                src="assets/img/logo_small.png"
                width="24"
                alt=""
              />
            </IonTabButton>
            {isAuthenticated && <IonTabButton
              tab="mylistings"
              href="/mylistings"
              className="color-gold"
            >
              <IonIcon icon={stop} className="rotate-45" />
              <IonBadge color="primary">9</IonBadge>
            </IonTabButton>}
            <IonTabButton tab="matches" href="/matches">
              <IonIcon icon={chatbubbles} />
            </IonTabButton>
            {isAuthenticated && 
              <IonTabButton tab="me" href="/me">
                <IonIcon icon={person} />
              </IonTabButton>
            }
            {!isAuthenticated && 
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logIn} />
              </IonTabButton>
            }
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
