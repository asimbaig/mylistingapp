import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store'
import { Task } from './types';
import axios from "../../api/database";

const initialState: Task[] = [];

const calendarSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    editTask(state, action: PayloadAction<Task>) {
      let task = state.find(task => task.id === action.payload.id);

      if (task) {
        const userId = localStorage.getItem('userId');
        task.id = action.payload.id;
        task.start = action.payload.start;
        task.end = action.payload.end;
        task.startMin = action.payload.startMin;
        task.endMin = action.payload.endMin;
        task.details = action.payload.details;
        task.priority = action.payload.priority;
        task.day = action.payload.day;
        task.month = action.payload.month;
        task.year = action.payload.year;
        task.location = action.payload.location;
        axios.put("/NewTasks/" + userId + "/" + task.year + "/" + task.month + "/" + task.day + "/" + task.id + ".json", task);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      var index = state.findIndex(task => task.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    loadTasks(state, action: PayloadAction<Task[]>) {

      state.length = 0;
      for (let task in action.payload) {
        state.push(action.payload[task]);
      }

    },
    emptyTasks(state, action: PayloadAction<true>) {
      state.length = 0;
    }
  }
});

export const { editTask } = calendarSlice.actions;
export const { emptyTasks } = calendarSlice.actions;

export const deleteTask = (task: Task): AppThunk => async (dispatch: AppDispatch) => {
  const userId = localStorage.getItem('userId');
  axios
    .delete("/NewTasks/" + userId + "/" + task.year + "/" + task.month + "/" + task.day + "/" + task.id + ".json")
    .then((response) => {
      dispatch(calendarSlice.actions.deleteTask(task.id!))
    })
    .catch((err) => {
      console.log(">_>->_>->_>" + JSON.stringify(err));
    });
}
export const addTask = (task: Task): AppThunk => async (dispatch: AppDispatch) => {
  const userId = localStorage.getItem('userId');
  axios
    .post("/NewTasks/" + userId + "/" + task.year + "/" + task.month + "/" + task.day + ".json", task)
    .then((response) => {
      task.id = response.data.name;
      dispatch(calendarSlice.actions.addTask(task))
    })
    .catch((err) => {
      console.log(">_>->_>->_>" + JSON.stringify(err));
    });
}
export const loadTasks = (currentYear: number, currentMonth: number): AppThunk => async (dispatch: AppDispatch) => {
  const userId = localStorage.getItem('userId');
  axios
    .get("/NewTasks/" + userId + "/" + currentYear + "/" + currentMonth + ".json")
    .then((res) => {
      const fetchedTasks: Task[] = [];
      for (let dateIndex in res.data) {
        for (let idIndex in res.data[dateIndex]) {
          if (
            res.data[dateIndex][idIndex].month === currentMonth &&
            res.data[dateIndex][idIndex].year === currentYear
          ) {
            fetchedTasks.push({
              ...res.data[dateIndex][idIndex],
              id: idIndex,
            });
          }
        }
      }
      fetchedTasks.sort(function (a, b) {
        return a.start - b.start;
      });
      return fetchedTasks;
    })
    .then((fetchedTasks) => {
      dispatch(calendarSlice.actions.loadTasks(fetchedTasks));
    })
    .catch((err) => {
      console.log(err);
    });
}
export const getDailyTasks = (currentYear: number, currentMonth: number, currentDay: number): AppThunk => async (dispatch: AppDispatch) => {
  currentDay = currentDay ? currentDay : 1;
  const userId = localStorage.getItem('userId');
  axios
    .get("/NewTasks/" + userId + "/" + currentYear + "/" + currentMonth + ".json")
    .then((res) => {
      const fetchedTasks = [];
      for (let dateIndex in res.data) {
        for (let idIndex in res.data[dateIndex]) {
          if (
            res.data[dateIndex][idIndex].month === currentMonth &&
            res.data[dateIndex][idIndex].year === currentYear &&
            res.data[dateIndex][idIndex].day === currentDay
          ) {
            fetchedTasks.push({
              ...res.data[dateIndex][idIndex],
              id: idIndex,
            });
          }
        }
      }
      fetchedTasks.sort(function (a, b) {
        return a.start - b.start;
      });
      return fetchedTasks;
    })
    .then((fetchedTasks) => {
      dispatch(calendarSlice.actions.loadTasks(fetchedTasks));
    })
    .catch((err) => {
      console.log(err);
    });
}
export default calendarSlice.reducer;