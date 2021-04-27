import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { AuthModel, ChatStream } from "./authtypes";
import { UserModel } from "./userType";
import { PhotoModel } from "./photoType";
import { MsgModel } from "./MsgType";
import axios from "./api-ref";
import { loadMyItems, loadItems } from "./itemSlice";
import { setIsLoading } from "./appSlice";

const initialState: AuthModel = {
  isAuthenticated: false,
  user: {
    _id: "",
    email: "",
    displayname: "",
    role: "",
    mainImage:"",
    profileImages: [],
    listedItems: [],
    address: "",
    phone: "",
    dob: "",
    lastActive: "",
    rating: 0,
    joinDate: "",
    favourites: [],
    favUsers: [],
    msgFromUsers: [],
    messages: [],
  },
  favUserProfiles: [],
  msgFromUserProfiles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    logout(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
    },
    toggleFavourite(state, action: PayloadAction<string[]>) {
      state.user.favourites = action.payload;
    },
    toggleFavUsers(state, action: PayloadAction<string[]>) {
      state.user.favUsers = action.payload;
    },
    loadFavUserProfiles(state, action: PayloadAction<UserModel>) {
      //state.favUserProfiles = action.payload;
      state.favUserProfiles = [...state.favUserProfiles, action.payload];
    },
    loadMsgFromUserProfiles(state, action: PayloadAction<UserModel>) {
      //state.favUserProfiles = action.payload;
      state.msgFromUserProfiles = [
        ...state.msgFromUserProfiles,
        action.payload,
      ];
    },
    updateUserImages(state, action: PayloadAction<PhotoModel[]>) {
      state.user.profileImages = action.payload;
    },
    setChatStream(state, action: PayloadAction<ChatStream>) {
      state.chatStream = action.payload;
    },
    updateChatStream(state, action: PayloadAction<MsgModel>) {
      state.chatStream?.myMsgs.push(action.payload);
    },
    setSelectedChatUser(state, action: PayloadAction<UserModel>) {
      state.selectedChatUser = action.payload;
    },
  },
});
export const { setSelectedChatUser } = authSlice.actions;
const checkAuthTimeout = (expirationTime: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};
export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  // dispatch(authSlice.actions.logout(false));
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("displayname");
  localStorage.removeItem("expiresAt");
};
export const login = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  setIsLoading(true);
  const authData = {
    email: email,
    password: password,
  };
  axios
    .post("auth/login", authData)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("displayname", response.data.displayname);
      localStorage.setItem("expiresAt", response.data.expiresAt);
      dispatch(authSlice.actions.login(true));
      loadCurrentuserData(dispatch, response.data.userId, response.data.token);
      dispatch(loadMyItems(response.data.userId));
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const changeEmail = (newEmail: string): AppThunk => async (
  dispatch: AppDispatch
) => {};
export const toggleFavourite = (
  itemId: string,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("users/updateFavs/" + userId, { itemId: itemId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavourite(res.data.favourites));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export const toggleFavUsers = (
  favUserId: string,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("users/updateFavUsers/" + userId, { userId: favUserId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavUsers(res.data.favUsers));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export const changePassword = (
  email: string,
  newPassword: string
): AppThunk => async (dispatch: AppDispatch) => {};
export const authCheckState = (): AppThunk => async (dispatch: AppDispatch) => {
  //setIsLoading(true);
  const token = localStorage.getItem("token");
  let expirationTime: number = 0;
  if (localStorage.getItem("expiresAt")) {
    expirationTime = Number.parseInt(localStorage.getItem("expiresAt")!);
  }
  if (new Date().getTime() > expirationTime || !token) {
    logout();
  } else {
    var userId = localStorage.getItem("userId");
    dispatch(authSlice.actions.login(true));
    loadCurrentuserData(dispatch, userId!, token);
    // dispatch(loadItems());
  }
};
export const sendMsg = (
  msg: MsgModel,
  toUserId: string,
  updateChat: boolean
): AppThunk => async (dispatch: AppDispatch) => {
  axios
    .post("users/updateMsgs/" + toUserId, msg)
    .then((res) => {
      // console.log(res.data);
      if (updateChat) {
        dispatch(authSlice.actions.updateChatStream(res.data as MsgModel));
      }
    })
    .catch((err) => {});
};
export const updateUserImages = (
  photo: PhotoModel,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("users/updateUserImages/" + userId, photo)
    .then((res) => {
      dispatch(authSlice.actions.updateUserImages(res.data.profileImages));
      console.log(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export const deleteUserImage = (
  photo: PhotoModel,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("users/deleteUserImage/" + userId, photo)
    .then((res) => {
      dispatch(authSlice.actions.updateUserImages(res.data.profileImages));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export const FromUsersMsgs = (
  currentUser: UserModel,
  otherUserId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("users/FromUsersMsgs/" + currentUser._id, { fromUserId: otherUserId })
    .then((chat) => {
      let chatStream = chat.data as ChatStream;
      let otherUserMsgs = currentUser.messages.filter(
        (msg) => msg.fromUser === otherUserId
      );
      chatStream.myMsgs = [...chatStream.myMsgs, ...otherUserMsgs];
      chatStream.myMsgs.sort(sortFunction);
      dispatch(authSlice.actions.setChatStream(chatStream));
      setIsLoading(false);
    })
    .catch((er) => {
      setIsLoading(false);
    });
};
const loadCurrentuserData = (
  dispatch: AppDispatch,
  resUserId: string,
  token: string
) => {
  axios
    .get("users/" + resUserId, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(authSlice.actions.setUser(res.data as UserModel));

      for (var i = 0; i < res.data.favUsers.length; i++) {
        axios
          .get("users/" + res.data.favUsers[i], {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch(
              authSlice.actions.loadFavUserProfiles(res.data as UserModel)
            );
            setIsLoading(false);
          })
          .catch((er) => {
            console.log(er);
            setIsLoading(false);
          });
      }
      for (var j = 0; j < res.data.msgFromUsers.length; j++) {
        axios
          .get("users/" + res.data.msgFromUsers[j], {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch(
              authSlice.actions.loadMsgFromUserProfiles(res.data as UserModel)
            );
            setIsLoading(false);
          })
          .catch((er) => {
            console.log(er);
            setIsLoading(false);
          });
      }
      dispatch(loadMyItems(resUserId));
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};
function sortFunction(a: MsgModel, b: MsgModel) {
  return a.dateTime > b.dateTime ? 1 : -1;
}
export default authSlice.reducer;
