import React from 'react';
import {
  IonRow, IonCol, IonButton, IonIcon
} from '@ionic/react';
import {
  star
} from 'ionicons/icons';
import './PersonCard.scss';

type Props = {
  user: any,
}

const PersonCard: React.FC<Props> = ({ user }) => {
  return (
    <div
      className="person-card background-img"
      style={{ backgroundImage: `url('${ user.profile_image_url }')` }}
    >
      <div className="card-caption">
        <IonRow className="ion-align-items-end">
          <IonCol className="caption-text">
            <div className="caption-title">
              { user.name }, { user.age }
            </div>
            <div className="caption-time">
              15h left
            </div>
          </IonCol>
          <IonCol size="auto">
            <IonButton color="white" className="button-custom button-icon button-xs button-star">
              <IonIcon slot="icon-only" icon={star} />
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </div>
  );
};

PersonCard.defaultProps = {

}

export default PersonCard;
