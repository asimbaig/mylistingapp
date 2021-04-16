export interface ItemModel {
  items: Item[];
  selectedItem?: Item;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  condition: string;
  item_images: string[];
  startdate: string;
  enddate: string;
  isactive: boolean;
  views: string[];
  likes: string[];
  location: { latitude: number; longitude: number };
  relist_count: number;
  userId: string;
}
