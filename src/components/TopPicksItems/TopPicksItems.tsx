import React from "react";
import {} from "@ionic/react";
import {} from "ionicons/icons";
import "./TopPicksItems.scss";
import { Item } from "../../redux/itemType";
import { imgBaseUrl } from "../../redux/api-ref";

type Props = {
  item: Item;
  size?: string;
  customSize?: number;
};
//
const TopPicksItems: React.FC<Props> = ({ size, customSize, item }) => {
  const imageUrl = `${
    item.item_images[0]
      ? item.item_images[0].filename
      : "86b27f95d6f85147e8ac12616f841238.jpg"
  }`;
  const styles = {
    backgroundImage: `url(${imgBaseUrl + imageUrl})`,
    cursor: "pointer",
  } as React.CSSProperties;
  let classes = "item";

  if (size) {
    classes = `${classes} item-${size}`;
  }

  if (customSize) {
    styles.width = customSize;
    styles.height = customSize;
  }

  return (
    <div className="random-item">
      <div className={classes} style={styles} />
    </div>
  );
};
TopPicksItems.defaultProps = {};

export default TopPicksItems;
