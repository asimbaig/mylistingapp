import React, { useState, useEffect } from 'react';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonIcon, IonText, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonToggle, IonListHeader, IonNote, IonRange
} from '@ionic/react';
import {
  flame, flash, star, moonOutline
} from 'ionicons/icons';
import ThemeService from '../../services/theme.service';
import './Settings.scss';

type Props = {
  history: any,
  onClose: () => void,
}

const Settings: React.FC<Props> = ({ onClose, history }) => {
  const [distance, setDistance] = useState<number>(30);
  const [ageRange, setAgeRange] = useState<any>({
    lower: 20,
    upper: 30
  })
  const [isDarkMode, setIsDarkMode] = useState<boolean>(ThemeService.getCurrentSetting());

  const handleLogout = () => {
    onClose();
    history.push('/landing');
  }

  const handleToggleDarkTheme = (isDarkMode: boolean = true) => {
    setIsDarkMode(isDarkMode);
  }

  useEffect(() => {
    ThemeService.toggleDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar-no-border">
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={ onClose }>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="settings-page bg-light">
        <div className="cards-wrapper">
          <IonCard className="card-custom">
            <IonCardContent>
              <div className="plan-title">
                <IonIcon icon={flame} className="color-gold" />
                tinder
                <span className="color-gold">GOLD</span>
              </div>
              <div>
                <IonText color="medium">Unlock Our Most Exclusive Features</IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="card-custom">
            <IonCardContent>
              <div className="plan-title">
                <IonIcon icon={flame} color="primary" />
                tinder
                <IonText color="primary">+</IonText>
              </div>
              <div>
                <IonText color="medium">Unlimited Likes & More!</IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <IonGrid className="grid-no-padding grid-half">
            <IonRow>
              <IonCol>
                <IonCard className="card-custom card-custom-half">
                  <IonCardContent className="padding-reduced">
                    <IonButton color="white" className="button-custom button-icon button-xs">
                      <IonIcon slot="icon-only" icon={flash} className="color-purple" />
                    </IonButton>
                    <div className="color-purple">
                      Get Boosts
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard className="card-custom card-custom-half">
                  <IonCardContent className="padding-reduced">
                    <IonButton color="white" className="button-custom button-icon button-xs">
                      <IonIcon slot="icon-only" icon={star} className="color-blue" />
                    </IonButton>
                    <div className="color-blue">
                      Get Super Likes
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <IonList className="list-custom">
          <IonItem lines="none">
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle color="primary" checked={ isDarkMode } onIonChange={ e => handleToggleDarkTheme(e.detail.checked as boolean) } />
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>ACCOUNT SETTINGS</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Phone Number</IonLabel>
            <IonNote slot="end">98765430</IonNote>
          </IonItem>
          <IonItem detail lines="none">
            <IonLabel>Email</IonLabel>
            <IonNote slot="end" color="primary">mr_hie@yahoo.com</IonNote>
          </IonItem>
          <IonListHeader className="help-block">
            <IonLabel color="medium">A verified phone number and email help secure your account.</IonLabel>
          </IonListHeader>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>DISCOVERY</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Location</IonLabel>
            <IonNote slot="end" className="ion-text-right">
              My Current Location
              <br />
              <span className="text-sm">Singapore</span>
            </IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Maximum Distance</IonLabel>
            <IonNote slot="end">
              { distance }km
            </IonNote>
          </IonItem>
          <IonItem>
            <IonRange min={2} max={160} value={ distance } onIonChange={ e => setDistance(e.detail.value as number) } color="primary" />
          </IonItem>
          <IonItem detail>
            <IonLabel>Gender</IonLabel>
            <IonNote slot="end">
              Women
            </IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Age Range</IonLabel>
            <IonNote slot="end">
              { ageRange.lower }-{ ageRange.upper }
            </IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonRange dualKnobs value={ ageRange } min={18} max={65} onIonChange={ e => setAgeRange(e.detail.value as any) } color="primary" />
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonItem lines="none">
            <IonLabel>Show me on Tinder</IonLabel>
            <IonToggle color="primary" checked />
          </IonItem>
          <IonListHeader className="help-block">
            <IonLabel color="medium">
              While turned off, you will not be shown in the card stack. You can still see and chat with your matches.
            </IonLabel>
          </IonListHeader>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>TOP PICKS</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Manage Top Picks</IonLabel>
            <IonNote slot="end">Settings</IonNote>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>SWIPE SURGE</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Manage Swipe Surge</IonLabel>
            <IonNote slot="end">Settings</IonNote>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>FEED SETTINGS</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Shared Content</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>DATA USAGE</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Autoplay Videos</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>WEB PROFILE</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Username</IonLabel>
            <IonNote slot="end">Claim yours</IonNote>
          </IonItem>
          <IonListHeader className="help-block">
            <IonLabel color="medium">
              Create a public Username. Share your Username. Have people all over the world swipe you on Tinder.
            </IonLabel>
          </IonListHeader>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>NOTIFICATIONS</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Email</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonLabel>Push Notifications</IonLabel>
          </IonItem>
          <IonItem detail lines="none">
            <IonLabel>Team Tinder</IonLabel>
          </IonItem>
          <IonListHeader className="help-block">
            <IonLabel color="medium">
              Pick which notifications to see while in app.
            </IonLabel>
          </IonListHeader>
        </IonList>

        <IonList className="list-custom">
          <IonItem className="ion-text-center" button detail={false} lines="none">
            <IonLabel>Restore Purchases</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonItem className="ion-text-center" button detail={false} lines="none">
            <IonLabel>Share Tinder</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>CONTACT US</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Help & Support</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>COMMUNITY</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Community Guidelines</IonLabel>
          </IonItem>
          <IonItem detail lines="none">
            <IonLabel>Safety Tips</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>LEGAL</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonLabel>Terms of Service</IonLabel>
          </IonItem>
          <IonItem detail lines="none">
            <IonLabel>Licenses</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonItem className="ion-text-center" button detail={false} onClick={ handleLogout } lines="none">
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>

        <div className="ion-text-center ion-padding">
          <div>
            <img src="assets/img/logo_small.png" width="36" alt="" />
          </div>
          <div>Version 11.13.0</div>
        </div>

        <div className="safe-area-bottom">
          <IonList className="list-custom">
            <IonItem className="ion-text-center" button detail={false} lines="none">
              <IonLabel>Delete Account</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </>
  );
};

Settings.defaultProps = {

}

export default Settings;
