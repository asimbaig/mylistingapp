import React from 'react';
import {

} from '@ionic/react';
import {

} from 'ionicons/icons';
import './TopPicksItems.scss';
import { Item } from "../../redux/itemType";
// import { RootState } from "../../redux/rootReducer";
// import { useSelector, useDispatch } from "react-redux";

type Props = {
  item: Item,
  size?: string,
  customSize?: number,
}
//
const TopPicksItems: React.FC<Props> = ({ size, customSize, item }) => {
  // const listings = useSelector((state: RootState) => state.listings.items);
  // const randomIndex = Math.floor(Math.random() * (listings.length - 1));
  const imageUrl = `${ item.item_images[0] ? item.item_images[0] : "./assets/images/itemnophoto.jpg" }`;
  const styles = {
    backgroundImage: `url(${ imageUrl })`,
    cursor: "pointer"
  } as React.CSSProperties;
  let classes = 'item';

  if (size) {
    classes = `${classes} item-${size}`;
  }

  if (customSize) {
    styles.width = customSize;
    styles.height = customSize;
  }

  return (
    <div className="random-item">
      <div
        className={ classes }
        style={ styles }
      />
    </div>

  );
};

TopPicksItems.defaultProps = {

}

export default TopPicksItems;
