import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonContent, IonSearchbar, IonText, IonIcon, IonRow, IonCol, IonButton
} from '@ionic/react';
import {
  heart, ellipsisHorizontal, chatbubbles, briefcaseOutline, locationOutline
} from 'ionicons/icons';
import RandomAvatar from '../../components/RandomAvatar/RandomAvatar';
import LabelMatched from '../../components/LabelMatched/LabelMatched';
import './Matches.scss';

type Props = {
  history: any,
}

const Matches: React.FC<Props> = ({ history }) => {
  const [segmentView, setSegmentView] = useState<string>('LIST');
  const messages: any[] = [
    'Natasha',
    'Tony',
    'Scarwitch',
    'Nebula',
    'Thor',
    'Peter',
    'Pepper',
  ]
  const feedItems: any[] = [
    { url: 'assets/img/avatars/hieu.png' },
    { url: 'assets/img/avatars/thor.png' },
    { url: 'assets/img/avatars/blackpanther.png' }
  ];

  const goToChat = () => {
    history.push('/chat');
  }

  return (
    <IonPage>
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border toolbar-no-safe-area">
          <IonSegment className="segment-custom" value={ segmentView } onIonChange={ e => setSegmentView(e.detail.value as string) } mode="md">
            <IonSegmentButton value="LIST">
              <IonLabel>
                Messages
                <div className="segment-badge">6</div>
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FEED">
              <IonLabel>
                Matches
                <div className="segment-badge">3</div>
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="matches-page">
        <div className="safe-area-bottom">
          {
            segmentView === 'LIST' &&
            <div>
              <div className="border-bottom">
                <IonSearchbar placeholder="Search Matches" className="search-bar"></IonSearchbar>
              </div>

              <div>
                <div className="list-header">
                  <IonText color="primary">
                    <strong>New matches</strong>
                  </IonText>
                </div>

                <div className="scroll-horizontal matches-list">
                  <div className="scroll-item matches-item matches-item-likes">
                    <div className="profile-image">
                      <div className="profile-image-inner">
                        <RandomAvatar size="lg" />
                      </div>

                      <div className="likes-count">
                        99+
                      </div>
                      <div className="like-gold">
                        <IonIcon icon={heart} />
                      </div>
                    </div>
                    <div className="scroll-item-title text-ellipsis">Likes</div>
                  </div>
                  {
                    messages.map(name => (
                      <div className="scroll-item matches-item" key={ name } onClick={ goToChat }>
                        <div className="profile-image">
                          <RandomAvatar size="lg" />
                          <div className="online-status" />
                        </div>
                        <div className="scroll-item-title text-ellipsis">{ name }</div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div>
                <div className="list-header">
                  <IonText color="primary">
                    <strong>Messages</strong>
                  </IonText>
                </div>
                <div className="message-list">
                  {
                    messages.map(name => (
                      <IonRow className="ion-align-items-center" key={ name } onClick={ goToChat }>
                        <IonCol size="auto">
                          <RandomAvatar size="lg" />
                        </IonCol>
                        <IonCol className="message-item-text">
                          <div>
                            <div className="user-name">{ name  }</div>
                            <IonText color="medium">Sent you a GIPHY</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                    ))
                  }
                </div>
              </div>
            </div>
          }

          {
            segmentView === 'FEED' &&
            <div>
              {
                feedItems.map(item => (
                  <div className="feed-item" key={ item.url }>
                    <IonRow className="feed-item-header ion-align-items-center">
                      <IonCol size="auto">
                        <RandomAvatar size="md" />
                      </IonCol>
                      <IonCol>
                        <div>
                          <div className="user-name">Tinder Man</div>
                          <div className="secondary-info">New match!</div>
                        </div>
                      </IonCol>
                      <IonCol size="auto">
                        <IonIcon icon={ellipsisHorizontal} color="medium" />
                      </IonCol>
                    </IonRow>

                    <div className="feed-item-cover">
                      <div style={{ backgroundImage: `url(${ item.url })` }} className="background-img" />

                      <div className="matched-overlay">
                        <LabelMatched />
                      </div>
                    </div>

                    <div className="feed-item-footer">
                      <div className="feed-item-buttons">
                        <IonButton color="white" className="button-custom button-icon button-xs">
                          <IonIcon slot="icon-only" icon={heart} className="color-green" />
                        </IonButton>
                        <IonButton color="white" className="button-custom button-icon button-xs">
                          <IonIcon slot="icon-only" icon={chatbubbles} className="color-blue" />
                        </IonButton>
                      </div>
                      <div className="profile-user-info">
                        <div className="info-item">
                          <IonIcon icon={briefcaseOutline} />Front-End, UX/UI lover
                        </div>
                        <div className="info-item">
                          <IonIcon icon={locationOutline} />less than a kilometer away
                        </div>
                        <div className="secondary-info">
                          February 14
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

Matches.defaultProps = {

}

export default Matches;
