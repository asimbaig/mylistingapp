import React from 'react';
import {

} from '@ionic/react';
import {

} from 'ionicons/icons';
import './SendMsgHeader.scss';
import { UserModel } from '../../redux/userType';
import {
  IonAvatar
} from '@ionic/react';
import {imgBaseUrl} from "../../redux/api-ref"; 
type Props = {
  itemUser: UserModel
}

const SendMsgHeader: React.FC<Props> = ({ itemUser }) => {
  return (
    <div className="label-matched">
      <div className="matched-title">
        <div className="text-its">Message : {itemUser?.displayname}</div>
        <div id="outer-div">
              <div  id="inner-div">
                <img src={imgBaseUrl + itemUser?.profileImages[0].filename} alt=""/>
              </div>  
          </div>
        {/* <div className="text-match">
          <div>MATCH!</div>
          <div>MATCH!</div>
          <div>MATCH!</div>
        </div> */}
      </div>
    </div>
  );
};

SendMsgHeader.defaultProps = {

}

export default SendMsgHeader;
