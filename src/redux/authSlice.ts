import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { AuthModel } from "./authtypes";
import { UserModel } from "./userType";
import { MsgModel } from "./MsgType";
import axios from "./api-ref";
import { loadMyItems } from "./itemSlice";

const initialState: AuthModel = {
  isAuthenticated: false,
  user: {
    _id: "",
    email: "",
    displayname: "",
    role: "",
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
  },
  favUserProfiles: [],
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
  },
});

const checkAuthTimeout = (expirationTime: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};
export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.logout(false));
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
      axios
        .get("users/" + response.data.userId, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        })
        .then((res) => {
          dispatch(authSlice.actions.setUser(res.data as UserModel));
          // console.log("Favs: "+res.data.favUsers);
      for (var i=0; i < res.data.favUsers.length; i++) {

        // console.log(res.data.favUsers[i]);
        axios
          .get("users/" + res.data.favUsers[i], {
            headers: { Authorization: `Bearer ${response.data.token}` },
          })
          .then((res) => {
            dispatch(authSlice.actions.loadFavUserProfiles(res.data as UserModel));
            // console.log("_favUserProfile: " +JSON.stringify(res.data));
          })
          .catch((er) => {
            console.log(er);
          });
      }
      //console.log("_favUserProfiles: " + _favUserProfiles);
      
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(loadMyItems(response.data.userId));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const changeEmail = (newEmail: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  const authData = {
    idToken: localStorage.getItem("token"),
    email: newEmail,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E";
  // axios.post(url, authData)
  //     .then(response => {
  //         let expirationTime = Math.round(Date.now() / 1000) + 3600;
  //         localStorage.setItem('email', newEmail);
  //         localStorage.setItem('token', response.data.idToken);
  //         localStorage.setItem('expiration', expirationTime.toString());
  //         localStorage.setItem('userId', response.data.localId);
  //         dispatch(authSlice.actions.login(true));
  //         checkAuthTimeout(response.data.expiresIn);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     });
};
export const toggleFavourite = (
  itemId: string,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  axios
    .post("users/updateFavs/" + userId, { itemId: itemId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavourite(res.data.favourites));
    })
    .catch((err) => {});
};
export const toggleFavUsers = (
  favUserId: string,
  userId: string
): AppThunk => async (dispatch: AppDispatch) => {
  axios
    .post("users/updateFavUsers/" + userId, { userId: favUserId })
    .then((res) => {
      dispatch(authSlice.actions.toggleFavUsers(res.data.favUsers));
    })
    .catch((err) => {});
};
export const changePassword = (
  email: string,
  newPassword: string
): AppThunk => async (dispatch: AppDispatch) => {
  const authData = {
    idToken: localStorage.getItem("token"),
    password: newPassword,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E";
  // axios.post(url, authData)
  //     .then(response => {
  //         let expirationTime = Math.round(Date.now() / 1000) + 3600;
  //         localStorage.setItem('email', email);
  //         localStorage.setItem('token', response.data.idToken);
  //         localStorage.setItem('expiration', expirationTime.toString());
  //         localStorage.setItem('userId', response.data.localId);
  //         dispatch(authSlice.actions.login(true));
  //         checkAuthTimeout(response.data.expiresIn);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     });
};
export const authCheckState = (): AppThunk => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  let expirationTime: number = 0;
  if (localStorage.getItem("expiresAt")) {
    expirationTime = Number.parseInt(localStorage.getItem("expiresAt")!);
  }
  if (new Date().getTime() > expirationTime || !token) {
    logout();
  } else {
    var userId = localStorage.getItem("userId");
    axios
      .get("users/" + userId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(authSlice.actions.setUser(res.data as UserModel));
        dispatch(authSlice.actions.login(true));
        for (var i=0; i < res.data.favUsers.length; i++) {

          // console.log(res.data.favUsers[i]);
          axios
            .get("users/" + res.data.favUsers[i], {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              dispatch(authSlice.actions.loadFavUserProfiles(res.data as UserModel));
              // console.log("_favUserProfile: " +JSON.stringify(res.data));
            })
            .catch((er) => {
              console.log(er);
            });
        }
        dispatch(loadMyItems(userId!));
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export const sendMsg = (msg: MsgModel, userId: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  axios
    .post("users/updateMsgs/" + userId, msg)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {});
};
export default authSlice.reducer;
