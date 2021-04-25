import { UserModel } from "./userType";
import { MsgModel } from "./MsgType";
export interface AuthModel {
  isAuthenticated: boolean;
  user: UserModel;
  favUserProfiles: UserModel[];
  msgFromUserProfiles: UserModel[];
  chatStream?: ChatStream;
  selectedChatUser?: UserModel;
}
export interface ChatStream{
  toUserId: string,
  myMsgs: MsgModel[]
}