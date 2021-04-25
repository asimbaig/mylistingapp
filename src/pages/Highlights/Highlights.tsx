import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonContent, IonText, IonButton, IonRow, IonCol
} from '@ionic/react';
import {

} from 'ionicons/icons';
import PersonCard from '../../components/PersonCard/PersonCard';
import './Highlights.scss';
import USERS from '../FavouriteUsers/users.dummy';

type Props = {

}

const Highlights: React.FC<Props> = () => {
  const [segmentView, setSegmentView] = useState<string>('LIKES');
  const likes: any[] = [...USERS];
  const topPicks: any[] = [...USERS].reverse();

  return (
    <IonPage>
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border toolbar-no-safe-area">
          <IonSegment className="segment-custom" value={ segmentView } mode="md" onIonChange={ e => setSegmentView(e.detail.value as string) }>
            <IonSegmentButton value="LIKES">
              <IonLabel>
                9 likes
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="TOPPICKS">
              <IonLabel>
                10 Top Picks
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="highlights-page">
        <div className="boost-promotion">
          <IonText color="boost">Up to 1000x more views</IonText>

          <IonButton expand="block" shape="round" color="boost">
            SUPER BOOST NOW
          </IonButton>
        </div>

        <div className="safe-area-bottom">
          {
            segmentView === 'LIKES' &&
            <div className="segment-view">
              <div className="offer-message">
                Upgrade to Tinder Gold to see people
                <br /> who already liked you.
              </div>

              <IonRow>
                {
                  likes.map(user => (
                    <IonCol key={ user.id } size="6">
                      <PersonCard user={ user } />
                    </IonCol>
                  ))
                }
              </IonRow>
            </div>
          }

          {
            segmentView === 'TOPPICKS' &&
            <div className="segment-view">
              <div className="offer-message">
                Featured profiles of the day, <br />picked just for you
              </div>

              <IonRow>
                {
                  topPicks.map(user => (
                    <IonCol size="6" key={ user.id }>
                      <PersonCard user={ user } />
                    </IonCol>
                  ))
                }
              </IonRow>
            </div>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

Highlights.defaultProps = {

}

export default Highlights;
