import { UserModel } from "./userType";
import { PhotoModel } from "./photoType";
export interface ItemModel {
  items: Item[];
  selectedItem?: Item;
  editItem?: Item;
  userOtherItems: Item[];
  itemUser?: UserModel;
  myItems: Item[];
  searchText: string;
}

export interface Item {
  _id?: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  condition: string;
  item_images: PhotoModel[];
  startdate: string;
  enddate: string;
  isactive: boolean;
  isapproved: boolean;
  views: number;
  likes: string[];
  location: { latitude: number; longitude: number };
  relist_count: number;
  userId: string;
  status: string;
}
