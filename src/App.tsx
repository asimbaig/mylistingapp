import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupConfig,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './pages/Landing/Landing';
import Tabs from './pages/Tabs/Tabs';
import Chat from './pages/Chat/Chat';
import ThemeService from './services/theme.service';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './redux/rootReducer';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// custom CSS
import './sass/variables.override.scss';
import './sass/helper.scss';
import './sass/app.scss';
import './sass/dark.scss';

import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonBadge,
} from '@ionic/react';
import { stop, chatbubbles, person, listCircle, listCircleOutline } from 'ionicons/icons';
import './Tabs.scss';
import Explore from '../src/pages/Explore/Explore';
import Me from '../src/pages/Me/Me';
import Highlights from '../src/pages/Highlights/Highlights';
import Matches from '../src/pages/Matches/Matches';
import Listings from '../src/pages/Listings/Listings';

// force the theme to iOS mode
setupConfig({
  mode: 'ios',
  backButtonText: '',
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  useEffect(() => {
    // Restore Dark Mode preference from LocalStorage
    ThemeService.restore();
  })

  return (
    <IonApp>
      <IonReactRouter>
      <IonTabs className="tabs-top">
      <IonRouterOutlet>
        {/* <Redirect exact path="/tabs" to="/tabs/listings" /> */}
        <Route path="/listings" component={Listings} exact />
        <Route path="/explore" component={Explore} exact />
        <Route path="/me" component={Me} exact />
        <Route path="/highlights" component={Highlights} exact />
        <Route path="/matches" component={Matches} exact />
        <Route exact path="/">
            <Redirect to="/listings" />
          </Route>
        
      </IonRouterOutlet>

      <IonTabBar slot="top" className="tabs-page tab-bar-no-border">
      <IonTabButton tab="listings" href="/listings">
          <IonIcon icon={ listCircle } />
        </IonTabButton>
        <IonTabButton tab="explore" href="/explore">
          <img className="tab-icon-inactive" src="assets/img/logo_small_bw.png" width="24" alt="" />
          <img className="tab-icon-active" src="assets/img/logo_small.png" width="24" alt="" />
        </IonTabButton>
        <IonTabButton tab="highlights" href="/highlights" className="color-gold">
          <IonIcon icon={ stop } className="rotate-45" />
          <IonBadge color="primary">9</IonBadge>
        </IonTabButton>
        <IonTabButton tab="matches" href="/matches">
          <IonIcon icon={ chatbubbles } />
        </IonTabButton>
        <IonTabButton tab="me" href="/me">
          <IonIcon icon={ person } />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
        {/* <IonRouterOutlet>
          <Switch>
            <Route path="/tabs" component={Tabs} />
            <Route path="/landing" component={Landing} exact/>
            <Route path="/chat" component={Chat} exact/>
            <Route path="/" render={() => <Redirect to="/tabs" />} exact />
          </Switch>  
        </IonRouterOutlet> */}
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
