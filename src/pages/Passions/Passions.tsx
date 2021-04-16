import React from 'react';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonText, IonList, IonListHeader, IonLabel
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './Passions.scss';

type Props = {
  onClose: () => void,
}

const Passions: React.FC<Props> = ({ onClose }) => {
  const tagList = [
    {
      label: 'Travel',
      active: true,
    },
    {
      label: 'Instagram',
      active: true,
    },
    {
      label: 'Walking',
      active: false,
    },
    {
      label: 'Tea',
      active: false,
    },
    {
      label: 'Athlete',
      active: false,
    },
    {
      label: 'Yoga',
      active: false,
    },
    {
      label: 'Surfing',
      active: false,
    },
    {
      label: 'Volunteering',
      active: false,
    },
    {
      label: 'Picnicking',
      active: false,
    },
    {
      label: 'Trivia',
      active: false,
    },
    {
      label: 'Astrology',
      active: false,
    },
    {
      label: 'Writer',
      active: false,
    },
    {
      label: 'Grab a drink',
      active: false,
    },
    {
      label: 'Coffee',
      active: false,
    },
    {
      label: 'Baking',
      active: false,
    },
    {
      label: 'Gamer',
      active: false,
    },
    {
      label: 'Cycling',
      active: false,
    },
    {
      label: 'Museum',
      active: false,
    },
    {
      label: 'Brunch',
      active: false,
    },
    {
      label: 'Wine',
      active: false,
    },
    {
      label: 'Disney',
      active: false,
    },
    {
      label: 'Dancing',
      active: false,
    },
    {
      label: 'Climbing',
      active: false,
    },
    {
      label: 'Netflix',
      active: false,
    },
    {
      label: 'Outdoors',
      active: false,
    },
    {
      label: 'Board Games',
      active: false,
    },
    {
      label: 'Fishing',
      active: false,
    },
    {
      label: 'Dog lover',
      active: false,
    },
    {
      label: 'Karaoke',
      active: false,
    },
    {
      label: 'Art',
      active: false,
    },
    {
      label: 'Environmentalism',
      active: false,
    },
    {
      label: 'Fashion',
      active: false,
    },
    {
      label: 'Music',
      active: true,
    },
    {
      label: 'Shopping',
      active: false,
    },
    {
      label: 'DIY',
      active: false,
    },
    {
      label: 'Politics',
      active: false,
    },
    {
      label: 'Running',
      active: false,
    },
    {
      label: 'Spirituality',
      active: false,
    },
    {
      label: 'Soccer',
      active: false,
    },
    {
      label: 'Golf',
      active: false,
    },
    {
      label: 'Sports',
      active: false,
    },
    {
      label: 'Reading',
      active: false,
    },
    {
      label: 'Swimming',
      active: false,
    },
    {
      label: 'Language Exchange',
      active: false,
    },
    {
      label: 'Vlogging',
      active: false,
    },
    {
      label: 'Comedy',
      active: false,
    },
    {
      label: 'Movies',
      active: false,
    },
    {
      label: 'Craft Beer',
      active: false,
    },
    {
      label: 'Foodie',
      active: false,
    },
    {
      label: 'Blogging',
      active: false,
    },
    {
      label: 'Cat lover',
      active: false,
    },
    {
      label: 'Photography',
      active: false,
    },
    {
      label: 'Gardening',
      active: false,
    },
    {
      label: 'Cooking',
      active: true,
    },
    {
      label: 'Working out',
      active: true,
    },
    {
      label: 'Hiking',
      active: false,
    },
  ]

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Passions</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={ onClose }>
            	Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="passions-page bg-light">
        <div className="ion-padding">
          <IonText color="medium">Select passions that you'd like to share. Choose a minimum of 3.</IonText>
        </div>

        <IonList className="list-custom passion-list">
          <IonListHeader>
            <IonLabel>Passions</IonLabel>
            <IonText color="medium" className="tag-count">(5/5)</IonText>
          </IonListHeader>

          <div className="ion-padding">
            {
              tagList.map(item => (
                <IonButton key={ item.label } shape="round" fill="outline" color={ item.active ? 'primary' : 'medium' } size="small">
                  { item.label }
                </IonButton>
              ))
            }
          </div>
        </IonList>
      </IonContent>
    </>
  );
};

Passions.defaultProps = {

}

export default Passions;
