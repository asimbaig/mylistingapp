import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk, AppDispatch } from './store';
import { AppModel } from "./appTypes";

const initialState: AppModel = { darkMode: false, isLoading: false };

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    }
});

export const { setDarkMode } = appSlice.actions;
export const { setIsLoading } = appSlice.actions;

export default appSlice.reducer;