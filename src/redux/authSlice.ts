import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';
import { AuthModel } from "./authtypes";
//import axios from "../../api/database";

const initialState: AuthModel = { isAuthenticated: false };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        logout(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        }
    }
});

const checkAuthTimeout = (expirationTime: number): AppThunk => async (dispatch: AppDispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
};
export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logout(false));
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
}
export const login = (email: string, password: string, isSignup: boolean): AppThunk => async (dispatch: AppDispatch) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
    if (!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
    }
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
    //         //dispatch(authFail(err.response.data.error));
    //     });
}
export const changeEmail = (newEmail: string): AppThunk => async (dispatch: AppDispatch) => {
    const authData = {
        idToken: localStorage.getItem('token'),
        email: newEmail,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
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
}
export const changePassword = (email: string, newPassword: string): AppThunk => async (dispatch: AppDispatch) => {
    const authData = {
        idToken: localStorage.getItem('token'),
        password: newPassword,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
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
}
export const authCheckState = (): AppThunk => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    let expirationTime: number = 0;
    if(localStorage.getItem('expiration')){
        expirationTime = Number.parseInt(localStorage.getItem('expiration')!);
    }
    if((Math.round(Date.now() / 1000) > expirationTime) || !token){
        logout();
        return false;
    }else {
            dispatch(authSlice.actions.login(true));
            return true;
    }
};
export default authSlice.reducer;