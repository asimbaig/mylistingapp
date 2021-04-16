import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store'
import { Image } from './types';
import axios from "../../api/database";

const initialState: Image[] = [];

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        addPhoto(state, action: PayloadAction<Image>) {
            state.push(action.payload);
        },
        removePhoto(state, action: PayloadAction<string>) {
            var index = state.findIndex(photo => photo.id === action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        loadPhotos(state, action: PayloadAction<Image[]>) {
            state.length = 0;
            for (let image in action.payload) {
                state.push(action.payload[image]);
            }
        }
    }
});

export const removePhoto = (image: Image): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .delete("/Photos/" + userId + "/" +image.year+"/"+image.month+"/"+image.day+"/"+image.id + ".json")
        .then((response) => {
            dispatch(photoSlice.actions.removePhoto(image.id!));
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
        });
}
export const addPhoto = (image: Image): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .post("/Photos/"+ userId +"/" + image.year +"/" +image.month +"/" +image.day +".json", image)
        .then((response) => {
            image.id = response.data.name;
            dispatch(photoSlice.actions.addPhoto(image))
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
        });
}
export const loadPhotos = (currentYear: number, currentMonth: number): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .get("/Photos/" + userId + "/" + currentYear + "/" + currentMonth +  ".json")
        .then((res) => {
            const fetchedPhotos: Image[] = [];
            for (let dateIndex in res.data) {
              for (let idIndex in res.data[dateIndex]) {
                    if (
                      res.data[dateIndex][idIndex].month === currentMonth &&
                      res.data[dateIndex][idIndex].year === currentYear
                    ) {
                      fetchedPhotos.push({
                        ...res.data[dateIndex][idIndex],
                        id: idIndex,
                      });
                    }
              }
            }
            return fetchedPhotos;
          })
        .then((fetchedPhotos) => {
            dispatch(photoSlice.actions.loadPhotos(fetchedPhotos));
        })
        .catch((err) => {
            // console.log(err);
        });
}
export default photoSlice.reducer;