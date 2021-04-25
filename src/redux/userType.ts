import { PhotoModel } from "./photoType";
import { MsgModel } from "./MsgType";
export interface UserModel {
  _id: string;
  email: string;
  displayname: string;
  role: string;
  profileImages: PhotoModel[];
  listedItems: string[];
  address: string;
  phone: string;
  dob: string;
  lastActive: string;
  rating: number;
  joinDate: string;
  favourites: string[];
  favUsers: string[];
  msgFromUsers: string[];
  messages: MsgModel[];
}
