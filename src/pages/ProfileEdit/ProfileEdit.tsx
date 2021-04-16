import React, { useState, useRef } from 'react';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonSegment, IonSegmentButton, IonLabel, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonList, IonListHeader, IonItem, IonToggle, IonTextarea, IonNote, IonInput, IonText, IonModal,
} from '@ionic/react';
import {
  close, add, logoSnapchat, logoInstagram, logoRss
} from 'ionicons/icons';
import SwipeCard from '../../components/SwipeCard/SwipeCard';
import Passions from '../Passions/Passions';
import './ProfileEdit.scss';

type Props = {
  user: any,
  onClose: () => void,
}

const ProfileEdit: React.FC<Props> = ({ user, onClose }) => {
  const [segmentView, setSegmentView] = useState<string>('PREVIEW');
  const [isPassionsOpen, setIsPassionsOpen] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<string>(`I'm obsessed with building mobile apps with Ionic Framework. What about you?`);
  const stackRef = useRef<HTMLDivElement>(null);

  const handleNoMoreSlide = (isOnTheLeft: boolean = true) => {
    if (stackRef && stackRef.current) {
      const className = isOnTheLeft ? 'rotate-left' : 'rotate-right';

      // @ts-ignore
      stackRef.current.classList.add(className);
      setTimeout(() => {
        // @ts-ignore
        stackRef.current.classList.remove(className);
      }, 250);
    }
  }

  const handleOpenPassions = () => {
    setIsPassionsOpen(true);
  }

  return (
    <>
      <IonHeader className="header-custom">
        <IonToolbar>
          <IonTitle>Edit Info</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={ onClose }>
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className="toolbar-no-border">
          <IonSegment
            className="segment-custom"
            value={ segmentView }
            onIonChange={ e => setSegmentView(e.detail.value as string) }
            mode="md"
          >
            <IonSegmentButton value="EDIT">
              <IonLabel>
                Edit
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="PREVIEW">
              <IonLabel>
                Preview
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-edit-page bg-light">
        <div className="full-height">
          {
            segmentView === 'EDIT' &&
            <div className="segment-view">
              <div className="photos-edit">
                <IonGrid>
                  <IonRow>
                    <IonCol size="4" className="photo-item">
                      <div className="photo-image background-img" style={{ backgroundImage: 'url(assets/img/people/hieu.png)' }} />
                      <div className="photo-button">
                        <IonIcon icon={close} />
                      </div>
                    </IonCol>
                    <IonCol size="4" className="photo-item">
                    <div className="photo-image background-img" style={{ backgroundImage: 'url(assets/img/people/ironman.png)' }} />
                      <div className="photo-button">
                        <IonIcon icon={close} />
                      </div>
                    </IonCol>
                    <IonCol size="4" className="photo-item">
                    <div className="photo-image background-img" style={{ backgroundImage: 'url(assets/img/people/hulk.png)' }} />
                      <div className="photo-button">
                        <IonIcon icon={close} />
                      </div>
                    </IonCol>
                    {
                      [0,1,2,3,4,5].map(i => (
                        <IonCol size="4" className="photo-item no-photo" key={ i }>
                          <div className="photo-image background-img" />
                          <div className="photo-button photo-button-invert">
                            <IonIcon icon={add} />
                          </div>
                        </IonCol>
                      ))
                    }
                  </IonRow>
                </IonGrid>
              </div>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>PHOTO OPTIONS</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonLabel>Smart Photos</IonLabel>
                  <IonToggle color="primary" checked></IonToggle>
                </IonItem>
                <IonListHeader className="help-block">
                  <IonLabel color="medium">
                    Smart Photos continuously tests all your profile photos and picks the best one to show first.
                  </IonLabel>
                </IonListHeader>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>ABOUT ME</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonTextarea rows={3} value={ aboutMe } onIonChange={ e => setAboutMe(e.detail.value as string) }/>
                </IonItem>
                <IonItem lines="none">
                  <IonNote slot="end">
                    { 500 - aboutMe.length }
                  </IonNote>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>PASSIONS</IonLabel>
                </IonListHeader>
                <IonItem lines="none" detail onClick={ handleOpenPassions }>
                  <IonLabel>Travel, Instagram, Music</IonLabel>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>JOB TITLE</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonInput value="Average Tindered" />
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>COMPANY</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonInput value="Take That Design" />
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>SCHOOL</IonLabel>
                </IonListHeader>
                <IonItem detail lines="none">
                  <IonLabel>Add School</IonLabel>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>SNAPCHAT</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonIcon icon={logoSnapchat} slot="start" />
                  <IonLabel>Bitmoji Keyboard</IonLabel>
                  <IonButton fill="clear" color="primary" slot="end">
                    CONNECT
                  </IonButton>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>INSTAGRAM PHOTOS</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonIcon icon={logoInstagram} color="primary" slot="start" />
                  <IonLabel>Connect Instagram</IonLabel>
                  <IonButton fill="clear" color="primary" slot="end">
                    CONNECT
                  </IonButton>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>SPOTIFY ANTHEM</IonLabel>
                </IonListHeader>
                <IonItem detail lines="none">
                  <IonIcon icon={logoRss} color="success" slot="start" />
                  <IonLabel>
                    <div>Sunday Morning</div>
                    <div className="text-sm"><IonText color="medium">Maroon 5</IonText></div>
                  </IonLabel>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>TOP SPOTIFY ARTIST</IonLabel>
                </IonListHeader>
                <IonItem lines="none">
                  <IonIcon icon={logoRss} color="sucess" slot="start" />
                  <IonLabel>Connect Spotify</IonLabel>
                  <IonButton fill="clear" color="primary" slot="end">
                    CONNECT
                  </IonButton>
                </IonItem>
              </IonList>

              <IonList className="list-custom">
                <IonListHeader>
                  <IonLabel>GENDER</IonLabel>
                </IonListHeader>
                <IonItem detail lines="none">
                  <IonLabel>Man</IonLabel>
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

              <div className="safe-area-bottom">
                <IonList className="list-custom">
                  <IonListHeader>
                    <IonLabel>CONTROL YOUR PROFILE <IonText color="primary">· Tinder Plus</IonText></IonLabel>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel>Don't Show My Age</IonLabel>
                    <IonToggle color="primary" checked={false} />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Don't Show My Distance</IonLabel>
                    <IonToggle color="primary" checked={false} />
                  </IonItem>
                </IonList>
              </div>
            </div>
          }

          {
            segmentView === 'PREVIEW' &&
            <div className="segment-view preview-container full-height">
              <div className="card-border full-height" ref={ stackRef }>
                <SwipeCard
                  user={ user }
                  isPreview
                  onNoMoreSlide={ handleNoMoreSlide }
                />
              </div>
            </div>
          }
        </div>

        <IonModal isOpen={ isPassionsOpen }>
          <Passions
            onClose={ () => setIsPassionsOpen(false) }
          />
        </IonModal>
      </IonContent>
    </>
  );
};

ProfileEdit.defaultProps = {

}

export default ProfileEdit;
