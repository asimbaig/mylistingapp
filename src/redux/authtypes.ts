import { UserModel } from "./userType";
export interface AuthModel {
  isAuthenticated: boolean;
  user?: UserModel;
}
