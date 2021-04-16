import { combineReducers } from '@reduxjs/toolkit';
import app from './appSlice';
import auth from '../features/Auth/authSlice';
import tasks from '../pages/calendar/calendarSlice';
import global from '../pages/calendar/globalSlice';
import todos from '../features/todoList/todoSlice';
import notes from '../features/noteList/noteSlice';
import photos from '../features/Photos/photoSlice';
import visibilityFilter from '../features/todoList/visibilityFilter/visibilityFilterSlice';

const rootReducer = combineReducers({
    app,
    auth,
    tasks,
    todos,
    visibilityFilter,
    notes,
    global,
    photos
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer