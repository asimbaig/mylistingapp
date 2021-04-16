import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Global, CurrentDate } from './types';

const initialState: Global = { currentDate: {day:new Date().getDate(), month:new Date().getMonth()+1, year:new Date().getFullYear()}, calendarMode:true};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCalendarMode(state, action: PayloadAction<boolean>) {
            state.calendarMode = action.payload;
        },
        setCurrentDate(state, action: PayloadAction<CurrentDate>) {
            state.currentDate = action.payload;
        },

    }
});
export const { setCalendarMode } = globalSlice.actions;
export const { setCurrentDate } = globalSlice.actions;

export default globalSlice.reducer;