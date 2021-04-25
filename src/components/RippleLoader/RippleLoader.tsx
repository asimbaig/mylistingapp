import React,{useEffect,useState} from 'react';
import { RootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {imgBaseUrl} from "../../redux/api-ref"; 
import {
  IonAvatar
} from '@ionic/react';
import {

} from 'ionicons/icons';
import './RippleLoader.scss';

type Props = {
  imageUrl: string,
}

const RippleLoader: React.FC<Props> = ({ imageUrl }) => {
  const [imgUrl, setImgUrl] = useState("./assets/img/user.jpg");
  const CurrentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if(CurrentUser && CurrentUser.profileImages && CurrentUser.profileImages.length>0){
      setImgUrl(imgBaseUrl + CurrentUser.profileImages[0].filename);
    }else{
      setImgUrl('./assets/images/usernophoto.jpg');
    }
  }, [])
  
  return (
    <div className="ripple-loader">
      <IonAvatar className="thumbnail-xl ripple-trigger">
        <img src={ imgUrl } alt="" />
      </IonAvatar>
      <div className="ripple-1"></div>
      <div className="ripple-2"></div>
    </div>

  );
};

RippleLoader.defaultProps = {

}

export default RippleLoader;
