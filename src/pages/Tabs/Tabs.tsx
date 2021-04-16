import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonBadge,
} from '@ionic/react';
import { stop, chatbubbles, person, listCircle, listCircleOutline } from 'ionicons/icons';
import './Tabs.scss';
import Explore from '../Explore/Explore';
import Me from '../Me/Me';
import Highlights from '../Highlights/Highlights';
import Matches from '../Matches/Matches';
import Listings from '../Listings/Listings';

const Tabs: React.FC<{}> = () => {
  return (
    <IonTabs className="tabs-top">
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/listings" />
        <Route path="/tabs/listings" component={Listings} exact />
        <Route path="/tabs/explore" component={Explore} exact />
        <Route path="/tabs/me" component={Me} exact />
        <Route path="/tabs/highlights" component={Highlights} exact />
        <Route path="/tabs/matches" component={Matches} exact />
        
      </IonRouterOutlet>

      <IonTabBar slot="top" className="tabs-page tab-bar-no-border">
      <IonTabButton tab="listings" href="/">
          <IonIcon icon={ listCircle } />
        </IonTabButton>
        <IonTabButton tab="explore" href="/tabs/explore">
          <img className="tab-icon-inactive" src="assets/img/logo_small_bw.png" width="24" alt="" />
          <img className="tab-icon-active" src="assets/img/logo_small.png" width="24" alt="" />
        </IonTabButton>
        <IonTabButton tab="highlights" href="/tabs/highlights" className="color-gold">
          <IonIcon icon={ stop } className="rotate-45" />
          <IonBadge color="primary">9</IonBadge>
        </IonTabButton>
        <IonTabButton tab="matches" href="/tabs/matches">
          <IonIcon icon={ chatbubbles } />
        </IonTabButton>
        <IonTabButton tab="me" href="/tabs/me">
          <IonIcon icon={ person } />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
