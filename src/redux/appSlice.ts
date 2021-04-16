import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk, AppDispatch } from './store';
import { AppModel } from "./appTypes";

const initialState: AppModel = { darkMode: false };

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        }
    }
});

export const { setDarkMode } = appSlice.actions;

export default appSlice.reducer;