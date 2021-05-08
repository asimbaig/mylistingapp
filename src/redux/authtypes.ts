import { UserModel } from "./userType";
import { MsgModel } from "./MsgType";
import { ErrorModel } from "./errorType";
export interface AuthModel {
  isAuthenticated: boolean;
  user: UserModel;
  favUserProfiles: UserModel[];
  msgFromUserProfiles: UserModel[];
  chatStream?: ChatStream;
  selectedChatUser?: UserModel;
  error: ErrorModel;
}
export interface ChatStream{
  toUserId: string,
  myMsgs: MsgModel[]
}