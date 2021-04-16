import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store'
import { Note } from './types';
import axios from "../../api/database";

const initialState: Note[] = [];

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<Note>) {
            state.push(action.payload);
        },
        removeNote(state, action: PayloadAction<string>) {
            var index = state.findIndex(note => note.id === action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        loadNotes(state, action: PayloadAction<Note[]>) {
            state.length = 0;
            for (let note in action.payload) {
                state.push(action.payload[note]);
            }
        }
    }
});

export const removeNote = (id: string): AppThunk => async (dispatch: AppDispatch) => {
    // new Promise(function(resolve, reject) {
    const userId = localStorage.getItem('userId');
    axios
        .delete("/NewNotes/" + userId + "/" + id + ".json")
        .then((response) => {
             return dispatch(noteSlice.actions.removeNote(id));
            
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
            
        });
    // }
}
export const addNote = (text: string): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    const newNote: Note = {
        dated: new Date().toDateString(),
        text: text
    }
    axios
        .post("/NewNotes/"+ userId + ".json", newNote)
        .then((response) => {
            dispatch(noteSlice.actions.addNote(newNote))
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
        });
}
export const loadNotes = (): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .get("/NewNotes/"+userId+".json")
        .then((res) => {
            const fetchedNotes = [];
            for (let key in res.data) {
                fetchedNotes.push({
                    ...res.data[key],
                    id: key,
                });
            }
            fetchedNotes.sort(function (a, b) {
                return a.status - b.status;
            });
            return fetchedNotes;
        })
        .then((fetchedNotes) => {
            dispatch(noteSlice.actions.loadNotes(fetchedNotes));
        })
        .catch((err) => {
            // console.log(err);
        });
}
export default noteSlice.reducer;