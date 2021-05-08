import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { AuthModel, ChatStream } from "./authtypes";
import { UserModel } from "./userType";
import { PhotoModel } from "./photoType";
import { MsgModel } from "./MsgType";
import { ErrorModel } from "./errorType";
import axios from "./api-ref";
import { loadMyItems, loadItems } from "./itemSlice";

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
  error: {isError: false, errorMsg:""}
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
    setError(state, action: PayloadAction<ErrorModel>) {
      state.error = action.payload;
    },
  },
});
export const { setSelectedChatUser } = authSlice.actions;
export const { setError } = authSlice.actions;
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
    .catch(function (error) {
      if (error.response) {
        dispatch(setError({isError:true, errorMsg:error.response.data.error}));
      }
    });
};
export const signup = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  
  const authData = {
    email: email,
    password: password,
  };
  axios
    .post("auth/signup", authData)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("displayname", response.data.displayname);
      localStorage.setItem("expiresAt", response.data.expiresAt);
      dispatch(authSlice.actions.login(true));
      loadCurrentuserData(dispatch, response.data.userId, response.data.token);
      //dispatch(loadMyItems(response.data.userId));
    })
    .catch(function (error) {
      if (error.response) {
        dispatch(setError({isError:true, errorMsg:error.response.data.error}));
      }
    });
};
export const changeEmail = (newEmail: string): AppThunk => async (
  dispatch: AppDispatch
) => {};
export const toggleFavourite = (itemId: string,userId: string): AppThunk => 
async (dispatch: AppDispatch) => {
  
  axios
    .post("users/updateFavs/" + userId, { itemId: itemId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavourite(res.data.favourites));
      
    })
    .catch((err) => {
      
    });
};
export const toggleFavUsers = (favUserId: string,userId: string): AppThunk => 
async (dispatch: AppDispatch) => {
  
  axios
    .post("users/updateFavUsers/" + userId, { userId: favUserId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavUsers(res.data.favUsers));
      
    })
    .catch((err) => {
      
    });
};
export const updateMainImage = (mainImage: string,userId: string): AppThunk => 
async (dispatch: AppDispatch) => {
  
  //console.log("updateMainImage: ",mainImage, userId);
  axios
    .post("users/updateMainImage/" + userId, { mainImage: mainImage })
    .then((res) => {
      dispatch(authSlice.actions.setUser(res.data as UserModel));
      
    })
    .catch((err) => {
      
    });
};
export const changePassword = (email: string,newPassword: string): AppThunk => 
async (dispatch: AppDispatch) => {};
export const authCheckState = (): AppThunk => async (dispatch: AppDispatch) => {
  //
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
  
  axios
    .post("users/updateUserImages/" + userId, photo)
    .then((res) => {
      dispatch(authSlice.actions.updateUserImages(res.data.profileImages));
      console.log(res.data);
      
    })
    .catch((err) => {
      
    });
};
export const deleteUserImage = (
  photo: PhotoModel,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  
  axios
    .post("users/deleteUserImage/" + userId, photo)
    .then((res) => {
      dispatch(authSlice.actions.updateUserImages(res.data.profileImages));
      
    })
    .catch((err) => {
      
    });
};
export const FromUsersMsgs = (
  currentUser: UserModel,
  otherUserId: string
): AppThunk => async (dispatch: AppDispatch) => {
  
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
      
    })
    .catch((er) => {
      
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
            
          })
          .catch((er) => {
            console.log(er);
            
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
            
          })
          .catch((er) => {
            console.log(er);
            
          });
      }
      dispatch(loadMyItems(resUserId));
    })
    .catch((error) => {
      console.log(error);
      
    });
};
function sortFunction(a: MsgModel, b: MsgModel) {
  return a.dateTime > b.dateTime ? 1 : -1;
}
export default authSlice.reducer;
