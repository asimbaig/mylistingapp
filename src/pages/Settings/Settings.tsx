import React, { useState, useEffect } from 'react';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCard, IonCardContent, IonIcon, IonText, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonToggle, IonListHeader, IonNote, IonRange
} from '@ionic/react';
import {
  flash, star, moonOutline
} from 'ionicons/icons';
import ThemeService from '../../services/theme.service';
import './Settings.scss';
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import RedirectToLogin from "../Settings/RedirectToLogin";
import { useHistory } from 'react-router-dom';

type Props = {
  onClose: () => void,
}

const Settings: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [distance, setDistance] = useState<number>(30);
  const [ageRange, setAgeRange] = useState<any>({
    lower: 20,
    upper: 30
  })
  const [isDarkMode, setIsDarkMode] = useState<boolean>(ThemeService.getCurrentSetting());
  const CurrentUser = useSelector((state: RootState) => state.auth.user);

  // const handleLogout = () => {
  //   //dispatch(logout());
    
  //   // setTimeout(() => {
  //   // onClose();
  //   // console.log("handleLogout");
  //   // history.push('//logout');
  //   // return (<RedirectToLogin/>)
  //   //   history.push('/listings');
  //   // }, 1000);
  //   // const interval = setInterval(() => {
  //   //onClose();
     
  //   //   history.push('/listings');
  //   // }, 500);
  //   // return () => clearInterval(interval);
  // }

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
                <IonIcon icon={flash} className="color-gold" />
                Special Offer
                <span className="color-gold">GOLD</span>
              </div>
              <div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="card-custom">
            <IonCardContent>
              <div className="plan-title">
                <IonIcon icon={flash} color="primary" />
                New Offers
                <IonText color="primary">+</IonText>
              </div>
              <div>
              </div>
            </IonCardContent>
          </IonCard>

        </div>

        <IonList className="list-custom">
          <IonItem lines="none">
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle color="primary" checked={ isDarkMode } onIonChange={ e => handleToggleDarkTheme(e.detail.checked as boolean) } />
          </IonItem>
        </IonList>
        <IonList className="list-custom">
          <IonItem className="ion-text-center" button detail={false} 
          onClick={ ()=> {
            onClose();
            history.push('/logout');
            }
          } lines="none">
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>ACCOUNT SETTINGS</IonLabel>
          </IonListHeader>
          <IonItem detail>
            <IonLabel>Phone Number</IonLabel>
            <IonNote slot="end">{CurrentUser.phone}</IonNote>
          </IonItem>
          <IonItem detail lines="none">
            <IonLabel>Email</IonLabel>
            <IonNote slot="end" color="primary">{CurrentUser.email}</IonNote>
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
            <IonLabel>Search Distance</IonLabel>
            <IonNote slot="end">
              { distance } miles
            </IonNote>
          </IonItem>
          <IonItem>
            <IonRange min={2} max={160} value={ distance } onIonChange={ e => setDistance(e.detail.value as number) } color="primary" />
          </IonItem>
        </IonList>

        <IonList className="list-custom">
          <IonListHeader>
            <IonLabel>WEB PROFILE</IonLabel>
          </IonListHeader>
          <IonItem detail lines="none">
            <IonLabel>Display name</IonLabel>
            {/* <IonNote slot="end">Claim yours</IonNote> */}
          </IonItem>
          {/* <IonListHeader className="help-block">
            <IonLabel color="medium">
              Create a public Username. Share your Username. Have people all over the world swipe you on Tinder.
            </IonLabel>
          </IonListHeader> */}
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

        

        <div className="ion-text-center ion-padding">
          <div>
            <img src="assets/img/appicon.png" width="36" alt="" />
          </div>
          <div>Version 1.0.0</div>
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

Settings.defaultProps = {}

export default Settings;
